#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

console.log('🧪 Running Discord Bot Tests...');
console.log('================================');

const testDir = path.join(__dirname, 'src', 'tests', 'unit');
const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.test.js'));

let totalTests = 0;
let passedTests = 0;

for (const testFile of testFiles) {
	console.log(`\n📄 Running ${testFile}...`);
	try {
		require(path.join(testDir, testFile));
		passedTests++;
	}
	catch (error) {
		console.error(`❌ Test file ${testFile} failed:`);
		console.error(error.message);
	}
	totalTests++;
}

console.log('\n================================');
console.log(`📊 Test Results: ${passedTests}/${totalTests} test files passed`);

if (passedTests === totalTests) {
	console.log('✅ All tests passed!');
	process.exit(0);
}
else {
	console.log('❌ Some tests failed!');
	process.exit(1);
}