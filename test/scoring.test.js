// Simple test runner
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

function assertEqual(actual, expected, msg = '') {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`${msg}\n  Expected: ${JSON.stringify(expected)}\n  Actual: ${JSON.stringify(actual)}`);
    }
}

// Import the function (works in Node.js)
eval(require('fs').readFileSync('./scoring.js', 'utf8'));

// Tests
console.log('Running scoring.js tests...\n');

test('returns single winner with highest score', () => {
    const scores = { a: 5, b: 3, c: 1 };
    const result = calculateResults(scores);
    assertEqual(result.winners, ['a']);
    assertEqual(result.runnerUp, 'b');
});

test('returns multiple winners on tie', () => {
    const scores = { a: 5, b: 5, c: 2 };
    const result = calculateResults(scores);
    assertEqual(result.winners, ['a', 'b']);
    assertEqual(result.runnerUp, 'c');
});

test('returns null runnerUp when all scores tied', () => {
    const scores = { a: 3, b: 3, c: 3 };
    const result = calculateResults(scores);
    assertEqual(result.winners, ['a', 'b', 'c']);
    assertEqual(result.runnerUp, null);
});

test('returns null runnerUp with only one raccoon', () => {
    const scores = { a: 5 };
    const result = calculateResults(scores);
    assertEqual(result.winners, ['a']);
    assertEqual(result.runnerUp, null);
});

test('handles two-way tie for first with runner-up', () => {
    const scores = { a: 4, b: 4, c: 2, d: 1 };
    const result = calculateResults(scores);
    assertEqual(result.winners, ['a', 'b']);
    assertEqual(result.runnerUp, 'c');
});

test('sorted array contains all entries in descending order', () => {
    const scores = { a: 1, b: 5, c: 3 };
    const result = calculateResults(scores);
    assertEqual(result.sorted[0][0], 'b');
    assertEqual(result.sorted[0][1], 5);
    assertEqual(result.sorted[1][0], 'c');
    assertEqual(result.sorted[2][0], 'a');
});

test('handles all zero scores', () => {
    const scores = { a: 0, b: 0, c: 0 };
    const result = calculateResults(scores);
    assertEqual(result.winners, ['a', 'b', 'c']);
    assertEqual(result.runnerUp, null);
});

test('handles realistic quiz scores', () => {
    const scores = {
        liquor: 2, mpr: 3, conrad: 1, rebecca: 4,
        melanie: 2, toronto: 3, stuck: 1, alligator: 0
    };
    const result = calculateResults(scores);
    assertEqual(result.winners, ['rebecca']);
    assertEqual(result.runnerUp, 'mpr');
});

// buildResultComboKey
test('single winner produces just the raccoon key', () => {
    assertEqual(buildResultComboKey(['trike']), 'trike');
});

test('two winners joined with plus', () => {
    assertEqual(buildResultComboKey(['trike', 'mpr']), 'mpr+trike');
});

test('winners sorted alphabetically so order does not matter', () => {
    assertEqual(buildResultComboKey(['mpr', 'trike']), buildResultComboKey(['trike', 'mpr']));
});

test('three-way tie sorted alphabetically', () => {
    assertEqual(buildResultComboKey(['trike', 'alligator', 'mpr']), 'alligator+mpr+trike');
});

test('does not mutate the original winners array', () => {
    const winners = ['trike', 'alligator'];
    buildResultComboKey(winners);
    assertEqual(winners, ['trike', 'alligator']);
});

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
