// The one knob for "does this machine want a game, or a slideshow." Nothing on this page can ask
// the GPU what it is before the first frame, so the default assumes the worse case — old integrated
// graphics, not a gaming rig — and trades looks for speed. Fast and ugly beats slow: a city that
// runs at 60fps with flat lighting is a game; a city that runs at 1fps with soft shadows is a slide.
//
// Flip to false on hardware known to take the full pipeline (shadows, bloom, MSAA, 1.5x pixel
// ratio, the full ambient crowd). There is no auto-detection — WebGL reports the renderer string,
// not how fast it actually is, and the only honest measurement is the frame that already ran slow.
export const WEAK_MACHINE = true

// Buildings and townhouse rows are both chunked into spatial cells (src/render/scene.js,
// buildBuildings and buildTownhouseFrontages) instead of one city-spanning mesh each — partly so
// every chunk's own bounding sphere lets Three's ordinary frustum culling work at all (a mesh the
// size of the whole city is "in view" from everywhere), and partly so distance can hide chunks
// outright. Measured: buildings were never the cost (~110k triangles, city-wide) — townhouse
// terraces were, at over 10M triangles scene-wide before any culling. Infinity keeps every chunk
// visible — the old behaviour, just chunked — on hardware that can take the whole city in one frame.
export const CHUNK_CULL_RADIUS = WEAK_MACHINE ? 340 : Infinity
