type Node = NestedObject & {
  type: string;
  value: NestedObject;
};

type NodeVisitor = (node: Node, parent: Node, prop: string, idx: number) => boolean | void;

type TraverseOptions = {
  pre?: NodeVisitor;
  post?: NodeVisitor;
};

declare function traverse(root: object, options?: TraverseOptions): void;

export { traverse as default };
