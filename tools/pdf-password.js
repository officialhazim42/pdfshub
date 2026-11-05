/**
 * PDFHub Global Password Management & Encryption Architecture
 * 
 * Provides:
 * 1. PDFLibEncrypt: Client-side PDF encryption/decryption (RC4, AES-128, AES-256)
 * 2. PDFPasswordManager: Centralized detection, validation, memory-only session caching,
 *    and professional password UI dialog matching PDFHub design system.
 */

// ── PART 1: PDFLibEncrypt (Engine) ──────────────────────────────────────────
var PDFLibEncrypt = (() => {
  var _PDFLib = null;
  function configure(pdfLib) {
    _PDFLib = pdfLib;
  }
  function requirePdfLib() {
    let p = _PDFLib || (typeof globalThis !== 'undefined' && globalThis.PDFLib);
    if (!p && typeof window !== 'undefined' && window.PDFLib) p = window.PDFLib;
    if (p) {
      if (!p.PDFDocument && (typeof p.load === 'function' || typeof p.create === 'function')) {
        return { PDFDocument: p, ...p };
      }
      return p;
    }
    throw new Error('pdf-lib not provided. Call configure(PDFLib) first.');
  }

  var webcrypto = typeof globalThis !== 'undefined' ? globalThis.crypto : void 0;
  if (!webcrypto || typeof webcrypto.getRandomValues !== 'function') {
    throw Object.assign(new Error('A Web Crypto implementation is required.'), { code: 'NO_WEBCRYPTO' });
  }
  var subtle = webcrypto && webcrypto.subtle;

  // MD5 Implementation
  function md5(bytes) {
    const rl = (x, c) => (x << c) | (x >>> (32 - c));
    const s = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
      5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
      4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
      6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];
    const K = new Int32Array(64);
    for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0;
    let a0 = 1732584193, b0 = 4023233417, c0 = 2562383102, d0 = 271733878;
    const ml = bytes.length, withOne = ml + 1;
    const padLen = (withOne % 64 <= 56) ? (56 - (withOne % 64)) : (120 - (withOne % 64));
    const total = ml + 1 + padLen + 8;
    const m = new Uint8Array(total);
    m.set(bytes);
    m[ml] = 128;
    const bits = ml * 8;
    for (let i = 0; i < 8; i++) m[total - 8 + i] = (bits / Math.pow(2, 8 * i)) & 255;
    for (let off = 0; off < total; off += 64) {
      const M = new Int32Array(16);
      for (let i = 0; i < 16; i++) {
        M[i] = m[off + i * 4] | (m[off + i * 4 + 1] << 8) | (m[off + i * 4 + 2] << 16) | (m[off + i * 4 + 3] << 24);
      }
      let A = a0, B = b0, C = c0, D = d0;
      for (let i = 0; i < 64; i++) {
        let F, g;
        if (i < 16) { F = (B & C) | (~B & D); g = i; }
        else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
        else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
        else { F = C ^ (B | ~D); g = (7 * i) % 16; }
        F = (F + A + K[i] + M[g]) | 0;
        A = D; D = C; C = B;
        B = (B + rl(F, s[i])) | 0;
      }
      a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
    }
    const out = new Uint8Array(16);
    [a0, b0, c0, d0].forEach((v, i) => {
      out[i * 4] = v & 255;
      out[i * 4 + 1] = (v >>> 8) & 255;
      out[i * 4 + 2] = (v >>> 16) & 255;
      out[i * 4 + 3] = (v >>> 24) & 255;
    });
    return out;
  }

  // RC4 Implementation
  function rc4(key, data) {
    const S = new Uint8Array(256);
    for (let i = 0; i < 256; i++) S[i] = i;
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + key[i % key.length]) & 255;
      const t = S[i]; S[i] = S[j]; S[j] = t;
    }
    const out = new Uint8Array(data.length);
    let a = 0, b = 0;
    for (let k = 0; k < data.length; k++) {
      a = (a + 1) & 255;
      b = (b + S[a]) & 255;
      const t = S[a]; S[a] = S[b]; S[b] = t;
      out[k] = data[k] ^ S[(S[a] + S[b]) & 255];
    }
    return out;
  }

  var PAD = new Uint8Array([
    40, 191, 78, 94, 78, 117, 138, 65, 100, 0, 78, 86, 255, 250, 1, 8,
    46, 46, 0, 182, 208, 104, 62, 128, 47, 12, 169, 254, 100, 83, 105, 122
  ]);
  var KEYLEN = 16;
  var ZERO_IV = new Uint8Array(16);

  function strToLatin1(str) {
    const o = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) o[i] = str.charCodeAt(i) & 255;
    return o;
  }

  function padPw(pw) {
    const p = strToLatin1(pw || '');
    const b = new Uint8Array(32);
    for (let i = 0; i < 32; i++) b[i] = i < p.length ? p[i] : PAD[i - p.length];
    return b;
  }

  function concat(arrs) {
    let n = 0;
    arrs.forEach(a => { n += a.length; });
    const o = new Uint8Array(n);
    let off = 0;
    arrs.forEach(a => { o.set(a, off); off += a.length; });
    return o;
  }

  function p32(P) {
    return new Uint8Array([P & 255, (P >>> 8) & 255, (P >>> 16) & 255, (P >>> 24) & 255]);
  }

  function hex(bytes) {
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, '0');
    return s;
  }

  function randomBytes(n) {
    const a = new Uint8Array(n);
    webcrypto.getRandomValues(a);
    return a;
  }

  function randomId() {
    return randomBytes(16);
  }

  function sameBytes(a, b, len) {
    const n = len != null ? len : Math.max(a.length, b.length);
    if (a.length < n || b.length < n) return false;
    let diff = 0;
    for (let i = 0; i < n; i++) diff |= a[i] ^ b[i];
    return diff === 0;
  }

  function computeKeyFromPadded(padded, O, P, id0, R, keyLen, encryptMetadata) {
    const n = keyLen || KEYLEN;
    const parts = [padded, O, p32(P), id0];
    if ((R == null ? 3 : R) >= 4 && encryptMetadata === false) parts.push(new Uint8Array([255, 255, 255, 255]));
    let h = md5(concat(parts));
    if ((R == null ? 3 : R) >= 3) {
      for (let i = 0; i < 50; i++) h = md5(h.slice(0, n));
    }
    return h.slice(0, n);
  }

  function computeKey(pw, O, P, id0, R, keyLen, encryptMetadata) {
    return computeKeyFromPadded(padPw(pw), O, P, id0, R, keyLen, encryptMetadata);
  }

  function ownerRc4Key(ownerPw, R, keyLen) {
    const n = keyLen || KEYLEN;
    let h = md5(padPw(ownerPw));
    if ((R == null ? 3 : R) >= 3) {
      for (let i = 0; i < 50; i++) h = md5(h);
    }
    return h.slice(0, n);
  }

  function xorKey(base, i) {
    const k = new Uint8Array(base.length);
    for (let j = 0; j < base.length; j++) k[j] = base[j] ^ i;
    return k;
  }

  function computeO(ownerPw, userPw) {
    const rkey = ownerRc4Key(ownerPw);
    let data = padPw(userPw);
    for (let i = 0; i <= 19; i++) data = rc4(xorKey(rkey, i), data);
    return data;
  }

  function userPwFromO(ownerPw, O, R, keyLen) {
    const rkey = ownerRc4Key(ownerPw, R, keyLen);
    let data = O.slice(0);
    if ((R == null ? 3 : R) >= 3) {
      for (let i = 19; i >= 0; i--) data = rc4(xorKey(rkey, i), data);
    } else {
      data = rc4(rkey, data);
    }
    return data;
  }

  function computeU(key, id0) {
    let data = md5(concat([PAD, id0])).slice(0, 16);
    for (let i = 0; i <= 19; i++) data = rc4(xorKey(key, i), data);
    return concat([data, new Uint8Array(16)]);
  }

  function computeU_R2(key) {
    return rc4(key, PAD);
  }

  function objKey(key, num, gen) {
    return md5(concat([key, new Uint8Array([num & 255, (num >>> 8) & 255, (num >>> 16) & 255, gen & 255, (gen >>> 8) & 255])])).slice(0, Math.min(key.length + 5, 16));
  }

  function objKeyAesV2(key, num, gen) {
    return md5(concat([
      key,
      new Uint8Array([num & 255, (num >>> 8) & 255, (num >>> 16) & 255, gen & 255, (gen >>> 8) & 255]),
      new Uint8Array([115, 65, 108, 84]) // "sAlT"
    ])).slice(0, 16);
  }

  async function sha(algo, bytes) {
    return new Uint8Array(await subtle.digest(algo, bytes));
  }
  var sha256 = b => sha('SHA-256', b);
  var sha384 = b => sha('SHA-384', b);
  var sha512 = b => sha('SHA-512', b);

  async function aesKey(raw) {
    return subtle.importKey('raw', raw, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
  }

  async function aesCbcEncryptNoPad(rawKey, iv, data) {
    const k = await aesKey(rawKey);
    const out = new Uint8Array(await subtle.encrypt({ name: 'AES-CBC', iv }, k, data));
    return out.subarray(0, data.length);
  }

  async function aesCbcDecryptNoPad(rawKey, iv, data) {
    if (!data.length) return new Uint8Array(0);
    const k = await aesKey(rawKey);
    const last = data.subarray(data.length - 16);
    const xored = new Uint8Array(16);
    for (let i = 0; i < 16; i++) xored[i] = last[i] ^ 16;
    const extra = new Uint8Array(await subtle.encrypt({ name: 'AES-CBC', iv: ZERO_IV }, k, xored)).subarray(0, 16);
    const full = concat([data, extra]);
    return new Uint8Array(await subtle.decrypt({ name: 'AES-CBC', iv }, k, full));
  }

  async function aesEcbEncryptBlock(rawKey, block) {
    return aesCbcEncryptNoPad(rawKey, ZERO_IV, block);
  }

  async function aesv3Encrypt(fileKey, data) {
    const iv = randomBytes(16);
    const k = await aesKey(fileKey);
    const ct = new Uint8Array(await subtle.encrypt({ name: 'AES-CBC', iv }, k, data));
    return concat([iv, ct]);
  }

  async function aesv3Decrypt(fileKey, data) {
    if (!data || data.length < 32 || (data.length - 16) % 16 !== 0) return data;
    const iv = data.subarray(0, 16);
    const k = await aesKey(fileKey);
    try {
      return new Uint8Array(await subtle.decrypt({ name: 'AES-CBC', iv }, k, data.subarray(16)));
    } catch (e) {
      return data;
    }
  }

  async function aesv2Decrypt(objKey16, data) {
    if (!data || data.length < 16) return data;
    const iv = data.subarray(0, 16);
    const ct = data.subarray(16);
    if (!ct.length) return new Uint8Array(0);
    const k = await aesKey(objKey16);
    try {
      return new Uint8Array(await subtle.decrypt({ name: 'AES-CBC', iv }, k, ct));
    } catch (e) {
      return data;
    }
  }

  function passwordBytes(pw) {
    const b = new TextEncoder().encode(String(pw == null ? '' : pw));
    return b.length > 127 ? b.subarray(0, 127) : b;
  }

  async function hash2B(pwBytes, salt, udata, revision) {
    let K = await sha256(concat([pwBytes, salt, udata || new Uint8Array(0)]));
    if (revision === 5) return K.subarray(0, 32);
    let E = new Uint8Array([0]), i = 0;
    while (i < 64 || E[E.length - 1] > i - 32) {
      const unit = concat([pwBytes, K, udata || new Uint8Array(0)]);
      const K1 = new Uint8Array(unit.length * 64);
      for (let r = 0; r < 64; r++) K1.set(unit, r * unit.length);
      E = await aesCbcEncryptNoPad(K.subarray(0, 16), K.subarray(16, 32), K1);
      let rem = 0;
      for (let z = 0; z < 16; z++) rem += E[z];
      rem %= 3;
      K = rem === 0 ? await sha256(E) : rem === 1 ? await sha384(E) : await sha512(E);
      i++;
    }
    return K.subarray(0, 32);
  }

  async function transformStrings(o, P, cipher) {
    if (o instanceof P.PDFString || o instanceof P.PDFHexString) {
      return P.PDFHexString.of(hex(await cipher(o.asBytes())));
    }
    if (o instanceof P.PDFArray) {
      for (let i = 0; i < o.size(); i++) {
        const v = o.get(i);
        const nv = await transformStrings(v, P, cipher);
        if (nv && nv !== v) o.set(i, nv);
      }
      return o;
    }
    if (o instanceof P.PDFDict) {
      for (const [k, v] of o.entries()) {
        const nv = await transformStrings(v, P, cipher);
        if (nv && nv !== v) o.set(k, nv);
      }
      return o;
    }
    return o;
  }

  async function eachObject(doc, ciphers, skipRef) {
    const P = requirePdfLib(), ctx = doc.context;
    for (const [ref, obj] of ctx.enumerateIndirectObjects()) {
      if (skipRef && ref.objectNumber === skipRef.objectNumber && ref.generationNumber === skipRef.generationNumber) continue;
      const strCipher = ciphers.str ? ciphers.str(ref.objectNumber, ref.generationNumber) : null;
      const stmCipher = ciphers.stm ? ciphers.stm(ref.objectNumber, ref.generationNumber) : null;
      if (obj instanceof P.PDFRawStream) {
        if (strCipher) await transformStrings(obj.dict, P, strCipher);
        if (stmCipher) ctx.assign(ref, P.PDFRawStream.of(obj.dict, await stmCipher(obj.contents)));
      } else if (strCipher) {
        await transformStrings(obj, P, strCipher);
      }
    }
  }

  async function lockAes256(doc, password, Pperm) {
    const P = requirePdfLib(), ctx = doc.context;
    const pw = passwordBytes(password);
    const fileKey = randomBytes(32);
    const uValidationSalt = randomBytes(8), uKeySalt = randomBytes(8);
    const uHash = await hash2B(pw, uValidationSalt, null, 6);
    const U = concat([uHash, uValidationSalt, uKeySalt]);
    const uInter = await hash2B(pw, uKeySalt, null, 6);
    const UE = await aesCbcEncryptNoPad(uInter, ZERO_IV, fileKey);
    const oValidationSalt = randomBytes(8), oKeySalt = randomBytes(8);
    const oHash = await hash2B(pw, oValidationSalt, U, 6);
    const O = concat([oHash, oValidationSalt, oKeySalt]);
    const oInter = await hash2B(pw, oKeySalt, U, 6);
    const OE = await aesCbcEncryptNoPad(oInter, ZERO_IV, fileKey);
    const perms = new Uint8Array(16);
    perms.set(p32(Pperm), 0);
    perms[4] = 255; perms[5] = 255; perms[6] = 255; perms[7] = 255;
    perms[8] = 84; perms[9] = 97; perms[10] = 100; perms[11] = 98;
    perms.set(randomBytes(4), 12);
    const Perms = await aesEcbEncryptBlock(fileKey, perms);

    const aesCipher = () => (bytes) => aesv3Encrypt(fileKey, bytes);
    await eachObject(doc, { stm: aesCipher, str: aesCipher }, null);

    const name = n => P.PDFName.of(n);
    const cfEntry = P.PDFDict.withContext(ctx);
    cfEntry.set(name('CFM'), name('AESV3'));
    cfEntry.set(name('AuthEvent'), name('DocOpen'));
    cfEntry.set(name('Length'), P.PDFNumber.of(32));
    const cf = P.PDFDict.withContext(ctx);
    cf.set(name('StdCF'), cfEntry);

    const enc = P.PDFDict.withContext(ctx);
    enc.set(name('Filter'), name('Standard'));
    enc.set(name('V'), P.PDFNumber.of(5));
    enc.set(name('R'), P.PDFNumber.of(6));
    enc.set(name('Length'), P.PDFNumber.of(256));
    enc.set(name('CF'), cf);
    enc.set(name('StmF'), name('StdCF'));
    enc.set(name('StrF'), name('StdCF'));
    enc.set(name('P'), P.PDFNumber.of(Pperm));
    enc.set(name('O'), P.PDFHexString.of(hex(O)));
    enc.set(name('U'), P.PDFHexString.of(hex(U)));
    enc.set(name('OE'), P.PDFHexString.of(hex(OE)));
    enc.set(name('UE'), P.PDFHexString.of(hex(UE)));
    enc.set(name('Perms'), P.PDFHexString.of(hex(Perms)));
    enc.set(name('EncryptMetadata'), P.PDFBool.True);

    ctx.trailerInfo.Encrypt = ctx.register(enc);
    const id = randomId();
    ctx.trailerInfo.ID = ctx.obj([P.PDFHexString.of(hex(id)), P.PDFHexString.of(hex(id))]);
  }

  async function lockRc4(doc, password, Pperm) {
    const P = requirePdfLib(), ctx = doc.context;
    const id = randomId();
    const O = computeO(password, password);
    const key = computeKey(password, O, Pperm, id);
    const U = computeU(key, id);
    const rc4Cipher = (num, gen) => {
      const ok = objKey(key, num, gen);
      return async (bytes) => rc4(ok, bytes);
    };
    await eachObject(doc, { stm: rc4Cipher, str: rc4Cipher }, null);
    const enc = P.PDFDict.withContext(ctx);
    enc.set(P.PDFName.of('Filter'), P.PDFName.of('Standard'));
    enc.set(P.PDFName.of('V'), P.PDFNumber.of(2));
    enc.set(P.PDFName.of('R'), P.PDFNumber.of(3));
    enc.set(P.PDFName.of('Length'), P.PDFNumber.of(128));
    enc.set(P.PDFName.of('P'), P.PDFNumber.of(Pperm));
    enc.set(P.PDFName.of('O'), P.PDFHexString.of(hex(O)));
    enc.set(P.PDFName.of('U'), P.PDFHexString.of(hex(U)));
    ctx.trailerInfo.Encrypt = ctx.register(enc);
    ctx.trailerInfo.ID = ctx.obj([P.PDFHexString.of(hex(id)), P.PDFHexString.of(hex(id))]);
  }

  async function lock(plainBytes, password, opts) {
    const P = requirePdfLib();
    const algo = (opts && opts.algo) || 'aes256';
    const doc = await P.PDFDocument.load(plainBytes, { ignoreEncryption: true, updateMetadata: false });
    const Pperm = opts && Number.isInteger(opts.permissions) ? (opts.permissions | 0) : -4;
    if (algo === 'rc4') {
      await lockRc4(doc, password, Pperm);
    } else if (!subtle) {
      throw Object.assign(new Error('AES-256 requires Web Crypto (crypto.subtle). Pass { algo: "rc4" } for legacy cipher.'), { code: 'NO_SUBTLE' });
    } else {
      await lockAes256(doc, password, Pperm);
    }
    return await doc.save({ useObjectStreams: false, updateMetadata: false });
  }

  var WRONG_PW = 'Wrong password for this PDF.';

  async function resolveRc4(enc, ctx, P, password, R, V, encryptMetadata, cfLenBits) {
    const O = enc.get(P.PDFName.of('O')).asBytes();
    const Ustored = enc.get(P.PDFName.of('U')).asBytes();
    const Pn = enc.get(P.PDFName.of('P')).asNumber() | 0;
    const idArr = ctx.trailerInfo.ID;
    const id0 = idArr ? idArr.get(0).asBytes() : new Uint8Array(0);
    const lenV = ctx.lookup(enc.get(P.PDFName.of('Length')));
    const declaredBits = (lenV && lenV.asNumber ? lenV.asNumber() : 0) || (cfLenBits || 0);
    const keyLen = (R === 2 || V === 1) ? 5 : (declaredBits >= 40 && declaredBits <= 128 ? Math.floor(declaredBits / 8) : KEYLEN);
    const check = (padded) => {
      const key2 = computeKeyFromPadded(padded, O, Pn, id0, R, keyLen, encryptMetadata);
      const calc = (R === 2) ? computeU_R2(key2) : computeU(key2, id0);
      return sameBytes(calc, Ustored, R === 2 ? 32 : 16) ? key2 : null;
    };
    let key = check(padPw(password));
    if (!key) key = check(userPwFromO(password, O, R, keyLen));
    if (!key) throw new Error(WRONG_PW);
    return key;
  }

  async function resolveAes(enc, P, password, R) {
    if (!subtle) throw new Error('Web Crypto is unavailable; AES decryption requires a secure context.');
    const U = enc.get(P.PDFName.of('U')).asBytes();
    const O = enc.get(P.PDFName.of('O')).asBytes();
    const UEe = enc.get(P.PDFName.of('UE')), OEe = enc.get(P.PDFName.of('OE'));
    const UE = UEe ? UEe.asBytes() : null, OE = OEe ? OEe.asBytes() : null;
    if (U.length < 48 || O.length < 48) throw new Error("This PDF's security handler is malformed.");
    const pw = passwordBytes(password);
    const uHash = await hash2B(pw, U.subarray(32, 40), null, R);
    if (sameBytes(uHash, U.subarray(0, 32), 32)) {
      if (!UE) throw new Error("This PDF's security handler is malformed.");
      const inter = await hash2B(pw, U.subarray(40, 48), null, R);
      return await aesCbcDecryptNoPad(inter, ZERO_IV, UE);
    }
    const oHash = await hash2B(pw, O.subarray(32, 40), U.subarray(0, 48), R);
    if (sameBytes(oHash, O.subarray(0, 32), 32)) {
      if (!OE) throw new Error("This PDF's security handler is malformed.");
      const inter = await hash2B(pw, O.subarray(40, 48), U.subarray(0, 48), R);
      return await aesCbcDecryptNoPad(inter, ZERO_IV, OE);
    }
    throw new Error(WRONG_PW);
  }

  async function unlockInPlace(doc, password) {
    const P = requirePdfLib(), ctx = doc.context;
    const encRef = ctx.trailerInfo.Encrypt;
    if (!encRef) return false;
    const enc = ctx.lookup(encRef);
    if (!(enc instanceof P.PDFDict)) return false;

    if (P.PDFInvalidObject) {
      for (const [, o] of ctx.enumerateIndirectObjects()) {
        if (o instanceof P.PDFInvalidObject) {
          throw new Error('This PDF stores objects in compressed object streams, which cannot be parsed while encrypted. Please use the Unlock PDF tool or open and re-save the document first.');
        }
      }
    }

    const filter = enc.get(P.PDFName.of('Filter'));
    if (filter && filter.asString && filter.asString() !== '/Standard') {
      throw new Error('Unsupported security handler: only the ISO 32000 Standard handler is supported.');
    }

    const Vv = enc.get(P.PDFName.of('V')), Rv = enc.get(P.PDFName.of('R'));
    const V = Vv ? Vv.asNumber() : 0, R = Rv ? Rv.asNumber() : (V >= 5 ? 6 : 3);

    const deref = (v) => {
      try { return v == null ? v : ctx.lookup(v) || v; } catch { return v; }
    };
    const emV = deref(enc.get(P.PDFName.of('EncryptMetadata')));
    const encryptMetadata = emV == null ? void 0 : (typeof emV.asBoolean === 'function' ? emV.asBoolean() : (typeof emV.value === 'boolean' ? emV.value : void 0));

    const nameOf = (v) => {
      const d = deref(v);
      return d && d.asString ? d.asString() : '';
    };

    const cf = deref(enc.get(P.PDFName.of('CF')));
    let cfLenBits = 0;
    const cfmFor = (which) => {
      const fname = nameOf(enc.get(P.PDFName.of(which))) || '/Identity';
      if (fname === '/Identity') return 'Identity';
      const key = fname.replace(/^\//, '');
      const entry = cf && cf.get ? deref(cf.get(P.PDFName.of(key))) : null;
      if (!entry || !entry.get) throw new Error('Malformed security handler: crypt filter ' + fname + ' is not defined in /CF.');
      const lv = deref(entry.get(P.PDFName.of('Length')));
      if (lv && lv.asNumber) {
        const n = lv.asNumber();
        cfLenBits = Math.max(cfLenBits, n <= 16 ? n * 8 : n);
      }
      const m = deref(entry.get(P.PDFName.of('CFM')));
      const cfm = m && m.asString ? m.asString() : '';
      if (cfm === '/None') return 'Identity';
      if (cfm === '/V2') return 'RC4';
      if (cfm === '/AESV2') return 'AESV2';
      if (cfm === '/AESV3') return 'AESV3';
      throw new Error('Unsupported crypt filter method ' + (cfm || '(missing)') + ' in /CF /' + key + '.');
    };

    let stm = 'RC4', str = 'RC4';
    if (V >= 4) {
      stm = cfmFor('StmF');
      str = cfmFor('StrF');
      if (enc.get(P.PDFName.of('EFF')) && cfmFor('EFF') !== stm) {
        throw new Error('This PDF encrypts embedded files separately (/EFF), which cannot be decrypted in the browser.');
      }
      for (const [what, m] of [['streams', stm], ['strings', str]]) {
        if (V >= 5 && m !== 'AESV3' && m !== 'Identity') {
          throw new Error('Unsupported encryption: /V 5 declares ' + m + ' for ' + what + '; only AESV3 is implemented.');
        }
      }
    }

    let ciphers;
    if (V >= 5) {
      const fileKey = await resolveAes(enc, P, password, R);
      const aes = () => (bytes) => aesv3Decrypt(fileKey, bytes);
      ciphers = { stm: stm === 'Identity' ? null : aes, str: str === 'Identity' ? null : aes };
    } else if (stm === 'AESV2' || str === 'AESV2') {
      const fileKey = await resolveRc4(enc, ctx, P, password, R, V, encryptMetadata, cfLenBits);
      const aesV2Cipher = (num, gen) => {
        const ok = objKeyAesV2(fileKey, num, gen);
        return async (bytes) => aesv2Decrypt(ok, bytes);
      };
      const rc4Cipher = (num, gen) => {
        const ok = objKey(fileKey, num, gen);
        return async (bytes) => rc4(ok, bytes);
      };
      ciphers = {
        stm: stm === 'Identity' ? null : (stm === 'AESV2' ? aesV2Cipher : rc4Cipher),
        str: str === 'Identity' ? null : (str === 'AESV2' ? aesV2Cipher : rc4Cipher)
      };
    } else {
      const fileKey = await resolveRc4(enc, ctx, P, password, R, V, encryptMetadata, cfLenBits);
      const rc4f = (num, gen) => {
        const ok = objKey(fileKey, num, gen);
        return async (bytes) => rc4(ok, bytes);
      };
      ciphers = { stm: stm === 'Identity' ? null : rc4f, str: str === 'Identity' ? null : rc4f };
    }

    await eachObject(doc, ciphers, encRef);
    ctx.trailerInfo.Encrypt = void 0;
    try { ctx.delete(encRef); } catch {}
    return true;
  }

  return { configure, lock, unlockInPlace };
})();

