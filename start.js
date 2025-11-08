#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting AI Figma Generator...\n');

// Start backend
console.log('📡 Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Wait a bit for backend to start
setTimeout(() => {
  console.log('🎨 Starting frontend...');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'inherit',
    shell: true
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

  frontend.on('close', (code) => {
    console.log(`Frontend exited with code ${code}`);
    backend.kill();
    process.exit(code);
  });

  backend.on('close', (code) => {
    console.log(`Backend exited with code ${code}`);
    frontend.kill();
    process.exit(code);
  });

}, 2000);

backend.on('close', (code) => {
  console.log(`Backend exited with code ${code}`);
  process.exit(code);
});