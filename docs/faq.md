# Master FAQ (Frequently Asked Questions)

---

## General Questions

#### Q: Is PDFHub truly 100% free?
**A:** Yes. All 33 PDF utilities are free forever. There are no subscriptions, no tiered paywalls, no trial periods, and no watermarks placed on your documents.

#### Q: Do I need to create an account?
**A:** No. PDFHub requires zero registration, no email address, and no authentication. You open the site and use any tool immediately.

#### Q: Who created PDFHub?
**A:** PDFHub was created and engineered by developer **@officialhazim42** ([github.com/officialhazim42](https://github.com/officialhazim42)).

---

## Privacy & Security

#### Q: Are my files uploaded to any server?
**A:** No. For 31 out of 33 tools, your files are processed entirely in your web browser memory. No files are transmitted to any remote server or cloud bucket. The only exceptions are OCR PDF (which downloads a static language model from CDN once) and Translate PDF (which transmits text chunks to a translation API).

#### Q: Does PDFHub store my document history or passwords?
**A:** No. PDFHub stores zero document content and zero passwords. Local browser storage is used exclusively to store UI preferences (dark/light theme, starred favorites, and recent tool navigation shortcuts).

#### Q: Can PDFHub decrypt a password-protected PDF if I forgot the password?
**A:** No. The Unlock PDF tool is designed for authorized document owners to remove passwords they already know. It does not perform illegal brute-force password cracking.

---

## Technical & Formats

#### Q: What is the maximum file size I can process?
**A:** Because PDFHub processes files in client RAM, limits depend on your device's memory. Documents up to 100 MB or ~500 pages generally process smoothly. For very large files, splitting them into smaller sections first is recommended.

#### Q: Can I use PDFHub on my mobile phone?
**A:** Yes. PDFHub is fully responsive and supports touch gestures across Android and iOS devices. You can also install it as a PWA on your home screen.

#### Q: Can I use PDFHub offline?
**A:** Yes. Once you have visited PDFHub, the Service Worker caches the application shell. You can open and use client-side tools even without an active internet connection.
