## Behavior Testing Policy

Requirements tests under `tests/app/**` must verify behavior through public APIs and observable outcomes.

Rules:
- Do not read source files directly as a test oracle.
- Do not assert implementation-text snippets (for example method names or template strings).
- Prefer tests that call public service/component APIs and verify state/output changes.
- Use Angular TestBed only when dependency injection wiring is needed for the behavior under test.
- Prefer Angular `inject()` over constructor-parameter injection for dependency injection in components/services.
