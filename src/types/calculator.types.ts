export interface History {
  expression: Expression;
  result: number;
  id?: string;
}

export interface Expression {
  a: string | null;
  sign: string | null;
  b: string | null;
}

export interface Memory {
  value: number;
  id: string;
}
