import { TokenType, Tokenizer } from ".."

test('test getNextToken()', () => {
  const input = `=+(){},;`;

  const lexer = new Tokenizer(input);

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
