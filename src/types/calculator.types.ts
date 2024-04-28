export interface History {
  expression: Expression;
  result: string;
  id?: string;
}

export interface Expression {
  a: string;
  sign: string;
  b: string;
}
