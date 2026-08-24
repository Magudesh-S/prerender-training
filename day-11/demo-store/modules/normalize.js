/**
 * Normalization Policy:
 * 1. Hostname Lowercasing: Converts the domain name to lowercase to prevent case-sensitivity splits.
 * 2. Fragment Removal: Strips out hash fragments (#...) since they are never sent to the server.
 * 3. Tracking Parameter Stripping: Removes common noise/analytics parameters (utm_*, gclid, fbclid).
 * 4. Query Parameter Sorting: Alphabetically sorts remaining query parameters to ensure deterministic collision (e.g., ?a=1&b=2 === ?b=2&a=1).
 * 5. Trailing-Slash Policy: Enforces a strict trailing slash removal on pathless base URLs (e.g., example.com/ -> example.com) to guarantee uniform entry keys.
 */

export function normalizeUrl(raw) {
    try {
        const parsed = new URL(raw);

        // 1. Lowercase hostname
        parsed.hostname = parsed.hostname.toLowerCase();

        // 2. Remove fragment
        parsed.hash = '';

        // 3. Strip tracking parameters
        const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
        for (const param of trackingParams) {
            parsed.searchParams.delete(param);
        }

        // 4. Sort remaining query parameters alphabetically
        parsed.searchParams.sort();

        // 5. Trailing-slash policy: remove trailing slash if path is just '/'
        let finalString = parsed.toString();
        if (parsed.pathname === '/' && !raw.endsWith('//') && parsed.search === '' && parsed.hash === '') {
            finalString = finalString.replace(/\/$/, '');
        }

        return finalString;
    } catch (err) {
        // Fallback for malformed URLs
        return raw.trim();
    }
}