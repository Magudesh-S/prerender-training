1. Choose visible text

Open the website normally.

Wait a few seconds until it finishes loading.

Pick one short sentence or phrase that is clearly visible on the page.

Do not choose common words like “Home” or “Login.”

Copy the exact text. This is your evidence_sentence.

2. Check the page source
Open view-source: followed by the website URL.

Search for the exact evidence sentence.

If the sentence is not found
Check the rest of the source code.

If it mostly contains empty <div> elements, scripts, or a loading message, classify the website as CSR.

This means JavaScript creates the page content in the browser.

If the sentence is found
Search for three or four other pieces of visible content.

If almost everything visible is already in the source, classify it as SSR.

If only some content is in the source and other sections load later, classify it as Hybrid.

3. Guess the framework
Look in the page source for signs of a framework:

__next → Next.js

id="root" → likely React

id="app" → likely Vue or Nuxt

ng-version → Angular

__NUXT__ → Nuxt

astro-island → Astro

data-svelte-h → SvelteKit

You can also check the browser’s Network tab for JavaScript files such as react-dom, _next, vue, nuxt, or angular.

If you find no clear sign, write unclear.

4. Record these details
For every website, write:

url

classification

framework_guess

evidence_sentence

notes