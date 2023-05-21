export const TokenType = {
  Illegal: 'ILLEGAL',
  Eof: 'EOF',

  // ientifiers + literals
  Ident: 'IDENT',
  Int: 'INT',

  // operators
  Assign: '=',
  Plus: '+',

  // delimeters
  Comma: ',',
  Semicolon: ';',

  LParen: 'LPAREN',
  RParen: 'RPAREN',
  LBrace: 'LBRACE',
  RBrace: 'RBRACE',

  // keywords
  Function: 'FUNCTION',
  Let: 'LET',
} as const;

type TokenItem = typeof TokenType[keyof typeof TokenType];

export type Token = {
  type: TokenItem,
  literal: string,
}

export const createToken = (type: TokenItem, literal: string): Token => {
  return { type, literal }
}

export class Tokenizer {
  private position: number = 0;
  private nextPosition: number = 0;
  private ch: string;

  constructor(private input: string) {
    this.readChar();
  }

  public getNextToken(): Token {
    let tok: Token;

    switch (this.ch) {
      case '=':
        tok = createToken(TokenType.Assign, this.ch);
        break;
      case '+':
        tok = createToken(TokenType.Plus, this.ch);
        break;
      case '(':
        tok = createToken(TokenType.LParen, this.ch);
        break;
      case ')':
        tok = createToken(TokenType.RParen, this.ch);
        break;
      case '{':
        tok = createToken(TokenType.LBrace, this.ch);
        break;
      case '}':
        tok = createToken(TokenType.RBrace, this.ch);
        break;
      case ',':
        tok = createToken(TokenType.Comma, this.ch);
        break;
      case ';':
        tok = createToken(TokenType.Semicolon, this.ch);
        break;
      case '\0':
        tok = createToken(TokenType.Eof, this.ch);
        break;
      default:
        tok = createToken(TokenType.Illegal, '');
        break;
    }

    this.readChar();
    return tok;
  }

  private readChar(): void {
    if (this.nextPosition < this.input.length) {
      this.ch = this.input[this.nextPosition];
    } else {
      this.ch = '\0';
    }

    this.position = this.nextPosition;
    this.nextPosition++;
  }
}
