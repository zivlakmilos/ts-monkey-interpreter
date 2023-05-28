import { Identifier, LetStatement, Program, Statement } from "../ast/ast";
import { Lexer, Token, TokenItem, TokenType } from "../lexer";

export class Parser {
  private curToken: Token;
  private peekToken: Token;

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

    return false;
  }

  private nextToken(): void {
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.getNextToken();
  }
}
