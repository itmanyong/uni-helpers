declare global {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type ObjectType<T = any> = {
    [key: string]: T;
  };

  type FilterPatternResult = (id: string | unknown) => boolean;
}

export {};
