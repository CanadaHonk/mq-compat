import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = prompt => new Promise(res => rl.question(prompt, res));

const browser = await question('browser: ');

for (const file of readdirSync('data')) {
  // const { name, methods } = (await import('./data/' + file)).default;
  const { name, methods } = JSON.parse(readFileSync('./data/' + file, 'utf8'));

  for (const x in methods) {
    let inp = await question(`${x}: `);
    if (inp === 'y') inp = true;
    if (inp === 'n') inp = false;
    if (inp === 'd') inp = 'disabled';

    methods[x][browser] = inp;
  }

  writeFileSync('./data/' + file, JSON.stringify({ name, methods }, null, 2));
}