import { Lexer, Token, TokenType } from "../lexer";
import Readline from "readline";

/*
 * TODO: Implement to support multi line of code
 */

export const startRepl = (input: NodeJS.ReadableStream, output: NodeJS.WritableStream) => {
  const rl = Readline.createInterface(input, output)

  rl.question('>> ', (line) => {
    const lexer = new Lexer(line);

    let token: Token;
    do {
      token = lexer.getNextToken();
      console.log(token)
    } while (token.type !== TokenType.Eof);

    rl.close();
    process.exit(0);
  });
}
