# Restore Guide — Hidden Sections

These sections were hidden in **October 2026** for a competition submission.
Restore them in **December 2026** (or whenever competition results are in).

All hidden content is preserved in HTML comments inside `index.html`.
Just search for each label below, uncomment the block, and remove the
temporary replacement text where noted.

---

## How to restore

For each item below:
1. Open `index.html`
2. Search (Cmd+F) for the **Search label**
3. Remove the `<!--` opener and `-->` closer around the original block
4. Delete the temporary replacement line (if one was added)
5. After all changes: commit to `alpha` → merge to `main` → merge to `gh-pages`

---

## Items to restore

### 1. Pricing nav link
**Search label:** `PRICING NAV HIDDEN TEMPORARILY`  
**Location:** Inside `<nav class="nav-links">` (~line 2320)  
**What to restore:**
```html
<a href="#pricing" class="nav-link">Pricing</a>
```

---

### 2. Full Pricing section
**Search label:** `PRICING SECTION HIDDEN TEMPORARILY`  
**Location:** Just before the Founder Story section (~line 3139)  
**What to restore:** The entire `<section class="pricing-section" id="pricing">` block  
No replacement text was added — just uncomment the block.

---

### 3. FAQ — "How much does it cost?"
**Search label:** `FAQ COST QUESTION HIDDEN TEMPORARILY`  
**Location:** Inside the `<div class="faq-list">` block (~line 3224)  
**What to restore:**
```html
<div class="faq-item">
  <button class="faq-q" onclick="toggleFaq(this)">How much does it cost?<span class="faq-chevron">+</span></button>
  <div class="faq-a">Plans start at $4.99/month, every plan includes a 7-day free trial with no credit card required. Most users find the Premium plan ($9.99/mo) covers everything they need, including Family Mode for the whole household.</div>
</div>
```

---

### 4. Hero sub-line — "2 months of Premium+ free"
**Search label:** `HERO BETA SUB-LINE HIDDEN TEMPORARILY`  
**Location:** Below the "Request Private Beta Access" hero button (~line 2387)  
**What to restore:**
```html
<span class="btn-beta-sub reveal reveal-delay-2">Limited spots · Includes 2 months of Premium+ free</span>
```

---

### 5. FAQ — "When can I get access?"
**Search label:** `FAQ ACCESS QUESTION HIDDEN TEMPORARILY`  
**Location:** Inside the `<div class="faq-list">` block, after the cost question (~line 3231)  
**What to restore:**
```html
<div class="faq-item">
  <button class="faq-q" onclick="toggleFaq(this)">When can I get access?<span class="faq-chevron">+</span></button>
  <div class="faq-a">Iddu is currently in private beta on TestFlight for iOS. Request access using the form below — selected early members get 2 months of Premium+ free as a thank-you for helping shape the product.</div>
</div>
```

---

### 6. Request Private Beta card description
**Search label:** `BETA CARD DESC HIDDEN TEMPORARILY`  
**Location:** Inside the `<!-- LEFT: Beta Access -->` card in the CTA section (~line 3253)  
**What to restore:** Uncomment the original `<p>` and **delete** the temporary replacement line below it:
```html
<!-- DELETE THIS LINE when restoring: -->
<p class="cta-card-desc">Iddu is in private beta on TestFlight. Join the waitlist for early access.</p>
```
**Restore to:**
```html
<p class="cta-card-desc">Iddu is in private beta on TestFlight. Selected early members get <strong style="color:#7bc67e;">2 months of Premium+ free</strong> and a direct line to shape the product.</p>
```

---

### 7. Footer — "Iddu Technologies LLC"
**Search label:** `FOOTER HIDDEN TEMPORARILY`  
**Location:** Bottom of `index.html`, just before `</body>` (~line 3526)  
**What to restore:** Uncomment the entire `<footer>` block:
```html
<footer>
  <div class="footer-links">
    <a href="/privacy.html">Privacy Policy</a>
    <a href="/terms.html">Terms of Service</a>
    <a href="mailto:admin@iddu.app">Contact Us</a>
  </div>
  <p class="copyright">&copy;
    <script>document.write(new Date().getFullYear())</script> Iddu Technologies LLC. All rights reserved.
  </p>
</footer>
```

---

### 8. Privacy Policy — "Last Updated" date
**File:** `privacy.html` line ~137  
**What to restore:**
```html
<p class="last-updated">Last Updated: March 7, 2026</p>
```
*(Currently shows October 17, 2026 — revert to March 7, 2026)*

---

### 9. Terms of Service — "Last Updated" date
**File:** `terms.html` line ~138  
**What to restore:**
```html
<p class="last-updated">Last Updated: March 7, 2026</p>
```
*(Currently shows October 17, 2026 — revert to March 7, 2026)*

---

## Branch push order (always follow this)

```
git add index.html
git commit -m "restore: re-enable pricing and premium+ sections"
git push origin alpha
git checkout main && git merge alpha --no-edit && git push origin main
git checkout gh-pages && git merge main --no-edit && git push origin gh-pages
git checkout alpha
```
