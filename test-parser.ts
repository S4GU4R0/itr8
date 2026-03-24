import { parseInput } from './src/lib/parser';

console.log('Testing parser against llm.txt syntax...\n');

// Test cases from llm.txt
const testCases = [
  // Item definitions
  { input: 'P: Slow website performance', expectedType: 'problem', expectedTitle: 'Slow website performance' },
  { input: 'P: High server costs', expectedType: 'problem', expectedTitle: 'High server costs' },
  { input: 'S: Implement caching', expectedType: 'solution', expectedTitle: 'Implement caching' },
  { input: 'S: Use CDN', expectedType: 'solution', expectedTitle: 'Use CDN' },
  { input: 'I: Redis caching v2', expectedType: 'iteration', expectedTitle: 'Redis caching v2' },
  { input: 'I: CloudFront CDN setup', expectedType: 'iteration', expectedTitle: 'CloudFront CDN setup' },
  // Connections
  { input: 'Slow website performance --solves--> Implement caching', expectedConn: { from: 'Slow website performance', to: 'Implement caching', type: 'solves' } },
  { input: 'Implement caching --iterates--> Redis caching v2', expectedConn: { from: 'Implement caching', to: 'Redis caching v2', type: 'iterates' } },
  { input: 'High server costs --solves--> Use CDN', expectedConn: { from: 'High server costs', to: 'Use CDN', type: 'solves' } },
  { input: 'Use CDN --iterates--> CloudFront CDN setup', expectedConn: { from: 'Use CDN', to: 'CloudFront CDN setup', type: 'iterates' } },
  { input: 'Slow website performance --causes--> High server costs', expectedConn: { from: 'Slow website performance', to: 'High server costs', type: 'causes' } },
  // Breaks-down
  { input: 'Slow website performance --breaks-down--> Checkout button hidden', expectedConn: { from: 'Slow website performance', to: 'Checkout button hidden', type: 'breaks-down' } },
  // Default related
  { input: 'Slow website performance --> High server costs', expectedConn: { from: 'Slow website performance', to: 'High server costs', type: 'related' } },
  // Description quotes
  { input: 'P: Checkout button hidden \"Make it orange\"', expectedType: 'problem', expectedTitle: 'Checkout button hidden', expectedDesc: 'Make it orange' },
  // Alternative item syntax (should also work)
  { input: 'problem: Slow website performance', expectedType: 'problem', expectedTitle: 'Slow website performance' },
  { input: 'solution: Implement caching', expectedType: 'solution', expectedTitle: 'Implement caching' },
  { input: 'iteration: Redis caching v2', expectedType: 'iteration', expectedTitle: 'Redis caching v2' },
];

let passed = 0;
let failed = 0;

for (const test of testCases) {
  const result = parseInput(test.input);
  if ('expectedType' in test) {
    // Item test
    const item = result.items[0];
    if (!item) {
      console.error(`❌ Failed: ${test.input} - No item parsed`);
      failed++;
      continue;
    }
    if (item.type !== test.expectedType) {
      console.error(`❌ Failed: ${test.input} - Expected type ${test.expectedType}, got ${item.type}`);
      failed++;
    } else if (item.title !== test.expectedTitle) {
      console.error(`❌ Failed: ${test.input} - Expected title "${test.expectedTitle}", got "${item.title}"`);
      failed++;
    } else if ('expectedDesc' in test && item.description !== test.expectedDesc) {
      console.error(`❌ Failed: ${test.input} - Expected description "${test.expectedDesc}", got "${item.description}"`);
      failed++;
    } else {
      console.log(`✓ ${test.input}`);
      passed++;
    }
  } else {
    // Connection test
    const conn = result.connections[0];
    if (!conn) {
      console.error(`❌ Failed: ${test.input} - No connection parsed`);
      failed++;
      continue;
    }
    if (conn.fromTitle !== test.expectedConn.from) {
      console.error(`❌ Failed: ${test.input} - Expected from "${test.expectedConn.from}", got "${conn.fromTitle}"`);
      failed++;
    } else if (conn.toTitle !== test.expectedConn.to) {
      console.error(`❌ Failed: ${test.input} - Expected to "${test.expectedConn.to}", got "${conn.toTitle}"`);
      failed++;
    } else if (conn.type !== test.expectedConn.type) {
      console.error(`❌ Failed: ${test.input} - Expected type "${test.expectedConn.type}", got "${conn.type}"`);
      failed++;
    } else {
      console.log(`✓ ${test.input}`);
      passed++;
    }
  }
}

console.log(`\nTotal: ${passed} passed, ${failed} failed`);

// Also test that undocumented patterns still work (optional)
console.log('\n--- Testing undocumented patterns (should still work) ---');
const extraTests = [
  'P: Title --solves--> Target',
  'P: Title --causes--> Target',
  'P: Title --iterates--> Target',
  'P: Title --breaks-down--> Target',
  'P: Title --related--> Target',
  'P: Title --> Target',
  'P: Title -> Target',
  'P: Title -solves-> Target',
  'P: Title --solves --> Target', // space before arrow
  'P: Title -- solves --> Target', // spaces around type
];
for (const input of extraTests) {
  const result = parseInput(input);
  if (result.items.length > 0 || result.connections.length > 0) {
    console.log(`✓ ${input}`);
  } else {
    console.log(`⚠ ${input} - not parsed`);
  }
}

// Check for any patterns that should NOT be parsed (invalid)
console.log('\n--- Testing invalid patterns (should not parse) ---');
const invalidTests = [
  'P: Title ---solves--> Target', // three dashes
  'P: Title --solves---> Target', // three dashes after
];
for (const input of invalidTests) {
  const result = parseInput(input);
  if (result.items.length === 0 && result.connections.length === 0) {
    console.log(`✓ ${input} correctly rejected`);
  } else {
    console.log(`❌ ${input} incorrectly parsed`);
  }
}