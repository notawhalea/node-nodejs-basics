import { EOL } from 'node:os';
import { argv, stdout, stdin, exit } from 'node:process';

const args = argv.slice(2);

stdout.write(`Child Process [PID: ${process.pid}] initialized.${EOL}`);
stdout.write(`Total number of arguments is ${args.length}${EOL}`);
stdout.write(`Arguments: ${JSON.stringify(args)}${EOL}${EOL}`);
stdout.write(`Ready to receive input. Type 'CLOSE' to exit.${EOL}`);

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString().trim();

  if (chunkStringified.includes('CLOSE')) {
    stdout.write(`Child Process [PID: ${process.pid}] exiting on command.${EOL}`);
    exit(0);
  }

  stdout.write(`Received from master process: ${chunk.toString()}${EOL}`);
};

stdin.on('data', echoInput);

