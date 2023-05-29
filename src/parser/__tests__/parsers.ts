import { Statement, isLetStatement } from "../../ast/ast";
import { Lexer } from "../../lexer";
import { Parser } from "../parser";

const testLetStatement = (stmt: Statement, name: string): string | undefined => {
  if (stmt.tokenLiteral() !== 'let') {
    return `tokenLiteral() expected 'let' but got '${stmt.tokenLiteral()}'`;
  }

  if (!isLetStatement(stmt)) {
    return `tokenLiteral() expected LetStatement but got Statement`;
  }

  if (stmt.name.value !== name) {
    return `stmt.name.value expected '${name}' but got '${stmt.name.value}'`;
  }

  if (stmt.name.tokenLiteral() !== name) {
    return `stmt.name.tokenLiteral() expected '${name}' but got '${stmt.name.tokenLiteral()}'`;
  }

  return undefined;
}

const checkParserErrors = (parser: Parser) => {
  const errors = parser.getErrors();

  if (!errors.length) {
    return;
  }

  throw new Error(errors.join('\n'));
}

test('test TestLetStatements', () => {
  const input = `
let x = 5;
let y = 10;
let foobar = 838383;
`;

  const lexer = new Lexer(input);
  const parser = new Parser(lexer);

  const program = parser.parseProgram();
  checkParserErrors(parser);

  if (!program) {
    throw new Error('parseProgram() returned undefined');
  }

  if (program.statements.length !== 3) {
    throw new Error(`program.statements expected 3 statements got ${program.statements.length}`);
  }

  const tests = [
    { expectedIdentifier: 'x' },
    { expectedIdentifier: 'y' },
    { expectedIdentifier: 'foobar' },
  ];

  for (let [idx, test] of tests.entries()) {
    const stmt = program.statements[idx];
    const res = testLetStatement(stmt, test.expectedIdentifier);
    if (res) {
      throw new Error(res);
    }
  }
});
