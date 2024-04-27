export interface History {
  expression: Expression;
  result: string;
  id?: number;
}

export interface Expression {
  a: string;
  sign: string;
  b: string;
}
