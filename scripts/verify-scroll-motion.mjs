import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main = readFileSync(new URL('../src/main.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

assert.match(main, /useScrollPossession/, 'React app should install a scroll-linked possession motion controller.');
assert.match(main, /--parade-progress/, 'Controller should write parade progress into a CSS custom property.');
assert.match(main, /--haunt-progress/, 'Controller should write global haunt progress from the first viewport.');
assert.match(css, /--parade-progress/, 'CSS should consume parade progress for the Night Parade sequence.');
assert.match(css, /--haunt-progress/, 'CSS should consume global haunt progress for site-wide pressure.');
assert.match(css, /--hero-depth/, 'CSS should consume global hero depth for base parallax.');
assert.match(main, /possession-field/, 'The page should render a fixed global possession field.');
assert.match(main, /parade-pressers/, 'Night Parade should render foreground possession ghosts.');
assert.match(css, /parade-presser/, 'Foreground possession ghosts should have scroll-driven styling.');
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/, 'Motion should respect reduced-motion preferences.');
assert.match(css, /calc\([^)]*var\(--parade-progress\)/, 'Night Parade transforms should be driven by scroll progress.');
