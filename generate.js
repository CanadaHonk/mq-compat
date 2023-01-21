const getIcon = value => {
  switch (value) {
    case true: return 'yes';
    case false: return 'no';
    case undefined: return 'unknown';
  }

  if (value.startsWith('D')) return 'patch';

  // if (value.length <= 3) return 'yes';
  // if (value === 'trunk') return 'yes';

  if (value.length === '1680780'.length) return 'bug';

  if (value[0] === '<') return 'none';

  return 'yes';
};

const getExtra = value => {
  if (value === undefined) return '';
  if (value[0] === '<') return value;

  const icon = getIcon(value);

  switch (icon) {
    case 'bug': return `<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=${value}" target="_blank" rel="noopener">${value}</a>`;
    case 'patch': return `<a href="https://phabricator.services.mozilla.com/${value}" target="_blank" rel="noopener">${value}</a>`;
  }

  if (icon === 'yes' && value !== true) return value;

  return '';
};

const makeRow = (data, name = data.name, sub = false) => `<tr>
<th${sub ? ' class="sub"' : ''}>${name}</th>
<td><div>
  <div class="icon-${getIcon(data.chrome)}"></div>
  <span>${getExtra(data.chrome)}</span>
</div></td>
<td><div>
<div class="icon-${getIcon(data.firefox)}"></div>
<span>${getExtra(data.firefox)}</span>
</div></td>
</tr>`;

const makeTable = methods => `<table>
<thead>
  <tr>
    <td></td>
    <th><div>
      <!-- <span>Chrome</span> -->
      <div class="icon-chrome"></div>
    </div></th>
    <th><div>
      <!-- <span>Firefox</span> -->
      <div class="icon-firefox"></div>
    </div></th>
  </tr>
</thead>
<tbody>
${Object.keys(methods).flatMap(x => [
  makeRow(methods[x], x),
  ...Object.keys(methods[x].parameters ?? {}).map(y => makeRow(methods[x].parameters[y], y, true))
]).join('\n')}
</tbody>
</table>`;

const getData = (things, browser) => {
  const data = Object.keys(things).reduce((acc, x) => {
    let val = things[x][browser];
    let icon = getIcon(things[x][browser]);
    if (val?.includes?.('Stub')) icon = 'stub';
    if (icon === 'bug') icon = 'no';

    acc[icon] = (acc[icon] ?? 0) + 1;
    return acc;
  }, {});

  data.total = Object.keys(things).length;

  return data;
};

const makeGraph = (data, label, clas) => `<div class="stats ${clas}">
<span>${label}</span>
<div>
${['yes', 'patch', 'no', 'unknown', 'stub'].filter(x => data[x]).map(x => `<div class="stat-${x}" style="width: ${(data[x] / data.total) * 100}%">${x}</div>`).join('\n')}
</div>
</div>#`;

const buildGraphs = (things, label) => {
  let out = '';

  console.log(things);

  for (const browser of [ 'chrome', 'firefox' ]) {
    const data = getData(things, browser);
    out += makeGraph(data, `<div class="icon-${browser}"></div> <span style="vertical-align: middle">${label}</span>`, browser);
  }

  return out;
};

const makeGraphs = methods => {
  let out = '';
  out += buildGraphs(methods, 'Methods');
  out += buildGraphs(Object.values(methods).reduce((acc, x) => {
    for (const y in x.parameters) {
      acc[Math.random()] = x.parameters[y];
    }

    return acc;
  }, {}), 'Options');

  // Swap order to be in browser chunks nicely
  out = out.split('#');

  let t = out[1];
  out[1] = out[2];
  out[2] = t;

  out = out.join('\n');

  return out;
};

import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';

const template = readFileSync('template.html', 'utf8');

let content = '';
let links = '';
for (const file of await readdirSync('data')) {
  const { name, methods } = (await import('./data/' + file)).default;

  content += `<h1 id="${name.toLowerCase()}">${name}</h1>
${makeGraphs(methods)}

${makeTable(methods)}\n\n`;

  links += `<a href="#${name.toLowerCase()}">${name}</a>`;
}

writeFileSync('docs/index.html', template
  .replace('_content_', content)
  .replace('_links_', links));