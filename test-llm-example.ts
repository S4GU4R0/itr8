import { parseInput } from './src/lib/parser';

const example = `
P: User authentication issues
P: Password reset complexity
P: Security vulnerabilities

S: Implement OAuth2
S: Use JWT tokens
S: Add two-factor authentication

I: OAuth2 with Google
I: JWT with refresh tokens
I: SMS-based 2FA

User authentication issues --solves--> Implement OAuth2
Implement OAuth2 --iterates--> OAuth2 with Google
User authentication issues --solves--> Use JWT tokens
Use JWT tokens --iterates--> JWT with refresh tokens
Password reset complexity --solves--> Add two-factor authentication
Add two-factor authentication --iterates--> SMS-based 2FA
Security vulnerabilities --causes--> User authentication issues
`;

console.log('Parsing llm.txt software development example...');
const result = parseInput(example);
console.log(`Items parsed: ${result.items.length}`);
console.log(`Connections parsed: ${result.connections.length}`);
console.log(`Errors: ${result.errors.length}`);
if (result.errors.length > 0) {
  result.errors.forEach(e => console.error(e));
}

// Expect 9 items (3P + 3S + 3I)
const expectedItems = 9;
const expectedConnections = 7;

if (result.items.length === expectedItems) {
  console.log(`✓ Correct number of items: ${expectedItems}`);
} else {
  console.error(`❌ Expected ${expectedItems} items, got ${result.items.length}`);
}

if (result.connections.length === expectedConnections) {
  console.log(`✓ Correct number of connections: ${expectedConnections}`);
} else {
  console.error(`❌ Expected ${expectedConnections} connections, got ${result.connections.length}`);
}

// Check each connection type
const connTypes = result.connections.map(c => c.type);
const expectedTypes = ['solves', 'iterates', 'solves', 'iterates', 'solves', 'iterates', 'causes'];
let typePass = true;
connTypes.forEach((t, i) => {
  if (t !== expectedTypes[i]) {
    console.error(`❌ Connection ${i} expected type ${expectedTypes[i]}, got ${t}`);
    typePass = false;
  }
});
if (typePass) {
  console.log('✓ All connection types match');
}

if (result.errors.length === 0 && result.items.length === expectedItems && result.connections.length === expectedConnections && typePass) {
  console.log('\n✅ All checks passed! The parser correctly handles llm.txt syntax.');
} else {
  console.error('\n❌ Some checks failed.');
  process.exit(1);
}