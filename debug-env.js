const { execSync } = require('child_process');
require('dotenv').config();

console.log('Running prisma generate with env...');
try {
    execSync('npx prisma generate', { stdio: 'inherit' }); // process.env is inherited by default
} catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
}
