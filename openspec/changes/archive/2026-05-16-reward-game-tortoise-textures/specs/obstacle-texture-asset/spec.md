## Obstacle Texture Asset

### Overview
Obstacles in the tortoise game must be rendered using PNG textures instead of emoji/dots, providing a more visually appealing and cohesive game experience.

### Requirements

#### ADDED Requirements

##### Obstacle PNG Assets Exist
**Requirement:** Obstacle PNG texture files exist at `src/assets/reward-game/obstacles/`

**Details:**
- File format: PNG with transparency
- Multiple obstacle types supported (at minimum 1 generic obstacle asset)
- Recommended size: 48x48 or 64x64 pixels
- Asset should be centered with clear visual distinction
- Each obstacle file named descriptively (e.g., `rock.png`, `log.png`, `cactus.png`)

**Scenarios:**
- WHEN the game initializes, THEN at least one obstacle PNG is present in the asset directory
- WHEN the asset is bundled, THEN each obstacle file is < 15KB
- WHEN the game needs to render obstacles, THEN all obstacle types have corresponding PNG files

---

##### Obstacle Image Rendering
**Requirement:** Obstacles are rendered as `<img>` elements instead of emoji/dots

**Details:**
- Each obstacle displayed as `<img>` element with appropriate src
- Image positioned at obstacle game coordinates
- Image has appropriate dimensions (width/height CSS properties)
- Alt text provided for accessibility
- Multiple obstacle instances handled (one image per obstacle)

**Scenarios:**
- WHEN game renders obstacles, THEN each obstacle is an `<img>` element
- WHEN game board displays, THEN obstacle images are at correct positions
- WHEN screen reader is used, THEN each obstacle has meaningful alt text
- WHEN multiple obstacles exist, THEN each has its own image element

---

##### Obstacle Texture Service Integration
**Requirement:** Game uses `TortoiseTextureService` to load obstacle assets

**Details:**
- Service provides `getObstacleAssetUrl(type)` method returning asset path for obstacle type
- Assets are preloaded during service initialization
- Component injects service via dependency injection
- Fallback behavior defined if obstacle type not found

**Scenarios:**
- WHEN obstacle game component initializes, THEN it requests obstacle assets from service
- WHEN service is initialized, THEN all obstacle assets are preloaded
- WHEN requesting unknown obstacle type, THEN service returns default obstacle asset

---

##### Static Obstacle Rendering
**Requirement:** Obstacles remain stationary (no animation or rotation)

**Details:**
- Obstacle images have no CSS transforms or animations
- Obstacle position only updates if game logic moves them
- Rendering is optimized for static positioning

**Scenarios:**
- WHEN obstacle is rendered, THEN no CSS animation is applied
- WHEN obstacle position does not change in game logic, THEN image position does not change
- WHEN game re-renders, THEN static obstacles display quickly without animation overhead

#### MODIFIED Requirements
- None

#### REMOVED Requirements
- Emoji/dot rendering of obstacles should be removed from template
