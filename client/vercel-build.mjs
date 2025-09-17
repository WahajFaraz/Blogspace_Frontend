import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting Vercel build process...');

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install --force', { stdio: 'inherit' });
  console.log('Dependencies installed successfully');
} catch (error) {
  console.error('Error installing dependencies:', error);
  process.exit(1);
}

// Run the build
console.log('Running build...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}

// Create a _redirects file for client-side routing
console.log('Creating _redirects file...');
try {
  const redirectsContent = '/* /index.html 200';
  const distPath = join(process.cwd(), 'dist');
  
  // Ensure dist directory exists
  if (!existsSync(distPath)) {
    mkdirSync(distPath, { recursive: true });
  }
  
  writeFileSync(join(distPath, '_redirects'), redirectsContent);
  console.log('_redirects file created successfully');
} catch (error) {
  console.error('Error creating _redirects file:', error);
  process.exit(1);
}

console.log('Vercel build process completed successfully!');
