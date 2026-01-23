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

// Import the questions (works in Node.js)
const questionsCode = require('fs').readFileSync('./questions.js', 'utf8');
eval(questionsCode.replace('const questions', 'var questions'));

// Tests
console.log('Running questions.js tests...\n');

test('all questions have 4 answers', () => {
    questions.forEach((q, i) => {
        if (q.answers.length !== 4) {
            throw new Error(`Question ${i + 1} has ${q.answers.length} answers, expected 4`);
        }
    });
});

test('all answers map to exactly 2 raccoons', () => {
    questions.forEach((q, i) => {
        q.answers.forEach((a, j) => {
            if (a.raccoons.length !== 2) {
                throw new Error(`Question ${i + 1}, answer ${j + 1} has ${a.raccoons.length} raccoons, expected 2`);
            }
        });
    });
});

test('all raccoons appear equal number of times', () => {
    const raccoonCounts = {};
    questions.forEach(q => {
        q.answers.forEach(a => {
            a.raccoons.forEach(r => {
                raccoonCounts[r] = (raccoonCounts[r] || 0) + 1;
            });
        });
    });

    const counts = Object.values(raccoonCounts);
    const expectedCount = counts[0];
    const unequal = Object.entries(raccoonCounts).filter(([, c]) => c !== expectedCount);
    if (unequal.length > 0) {
        throw new Error(`Raccoons have unequal counts: ${JSON.stringify(raccoonCounts)}`);
    }
});

test('all raccoon keys are valid', () => {
    const validRaccoons = ['liquor', 'mpr', 'conrad', 'rebecca', 'melanie', 'toronto', 'stuck', 'alligator'];
    questions.forEach((q, i) => {
        q.answers.forEach((a, j) => {
            a.raccoons.forEach(r => {
                if (!validRaccoons.includes(r)) {
                    throw new Error(`Question ${i + 1}, answer ${j + 1} has invalid raccoon: ${r}`);
                }
            });
        });
    });
});

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
