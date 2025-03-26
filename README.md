# Building Utility Network Applications with ArcGIS Maps SDK for JavaScript

Esri's next generation network technology, the utility network, is completely based on web services. This makes it ideally suited for building web applications. Are you ready to move beyond the desktop and develop browser-based applications for your user community? This session covers the growing utility network capabilities using the ArcGIS Maps SDK for JavaScript. We'll discuss editing, visualizing, and tracing utility networks in a web browser.

## Slides and recording

Most of the slides are made available at [Esri Events > Proceedings](https://www.esri.com/en-us/about/events/index/proceedings).

## Getting Started

1. Install the dependencies:

   ```sh
   npm install
   ```

2. Run the Vite dev server:

   ```sh
   npm run dev
   ```

3. Access the dev server by navigating to `http://localhost:5173/`.

## Configuration

Be sure to update the `id` property on the `arcgis-map` component in `index.html` with your own map ID:

```html
<arcgis-map item-id="map-id-goes-here"> </arcgis-map>
```
