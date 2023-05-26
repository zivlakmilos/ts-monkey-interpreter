import { startRepl } from "./repl/repl";
import { stdin, stdout } from 'process';

const main = () => {
  console.log('Welcome to Monky programmin language!')
  startRepl(stdin, stdout);
}

main();
