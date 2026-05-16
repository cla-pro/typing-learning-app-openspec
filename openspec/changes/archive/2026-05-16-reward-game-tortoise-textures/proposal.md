# Reward Game Tortoise Textures

## Why

The tortoise game currently renders game elements as simple emojis and dots, which diminishes the visual appeal and immersion of the reward experience. Players need a more polished visual presentation to enhance engagement and make the game feel more complete. Visual realism through proper textures will significantly improve the player experience during reward gameplay.

## What Changes

We will introduce PNG-based textures to replace the current emoji/dot representations. The game path will be upgraded from a simple line to a styled mud path with borders. The tortoise will be rendered with directional variations to match her movement direction. Obstacles will be rendered as textured assets.

## Capabilities

### New Capabilities
- **Tortoise Texture Asset**: Create a high-quality PNG texture for the tortoise character that can be rotated to face up, down, left, and right directions
- **Obstacle Texture Asset**: Create PNG textures for game obstacles that remain static on the game board
- **Mud Path Styling**: Enhance the path rendering with a thicker stroke, black borders, and brown fill to simulate mud terrain

### Modified Capabilities
- None

## Impact

### User Experience
- Enhanced visual appeal of the reward game makes it more engaging and satisfying for players
- Clear directional indication through tortoise rotation improves gameplay clarity
- Mud-styled path creates a cohesive visual theme

### Technical Impact
- Game rendering logic must support texture-based rendering instead of emoji/dot representations
- Tortoise component requires rotation logic based on movement direction (up/down/left/right)
- Path rendering layer needs enhancement to support stroke/fill styling
- Asset management system needed to load and cache PNG textures

### Performance Considerations
- PNG textures will be lighter weight than complex SVG rendering
- Rotation transformations for tortoise are performant CSS operations
- Assets should be optimized for web delivery

## Notes

- Tortoise rotation should support 4 cardinal directions
- Obstacles are fixed and do not require animation
- Path styling focuses on visual polish without changing game mechanics
