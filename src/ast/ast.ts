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
  private statements: Statement[] = [];

  constructor() {
  }

  public tokenLiteral(): string {
    if (this.statements.length) {
      return this.statements[0].tokenLiteral();
    }

    return "";
  }
}

class LetStatement implements Statement {
  private token: Token;
  private name: Identifier;
  private value: Expression;

  constructor() {
  }

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public statementNode() {
  }
}

class Identifier implements Expression {
  private token: Token;
  private value: string;

  constructor() {
  }

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public expressionNode() {
  }
}
