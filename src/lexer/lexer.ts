export const TokenType = {
  Illegal: 'ILLEGAL',
  Eof: 'EOF',

  // ientifiers + literals
  Ident: 'IDENT',
  Int: 'INT',

  // operators
  Assign: '=',
  Plus: '+',
  Minus: '-',
  Bang: '!',
  Asterisk: '*',
  Slash: '/',

  LT: '<',
  GT: '<',

  Equal: '==',
  NotEqual: '!=',

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
  True: 'true',
  False: 'false',
  If: 'if',
  Else: 'else',
  Return: 'return',
} as const;

type TokenItem = typeof TokenType[keyof typeof TokenType];

export type Token = {
  type: TokenItem,
  literal: string,
}

export const createToken = (type: TokenItem, literal: string): Token => {
  return { type, literal }
}

const Keywords = {
  fn: TokenType.Function,
  let: TokenType.Let,
  true: TokenType.True,
  false: TokenType.False,
  if: TokenType.If,
  else: TokenType.Else,
  return: TokenType.Return,
} as const;

export class Lexer {
  private position: number = 0;
  private nextPosition: number = 0;
  private ch: string = '';

  constructor(private input: string) {
    this.readChar();
  }

  public getNextToken(): Token {
    let tok: Token;

    this.skipWhitespace();

    switch (this.ch) {
      case '=':
        if (this.peekChar() === '=') {
          this.readChar();
          tok = createToken(TokenType.Equal, '==');
        } else {
          tok = createToken(TokenType.Assign, this.ch);
        }
        break;
      case '+':
        tok = createToken(TokenType.Plus, this.ch);
        break;
      case '-':
        tok = createToken(TokenType.Minus, this.ch);
        break;
      case '!':
        if (this.peekChar() === '=') {
          this.readChar();
          tok = createToken(TokenType.NotEqual, '!=');
        } else {
          tok = createToken(TokenType.Bang, this.ch);
        }
        break;
      case '/':
        tok = createToken(TokenType.Slash, this.ch);
        break;
      case '*':
        tok = createToken(TokenType.Asterisk, this.ch);
        break;
      case '<':
        tok = createToken(TokenType.LT, this.ch);
        break;
      case '>':
        tok = createToken(TokenType.GT, this.ch);
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
        tok = createToken(TokenType.Eof, 'eof');
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          const type = this.lookupIdent(literal);
          tok = createToken(type, literal);
          return tok;
        } else if (this.isDigit(this.ch)) {
          const literal = this.readNumber();
          const type = TokenType.Int;
          tok = createToken(type, literal);
          return tok;
        } else {
          tok = createToken(TokenType.Illegal, '');
        }
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

  private peekChar(): string {
    if (this.nextPosition >= this.input.length) {
      return '\0';
    }

    return this.input[this.nextPosition];
  }

  private readIdentifier(): string {
    const position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private readNumber(): string {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private isLetter(ch: string): boolean {
    return ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'z') || ch === '_';
  }

  private isDigit(ch: string): boolean {
    return '0' <= ch && ch <= '9';
  }

  private lookupIdent(ident: string): TokenItem {
    if (Keywords[ident as keyof typeof Keywords]) {
      return Keywords[ident as keyof typeof Keywords];
    }

    return TokenType.Ident;
  }

  private skipWhitespace() {
    while (this.ch === ' ' || this.ch === '\t' || this.ch === '\n' || this.ch === '\r') {
      this.readChar();
    }
  }
}
