import { parseInput } from './src/lib/parser';

console.log('Testing updated parser...\n');

// Valid patterns from llm.txt
const validTests = [
  // Items
  { input: 'P: Slow website performance', expectedType: 'problem', expectedTitle: 'Slow website performance' },
  { input: 'S: Implement caching', expectedType: 'solution', expectedTitle: 'Implement caching' },
  { input: 'I: Redis caching v2', expectedType: 'iteration', expectedTitle: 'Redis caching v2' },
  // Connections
  { input: 'Slow website performance --solves--> Implement caching', expectedConn: { from: 'Slow website performance', to: 'Implement caching', type: 'solves' } },
  { input: 'Slow website performance --causes--> High server costs', expectedConn: { from: 'Slow website performance', to: 'High server costs', type: 'causes' } },
  { input: 'Implement caching --iterates--> Redis caching v2', expectedConn: { from: 'Implement caching', to: 'Redis caching v2', type: 'iterates' } },
  { input: 'Slow website performance --breaks-down--> Checkout button hidden', expectedConn: { from: 'Slow website performance', to: 'Checkout button hidden', type: 'breaks-down' } },
  // breaks down with space
  { input: 'Slow website performance --breaks down--> Checkout button hidden', expectedConn: { from: 'Slow website performance', to: 'Checkout button hidden', type: 'breaks-down' } },
  // Default related
  { input: 'Slow website performance --> High server costs', expectedConn: { from: 'Slow website performance', to: 'High server costs', type: 'related' } },
  // Descriptions
  { input: 'P: Checkout button hidden \"Make it orange\"', expectedType: 'problem', expectedTitle: 'Checkout button hidden', expectedDesc: 'Make it orange' },
];

// Invalid patterns that should NOT parse
const invalidTests = [
  // Undocumented patterns
  'Title -> Target',
  'Title -solves-> Target',
  'Title --> solves --> Target',
  'Title ---solves--> Target',
  'Title -- -solves--> Target',
  'Title --solves---> Target',
  'Title --solves --> Target', // space before arrow (should still work? actually allowed)
  'Title -- solves --> Target', // space before type (should still work)
  // Edge cases with extra dashes
  'Title ---solves---> Target',
  'Title ----solves--> Target',
  // Connection type word in title before default arrow
  'solves something --> Target',
  'causes something --> Target',
  // Mixed invalid
  'P: Title --solves---> Target',
];

let passed = 0;
let failed = 0;

console.log('=== Valid patterns (should parse) ===');
for (const test of validTests) {
  const result = parseInput(test.input);
  if ('expectedType' in test) {
    const item = result.items[0];
    if (!item) {
      console.error(`❌ ${test.input} - No item parsed`);
      failed++;
    } else if (item.type !== test.expectedType || item.title !== test.expectedTitle) {
      console.error(`❌ ${test.input} - Expected ${test.expectedType} "${test.expectedTitle}", got ${item.type} "${item.title}"`);
      failed++;
    } else {
      console.log(`✓ ${test.input}`);
      passed++;
    }
  } else {
    const conn = result.connections[0];
    if (!conn) {
      console.error(`❌ ${test.input} - No connection parsed`);
      failed++;
    } else if (conn.fromTitle !== test.expectedConn.from || conn.toTitle !== test.expectedConn.to || conn.type !== test.expectedConn.type) {
      console.error(`❌ ${test.input} - Expected ${test.expectedConn.from} --${test.expectedConn.type}--> ${test.expectedConn.to}, got ${conn.fromTitle} --${conn.type}--> ${conn.toTitle}`);
      failed++;
    } else {
      console.log(`✓ ${test.input}`);
      passed++;
    }
  }
}

console.log('\n=== Invalid patterns (should NOT parse) ===');
for (const input of invalidTests) {
  const result = parseInput(input);
  // Should have no connections and no items (except maybe items if line starts with P: etc.)
  // For simplicity, we expect no connections.
  if (result.connections.length === 0) {
    console.log(`✓ ${input} correctly rejected`);
    passed++;
  } else {
    console.error(`❌ ${input} incorrectly parsed as connection: ${result.connections[0].fromTitle} --${result.connections[0].type}--> ${result.connections[0].toTitle}`);
    failed++;
  }
}

console.log(`\nTotal: ${passed} passed, ${failed} failed`);

// Additional edge case: ensure default pattern doesn't capture typed connections
console.log('\n=== Edge: default pattern should not capture typed connections ===');
const typedButDefault = [
  'Title --solves--> Target',
  'Title --causes--> Target',
  'Title --iterates--> Target',
  'Title --breaks-down--> Target',
];
for (const input of typedButDefault) {
  const result = parseInput(input);
  const conn = result.connections[0];
  if (conn && conn.type === 'related') {
    console.error(`❌ ${input} incorrectly parsed as default related`);
    failed++;
  } else if (conn && conn.type !== 'related') {
    console.log(`✓ ${input} correctly typed as ${conn.type}`);
    passed++;
  }
}

// Test that whitespace variations still work
console.log('\n=== Whitespace variations (should work) ===');
const whitespaceTests = [
  'Title --solves --> Target',
  'Title -- solves --> Target',
  'Title --solves--> Target',
  'Title-->Target',
];
for (const input of whitespaceTests) {
  const result = parseInput(input);
  if (result.connections.length === 1) {
    console.log(`✓ ${input}`);
    passed++;
  } else {
    console.error(`❌ ${input} failed`);
    failed++;
  }
}

console.log(`\nFinal: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);