# Vortex Tier List V15

## Custom images for every mode
Open `app.js` and edit the `ICON_URLS` object at the top:

```js
const ICON_URLS = {
  overall: "https://your-direct-image-url/overall.png",
  vanilla: "https://your-direct-image-url/vanilla.png",
  uhc: "https://your-direct-image-url/uhc.png",
  pot: "https://your-direct-image-url/pot.png",
  nethop: "https://your-direct-image-url/nethop.png",
  smp: "https://your-direct-image-url/smp.png",
  sword: "https://your-direct-image-url/sword.png",
  axe: "https://your-direct-image-url/axe.png",
  mace: "https://your-direct-image-url/mace.png"
};
```

The same URL is used everywhere that mode appears: the mode navigation tabs and the Overall player ranking category icons. Images stay inside fixed-size boxes and use `object-fit: contain`, so different image dimensions do not break the layout.

Use a **direct image URL** ending in `.png`, `.jpg`, `.jpeg`, `.webp`, or a host that returns an image directly. A normal webpage/share URL may not display.
