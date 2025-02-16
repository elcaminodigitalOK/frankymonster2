const { execSync } = require('child_process');

// Removed unnecessary code

// Get git hash with fallback
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'no-git-info';
  }
};

const commitJson = {
  hash: JSON.stringify(getGitHash()),
  version: JSON.stringify(process.env.npm_package_version),
};

console.log(`
★═══════════════════════════════════════★
          B O L T . D I Y
         ⚡️  Welcome  ⚡️
★═══════════════════════════════════════★
`);
console.log('📍 Current Version Tag:', `v${commitJson.version}`);
console.log('📍 Current Commit Version:', commitJson.hash);
console.log('  Please wait until the URL appears here');
console.log('★═══════════════════════════════════════★');

// Execute the actual command
const { spawn } = require('child_process');
const child = spawn('pnpm', ['run', 'dev'], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code));
