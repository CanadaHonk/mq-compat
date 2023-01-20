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


import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';

const template = readFileSync('template.html', 'utf8');

let content = '';
let links = '';
for (const file of await readdirSync('data')) {
  const { name, methods } = (await import('./data/' + file)).default;

  content += `<h1 id="${name.toLowerCase()}">${name}</h1>
${makeTable(methods)}\n\n`;

  links += `<a href="#${name.toLowerCase()}">${name}</a>`;
}

writeFileSync('docs/index.html', template
  .replace('_content_', content)
  .replace('_links_', links));