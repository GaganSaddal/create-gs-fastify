#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get project name from command line argument
const projectName = process.argv[2] || 'my-fastify-app';

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Create GS Fastify - Enterprise Boilerplate          ║
║                                                           ║
║   Production-grade Fastify REST API                      ║
║   by Gagan Saddal                                        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

console.log(`📦 Creating new Fastify project: ${projectName}\n`);

try {
  // Get the template directory (where this package is installed)
  const templateDir = path.join(__dirname, '..');
  const targetDir = path.join(process.cwd(), projectName);

  // Create target directory
  console.log('⏳ Creating project directory...');
  if (fs.existsSync(targetDir)) {
    console.error(`\n❌ Error: Directory "${projectName}" already exists!`);
    process.exit(1);
  }
  fs.mkdirSync(targetDir, { recursive: true });

  // Copy all files except node_modules, bin, and package-specific files
  console.log('📁 Copying template files...');
  
  const excludeDirs = ['node_modules', 'bin', '.git'];
  const excludeFiles = ['index.js', 'NPM_PUBLISH_GUIDE.md', 'PUBLISHING.md'];

  function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    
    if (stats.isDirectory()) {
      const dirName = path.basename(src);
      if (excludeDirs.includes(dirName)) return;
      
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      
      const files = fs.readdirSync(src);
      files.forEach(file => {
        copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      const fileName = path.basename(src);
      if (excludeFiles.includes(fileName)) return;
      
      fs.copyFileSync(src, dest);
    }
  }

  copyRecursive(templateDir, targetDir);

  // Update package.json with project name
  console.log('📝 Updating package.json...');
  const packageJsonPath = path.join(targetDir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = projectName;
    packageJson.version = '0.1.0';
    delete packageJson.bin;
    delete packageJson.publishConfig;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  }

  console.log('\n✅ Project created successfully!\n');
  console.log('📋 Next steps:\n');
  console.log(`   cd ${projectName}`);
  console.log('   npm install');
  console.log('   cp .env.example .env');
  console.log('   npm run docker:up');
  console.log('   npm run prisma:migrate');
  console.log('   npm run prisma:seed');
  console.log('   npm run dev\n');
  console.log('📚 Documentation:');
  console.log('   - README.md - Complete setup guide');
  console.log('   - Swagger UI - http://localhost:3000/docs\n');
  console.log('🎉 Happy coding!\n');
} catch (error) {
  console.error('\n❌ Error creating project:', error.message);
  console.error(error.stack);
  process.exit(1);
}
