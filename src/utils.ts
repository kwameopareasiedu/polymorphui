export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter((cs) => !!cs).join(" ");
}
