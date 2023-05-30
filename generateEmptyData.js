const html = await (await fetch('https://www.w3.org/TR/mediaqueries-5/')).text();

const filenamize = x => x.replace(' Media Features', '').replace(' Features', '').replaceAll(' ', '_').replaceAll('/', '_').toLowerCase();

const data = {};

const headers = [];
const features = [];
for (const x of html.split('\n')) {
  if (x.includes('feature</span><a')) {
    const name = x.match(/id="ref-.*?">(.*?)<\/a> feature/)[1];
    const level = x.match(/data-level="(.*?)"/)[1];

    const parent = parseInt(level.split('.')[0]);
    data[filenamize(headers[parent - 1])].methods[name] = {
      chrome: null,
      firefox: null,
      safari: null,

      // parameters: {}
    };

    features.push({ name, level });
  }

  if (/<span class="secno">[0-9]+<\/span>/.test(x)) {
    // console.log(x);
    // const level = x.match(/<span class="secno">([0-9]+)<\/span>/)[1];
    const name = x.match(/<span class="content"> ?(.*?)<\/span>/)[1];
    headers.push(name);

    data[filenamize(name)] = {
      name: name.replace(' Media Features', '').replace(' Features', ''),
      methods: {}
    };
  }
}

for (const x in data) {
  if (Object.keys(data[x].methods).length === 0) delete data[x];
}

import { writeFileSync } from 'fs';

for (const x in data) {
  writeFileSync('data/' + x + '.json', JSON.stringify(data[x], null, 2));
}

console.log(data);