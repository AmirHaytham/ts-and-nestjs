// Runs the TypeScript examples (01 to 07) in order and prints their output,
// then the decorator metadata from the NestJS project.
//   node run-all.js          everything
//   node run-all.js 04 07    only those folders

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const only = process.argv.slice(2).map((a) => a.padStart(2, '0'));

const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;

const folders = fs
  .readdirSync(__dirname)
  .filter((d) => /^0[1-7]-/.test(d) || d.startsWith('09-'))
  .filter((d) => only.length === 0 || only.includes(d.slice(0, 2)))
  .sort();

function run(cmd, cwd) {
  const r = spawnSync(cmd, { cwd, shell: true, encoding: 'utf8' });
  return ((r.stdout || '') + (r.stderr || '')).trimEnd();
}

for (const name of folders) {
  const dir = path.join(__dirname, name);
  console.log('\n' + cyan('='.repeat(70)));
  console.log(bold(cyan('  ' + name)));
  console.log(cyan('='.repeat(70)));

  if (!fs.existsSync(path.join(dir, 'node_modules'))) {
    console.log(dim('  installing dependencies, first run only...'));
    run('npm install --silent --no-audit --no-fund', dir);
  }

  console.log(run(name.startsWith('09-') ? 'npm run peek --silent' : 'npm start --silent', dir));
}

console.log('\n' + bold(`Done. Ran ${folders.length} folder${folders.length === 1 ? '' : 's'}.`) + '\n');
