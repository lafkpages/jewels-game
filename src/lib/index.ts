export * from "$lib/board";
export * from "$lib/types";

export function sum(a: number[]) {
  return a.reduce((a, b) => a + b, 0);
}
