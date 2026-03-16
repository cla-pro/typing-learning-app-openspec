## 1. Exercise UI layout updates

- [x] 1.1 Restructure the exercise template so the pressed-key feedback and primary runtime control form a centered interaction column beneath the stream
- [x] 1.2 Update exercise styles to vertically center the side stream rows with the zoom row and keep that alignment responsive on smaller screens
- [x] 1.3 Restyle the pressed-key feedback as an unlabeled character box that matches the active zoom character footprint
- [x] 1.4 Restyle the primary start/pause control as a single centered button with a clearly recognizable disabled appearance after completion

## 2. Runtime control cleanup

- [x] 2.1 Remove the temporary completion button from the exercise template
- [x] 2.2 Remove the temporary completion callback and any no-longer-used component-side logic tied to that control
- [x] 2.3 Remove CSS classes and selectors that become unused after the temporary completion control is deleted
- [x] 2.4 Preserve the existing opened, running, pending, and completed state transitions while keeping the primary control visible and disabled in completed state

## 3. Verification updates

- [x] 3.1 Update exercise component requirements tests to remove temporary completion expectations and cover the completed-state disabled primary control
- [x] 3.2 Add or adjust observable UI assertions for centered stream alignment, unlabeled pressed-key feedback, and single-control rendering
- [x] 3.3 Run the relevant automated tests and Angular build to verify the exercise-page UX cleanup behavior end to end
