function parseConnectionLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  
  const connectionPatterns = [
    // Typed connections: --solves--> etc.
    /^(.+?)\s*(?<!-)--(?!--)\s*(solves|causes|iterates|breaks-down|breaks down|related)\s*-->\s*(.+)$/i,
    // Default connection: --> (but not --> type -->)
    /^(?!.*(?:solves|causes|iterates|breaks-down|breaks down)\s*-->)(.+?)-->\s*(.+)$/i,
  ];
  
  for (const pattern of connectionPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      const fromTitle = match[1] ? match[1].trim() : '';
      let toTitle;
      let type = 'related';
      
      if (match.length === 4) {
        let typeStr = match[2].toLowerCase().replace(/\s+/g, '-');
        type = typeStr;
        toTitle = match[3].trim();
      } else {
        toTitle = match[2].trim();
      }
      
      if (!fromTitle || !toTitle) continue;
      
      return { fromTitle, toTitle, type };
    }
  }
  
  return null;
}

const testCases = [
  // Valid spec examples
  { line: 'Slow website performance --solves--> Implement caching', expectedType: 'solves' },
  { line: 'Implement caching --iterates--> Redis caching v2', expectedType: 'iterates' },
  { line: 'High server costs --solves--> Use CDN', expectedType: 'solves' },
  { line: 'Use CDN --iterates--> CloudFront CDN setup', expectedType: 'iterates' },
  { line: 'Slow website performance --causes--> High server costs', expectedType: 'causes' },
  { line: 'Slow website performance --> High server costs', expectedType: 'related' },
  { line: 'Slow website performance --breaks-down--> Sub problem', expectedType: 'breaks-down' },
  // Edge cases with spaces
  { line: 'Slow website performance -- solves --> Implement caching', expectedType: 'solves' },
  { line: 'Slow website performance --  iterates   --> Redis caching v2', expectedType: 'iterates' },
  // Invalid patterns (should return null)
  { line: 'Slow website performance -> High server costs', expectedType: null },
  { line: 'Slow website performance -solves-> Implement caching', expectedType: null },
  { line: 'Slow website performance --> solves --> Implement caching', expectedType: null },
  { line: 'Slow website performance ---solves--> Implement caching', expectedType: null },
  { line: 'Slow website performance -- -solves--> Implement caching', expectedType: null },
  // Ensure we don't break weird titles
  { line: 'foo-bar --solves--> target', expectedType: 'solves' },
  { line: 'foo -- bar --solves--> target', expectedType: 'solves' },
  { line: 'foo --bar --solves--> target', expectedType: 'solves' },
  { line: 'foo (with parens) --solves--> target (with parens)', expectedType: 'solves' },
  // Multiple dashes in title (should be fine)
  { line: 'foo--bar --solves--> target', expectedType: 'solves' },
  // Title ending with dash? Should fail due to lookbehind
  { line: 'foo- --solves--> target', expectedType: null },
  // Ensure we don't accept extra dashes after type before -->
  { line: 'foo --solves---> target', expectedType: null },
  // Ensure we don't accept missing >
  { line: 'foo --solves-- target', expectedType: null },
  // Ensure we don't accept extra spaces inside -->
  { line: 'foo --solves -- > target', expectedType: null },
];

console.log('Running comprehensive tests...');
let passed = 0, failed = 0;
for (const tc of testCases) {
  const result = parseConnectionLine(tc.line);
  if (result === null && tc.expectedType === null) {
    console.log('✓', tc.line);
    passed++;
  } else if (result && result.type === tc.expectedType) {
    console.log('✓', tc.line, '->', result.type);
    passed++;
  } else {
    console.log('✗', tc.line);
    console.log('  Expected:', tc.expectedType);
    console.log('  Got:', result ? result.type : null);
    failed++;
  }
}
console.log(`\nTotal: ${passed} passed, ${failed} failed`);
