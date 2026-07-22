# Site Design

- Justified gallery layout, not masonry
- Maintain homepage scroll position when navigating back
- View transitions for entire page and selected work
- Vite plugin for re-encoding images 
- Meta info generation on images
- Static site generation
- Zoom and pan on high quality images
- Scroll navigation on individual post pages
- /tags/ route
- Speculative loading
- Add manifest.json
- Cache image transformations

- https://web.dev/articles/add-manifest?utm_source=devtools&utm_campaign=stable
- https://icompendium.com/accounts/guide/justified
- https://image-gallery.nuxt.dev/
- https://github.com/Flosciante/nuxt-image-gallery
- https://tachyons.io/components/pages/swiss-cover-five-columns/index.html
- https://tachyons.io/components/lists/slab-stat-small/index.html
- https://tachyons.io/components/layout/full-bleed-5x7/index.html


Search Wikidata for the artist’s full name:
https://www.wikidata.org/w/api.php?action=wbsearchentities&search=Albert%20Curtis%20Williamson&language=en&type=item&limit=10&format=json&origin=*
Choose the correct QID using the label, description, aliases, and dates.
Fetch that entity:
https://www.wikidata.org/wiki/Special:EntityData/QID.json
Check, in roughly this order:
the commonswiki sitelink;
property P373, the Commons category;
optionally P1472, the Commons Creator page.