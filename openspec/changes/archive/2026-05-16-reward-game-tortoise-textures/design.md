## Context

The tortoise reward game currently renders all visual elements using simple emojis and dots (e.g., 🐢 for tortoise, . for obstacles, a simple line for the path). This minimalist approach works functionally but lacks visual polish. The proposal calls for replacing these with PNG-based textures to improve player engagement and visual appeal.

**Current Architecture:**
- Game board rendered as canvas or SVG with text/emoji overlays
- Tortoise position updated as player types, direction hardcoded or not visualized
- Obstacles placed at fixed positions as emoji/dots
- Path rendered as a simple line or series of points
- No asset management system for texture loading

**Constraints:**
- Must maintain Angular component architecture
- Must not degrade performance for mid-range devices
- Assets must be web-optimized (PNG compression, reasonable file sizes)
- Must support 4 cardinal directions for tortoise (up, down, left, right)

## Goals / Non-Goals

**Goals:**
- Replace emoji/dot rendering with PNG textures for tortoise, obstacles, and path
- Implement tortoise rotation based on movement direction (0°, 90°, 180°, 270°)
- Create styled mud path with black borders and brown fill
- Establish asset loading and caching mechanism
- Maintain game logic and mechanics (no change to movement or collision detection)

**Non-Goals:**
- Animation of obstacles or path (static rendering)
- Complex sprite sheets or frame-based animation
- 3D rendering or WebGL
- Asset generation tools (textures created externally, included in repo)
- Changes to game physics or difficulty

## Decisions

### 1. Asset Storage and Loading Strategy
**Decision:** Store PNG textures in `src/assets/reward-game/` with subfolder structure for organization. Load via Angular's asset pipeline using relative URLs.

**Rationale:** 
- Angular's built-in asset handling ensures proper bundling and caching
- Relative URLs work consistently across development and production
- Subfolder structure (`tortoise/`, `obstacles/`, `path/`) improves maintainability

**Alternatives Considered:**
- SVG assets instead of PNG: Would require embedding complex graphics; PNG is more web-standard and performant
- Dynamic asset CDN: Adds complexity and external dependency; bundled assets are simpler for a learning app

### 2. Tortoise Rotation Implementation
**Decision:** Use CSS `transform: rotate()` on the tortoise image element, keyed to movement direction. Rotation angles: 0° (right/east), 90° (down/south), 180° (left/west), 270° (up/north).

**Rationale:**
- CSS transforms are hardware-accelerated and performant
- No need for separate directional sprite sheets
- Single tortoise PNG asset can face all 4 directions
- Easy to integrate into Angular template binding

**Alternatives Considered:**
- Separate PNG for each direction: 4x asset size, no animation smoothness gain
- SVG rotation: More overhead than CSS transforms
- Canvas rotation: Overkill for static image rotation

### 3. Path Rendering Enhancement
**Decision:** Render path as SVG `<path>` element with dual strokes: outer stroke (black, 8px) for border, inner stroke (brown, 6px) for fill. Replace simple line drawing with this layered approach.

**Rationale:**
- SVG is scalable and resolution-independent
- Dual-stroke technique creates clean bordered effect without adding elements
- Easy to update in existing game rendering logic
- Maintains vector quality on all screen sizes

**Alternatives Considered:**
- Canvas-based path with manually drawn borders: More code, harder to maintain
- PNG background image for path: Loss of flexibility for dynamic paths
- CSS-based path styling: Not applicable to SVG paths

### 4. Asset Management and Caching
**Decision:** Create `TortoiseTextureService` to preload and cache texture assets on game initialization. Service provides methods to get tortoise, obstacle, and path assets.

**Rationale:**
- Centralized asset management prevents repeated file system lookups
- Preloading ensures textures are ready before rendering starts
- Service-based approach aligns with Angular dependency injection pattern
- Cache reduces render-time resource loading

**Alternatives Considered:**
- Lazy loading textures on first use: Could cause render delays
- Global state object: Less testable than service
- Direct component asset references: Scattered asset paths, hard to maintain

### 5. Tortoise Component Update
**Decision:** Modify tortoise game component to:
- Detect movement direction from game state or pathfinding logic
- Apply `[style.transform]` binding with rotation angle based on direction
- Use `<img>` element instead of emoji for tortoise display

**Rationale:**
- Keeps logic encapsulated in component
- Template binding makes direction-to-rotation mapping clear
- Minimal changes to existing game loop logic

**Alternatives Considered:**
- NgClass with direction-specific CSS classes: Extra CSS files, less direct
- Manual DOM manipulation: Harder to test and maintain

## Risks / Trade-offs

**[Risk] Asset loading delay on game start**
→ Mitigation: Preload assets in service during game initialization, use loading spinner if needed. PNG compression reduces file size impact.

**[Risk] Tortoise rotation may cause visual artifacts if asset has asymmetric padding**
→ Mitigation: Design tortoise PNG with centered content and equal padding. Test rotation at all 4 angles during QA.

**[Risk] SVG path rendering may be slower than canvas for complex paths**
→ Mitigation: Profile rendering performance. If bottleneck, consider caching path as PNG for static games.

**[Risk] Older browsers may not support CSS transforms efficiently**
→ Mitigation: Add fallback styles and test on target browser matrix. CSS transforms have >95% modern browser support.

**[Risk] PNG file size increases bundle size**
→ Mitigation: Optimize PNGs using compression tools (TinyPNG, ImageOptim). Estimate ~50-100KB for all assets combined, acceptable for web app.

## Migration Plan

1. **Phase 1 - Asset Integration:**
   - Create `TortoiseTextureService` for asset loading and caching
   - Add PNG assets to `src/assets/reward-game/` directory

2. **Phase 2 - Tortoise Rendering:**
   - Update tortoise game component to use `<img>` element
   - Implement direction detection and rotation binding
   - Test rotation at all 4 angles

3. **Phase 3 - Path Rendering:**
   - Update path rendering logic to use dual-stroke SVG approach
   - Replace simple line drawing with styled mud path

4. **Phase 4 - Obstacle Rendering:**
   - Update obstacle rendering to use PNG textures
   - Load obstacle assets via `TortoiseTextureService`

5. **Testing & Rollback:**
   - Verify visual rendering matches design
   - Test on multiple screen sizes and browsers
   - Rollback: If issues occur, revert to emoji/dot rendering in component templates

## Open Questions

- What is the exact tortoise PNG asset size and orientation when created? (Needed to finalize rotation angles)
- Are there specific color codes for the mud path brown fill? (Default to natural earth brown, e.g., #8B6F47)
- Should path styling apply to all game paths or only the tortoise game? (Assume tortoise game only; can generalize later)
- Any accessibility requirements for texture-based rendering? (Add alt text to images, ensure sufficient color contrast)
