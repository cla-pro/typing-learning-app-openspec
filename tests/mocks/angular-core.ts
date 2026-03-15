export function Component(_metadata: unknown) {
  return function <T extends new (...args: any[]) => any>(target: T): T {
    return target;
  };
}

export function Injectable(_metadata?: unknown) {
  return function <T extends new (...args: any[]) => any>(target: T): T {
    return target;
  };
}

const injectRegistry = new Map<unknown, unknown>();

export function inject<T>(token: unknown): T {
  if (!injectRegistry.has(token)) {
    throw new Error(`No inject mock provided for token: ${String(token)}`);
  }

  return injectRegistry.get(token) as T;
}

export function __setInjectMock(token: unknown, value: unknown): void {
  injectRegistry.set(token, value);
}

export function __resetInjectMocks(): void {
  injectRegistry.clear();
}

export interface OnInit {
  ngOnInit(): void;
}
