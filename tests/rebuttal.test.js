const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function load(file, context) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}

test('supplementary results cover frontier and medical population models and all 3–10 drug counts', () => {
  const context = vm.createContext({});
  load('static/js/rebuttal_data.js', context);
  const results = context.REBUTTAL_RESULTS;
  assert.equal(results.population.length, 9);
  assert.equal(results.polyRisk.length, 24);
  assert.deepEqual([...new Set(Array.from(results.polyRisk, row => row.drugs))].sort((a, b) => a - b), [3, 4, 5, 6, 7, 8, 9, 10]);
  assert.equal(results.population.find(row => row.model === 'GPT-5.6-Luna').adult, 74.70);
  assert.equal(results.polyRisk.find(row => row.model === 'GPT-5.6-Luna' && row.drugs === 10).n, 84);
});

test('page includes a visible supplementary results region and preserves original leaderboards', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /id="largeTable"/);
  assert.match(html, /id="smallTable"/);
  assert.match(html, /id="rebuttal-results"/);
  assert.match(html, /static\/js\/rebuttal_data\.js/);
});

test('Large task label distinguishes Set-F1 from Exact Match', () => {
  const source = fs.readFileSync(path.join(root, 'static/js/index.js'), 'utf8');
  assert.match(source, /LARGE_TASKS\[largeSelectedTask\]\.metric/);
});

test('population comparison includes all nine original models and seven additions', () => {
  const source = fs.readFileSync(path.join(root, 'static/js/rebuttal_render.js'), 'utf8');
  assert.match(source, /LARGE_MODELS\.map/);
  assert.match(source, /LARGE_DATA\[index\]\[0\]/);
});

test('polypharmacy percentages match the evaluation aggregate when available', (t) => {
  const context = vm.createContext({});
  load('static/js/rebuttal_data.js', context);
  const sourcePath = path.join(root, '..', '..', 'results', 'frontier_api', 'frontier_poly_balanced_metrics.csv');
  if (!fs.existsSync(sourcePath)) return t.skip('Parent rebuttal results are not part of the standalone website repository');
  const csv = fs.readFileSync(sourcePath, 'utf8').trim().split(/\r?\n/);
  const columns = csv.shift().split(',');
  const sourceRows = csv.map(line => Object.fromEntries(line.split(',').map((value, i) => [columns[i], value]))).filter(row => /^\d+$/.test(row.drug_count));
  const aliases = { 'gpt-5.6-luna': 'GPT-5.6-Luna', 'deepseek-v4-pro': 'DeepSeek-V4-Pro', 'qwen3.6-plus': 'Qwen3.6-Plus' };
  assert.equal(sourceRows.length, 24);
  for (const source of sourceRows) {
    const row = context.REBUTTAL_RESULTS.polyRisk.find(item => item.model === aliases[source.model] && item.drugs === Number(source.drug_count));
    assert.ok(row, `${source.model} / ${source.drug_count}`);
    assert.equal(row.n, Number(source.valid_records));
    assert.equal(row.accuracy, Number((100 * Number(source.accuracy)).toFixed(2)));
    assert.equal(row.balanced, Number((100 * Number(source.balanced_accuracy)).toFixed(2)));
    assert.equal(row.macroF1, Number((100 * Number(source.macro_f1)).toFixed(2)));
  }
});

test('page characterizes the expanded 3–10 drug datasets', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /314,057/);
  assert.match(html, /146,979/);
  assert.match(html, /167,078/);
});

test('small-source comparison reports the measured evidence difference', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /\+0\.0729/);
  assert.match(html, /\+0\.0133/);
});

test('Dataset Explorer indexes every local JSON/JSONL data file when parent data is available', (t) => {
  const dataRoot = path.join(root, '..', '..', 'data');
  if (!fs.existsSync(dataRoot)) return t.skip('Parent data directory is not part of the standalone website repository');
  const context = vm.createContext({});
  load('static/js/data.js', context);
  const listed = new Set(Array.from(context.DATASET_CATEGORIES, category => Array.from(category.subs, sub => sub.file)).flat());
  const actual = fs.globSync('**/*.{json,jsonl}', { cwd: dataRoot }).map(value => value.replaceAll('\\', '/'));
  assert.equal(listed.size, actual.length);
  for (const file of actual) assert.ok(listed.has(file), `Missing ${file}`);
});

test('Dataset Explorer offers a direct download for a 6-drug dataset', () => {
  const context = vm.createContext({});
  load('static/js/data.js', context);
  assert.equal(context.getDownloadUrl('Large/multiple_drug_prediction/ddi_prediction/6_drug.jsonl'),
    'https://huggingface.co/datasets/JM00113/SafeDrug/resolve/main/data/Large/multiple_drug_prediction/ddi_prediction/6_drug.jsonl?download=true');
});
