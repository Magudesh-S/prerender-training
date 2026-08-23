


## Comparative Data Summary

| URL | Day 4 Manual (Raw) | Day 8 Raw Words | Day 8 Rendered Words | Day 8 Score | Diagnostic Findings |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`https://www.amazon.com/`** | 0 | 0 | 21 | 0.00 | Anti-bot block on raw fetch; rendered DOM captured minimal fallback shell. |
| **`https://www.zoho.com/`** | 490 | 490 | 2,568 | 0.19 | Raw server response captured introductory marketing text, but heavy client-side hydration expanded the full DOM. |
| **`https://en.wikipedia.org/wiki/Web_scraping`** | 4,548 | 4,548 | 4,581 | 0.99 | Perfect alignment; pristine static server-rendered content with zero hydration gap. |

---

## Detailed Investigation & Discrepancies

### 1. Amazon (`https://www.amazon.com/`)
* **Comparison:** Both Day 4 and Day 8 raw checks returned `0` words. However, Day 8 Playwright rendering recorded `21` words.
* **Explanation:** Amazon employs strict Web Application Firewalls (WAF) and anti-bot protection. The raw `fetch()` request was served a challenge page or empty shell rather than actual content. Even the rendered browser view struggled to fully load standard product text without human interaction fingerprints, making it a classic bot-block artifact rather than a true representation of human viewing.

### 2. Zoho (`https://www.zoho.com/`)
* **Comparison:** The raw word count matched identically at `490` words across both exercises, while the rendered count reached `2,568` words, resulting in a low score of `0.19`.
* **Explanation:** This is a textbook **hybrid application**. The initial server response (raw HTML) provides basic metadata and introductory copy (`490` words), but the rich interactive application components, navigation menus, and footers require client-side JavaScript execution, leading to the substantial jump in rendered words.

### 3. Wikipedia (`https://en.wikipedia.org/wiki/Web_scraping`)
* **Comparison:** Day 4 recorded `4,548` words, and Day 8 recorded `4,548` raw words with `4,581` rendered words, yielding a score of `0.99`.
* **Explanation:** Complete alignment. Wikipedia serves entirely server-rendered HTML containing the full article text immediately. The minor 33-word difference between raw and rendered is negligible (attributable to dynamic browser features or minor timestamp scripts), confirming that the instrument is working with extreme precision for static pages.