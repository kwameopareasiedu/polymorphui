declare module "*.svg" {
  const content: string;
  export default content;
}

type NestedRecord = Array & {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  [key: string]: NestedRecord | string | number | boolean | null | undefined | Array | Function;
};

type OneOrMany<T> = T | T[];
