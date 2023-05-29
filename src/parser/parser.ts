import { Identifier, LetStatement, Program, Statement } from "../ast/ast";
import { Lexer, Token, TokenItem, TokenType } from "../lexer";

export class Parser {
  private curToken: Token;
  private peekToken: Token;
  private errors: string[] = [];

  constructor(private lexer: Lexer) {
    this.nextToken();
    this.nextToken();
  }

  public parseProgram(): Program | undefined {
    const program = new Program();

    while (!this.curTokenIs(TokenType.Eof)) {
      const stmt = this.parseStatement();
      if (stmt) {
        program.statements.push(stmt);
      }
      this.nextToken();
    }

    return program;
  }

  public getErrors(): string[] {
    return this.errors;
  }

  private parseStatement(): Statement | undefined {
    switch (this.curToken.type) {
      case TokenType.Let:
        return this.parseLetStatement();
    }

    return undefined;
  }

  private parseLetStatement(): LetStatement | undefined {
    const stmt = new LetStatement();
    stmt.token = this.curToken;

    if (!this.expectPeek(TokenType.Ident)) {
      return undefined;
    }

    stmt.name = new Identifier();
    stmt.name.token = this.curToken;
    stmt.name.value = this.curToken.literal;

    if (!this.expectPeek(TokenType.Assign)) {
      return undefined;
    }

    // TODO: Skip expression until semicolon
    while (!this.curTokenIs(TokenType.Semicolon)) {
      this.nextToken();
    }

    return stmt;
  }

  private curTokenIs(t: TokenItem): boolean {
    return this.curToken.type === t;
  }

  private peekTokenIs(t: TokenItem): boolean {
    return this.peekToken.type === t;
  }

  private expectPeek(t: TokenItem): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    }

    this.peekError(t);
    return false;
  }

  private peekError(t: TokenItem) {
    this.errors.push(`expected next togken to be ${t} but got ${this.peekToken.type} instead`);
  }

  private nextToken(): void {
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.getNextToken();
  }
}
