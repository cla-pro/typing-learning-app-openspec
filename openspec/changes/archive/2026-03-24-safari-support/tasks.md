## 1. CSS Fix — Safari range input thumb

- [x] 1.1 In `src/app/components/settings/settings.component.css`, add `-webkit-appearance: none` to the existing `input[type='range'].setting-control` rule
- [x] 1.2 Add `::-webkit-slider-runnable-track` pseudo-element rule with minimal track styling (height, border-radius, background)
- [x] 1.3 Add `::-webkit-slider-thumb` pseudo-element rule with explicit dimensions, background color `#2c3e50`, border-radius, and `-webkit-appearance: none`
- [x] 1.4 Add a comment noting that the thumb color (`#2c3e50`) intentionally mirrors the `accent-color` value for non-WebKit browsers

## 2. Spec update — webapp-core supported browsers

- [x] 2.1 Verify the delta spec `openspec/changes/safari-support/specs/webapp-core/spec.md` will be merged into `openspec/specs/webapp-core/spec.md` at archive time (no manual edit needed now)

## 3. Verification

- [x] 3.1 Run `npm test` and confirm all existing tests still pass
- [x] 3.2 Run `npm run build:angular` and confirm the build succeeds with no errors
- [ ] 3.3 Manually verify on Safari/iOS (iPad) that the stream-size range input shows a draggable thumb
