import { RefObject } from "react";

export interface History {
  expression: Expression;
  result: string;
  id?: string;
  nodeRef: RefObject<any>;
}

export interface Expression {
  a: string;
  sign: string;
  b: string;
}
