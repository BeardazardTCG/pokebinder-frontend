---
title: "Behind the Scenes: How PokéBinder Tracks Market Value"
date: "2025-06-13"
---

Ever wondered how PokéBinder gets its card values? It’s not just an API call — it’s a layered system designed for accuracy, relevance, and UK-based pricing.

---

### ✅ Step 1: Live eBay Scrapes
We scan eBay UK daily for both sold and active listings — gallery mode, max-per-page, UK sellers only. No fluff, no bundles, no PSA noise.

---

### ✅ Step 2: Outlier Filtering
We exclude listings that are clearly incorrect: damaged cards, mislabeled bundles, or £0 “sales” with fake quantities. We also flag spikes to avoid single-sale distortions.

---

### ✅ Step 3: Clean Value Calculation
We rank pricing sources:
1. eBay sold median (90-day window)
2. eBay active median
3. TCGPlayer fallback

Whichever is highest-confidence becomes the "Live Market Estimate."

---

### ✅ Step 4: Daily Tier Updates
Each card is scored for tier/frequency — rare cards get scraped daily, bulk commons less often. This keeps the system fast, accurate, and focused.

---

### Final Note:
PokéBinder isn’t just a database — it’s a living, evolving price tracker for real collectors. We're not trying to be TCGPlayer. We’re building what TCGPlayer left out.

