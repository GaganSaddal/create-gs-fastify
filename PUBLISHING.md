# Create GS Fastify - Publishing Guide

## 📦 NPM Package Information

**Package Name:** `create-gs-fastify`

**Usage:**
```bash
npm create gs-fastify my-project
npm init gs-fastify my-project
npx create-gs-fastify my-project
```

---

## 🔗 Step 1: Update GitHub Repository

Since you've already set up GitHub, update the repository name if needed:

```bash
# If you need to rename the repository on GitHub:
# Go to Settings → Repository name → Rename to "create-gs-fastify"

# Update local remote URL
git remote set-url origin https://github.com/gagansaddal/create-gs-fastify.git
```

---

## 📦 Step 2: Publish to NPM

### Prerequisites

1. **Login to NPM**
   ```bash
   npm login
   # Enter your NPM credentials
   ```

2. **Verify Login**
   ```bash
   npm whoami
   # Should output your username
   ```

### Publishing Steps

```bash
# 1. Make sure you're in the project directory
cd /media/nsl/d11f4b2c-5b98-4250-90a8-b265531c511c/Create-Fastify-Panel

# 2. Test the package locally (optional)
npm pack
# This creates a .tgz file you can inspect

# 3. Test the CLI locally
npm link
create-gs-fastify test-project
cd test-project && npm install

# 4. If everything works, publish to NPM
npm publish
```

**Note:** Since the package name is `create-gs-fastify` (not scoped), you don't need `--access public`.

---

## 🎯 How It Works

When users run:
```bash
npm create gs-fastify my-project
```

NPM automatically:
1. Looks for package named `create-gs-fastify`
2. Downloads and runs it
3. Passes `my-project` as an argument
4. The CLI clones your repository
5. Sets up the project with the given name

---

## 🧪 Testing Before Publishing

### Test Locally

```bash
# Link the package globally
npm link

# Test it
create-gs-fastify test-app
cd test-app
npm install
npm run dev

# Clean up
cd ..
rm -rf test-app
npm unlink -g create-gs-fastify
```

### Test After Publishing

```bash
# Test npm create
npm create gs-fastify test-project

# Test npm init
npm init gs-fastify test-project

# Test npx
npx create-gs-fastify test-project
```

---

## 🔄 Version Updates

When you make changes:

```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0

# Commit and push
git push && git push --tags

# Publish
npm publish
```

---

## 📊 Package Statistics

After publishing, your package will be available at:
- **NPM:** https://www.npmjs.com/package/create-gs-fastify
- **GitHub:** https://github.com/gagansaddal/create-gs-fastify
- **NPM Stats:** https://npm-stat.com/charts.html?package=create-gs-fastify

---

## 🎨 Customization

### Update CLI Banner

Edit `bin/cli.js` to customize the welcome message.

### Change Repository URL

Update `REPO_URL` in `bin/cli.js` if you change the GitHub repository name.

---

## ✅ Pre-Publish Checklist

- [x] Package name is `create-gs-fastify`
- [x] `bin/cli.js` is executable (`chmod +x bin/cli.js`)
- [x] `bin` field in package.json points to CLI
- [x] README updated with correct commands
- [x] GitHub repository exists
- [x] All tests pass
- [ ] Tested locally with `npm link`
- [ ] Ready to publish

---

## 🚀 Publishing Commands

```bash
# First time publish
npm publish

# Update and republish
npm version patch
git push && git push --tags
npm publish
```

---

## 🆘 Troubleshooting

### Error: "Package name already exists"

Check if the name is available:
```bash
npm view create-gs-fastify
# If it returns 404, the name is available
```

If taken, try alternatives:
- `create-fastify-gs`
- `gs-fastify-create`
- `create-gagan-fastify`

### Error: "ENOENT: no such file or directory"

Make sure `bin/cli.js` exists and is executable:
```bash
chmod +x bin/cli.js
```

### CLI doesn't work after publishing

1. Check the `bin` field in package.json
2. Ensure the shebang `#!/usr/bin/env node` is at the top of cli.js
3. Verify the file is executable

---

## 📞 Support

- **Issues:** https://github.com/gagansaddal/create-gs-fastify/issues
- **NPM:** https://www.npmjs.com/package/create-gs-fastify

---

**Ready to publish!** 🚀

Users will be able to create new projects with:
```bash
npm create gs-fastify my-awesome-api
```
