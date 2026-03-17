## 1. Stream size control implementation

- [x] 1.1 Add exercise component state for the linear stream-size value with a baseline minimum and bounded range
- [x] 1.2 Read the persisted global stream-size value from browser localStorage during exercise initialization and fall back safely to the baseline when missing or invalid
- [x] 1.3 Update the stored localStorage value whenever the user changes the slider
- [x] 1.4 Expose computed sizing outputs from the selected slider value so stream typography can scale without changing progression logic

## 2. Exercise page layout updates

- [x] 2.1 Insert a range slider control between the stream visualization and the pressed-key feedback section in the exercise template
- [x] 2.2 Update exercise page styles so the slider integrates into the centered focus stack without visible labels while keeping appropriate accessibility attributes
- [x] 2.3 Apply the computed stream-size scaling to the zoom row and side-character presentation while preserving the intended overflow-clipping behavior
- [x] 2.4 Keep the pressed-key feedback and primary runtime control aligned beneath the new slider section after the layout change

## 3. Verification

- [x] 3.1 Update exercise component requirements tests to cover baseline default size, increasing slider value behavior, and persisted localStorage restore
- [x] 3.2 Ensure existing runtime lifecycle, key-capture, and progression tests still pass with the new size-control state in place
- [x] 3.3 Run the relevant automated tests and Angular build to verify the size chooser behavior end to end
