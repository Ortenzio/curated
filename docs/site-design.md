# Site Design

- Maintain homepage scroll position when navigating back
- View transitions for entire page and selected work
- Meta info generation on images
- Zoom and pan on high quality images
- Scroll navigation on individual post pages
- /tags/ route
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


### Copy canvas

```
setTimeout(() => {
document.querySelector('canvas').toBlob(async (blob) => {
    try {
      const item = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([item]);
      console.log('Canvas image copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }, 'image/png')
}, 1000)
```


## CSS Transitions

```
html {
  --vt-anim-multiplier: 1;
}

::view-transition-group(*) {
  animation-duration: calc(0.25s * var(--vt-anim-multiplier));
}

::view-transition-old(root) {
  animation: calc(var(--vt-anim-multiplier) * 90ms) cubic-bezier(0.4, 0, 1, 1)
      both fade-out,
    calc(var(--vt-anim-multiplier) * 300ms) cubic-bezier(0.4, 0, 0.2, 1) both
      slide-to-left;
}

::view-transition-new(root) {
  animation: calc(var(--vt-anim-multiplier) * 210ms) cubic-bezier(0, 0, 0.2, 1)
      calc(var(--vt-anim-multiplier) * 90ms) both fade-in,
    calc(var(--vt-anim-multiplier) * 300ms) cubic-bezier(0.4, 0, 0.2, 1) both
      slide-from-right;
}

::view-transition-old(art-img),
::view-transition-new(art-img) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-image-pair(art-img) {
  isolation: none;
}


@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes slide-from-right {
  from {
    transform: translateX(30px);
  }
}

@keyframes slide-to-left {
  to {
    transform: translateX(-30px);
  }
}

```