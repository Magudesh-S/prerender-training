
| Site | Default curl UA | Googlebot UA | GPTBot UA |
|---|---|---|---|
| **Flipkart** (flipkart.com) | `403 Forbidden` — `x-captcha-validate: true`, Flipkart's own CORS headers present | `403 Forbidden` — identical response to default UA | `403 Forbidden` — identical response to default UA |
| **Nykaa** (nykaa.com) | `403 Forbidden` — served by Akamai (`ak-ray` header), `cache-control: no-store`, generic 367-byte HTML block page | Connection reset — `curl: (92) HTTP/2 stream 0 was not closed cleanly: PROTOCOL_ERROR` (no status code returned at all) | Connection reset — `curl: (92) ... INTERNAL_ERROR` (no status code returned) |
| **Zoho** (zoho.com) | `200 OK` — full 16,381-byte page served, `server: ZGS` | `400 Bad Request` — tiny 122-byte error page | `200 OK` — same full page as default UA |
| **Swiggy** (swiggy.com) | `202` — `x-amzn-waf-action: challenge` (AWS WAF challenge, served via CloudFront) | Connection reset — `curl: (92) ... PROTOCOL_ERROR` | `202` — same WAF challenge as default UA |
| **PhonePe** (phonepe.com) | `200 OK` — served by Cloudflare, `cf-cache-status: HIT` | Connection reset — `curl: (92) ... PROTOCOL_ERROR` | `200 OK` — same page, `cf-cache-status: HIT` |
