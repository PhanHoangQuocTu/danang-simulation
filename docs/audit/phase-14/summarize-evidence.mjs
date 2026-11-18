import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const directory = 'docs/audit/phase-14/evidence';
const read = (name) => JSON.parse(readFileSync(join(directory, name), 'utf8').replace(/^\uFEFF/, ''));
const baseline = read('baseline-browser.json');
const after = read('after-browser.json');
const release = read('release-browser.json');
const stories = read('storybook-browser.json');
const check = (report, name) => report.checks.find((entry) => entry.name === name)?.result;
const files = (path) =>
  readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const target = join(path, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  });
const chunks = files('.next/static/chunks').filter((file) => file.endsWith('.js'));
const matrix = readFileSync('docs/audit/phase-14/TEST_MATRIX.md', 'utf8');
const ids = [...matrix.matchAll(/^\| (IMG-\d{2}) \| (\w+) \|/gm)];
if (ids.length !== 72 || new Set(ids.map((entry) => entry[1])).size !== 72)
  throw new Error('IMG matrix must contain 72 unique IDs');
const summary = {
  node: after.node,
  browser: after.browser,
  gpu: after.gpu,
  afterChecks: after.checks.length,
  afterFailures: after.checks.filter((entry) => entry.status !== 'PASS'),
  releaseChecks: release.checks.length,
  releaseFailures: release.checks.filter((entry) => entry.status !== 'PASS'),
  storyChecks: stories.checks.length,
  storyEvents: stories.events,
  baselineIdle: check(baseline, 'desktop-idle-performance'),
  afterIdle: check(after, 'desktop-idle-performance'),
  afterDebug: check(after, 'F3-diagnostics')?.performance,
  afterFixture: check(after, 'imagery-inspector')?.performance,
  releaseProfile: check(release, 'performance-profile'),
  spaCycles: check(after, 'spa-lifecycle').map((entry) => ({ geometries: entry.geometries, textures: entry.textures })),
  normalUnexpectedEvents: after.events.filter((entry, index) => {
    const weather = index >= after.networkNegativeStart && index < after.networkNegativeEnd;
    const context = index >= after.contextNegativeStart && index < after.contextNegativeEnd;
    const expectedWeather =
      weather && entry.method === 'Network.loadingFailed' && entry.params.blockedReason === 'inspector';
    const expectedContext =
      context &&
      entry.method === 'Runtime.consoleAPICalled' &&
      entry.params.type === 'log' &&
      entry.params.args.some(
        (argument) =>
          typeof argument.value === 'string' && /^THREE\.WebGLRenderer: Context (Lost|Restored)\.$/.test(argument.value)
      );
    return !expectedWeather && !expectedContext;
  }),
  bundle: {
    files: chunks.length,
    uncompressedJsBytes: chunks.reduce((sum, file) => sum + statSync(file).size, 0),
    baseline: null,
    comparable: false,
  },
  matrix: Object.fromEntries(
    [...new Set(ids.map((entry) => entry[2]))].map((status) => [
      status,
      ids.filter((entry) => entry[2] === status).length,
    ])
  ),
};
writeFileSync(join(directory, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(
  JSON.stringify({
    after: summary.afterChecks,
    release: summary.releaseChecks,
    stories: summary.storyChecks,
    unexpected: summary.normalUnexpectedEvents.length,
    storyEvents: summary.storyEvents.length,
    bundle: summary.bundle,
    matrix: summary.matrix,
  })
);
