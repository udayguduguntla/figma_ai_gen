const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up AI Figma Generator...\n');

// Function to run commands
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { cwd, stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error running command: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Function to copy file if it doesn't exist
function copyEnvFile(source, destination) {
  if (!fs.existsSync(destination)) {
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, destination);
      console.log(`✅ Created ${destination}`);
    } else {
      console.log(`⚠️  ${source} not found, skipping...`);
    }
  } else {
    console.log(`✅ ${destination} already exists`);
  }
}

// Install root dependencies
console.log('📦 Installing root dependencies...');
if (!runCommand('npm install')) {
  console.error('❌ Failed to install root dependencies');
  process.exit(1);
}

// Install backend dependencies
console.log('\n📦 Installing backend dependencies...');
if (!runCommand('npm install', './backend')) {
  console.error('❌ Failed to install backend dependencies');
  process.exit(1);
}

// Install frontend dependencies
console.log('\n📦 Installing frontend dependencies...');
if (!runCommand('npm install', './frontend')) {
  console.error('❌ Failed to install frontend dependencies');
  process.exit(1);
}

// Setup environment files
console.log('\n⚙️  Setting up environment files...');
copyEnvFile('./backend/.env.example', './backend/.env');
copyEnvFile('./frontend/.env.local.example', './frontend/.env.local');

// Create necessary directories
const dirs = ['./backend/logs', './backend/uploads', './frontend/.next'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('\n🎉 Setup complete!');
console.log('\n📝 Next steps:');
console.log('1. Add your OpenAI API key to backend/.env (optional - app works without it)');
console.log('2. Run "npm run dev" to start both frontend and backend');
console.log('3. Open http://localhost:3000 in your browser');
console.log('\n💡 Tips:');
console.log('- The app works without OpenAI API key using fallback generation');
console.log('- Get a Figma access token from Figma → Settings → Account → Personal access tokens');
console.log('- Try prompts like "e-commerce app" or "social media platform"');