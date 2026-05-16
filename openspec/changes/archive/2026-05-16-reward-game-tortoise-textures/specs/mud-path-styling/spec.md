## Mud Path Styling

### Overview
The game path must be rendered with enhanced styling to simulate a mud trail, featuring a black border and brown fill to replace the current simple line rendering.

### Requirements

#### ADDED Requirements

##### Path SVG with Dual-Stroke Styling
**Requirement:** Game path is rendered as SVG `<path>` element with dual-stroke technique

**Details:**
- Outer stroke: black (#000000), 8px width, provides border effect
- Inner stroke: brown (#8B6F47 or similar earth tone), 6px width, provides fill
- Path element uses appropriate SVG path data (d attribute)
- Stroke-linecap and stroke-linejoin set to "round" for smooth appearance
- Path follows game board layout (can be straight line or curved)

**Scenarios:**
- WHEN game path is rendered, THEN SVG `<path>` element is present with both stroke colors
- WHEN path is inspected in DevTools, THEN outer stroke is black and inner stroke is brown
- WHEN game re-renders, THEN path strokes maintain consistent width and color

---

##### Path Styling Implementation
**Requirement:** Path styling is implemented in component template or CSS

**Details:**
- Stroke colors configurable (via CSS variables or component properties)
- Path styling applied consistently across all game paths
- Styling does not affect game logic or collision detection
- Performance optimized (no excessive re-renders)

**Scenarios:**
- WHEN component initializes, THEN path stroke configuration is applied
- WHEN path color CSS variable changes, THEN path appearance updates
- WHEN game logic updates path position, THEN styling remains consistent

---

##### Visual Mud-like Appearance
**Requirement:** Path appears as a mud trail with natural earth-tone coloring

**Details:**
- Brown color (#8B6F47, or configurable within earth-tone range #6B5D48 to #A68A6B)
- Sufficient contrast with game board background
- Border provides clear path definition
- Overall effect suggests texture and terrain

**Scenarios:**
- WHEN game is rendered on typical screen, THEN path is clearly visible against board background
- WHEN player focuses on path, THEN path appears as cohesive mud trail with defined edges
- WHEN colors are inspected, THEN brown fill and black border create naturalistic appearance

---

##### Path Rendering Performance
**Requirement:** Path rendering maintains game performance

**Details:**
- SVG path rendering does not introduce noticeable lag
- Path updates on game state changes do not cause jank
- Path element is efficient (single SVG element, not multiple segments)
- CSS rendering pipeline optimized (consider will-change if needed)

**Scenarios:**
- WHEN game runs on mid-range device, THEN frame rate remains consistent with path rendering
- WHEN path is updated (coordinates change), THEN re-render completes in < 16ms
- WHEN game has multiple visual elements (tortoise, obstacles, path), THEN combined rendering is smooth

#### MODIFIED Requirements
- Current simple line path rendering must be replaced with styled mud path

#### REMOVED Requirements
- Simple line rendering (single-stroke path) should be removed
- Any CSS that conflicts with dual-stroke styling should be cleaned up
