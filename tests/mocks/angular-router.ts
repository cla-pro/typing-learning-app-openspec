export class RouterLink {}

export class ActivatedRoute {
  paramMap: any;
}

export function convertToParamMap(values: Record<string, string | undefined>) {
  return {
    get(key: string): string | null {
      const value = values[key];
      return value === undefined ? null : value;
    }
  };
}
