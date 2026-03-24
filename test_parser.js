// Copy the parseConnectionLine function from parser.ts
function normalizeTitle(title) {
  return title.trim().toLowerCase();
}

function parseConnectionLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return null;
  
  const connectionPatterns = [
    /^(.+?)\s*(?<!-)--(?![\\-])\s*(solves|causes|iterates|breaks-down|breaks down|related)\s*-->\s*(.+)$/i,
    /^(.+?)\s*-->(?!\s*-->)\s*(.+)$/,
  ];
  
  for (const pattern of connectionPatterns) {
    const match = trimmed.match(pattern);
    if (match) {
      const fromTitle = match[1].trim();
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
  // Valid per spec
  { line: 'Slow website performance --solves--> Implement caching', expected: { type: 'solves' } },
  { line: 'Implement caching --iterates--> Redis caching v2', expected: { type: 'iterates' } },
  { line: 'High server costs --solves--> Use CDN', expected: { type: 'solves' } },
  { line: 'Use CDN --iterates--> CloudFront CDN setup', expected: { type: 'iterates' } },
  { line: 'Slow website performance --causes--> High server costs', expected: { type: 'causes' } },
  { line: 'Slow website performance --> High server costs', expected: { type: 'related' } },
  { line: 'Slow website performance --breaks-down--> Sub problem', expected: { type: 'breaks-down' } },
  // Invalid per spec (should return null)
  { line: 'Slow website performance -> High server costs', expected: null },
  { line: 'Slow website performance -solves-> Implement caching', expected: null },
  { line: 'Slow website performance --> solves --> Implement caching', expected: null },
  { line: 'Slow website performance -- solves --> Implement caching', expected: { type: 'solves' } }, // maybe allowed
  { line: 'Slow website performance ---solves--> Implement caching', expected: null },
  { line: 'Slow website performance -- -solves--> Implement caching', expected: null }, // space then dash before type
  { line: 'Slow website performance --breaks down--> Sub problem', expected: { type: 'breaks-down' } }, // allowed?
];

console.log('Testing parseConnectionLine:');
for (const tc of testCases) {
  const result = parseConnectionLine(tc.line);
  if (result === null && tc.expected === null) {
    console.log('✓', tc.line);
  } else if (result && tc.expected && result.type === tc.expected.type) {
    console.log('✓', tc.line, '->', result.type);
  } else {
    console.log('✗', tc.line);
    console.log('  Expected:', tc.expected ? tc.expected.type : null);
    console.log('  Got:', result ? result.type : null);
  }
}
