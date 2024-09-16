declare module "*.svg" {
  const content: string;
  export default content;
}

type NestedObject = Array & {
  [k: string]: NestedObject;
};
