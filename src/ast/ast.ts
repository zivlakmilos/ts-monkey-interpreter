import { Token } from "../lexer";

export type Node = {
  tokenLiteral: () => string,
  toString: () => string,
}

export type Statement = Node & {
  statementNode: () => void,
}

export type Expression = Node & {
  expressionNode: () => void,
  toString: () => string,
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

  public toString(): string {
    let res: string = '';

    for (const stmt of this.statements) {
      res += stmt.toString();
    }

    return res;
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

  public toString(): string {
    let res: string = '';

    res += this.tokenLiteral() + ' ';
    res += this.name.toString();
    res += ' = ';

    res += this.value.toString();

    res += ';';

    return res;
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

  public toString(): string {
    let res: string = '';

    res += this.tokenLiteral() + ' ';

    res += this.returnValue.toString();

    res += ';';

    return res;
  }
}

export const isReturnStatement = (stmt: Statement): stmt is LetStatement => {
  const retStmt = stmt as ReturnStatement;
  // TODO: Change when implement expressions to require value
  //return letStmt.value !== undefined;
  return true;
}

export class ExpressionStatement implements Statement {
  public token: Token;
  public expression: Expression;

  constructor() {
  }

  public tokenLiteral(): string {
    return this.token.literal;
  }

  public statementNode() {
  }

  public toString(): string {
    return this.expression.toString();
  }
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

  public toString(): string {
    return this.value;
  }
}