if (typeof window !== 'undefined') {
  window.PDFLibEncrypt = PDFLibEncrypt;
}


// ── PART 2: PDFPasswordManager (Global Service) ─────────────────────────────
var PDFPasswordManager = (() => {
  // STRICT SECURITY & PRIVACY:
  // Passwords are stored ONLY in this in-memory Map for the current session.
  // Never stored in localStorage, sessionStorage, history, URLs, or console logs.
  const _sessionPasswords = new Map();

  function fileKey(file) {
    if (!file) return 'unknown_file';
    if (typeof file === 'string') return file;
    return `${file.name || 'document'}_${file.size || 0}_${file.lastModified || 0}`;
  }

  function getCachedPassword(file) {
    return _sessionPasswords.get(fileKey(file)) || null;
  }

  function setCachedPassword(file, password) {
    if (password && typeof password === 'string') {
      _sessionPasswords.set(fileKey(file), password);
    }
  }

  function clearTemporaryPassword(file) {
    if (file) {
      _sessionPasswords.delete(fileKey(file));
    }
  }

  function clearAllTemporaryPasswords() {
    _sessionPasswords.clear();
  }

  // Asynchronous encrypted PDF detection
  async function detectEncryptedPDF(fileOrBytes) {
    try {
      let ab;
      if (fileOrBytes instanceof ArrayBuffer) {
        ab = fileOrBytes;
      } else if (fileOrBytes instanceof Uint8Array) {
        ab = fileOrBytes.buffer.slice(fileOrBytes.byteOffset, fileOrBytes.byteOffset + fileOrBytes.byteLength);
      } else if (fileOrBytes && typeof fileOrBytes.arrayBuffer === 'function') {
        ab = await fileOrBytes.arrayBuffer();
      } else {
        return false;
      }

      const bytes = new Uint8Array(ab);
      if (bytes.length < 5) return false;

      // Check PDF header
      const head = new TextDecoder('latin1').decode(bytes.subarray(0, Math.min(1024, bytes.length)));
      if (!head.includes('%PDF-')) return false;

      // Fast scan trailer / xref stream area (last 64KB)
      const tailChunk = bytes.subarray(Math.max(0, bytes.length - 65536));
      const tail = new TextDecoder('latin1').decode(tailChunk);
      if (/\/Encrypt\s*(\d+\s+\d+\s+R|<<)/.test(tail)) {
        return true;
      }

      // If PDFLib is available, verify trailer info
      const P = (typeof window !== 'undefined' && window.PDFLib) || (typeof PDFLib !== 'undefined' ? PDFLib : null);
      if (P && typeof P.PDFDocument?.load === 'function') {
        try {
          const doc = await P.PDFDocument.load(ab, { ignoreEncryption: true });
          if (doc.context && doc.context.trailerInfo && doc.context.trailerInfo.Encrypt) {
            return true;
          }
        } catch (e) {
          if (e.message && e.message.toLowerCase().includes('encrypt')) return true;
        }
      }

      // If pdfjsLib is available, test with slice
      const PJ = (typeof window !== 'undefined' && window.pdfjsLib) || null;
      if (PJ && typeof PJ.getDocument === 'function') {
        try {
          await PJ.getDocument({ data: ab.slice(0) }).promise;
          return false;
        } catch (e) {
          if (e && (e.name === 'PasswordException' || e.message?.includes('password'))) {
            return true;
          }
        }
      }

      return false;
    } catch {
      return false;
    }
  }

  // Validate password against document
  async function validatePDFPassword(fileOrBytes, password) {
    if (!password) {
      return { valid: false, error: 'Please enter a password.' };
    }

    let ab;
    try {
      if (fileOrBytes instanceof ArrayBuffer) {
        ab = fileOrBytes;
      } else if (fileOrBytes instanceof Uint8Array) {
        ab = fileOrBytes.buffer.slice(fileOrBytes.byteOffset, fileOrBytes.byteOffset + fileOrBytes.byteLength);
      } else if (fileOrBytes && typeof fileOrBytes.arrayBuffer === 'function') {
        ab = await fileOrBytes.arrayBuffer();
      } else {
        return { valid: false, error: 'Invalid document buffer.' };
      }
    } catch {
      return { valid: false, error: 'Could not read document data.' };
    }

    const P = (typeof window !== 'undefined' && window.PDFLib) || (typeof PDFLib !== 'undefined' ? PDFLib : null);
    const PJ = (typeof window !== 'undefined' && window.pdfjsLib) || null;

    // Try PDFLib + PDFLibEncrypt first
    if (P && typeof PDFLibEncrypt !== 'undefined') {
      try {
        PDFLibEncrypt.configure(P);
        const doc = await P.PDFDocument.load(ab, { ignoreEncryption: true });
        if (!doc.context.trailerInfo.Encrypt) {
          // Document was not encrypted
          return { valid: true, doc, unencrypted: true };
        }
        await PDFLibEncrypt.unlockInPlace(doc, password);
        return { valid: true, doc };
      } catch (err) {
        const msg = err.message || '';
        if (msg.includes('Wrong password')) {
          return { valid: false, error: 'Incorrect password. Please try again.' };
        }
        if (msg.includes('compressed object streams') || msg.includes('Unsupported')) {
          // If PDF.js is available, test if PDF.js can open it
          if (PJ) {
            try {
              const pdfDoc = await PJ.getDocument({ data: ab.slice(0), password }).promise;
              return { valid: true, pdfDoc, warning: msg };
            } catch (pje) {
              if (pje && pje.name === 'PasswordException') {
                return { valid: false, error: 'Incorrect password. Please try again.' };
              }
            }
          }
          return { valid: false, error: msg };
        }
        return { valid: false, error: msg || 'Password validation failed.' };
      }
    }

    // Otherwise use PDF.js
    if (PJ) {
      try {
        const pdfDoc = await PJ.getDocument({ data: ab.slice(0), password }).promise;
        return { valid: true, pdfDoc };
      } catch (e) {
        if (e && e.name === 'PasswordException') {
          return { valid: false, error: 'Incorrect password. Please try again.' };
        }
        return { valid: false, error: e.message || 'Validation failed.' };
      }
    }

    return { valid: false, error: 'No PDF processing library available.' };
  }

  // Ensure Password Dialog DOM exists
  function ensureModalDOM() {
    let modal = document.getElementById('pdfPasswordModal');
    if (modal) return modal;

    modal = document.createElement('div');
    modal.id = 'pdfPasswordModal';
    modal.className = 'pdf-password-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'pwdModalTitle');
    modal.setAttribute('aria-describedby', 'pwdModalDesc');

    modal.innerHTML = `
      <div class="pwd-card">
        <div class="pwd-header">
          <div class="pwd-icon-wrap" aria-hidden="true">
            <i class="fas fa-lock"></i>
          </div>
          <div>
            <h2 class="pwd-title" id="pwdModalTitle">Password-Protected PDF</h2>
            <p class="pwd-subtitle" id="pwdModalDesc">This document is password-protected. Enter its password to continue.</p>
          </div>
        </div>

        <div class="pwd-fileinfo" id="pwdFileInfo" style="display:none">
          <i class="fas fa-file-pdf" aria-hidden="true"></i>
          <div>
            <div class="pwd-filename" id="pwdFileName">document.pdf</div>
            <div class="pwd-filesize" id="pwdFileSize">0 MB</div>
          </div>
        </div>

        <form id="pwdForm" onsubmit="return false;">
          <div class="pwd-input-group">
            <label class="pwd-input-label" for="pwdInputField">Document Password</label>
            <div class="pwd-input-wrapper">
              <input id="pwdInputField" type="password" autocomplete="current-password" placeholder="Enter document password" spellcheck="false" required />
              <button type="button" class="pwd-toggle-btn" id="pwdToggleBtn" title="Show or hide password" aria-label="Show or hide password">
                <i class="fas fa-eye" id="pwdToggleIcon"></i>
              </button>
            </div>
          </div>

          <div class="pwd-error" id="pwdModalError" role="alert">
            <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
            <span id="pwdErrorText">Incorrect password.</span>
          </div>

          <div class="pwd-btns">
            <button type="button" class="btn btn-secondary" id="pwdCancelBtn">
              <i class="fas fa-times" aria-hidden="true"></i> Cancel
            </button>
            <button type="submit" class="btn btn-primary" id="pwdSubmitBtn">
              <span id="pwdSubmitSpinner" class="pwd-loading-spinner" style="display:none"></span>
              <span id="pwdSubmitText"><i class="fas fa-arrow-right" aria-hidden="true"></i> Continue</span>
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    // Show/Hide password toggle logic
    const toggleBtn = modal.querySelector('#pwdToggleBtn');
    const input = modal.querySelector('#pwdInputField');
    const icon = modal.querySelector('#pwdToggleIcon');

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPass = input.type === 'password';
      input.type = isPass ? 'text' : 'password';
      icon.className = isPass ? 'fas fa-eye-slash' : 'fas fa-eye';
      toggleBtn.title = isPass ? 'Hide password' : 'Show password';
    });

    return modal;
  }

  // Request password from user via Dialog
  function requestPDFPassword(options = {}) {
    return new Promise((resolve) => {
      const file = options.file;
      const cached = file ? getCachedPassword(file) : null;
      if (cached) {
        resolve(cached);
        return;
      }

      const modal = ensureModalDOM();
      const titleEl = modal.querySelector('#pwdModalTitle');
      const descEl = modal.querySelector('#pwdModalDesc');
      const fileInfoEl = modal.querySelector('#pwdFileInfo');
      const fileNameEl = modal.querySelector('#pwdFileName');
      const fileSizeEl = modal.querySelector('#pwdFileSize');
      const input = modal.querySelector('#pwdInputField');
      const errorEl = modal.querySelector('#pwdModalError');
      const errorText = modal.querySelector('#pwdErrorText');
      const submitBtn = modal.querySelector('#pwdSubmitBtn');
      const submitText = modal.querySelector('#pwdSubmitText');
      const spinner = modal.querySelector('#pwdSubmitSpinner');
      const cancelBtn = modal.querySelector('#pwdCancelBtn');
      const form = modal.querySelector('#pwdForm');
      const toggleIcon = modal.querySelector('#pwdToggleIcon');

      titleEl.textContent = options.title || 'Password-Protected PDF';
      descEl.textContent = options.description || 'This document is password-protected. Enter its password to continue.';

      if (file && file.name) {
        fileNameEl.textContent = file.name;
        const sizeMb = file.size ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : '';
        fileSizeEl.textContent = sizeMb;
        fileInfoEl.style.display = 'flex';
      } else {
        fileInfoEl.style.display = 'none';
      }

      // Reset state
      input.type = 'password';
      input.value = '';
      toggleIcon.className = 'fas fa-eye';
      errorEl.classList.remove('show');
      submitBtn.disabled = false;
      spinner.style.display = 'none';
      submitText.innerHTML = '<i class="fas fa-arrow-right" aria-hidden="true"></i> Continue';

      function hideModal() {
        modal.classList.remove('show');
        document.removeEventListener('keydown', handleKeyDown);
        cancelBtn.onclick = null;
        form.onsubmit = null;
      }

      function handleKeyDown(e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          hideModal();
          resolve(null);
        }
      }

      cancelBtn.onclick = () => {
        hideModal();
        resolve(null);
      };

      form.onsubmit = async (e) => {
        e.preventDefault();
        const pwd = input.value;
        if (!pwd) {
          errorText.textContent = 'Please enter a password.';
          errorEl.classList.add('show');
          input.focus();
          return;
        }

        // Show loading state
        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';
        submitText.textContent = 'Validating…';
        errorEl.classList.remove('show');

        try {
          if (typeof options.validate === 'function') {
            const res = await options.validate(pwd);
            if (!res.valid) {
              errorText.textContent = res.error || 'Incorrect password. Please try again.';
              errorEl.classList.add('show');
              submitBtn.disabled = false;
              spinner.style.display = 'none';
              submitText.innerHTML = '<i class="fas fa-arrow-right" aria-hidden="true"></i> Continue';
              input.value = '';
              input.focus();
              return;
            }
          } else if (file) {
            const res = await validatePDFPassword(file, pwd);
            if (!res.valid) {
              errorText.textContent = res.error || 'Incorrect password. Please try again.';
              errorEl.classList.add('show');
              submitBtn.disabled = false;
              spinner.style.display = 'none';
              submitText.innerHTML = '<i class="fas fa-arrow-right" aria-hidden="true"></i> Continue';
              input.value = '';
              input.focus();
              return;
            }
          }

          if (file) {
            setCachedPassword(file, pwd);
          }
          hideModal();
          resolve(pwd);
        } catch (err) {
          errorText.textContent = err.message || 'Validation error.';
          errorEl.classList.add('show');
          submitBtn.disabled = false;
          spinner.style.display = 'none';
          submitText.innerHTML = '<i class="fas fa-arrow-right" aria-hidden="true"></i> Continue';
          input.focus();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      modal.classList.add('show');
      setTimeout(() => input.focus(), 50);
    });
  }

  // High-level: ensures file is authenticated before operation
  async function ensureAuthenticated(file, options = {}) {
    const isEnc = await detectEncryptedPDF(file);
    if (!isEnc) {
      return { isEncrypted: false, password: '' };
    }

    const cached = getCachedPassword(file);
    if (cached) {
      return { isEncrypted: true, password: cached };
    }

    const password = await requestPDFPassword({ file, ...options });
    if (!password) {
      return { isEncrypted: true, cancelled: true };
    }

    return { isEncrypted: true, password };
  }

  // Open & Decrypt with PDFLib
  async function openPdfLib(fileOrBytes, options = {}) {
    let ab;
    if (fileOrBytes instanceof ArrayBuffer) ab = fileOrBytes;
    else if (fileOrBytes instanceof Uint8Array) ab = fileOrBytes.buffer.slice(fileOrBytes.byteOffset, fileOrBytes.byteOffset + fileOrBytes.byteLength);
    else if (fileOrBytes && typeof fileOrBytes.arrayBuffer === 'function') ab = await fileOrBytes.arrayBuffer();
    else throw new Error('Invalid file input for PDFLib.');

    const isEnc = await detectEncryptedPDF(ab);
    const P = (typeof window !== 'undefined' && window.PDFLib) || (typeof PDFLib !== 'undefined' ? PDFLib : null);
    if (!P) throw new Error('PDFLib is not loaded on this page.');

    PDFLibEncrypt.configure(P);

    if (!isEnc) {
      return await P.PDFDocument.load(ab, { ignoreEncryption: true });
    }

    let password = options.password || (fileOrBytes && getCachedPassword(fileOrBytes));
    if (!password) {
      password = await requestPDFPassword({ file: fileOrBytes, ...options });
      if (!password) throw new Error('Password required to open this document.');
    }

    const doc = await P.PDFDocument.load(ab, { ignoreEncryption: true });
    await PDFLibEncrypt.unlockInPlace(doc, password);
    return doc;
  }

  // Open with PDF.js
  async function openPdfJs(fileOrBytes, options = {}) {
    let ab;
    if (fileOrBytes instanceof ArrayBuffer) ab = fileOrBytes;
    else if (fileOrBytes instanceof Uint8Array) ab = fileOrBytes.buffer.slice(fileOrBytes.byteOffset, fileOrBytes.byteOffset + fileOrBytes.byteLength);
    else if (fileOrBytes && typeof fileOrBytes.arrayBuffer === 'function') ab = await fileOrBytes.arrayBuffer();
    else throw new Error('Invalid file input for PDF.js.');

    const isEnc = await detectEncryptedPDF(ab);
    const PJ = (typeof window !== 'undefined' && window.pdfjsLib) || null;
    if (!PJ) throw new Error('PDF.js is not loaded on this page.');

    if (!isEnc) {
      return await PJ.getDocument({ data: ab.slice(0) }).promise;
    }

    let password = options.password || (fileOrBytes && getCachedPassword(fileOrBytes));
    if (!password) {
      password = await requestPDFPassword({ file: fileOrBytes, ...options });
      if (!password) throw new Error('Password required to open this document.');
    }

    return await PJ.getDocument({ data: ab.slice(0), password }).promise;
  }

  // Unlock and produce genuine unencrypted PDF bytes
  async function unlockPdfBytes(fileOrBytes, password) {
    let ab;
    if (fileOrBytes instanceof ArrayBuffer) ab = fileOrBytes;
    else if (fileOrBytes instanceof Uint8Array) ab = fileOrBytes.buffer.slice(fileOrBytes.byteOffset, fileOrBytes.byteOffset + fileOrBytes.byteLength);
    else if (fileOrBytes && typeof fileOrBytes.arrayBuffer === 'function') ab = await fileOrBytes.arrayBuffer();
    else throw new Error('Invalid document input.');

    const P = (typeof window !== 'undefined' && window.PDFLib) || (typeof PDFLib !== 'undefined' ? PDFLib : null);
    if (!P) throw new Error('PDFLib is not loaded on this page.');

    PDFLibEncrypt.configure(P);
    const doc = await P.PDFDocument.load(ab, { ignoreEncryption: true });
    if (!doc.context.trailerInfo.Encrypt) {
      // Already plain
      return await doc.save({ useObjectStreams: false });
    }

    await PDFLibEncrypt.unlockInPlace(doc, password);
    const unlockedBytes = await doc.save({ useObjectStreams: false });

    // Strict assertion: verify resulting document loads cleanly without encryption
    const verifyDoc = await P.PDFDocument.load(unlockedBytes);
    if (verifyDoc.context.trailerInfo.Encrypt) {
      throw new Error('Encryption could not be completely removed from this document.');
    }

    return unlockedBytes;
  }

  // Protect document bytes with AES-256 (or RC4)
  async function lockPdfBytes(fileOrBytes, password, options = {}) {
    let bytes;
    if (fileOrBytes instanceof Uint8Array) bytes = fileOrBytes;
    else if (fileOrBytes instanceof ArrayBuffer) bytes = new Uint8Array(fileOrBytes);
    else if (fileOrBytes && typeof fileOrBytes.arrayBuffer === 'function') bytes = new Uint8Array(await fileOrBytes.arrayBuffer());
    else throw new Error('Invalid document input.');

    const P = (typeof window !== 'undefined' && window.PDFLib) || (typeof PDFLib !== 'undefined' ? PDFLib : null);
    if (!P) throw new Error('PDFLib is not loaded on this page.');

    PDFLibEncrypt.configure(P);
    return await PDFLibEncrypt.lock(bytes, password, options);
  }

  return {
    detectEncryptedPDF,
    isEncrypted: detectEncryptedPDF,
    requestPDFPassword,
    validatePDFPassword,
    openPdfLib,
    openPdfJs,
    ensureAuthenticated,
    unlockPdfBytes,
    lockPdfBytes,
    getCachedPassword,
    setCachedPassword,
    clearTemporaryPassword,
    clearAllTemporaryPasswords
  };
})();

if (typeof window !== 'undefined') {
  window.PDFPasswordManager = PDFPasswordManager;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PDFLibEncrypt, PDFPasswordManager };
}
