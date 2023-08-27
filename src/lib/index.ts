export * from "$lib/board";
export * from "$lib/types";

export function sum(a: number[]) {
  return a.reduce((a, b) => a + b, 0);
}

export function kebabCaseToHuman(s: string) {
  return capitalize(s.replace(/-/g, " "));
}

export function capitalize(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}
