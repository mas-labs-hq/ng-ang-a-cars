NG'ANG'A CARS! - FINAL BUILD (v4)
MortApps Studios x Super Z
════════════════════════════════════════════════════════════════

WHAT'S IN THIS FOLDER - a complete, self-contained website.
Replace your ENTIRE project folder with these files (or drop them
into a fresh empty folder). Do not mix old files in - this build
ships its own icons/, Brands/ and images-cars/, so everything it
references is right here:

  index.html          the whole site
  styles.css          all styling (dark + light themes)
  js/cars-data.js     8 cars + NGANGA_CONFIG (phone, email, formspree)
  js/main.js          showroom, compare, forms, marquee
  js/nganga-ai.js     the local AI assistant
  icons/              favicons + logos + og-image (WITH extensions
                      PLUS extensionless copies matching your original
                      filenames: favicon, main.logo, apple-touch-icon...)
  favicon.ico         also placed at the site ROOT (browsers ask for
                      /favicon.ico by default)
  Brands/             6 real brand logos for the marquee
  images-cars/        40 optimised car photos (progressive JPEG)

Test it: open index.html with VS Code Live Server (or any static
host). No build step, no dependencies, no backend required.


WHAT'S NEW IN v4
-----------------
1. YOUR REAL LOGO, EVERYWHERE.
   The loader, navbar and footer now show your actual brand badge
   (the gold "N" ring). All favicons and icons are generated from
   that same logo. As a guarantee, the loading-screen logo AND the
   favicon are EMBEDDED directly inside index.html as data URIs,
   so they render even with no server at all (double-click
   index.html from disk and they still appear).

2. FAVICON, TRIPLE-LOCKED.
   Layer 1: data-URI icon embedded in the HTML (cannot 404).
   Layer 2: root favicon.ico + full icons/ set with extensions.
   Layer 3: extensionless copies matching your original file
   names, so old references resolve too.
   If your browser still shows no icon, it is CACHED: browsers
   cache favicon failures stubbornly. Hard-refresh with
   Ctrl+Shift+R, or open the site in a private/incognito window,
   or visit  yoursite/favicon.ico  directly once, then reload.

3. SMOOTH ON PHONES.
   - Backdrop blur effects switch OFF on phones (the number one
     cause of scroll lag). Glass surfaces become near-solid.
   - Below-the-fold sections skip rendering until needed
     (content-visibility), so first paint is fast.
   - The hero photo and navbar logo start downloading before
     anything else (preload + fetchpriority).
   - Every image decodes off the main thread and fades in
     smoothly; offscreen images wait (lazy loading).
   - Images recompressed (progressive JPEG), Google Fonts trimmed.

4. NO MORE AI-LOOKING DASHES.
   Every long dash in the site copy, car descriptions and AI
   chat replies was rewritten into natural punctuation.


STILL WORKING FROM v3
----------------------
- Contact blocks + test-drive form fully adaptive on phones
  (minmax(0,1fr) grids; the old blowout bug is gone).
- Send button asks: WhatsApp or Email (mailto works out of the
  box; paste a Formspree endpoint into js/cars-data.js ->
  NGANGA_CONFIG.formspree for silent background email).
- Compare mode never blocks swiping; phones get the slim
  one-row compare bar; the compare table shows BOTH cars.
- Brand marquee: seamless infinite loop, pauses on hover.


SOCIAL SHARING (WhatsApp / Facebook / X preview card)
-----------------------------------------------------
After you deploy, open index.html and replace the 4 occurrences
of  https://YOUR-DOMAIN.com  with your real domain. The preview
image (icons/og-image.png, 1200x630, ~127 KB) is built from your
real logo. Note: previews only work on a live public URL - they
never show on localhost.
