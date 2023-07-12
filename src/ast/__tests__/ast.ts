import { TokenType } from "../../lexer";
import { Identifier, LetStatement, Program } from "../ast";

test('test AbsString', () => {
  const name = new Identifier();
  name.token = {
    type: TokenType.Ident,
    literal: 'myVar',
  }
  name.value = 'myVar';

  const value = new Identifier();
  value.token = {
    type: TokenType.Ident,
    literal: 'anotherVar',
  }
  value.value = 'anotherVar';

  const letStatement = new LetStatement();
  letStatement.token = {
    type: TokenType.Let,
    literal: 'let',
  }
  letStatement.name = name;
  letStatement.value = value;

  const program = new Program();
  program.statements.push(letStatement);

  expect(program.toString()).toBe('let myVar = anotherVar;');
});
