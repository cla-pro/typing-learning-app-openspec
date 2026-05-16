## Tortoise Texture Asset

### Overview
The tortoise character must be rendered using a PNG texture instead of emoji, with support for 4-directional rotation (up, down, left, right) to indicate movement direction.

### Requirements

#### ADDED Requirements

##### Tortoise PNG Asset Exists
**Requirement:** A tortoise PNG texture file exists at `src/assets/reward-game/tortoise/tortoise.png`

**Details:**
- File format: PNG with transparency
- Recommended size: 64x64 or 128x128 pixels
- Asset should be centered with equal padding
- Should depict tortoise facing one cardinal direction (typically right/east)

**Scenarios:**
- WHEN the game initializes, THEN `tortoise.png` is present in the asset directory
- WHEN the asset is bundled, THEN file size is < 20KB

---

##### Tortoise Rotation Binding
**Requirement:** Tortoise component applies rotation CSS transform based on movement direction

**Details:**
- Direction → Rotation angle mapping:
  - Right (east): 0°
  - Down (south): 90°
  - Left (west): 180°
  - Up (north): 270°
- Rotation applied via `[style.transform]` Angular binding
- Rotation must be smooth and performant

**Scenarios:**
- WHEN tortoise moves right, THEN CSS transform is "rotate(0deg)"
- WHEN tortoise moves down, THEN CSS transform is "rotate(90deg)"
- WHEN tortoise moves left, THEN CSS transform is "rotate(180deg)"
- WHEN tortoise moves up, THEN CSS transform is "rotate(270deg)"

---

##### Tortoise Image Element
**Requirement:** Tortoise is rendered as `<img>` element instead of emoji

**Details:**
- Image source bound to tortoise asset URL
- Image positioned at tortoise game coordinates
- Image has appropriate dimensions (width/height CSS properties)
- Alt text provided for accessibility

**Scenarios:**
- WHEN game renders, THEN `<img>` element is present with src pointing to tortoise asset
- WHEN screen reader is used, THEN tortoise image has meaningful alt text
- WHEN game board is rendered, THEN tortoise image is positioned at correct board coordinates

---

##### Tortoise Texture Service Integration
**Requirement:** Tortoise component uses `TortoiseTextureService` to load tortoise asset

**Details:**
- Service provides `getTortoiseAssetUrl()` method returning asset path
- Asset is preloaded during service initialization
- Component injects service via dependency injection

**Scenarios:**
- WHEN tortoise game component initializes, THEN it requests tortoise asset from service
- WHEN service is initialized, THEN tortoise asset is preloaded into cache
- WHEN asset is not cached, THEN service loads it on first request

#### MODIFIED Requirements
- None

#### REMOVED Requirements
- Emoji rendering of tortoise (🐢) should be removed from template
