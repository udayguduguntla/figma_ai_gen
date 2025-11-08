#!/usr/bin/env node

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 AI Figma Generator - Complete Setup & Start\n');

// Function to run command and return promise
function runCommand(command, cwd = process.cwd(), options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Running: ${command}`);
    const child = spawn(command, [], {
      cwd,
      stdio: options.silent ? 'pipe' : 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

// Function to check if dependencies are installed
function checkDependencies() {
  const checks = [
    { dir: '.', file: 'node_modules' },
    { dir: 'backend', file: 'node_modules' },
    { dir: 'frontend', file: 'node_modules' }
  ];

  return checks.every(({ dir, file }) => {
    const fullPath = path.join(dir, file);
    return fs.existsSync(fullPath);
  });
}

// Function to check if environment files exist
function checkEnvFiles() {
  const envFiles = [
    'backend/.env',
    'frontend/.env.local'
  ];

  envFiles.forEach(file => {
    const exampleFile = `${file}.example`;
    if (!fs.existsSync(file) && fs.existsSync(exampleFile)) {
      console.log(`📝 Creating ${file} from example...`);
      fs.copyFileSync(exampleFile, file);
    }
  });
}

async function main() {
  try {
    // Step 1: Verify setup
    console.log('🔍 Step 1: Verifying setup...');
    try {
      execSync('node verify-setup.js', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠️  Setup verification found issues, continuing with setup...\n');
    }

    // Step 2: Install dependencies if needed
    if (!checkDependencies()) {
      console.log('📦 Step 2: Installing dependencies...');
      
      console.log('Installing root dependencies...');
      await runCommand('npm install');
      
      console.log('Installing backend dependencies...');
      await runCommand('npm install', './backend');
      
      console.log('Installing frontend dependencies...');
      await runCommand('npm install', './frontend');
      
      console.log('✅ Dependencies installed successfully!\n');
    } else {
      console.log('✅ Step 2: Dependencies already installed\n');
    }

    // Step 3: Setup environment files
    console.log('⚙️  Step 3: Setting up environment files...');
    checkEnvFiles();
    console.log('✅ Environment files ready\n');

    // Step 4: Test API (optional)
    console.log('🧪 Step 4: Testing API...');
    console.log('Starting backend for testing...');
    
    const backend = spawn('npm', ['run', 'dev'], {
      cwd: './backend',
      stdio: 'pipe',
      shell: true
    });

    // Wait for backend to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      execSync('node test-api.js', { stdio: 'inherit' });
      console.log('✅ API test passed!\n');
    } catch (error) {
      console.log('⚠️  API test failed, but continuing...\n');
    }

    // Kill test backend
    backend.kill();
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 5: Start the application
    console.log('🎉 Step 5: Starting the application...');
    console.log('Backend will start on: http://localhost:5000');
    console.log('Frontend will start on: http://localhost:3000');
    console.log('\nPress Ctrl+C to stop the application\n');

    // Start backend
    const backendProcess = spawn('npm', ['run', 'dev'], {
      cwd: './backend',
      stdio: 'inherit',
      shell: true
    });

    // Wait for backend to start
    setTimeout(() => {
      // Start frontend
      const frontendProcess = spawn('npm', ['run', 'dev'], {
        cwd: './frontend',
        stdio: 'inherit',
        shell: true
      });

      // Handle process termination
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down...');
        backendProcess.kill();
        frontendProcess.kill();
        process.exit(0);
      });

      frontendProcess.on('close', (code) => {
        console.log(`Frontend exited with code ${code}`);
        backendProcess.kill();
        process.exit(code);
      });

      backendProcess.on('close', (code) => {
        console.log(`Backend exited with code ${code}`);
        frontendProcess.kill();
        process.exit(code);
      });

    }, 3000);

    backendProcess.on('close', (code) => {
      console.log(`Backend exited with code ${code}`);
      process.exit(code);
    });

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 Try running individual steps:');
    console.log('   npm run verify   # Check setup');
    console.log('   npm run setup    # Install dependencies');
    console.log('   npm run dev      # Start manually');
    process.exit(1);
  }
}

main();