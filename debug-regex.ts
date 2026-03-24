const pattern = /^(.+?)\s*--(?![\-])\s*(solves|causes|iterates|breaks-down|breaks down|related)\s*-->\s*(.+)$/i;
const str = 'P: Title ---solves--> Target';
console.log('Testing pattern 1:', pattern.test(str));
if (pattern.test(str)) {
  const match = str.match(pattern);
  console.log(match);
}

const pattern2 = /^(.+?)\s*-->\s*(.+)$/;
console.log('Testing pattern 2:', pattern2.test(str));
if (pattern2.test(str)) {
  const match = str.match(pattern2);
  console.log(match);
}

// Also test without the P: prefix
const str2 = 'Title ---solves--> Target';
console.log('Testing str2 with pattern1:', pattern.test(str2));
console.log('Testing str2 with pattern2:', pattern2.test(str2));