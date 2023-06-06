import { Token } from "../lexer";

export type Node = {
  tokenLiteral: () => string,
}

export type Statement = Node & {
  statementNode: () => void,
}

export type Expression = Node & {
  expressionNode: () => void,
}

export class Program implements Node {
  public statements: Statement[] = [];

  constructor() {
  }

  public tokenLiteral(): string {
    if (this.statements.length) {
      return this.statements[0].tokenLiteral();
    }

    return "";
  }
}

export class LetStatement implements Statement {
  public token: Token;
  public name: Identifier;
  public value: Expression;

  constructor() {
  }

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public statementNode() {
  }
}

export const isLetStatement = (stmt: Statement): stmt is LetStatement => {
  const letStmt = stmt as LetStatement;
  // TODO: Change when implement expressions to require value
  //return letStmt.name !== undefined && letStmt.value !== undefined;
  return letStmt.name !== undefined;
}

export class ReturnStatement implements Statement {
  public token: Token;
  public returnValue: Expression;

  constructor() {
  }

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public statementNode() {
  }
}

export const isReturnStatement = (stmt: Statement): stmt is LetStatement => {
  const retStmt = stmt as ReturnStatement;
  // TODO: Change when implement expressions to require value
  //return letStmt.value !== undefined;
  return true;
}

export class Identifier implements Expression {
  public token: Token;
  public value: string;

  constructor() {
  }

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public expressionNode() {
  }
}
