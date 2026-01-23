// Simple test runner
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`✓ ${name}`);
        passed++;
    } catch (e) {
        console.log(`✗ ${name}`);
        console.log(`  ${e.message}`);
        failed++;
    }
}

// Tests
console.log('Running images tests...\n');

const RACCOON_KEYS = ['liquor', 'mpr', 'conrad', 'rebecca', 'melanie', 'toronto', 'stuck', 'alligator'];

test('all raccoon result images exist', () => {
    const missing = [];
    RACCOON_KEYS.forEach(raccoon => {
        const imgPath = path.join('.', 'images', `${raccoon}.png`);
        if (!fs.existsSync(imgPath)) {
            missing.push(imgPath);
        }
    });
    if (missing.length > 0) {
        throw new Error(`Missing images: ${missing.join(', ')}`);
    }
});

test('all whosthatraccoon animation images exist', () => {
    const expectedImages = ['bg.png', 'trike_s.png', 'mpr_s.png', 'conrad_s.png', 'alligator_s.png', 'paint_s.png'];
    const missing = [];
    expectedImages.forEach(img => {
        const imgPath = path.join('.', 'images', 'whosthatraccoon', img);
        if (!fs.existsSync(imgPath)) {
            missing.push(imgPath);
        }
    });
    if (missing.length > 0) {
        throw new Error(`Missing images: ${missing.join(', ')}`);
    }
});

test('index.html image paths have no leading slash', () => {
    const html = fs.readFileSync('./index.html', 'utf8');
    const badPaths = html.match(/src="\/images\//g);
    if (badPaths) {
        throw new Error(`Found ${badPaths.length} image paths with leading slash in index.html`);
    }
});

test('styles.css image paths have no leading slash', () => {
    const css = fs.readFileSync('./styles.css', 'utf8');
    const badPaths = css.match(/url\("\/images\//g) || css.match(/url\('\/images\//g);
    if (badPaths) {
        throw new Error(`Found ${badPaths.length} image paths with leading slash in styles.css`);
    }
});

test('quiz.js image paths have no leading slash', () => {
    const js = fs.readFileSync('./quiz.js', 'utf8');
    const badPaths = js.match(/src="\/images\//g) || js.match(/src='\/images\//g);
    if (badPaths) {
        throw new Error(`Found ${badPaths.length} image paths with leading slash in quiz.js`);
    }
});

test('quiz.js uses correct relative image paths', () => {
    const js = fs.readFileSync('./quiz.js', 'utf8');
    // Check that image paths use the pattern images/${raccoon}.png (relative)
    const goodPaths = js.match(/src="images\/\$\{/g);
    if (!goodPaths || goodPaths.length < 2) {
        throw new Error('Expected at least 2 relative image paths in quiz.js');
    }
});

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
