const fs = require('fs');
const path = require('path');

// Navigate up from the scripts directory to the project root
const projectRoot = path.resolve(__dirname, '..');

const sourceDir = path.join(projectRoot, 'node_modules', 'onnxruntime-web', 'dist');
const targetDir = path.join(projectRoot, 'public', 'wasm');

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory not found: ${sourceDir}`);
  process.exit(1);
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.readdirSync(sourceDir).forEach(file => {
  if (file.endsWith('.wasm')) {
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
    console.log(`Copied ${file} to public/wasm/`);
  }
});

console.log('WASM files copied successfully.');