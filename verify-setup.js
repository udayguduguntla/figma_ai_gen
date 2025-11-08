const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying AI Figma Generator Setup...\n');

// Check required files
const requiredFiles = [
  'backend/server.js',
  'backend/routes/design.js',
  'backend/routes/figma.js',
  'backend/services/AIProcessor.js',
  'backend/services/DesignGenerator.js',
  'backend/services/FigmaService.js',
  'backend/database/mockDB.js',
  'backend/templates/designTemplates.js',
  'backend/utils/demoData.js',
  'frontend/src/pages/index.js',
  'frontend/src/store/designStore.js',
  'frontend/src/components/PromptInput.js',
  'frontend/src/components/GenerationProgress.js',
  'frontend/src/components/DesignPreview.js',
  'frontend/src/components/FigmaExport.js',
  'frontend/src/pages/_app.tsx',
  'frontend/src/styles/globals.css'
];

let allFilesExist = true;

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check package.json files
console.log('\n📦 Checking package.json files...');
const packageFiles = [
  'package.json',
  'backend/package.json',
  'frontend/package.json'
];

packageFiles.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
      console.log(`✅ ${file} - Valid JSON`);
    } catch (error) {
      console.log(`❌ ${file} - Invalid JSON: ${error.message}`);
      allFilesExist = false;
    }
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check for TypeScript conflicts
console.log('\n🔍 Checking for TypeScript conflicts...');
const tsFiles = [
  'frontend/src/pages/index.tsx',
  'frontend/src/store/designStore.ts',
  'frontend/src/components/PromptInput.tsx',
  'frontend/src/components/GenerationProgress.tsx',
  'frontend/src/components/DesignPreview.tsx',
  'frontend/src/components/FigmaExport.tsx'
];

let hasConflicts = false;
tsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`⚠️  ${file} - TypeScript file exists (may cause conflicts)`);
    hasConflicts = true;
  }
});

if (!hasConflicts) {
  console.log('✅ No TypeScript conflicts found');
}

// Check environment files
console.log('\n⚙️  Checking environment files...');
const envFiles = [
  { file: 'backend/.env.example', required: true },
  { file: 'backend/.env', required: false },
  { file: 'frontend/.env.local.example', required: true },
  { file: 'frontend/.env.local', required: false }
];

envFiles.forEach(({ file, required }) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else if (required) {
    console.log(`❌ ${file} - MISSING (required)`);
    allFilesExist = false;
  } else {
    console.log(`⚠️  ${file} - Missing (optional)`);
  }
});

// Summary
console.log('\n📊 Summary:');
if (allFilesExist && !hasConflicts) {
  console.log('🎉 Setup verification PASSED!');
  console.log('\n🚀 Ready to start:');
  console.log('   npm run setup    # Install dependencies');
  console.log('   npm start        # Start the application');
  console.log('   npm run test:api # Test the API');
} else {
  console.log('❌ Setup verification FAILED!');
  console.log('\n🔧 Issues found:');
  if (!allFilesExist) {
    console.log('   - Missing required files');
  }
  if (hasConflicts) {
    console.log('   - TypeScript/JavaScript conflicts');
  }
  console.log('\n💡 Try running: npm run setup');
}

console.log('\n📚 Documentation:');
console.log('   README.md        # Full documentation');
console.log('   QUICK_START.md   # Quick start guide');