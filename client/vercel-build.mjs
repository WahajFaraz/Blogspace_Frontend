import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

const runCommand = (command, errorMessage, options = {}) => {
  try {
    log(`Running: ${command}`);
    execSync(command, { 
      stdio: 'inherit',
      shell: '/bin/bash',
      ...options
    });
    return true;
  } catch (error) {
    console.error(`❌ ${errorMessage}:`, error.message);
    return false;
  }
};

async function main() {
  log('🚀 Starting Vercel build process...');

  // Install dependencies with explicit Vite installation
  log('📦 Installing dependencies...');
  const installCommands = [
    'npm install -g npm@latest',
    'npm install --force',
    'npm install -g vite',
    'npm install --save-dev vite@latest',
    'npm rebuild'
  ];

  for (const cmd of installCommands) {
    if (!runCommand(cmd, `Error running: ${cmd}`, { cwd: process.cwd() })) {
      process.exit(1);
    }
  }

  // Run the build
  log('🔨 Building application...');
  if (!runCommand('npm run build', 'Error during build')) {
    process.exit(1);
  }

  // Create _redirects file for client-side routing
  log('📝 Creating _redirects file...');
  try {
    const distPath = join(process.cwd(), 'dist');
    
    // Ensure dist directory exists
    if (!existsSync(distPath)) {
      log('ℹ️ Creating dist directory...');
      mkdirSync(distPath, { recursive: true });
    }
    
    const redirectsPath = join(distPath, '_redirects');
    const redirectsContent = '/* /index.html 200';
    
    writeFileSync(redirectsPath, redirectsContent);
    log('✅ _redirects file created successfully');
  } catch (error) {
    console.error('❌ Error creating _redirects file:', error);
    process.exit(1);
  }

  log('🎉 Vercel build process completed successfully!');
}

// Run the main function
main().catch(error => {
  console.error('❌ Unhandled error in build process:', error);
  process.exit(1);
});
