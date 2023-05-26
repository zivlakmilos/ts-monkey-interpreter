import { TokenType, Lexer } from "..";

test('test getNextToken()', () => {
  const input = `=+(){},;`;

  const lexer = new Lexer(input);

  const tokens = [
    TokenType.Assign,
    TokenType.Plus,
    TokenType.LParen,
    TokenType.RParen,
    TokenType.LBrace,
    TokenType.RBrace,
    TokenType.Comma,
    TokenType.Semicolon,
    TokenType.Eof,
  ]

  for (let token of tokens) {
    expect(lexer.getNextToken().type).toBe(token);
  }
});


test('test getNextToken()', () => {
  const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
`;

  const lexer = new Lexer(input);

  const tokens = [
    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },


    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Function, literal: 'fn' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.LBrace, literal: '{' },

    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Plus, literal: '+' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.RBrace, literal: '}' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'result' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.Semicolon, literal: ';' },
  ]

  for (let token of tokens) {
    const currentToken = lexer.getNextToken();
    expect(currentToken.type).toBe(token.type);
    expect(currentToken.literal).toBe(token.literal);
  }
});


test('test getNextToken()', () => {
  const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
!-/*5;
5 < 10 > 5;
`;

  const lexer = new Lexer(input);

  const tokens = [
    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },


    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Function, literal: 'fn' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.LBrace, literal: '{' },

    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Plus, literal: '+' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.RBrace, literal: '}' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'result' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.Semicolon, literal: ';' },


    { type: TokenType.Bang, literal: '!' },
    { type: TokenType.Minus, literal: '-' },
    { type: TokenType.Slash, literal: '/' },
    { type: TokenType.Asterisk, literal: '*' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Int, literal: '5' },
    { type: TokenType.LT, literal: '<' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.GT, literal: '>' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },
  ]

  for (let token of tokens) {
    const currentToken = lexer.getNextToken();
    expect(currentToken.type).toBe(token.type);
    expect(currentToken.literal).toBe(token.literal);
  }
});


test('test getNextToken()', () => {
  const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
!-/*5;
5 < 10 > 5;

if (5 < 10) {
  return true;
} else {
  return false;
}
`;

  const lexer = new Lexer(input);

  const tokens = [
    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },


    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Function, literal: 'fn' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.LBrace, literal: '{' },

    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Plus, literal: '+' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.RBrace, literal: '}' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'result' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.Semicolon, literal: ';' },


    { type: TokenType.Bang, literal: '!' },
    { type: TokenType.Minus, literal: '-' },
    { type: TokenType.Slash, literal: '/' },
    { type: TokenType.Asterisk, literal: '*' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Int, literal: '5' },
    { type: TokenType.LT, literal: '<' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.GT, literal: '>' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.If, literal: 'if' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.LT, literal: '<' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.LBrace, literal: '{' },
    { type: TokenType.Return, literal: 'return' },
    { type: TokenType.True, literal: 'true' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.RBrace, literal: '}' },
    { type: TokenType.Else, literal: 'else' },
    { type: TokenType.LBrace, literal: '{' },
    { type: TokenType.Return, literal: 'return' },
    { type: TokenType.False, literal: 'false' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.RBrace, literal: '}' },
  ]

  for (let token of tokens) {
    const currentToken = lexer.getNextToken();
    expect(currentToken.type).toBe(token.type);
    expect(currentToken.literal).toBe(token.literal);
  }
});

test('test getNextToken()', () => {
  const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
!-/*5;
5 < 10 > 5;

if (5 < 10) {
  return true;
} else {
  return false;
}

10 == 10;
10 != 10;
`;

  const lexer = new Lexer(input);

  const tokens = [
    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },


    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Function, literal: 'fn' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.LBrace, literal: '{' },

    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Plus, literal: '+' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.RBrace, literal: '}' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'result' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.Semicolon, literal: ';' },


    { type: TokenType.Bang, literal: '!' },
    { type: TokenType.Minus, literal: '-' },
    { type: TokenType.Slash, literal: '/' },
    { type: TokenType.Asterisk, literal: '*' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Int, literal: '5' },
    { type: TokenType.LT, literal: '<' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.GT, literal: '>' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.If, literal: 'if' },
    { type: TokenType.LParen, literal: '(' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.LT, literal: '<' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.RParen, literal: ')' },
    { type: TokenType.LBrace, literal: '{' },
    { type: TokenType.Return, literal: 'return' },
    { type: TokenType.True, literal: 'true' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.RBrace, literal: '}' },
    { type: TokenType.Else, literal: 'else' },
    { type: TokenType.LBrace, literal: '{' },
    { type: TokenType.Return, literal: 'return' },
    { type: TokenType.False, literal: 'false' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.RBrace, literal: '}' },

    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Equal, literal: '==' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Int, literal: '10' },
    { type: TokenType.NotEqual, literal: '!=' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },
  ]

  for (let token of tokens) {
    const currentToken = lexer.getNextToken();
    expect(currentToken.type).toBe(token.type);
    expect(currentToken.literal).toBe(token.literal);
  }
});
