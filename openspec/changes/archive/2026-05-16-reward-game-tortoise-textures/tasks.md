## 1. Asset Preparation

- [x] 1.1 Create tortoise PNG asset at `src/assets/reward-game/tortoise/tortoise.png` (64x64 or 128x128)
- [x] 1.2 Create obstacle PNG assets in `src/assets/reward-game/obstacles/` (at least 1 obstacle type)
- [x] 1.3 Verify asset files are optimized (< 20KB for tortoise, < 15KB per obstacle)
- [x] 1.4 Verify PNG files have transparent backgrounds and centered content

## 2. Tortoise Texture Service

- [x] 2.1 Create `TortoiseTextureService` at `src/app/services/tortoise-texture.service.ts`
- [x] 2.2 Implement `getTortoiseAssetUrl()` method returning tortoise asset path
- [x] 2.3 Implement `getObstacleAssetUrl(type)` method returning obstacle asset path
- [x] 2.4 Implement asset preloading logic in service initialization
- [x] 2.5 Add caching mechanism to store preloaded asset URLs
- [x] 2.6 Implement fallback behavior for missing obstacle types
- [x] 2.7 Register service as singleton in dependency injection container

## 3. Tortoise Component - Image Rendering

- [x] 3.1 Locate tortoise game component (likely in `src/app/components/reward-game/` or similar)
- [x] 3.2 Inject `TortoiseTextureService` into component
- [x] 3.3 Replace emoji tortoise (🐢) with `<img>` element in component template
- [x] 3.4 Bind image src to `getTortoiseAssetUrl()` result
- [x] 3.5 Set image width/height CSS properties (match asset size)
- [x] 3.6 Add meaningful alt text to image element

## 4. Tortoise Component - Rotation Logic

- [x] 4.1 Detect tortoise movement direction from game state or pathfinding logic
- [x] 4.2 Create direction-to-angle mapping in component (right: 0°, down: 90°, left: 180°, up: 270°)
- [x] 4.3 Add component property to track current tortoise direction
- [x] 4.4 Implement method to update direction based on game state changes
- [x] 4.5 Bind CSS `transform` property to rotation angle: `[style.transform]="'rotate(' + rotationAngle + 'deg')"`
- [x] 4.6 Test rotation at all 4 cardinal directions
- [x] 4.7 Verify rotation is smooth and performant (no jank)

## 5. Obstacle Component - Image Rendering

- [x] 5.1 Locate obstacle rendering logic in tortoise game component
- [x] 5.2 Inject `TortoiseTextureService` into component (if not already done)
- [x] 5.3 Replace emoji/dot obstacles with `<img>` elements for each obstacle instance
- [x] 5.4 Bind image src to `getObstacleAssetUrl(obstacleType)` result
- [x] 5.5 Set image width/height CSS properties for obstacles
- [x] 5.6 Add meaningful alt text to each obstacle image
- [x] 5.7 Verify obstacle images are positioned correctly on game board

## 6. Path Styling - Dual-Stroke Implementation

- [x] 6.1 Locate path rendering logic in game component (likely SVG `<path>` element)
- [x] 6.2 Add outer stroke to path: black (#000000), width 8px, stroke-linecap="round"
- [x] 6.3 Add inner stroke to path: brown (#8B6F47), width 6px, stroke-linecap="round"
- [x] 6.4 Verify path rendering uses SVG namespace and correct element structure
- [x] 6.5 Test path visibility and visual appearance on game board background
- [x] 6.6 Verify path follows correct game board layout (straight or curved)
- [x] 6.7 Ensure stroke styling does not interfere with collision detection

## 7. CSS & Styling Updates

- [x] 7.1 Update component CSS to size and position tortoise image correctly
- [x] 7.2 Update component CSS to size and position obstacle images correctly
- [x] 7.3 Add CSS variables for path colors (--path-border: #000000, --path-fill: #8B6F47)
- [x] 7.4 Clean up any old emoji/dot styling rules no longer needed
- [ ] 7.5 Verify responsive design works on multiple screen sizes

## 8. Integration Testing

- [x] 8.1 Test tortoise displays with correct PNG asset on game start
- [x] 8.2 Test tortoise rotates correctly when moving in each direction
- [x] 8.3 Test obstacles display with correct PNG assets
- [x] 8.4 Test path renders with mud-style dual-stroke styling
- [x] 8.5 Test game logic still works (movement, collision detection, etc.)
- [ ] 8.6 Test assets load correctly on slower network connections
- [ ] 8.7 Test visual rendering on multiple browsers (Chrome, Firefox, Safari)
- [ ] 8.8 Test visual rendering on mobile devices

## 9. Accessibility & Performance

- [x] 9.1 Verify alt text on all images is meaningful and describes asset
- [x] 9.2 Verify color contrast of path styling meets WCAG guidelines
- [ ] 9.3 Profile rendering performance with all assets loaded
- [ ] 9.4 Verify frame rate remains smooth (60 FPS target) on mid-range devices
- [ ] 9.5 Confirm bundle size increase is acceptable (< 150KB total for all assets)

## 10. Documentation & Cleanup

- [x] 10.1 Add code comments to tortoise rotation logic
- [x] 10.2 Add code comments to texture service asset loading
- [ ] 10.3 Update component documentation to reflect PNG-based rendering
- [x] 10.4 Remove any debug code or temporary assets
- [x] 10.5 Verify all console errors/warnings related to assets are resolved
