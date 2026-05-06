## 1. Tortoise Visualization Component Shell

- [x] 1.1 Create `src/app/components/tortoise-visualization/` with `tortoise-visualization.component.ts`, `tortoise-visualization.component.html`, and `tortoise-visualization.component.css`
- [x] 1.2 Define the component API with a required tortoise configuration input and an optional debug-grid toggle input
- [x] 1.3 Import `TortoiseVisualizationComponent` into `TortoiseGameHostComponent` and replace the placeholder valid-config content with the visualization component

## 2. Board Geometry and Layered Rendering

- [x] 2.1 Implement board-dimension and cell-center helpers in the visualization component using the configured grid bounds and the fixed cell-size constant from the design
- [x] 2.2 Render the path as an SVG polyline through waypoint cell centers without adding special start, end, or waypoint markers
- [x] 2.3 Render a separate object layer containing the tortoise emoji and obstacle disks, with each object centered in its configured grid cell

## 3. Debug Grid Overlay

- [x] 3.1 Add a dedicated debug-grid layer that can be toggled independently from the path and object layers
- [x] 3.2 Render horizontal and vertical grid lines covering the represented board area when debug-grid mode is enabled
- [x] 3.3 Render `(col,row)` coordinate labels inside each represented grid cell when debug-grid mode is enabled

## 4. Tortoise Movement State and Animation

- [x] 4.1 Track the tortoise display position in pixel coordinates separately from the discrete tortoise grid position used by configuration data
- [x] 4.2 Apply a linear CSS transition so tortoise movement animates continuously between source and target cell centers instead of snapping
- [x] 4.3 Handle animation completion so future movement integration can distinguish between in-progress display motion and completed grid-position updates

## 5. Styling and Visual Contracts

- [x] 5.1 Style the visualization container as a relatively positioned board with correctly stacked path, object, and debug-grid layers
- [x] 5.2 Style the tortoise as a centered emoji element and obstacles as centered circular disks aligned with the path
- [x] 5.3 Ensure all layer coordinate systems share the same board origin and dimensions so SVG and HTML-rendered elements stay aligned

## 6. Automated Test Coverage

- [x] 6.1 Create `tests/app/components/tortoise-visualization/tortoise-visualization.component.requirements.test.ts` covering separate layer rendering and path polyline rendering without waypoint markers
- [x] 6.2 Add tests verifying centered placement of the tortoise, obstacle disks, and path vertices at grid-cell centers
- [x] 6.3 Add tests verifying debug-grid line and coordinate-label rendering when debug mode is enabled
- [x] 6.4 Add tests verifying host integration: a known tortoise config is passed from `TortoiseGameHostComponent` into the visualization component
- [x] 6.5 Add tests verifying tortoise movement uses continuous display-position animation behavior rather than direct cell-to-cell snapping
