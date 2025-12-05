# GitHub & NPM Publishing Guide

## 📦 NPM Package Information

**Package Name:** `@gagansaddal/fastify-enterprise-boilerplate`

**Installation:**
```bash
npx @gagansaddal/fastify-enterprise-boilerplate my-project
# or
npm create @gagansaddal/fastify-enterprise-boilerplate my-project
```

---

## 🔗 Step 1: Initialize Git Repository

```bash
cd /media/nsl/d11f4b2c-5b98-4250-90a8-b265531c511c/Create-Fastify-Panel

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Production-grade Fastify boilerplate with email and push notifications"
```

---

## 🌐 Step 2: Create GitHub Repository

### Option A: Using GitHub CLI (gh)

```bash
# Install GitHub CLI if not already installed
# sudo apt install gh  # Linux
# brew install gh      # macOS

# Login to GitHub
gh auth login

# Create repository
gh repo create fastify-enterprise-boilerplate \
  --public \
  --description "Production-grade Node.js + Fastify boilerplate with JWT auth, RBAC, Prisma ORM, email service, push notifications" \
  --source=. \
  --remote=origin \
  --push
```

### Option B: Manual GitHub Setup

1. Go to https://github.com/new
2. Repository name: `fastify-enterprise-boilerplate`
3. Description: "Production-grade Node.js + Fastify boilerplate with JWT auth, RBAC, Prisma ORM, email service, push notifications"
4. Choose Public
5. Don't initialize with README (we already have one)
6. Click "Create repository"

Then run:
```bash
git remote add origin https://github.com/gagansaddal/fastify-enterprise-boilerplate.git
git branch -M main
git push -u origin main
```

---

## 📦 Step 3: Publish to NPM

### Prerequisites

1. **Create NPM Account** (if you don't have one)
   - Go to https://www.npmjs.com/signup
   - Create account with username: `gagansaddal`

2. **Login to NPM**
   ```bash
   npm login
   # Enter your NPM credentials
   ```

3. **Verify Login**
   ```bash
   npm whoami
   # Should output: gagansaddal
   ```

### Publishing Steps

```bash
# 1. Make sure you're in the project directory
cd /media/nsl/d11f4b2c-5b98-4250-90a8-b265531c511c/Create-Fastify-Panel

# 2. Test the package locally (optional)
npm pack
# This creates a .tgz file you can inspect

# 3. Publish to NPM
npm publish --access public

# For scoped packages (@gagansaddal/...), you MUST use --access public
```

### Version Updates

When you make changes and want to publish updates:

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish --access public
```

---

## 🎯 Step 4: Add NPM Badge to README

Add this to the top of your README.md:

```markdown
[![npm version](https://badge.fury.io/js/@gagansaddal%2Ffastify-enterprise-boilerplate.svg)](https://www.npmjs.com/package/@gagansaddal/fastify-enterprise-boilerplate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/gagansaddal/fastify-enterprise-boilerplate.svg)](https://github.com/gagansaddal/fastify-enterprise-boilerplate/stargazers)
```

---

## 📝 Step 5: Create GitHub Releases

After publishing to NPM, create a GitHub release:

```bash
# Using GitHub CLI
gh release create v1.0.0 \
  --title "v1.0.0 - Initial Release" \
  --notes "Production-grade Fastify boilerplate with email and push notifications"

# Or manually at:
# https://github.com/gagansaddal/fastify-enterprise-boilerplate/releases/new
```

---

## 🔄 Automated Publishing (Optional)

Create `.github/workflows/publish.yml` for automatic NPM publishing:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then add your NPM token to GitHub secrets:
1. Generate token at https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Add to GitHub: Settings → Secrets → New repository secret
3. Name: `NPM_TOKEN`, Value: your token

---

## 📊 Package Statistics

After publishing, your package will be available at:
- **NPM:** https://www.npmjs.com/package/@gagansaddal/fastify-enterprise-boilerplate
- **GitHub:** https://github.com/gagansaddal/fastify-enterprise-boilerplate
- **NPM Stats:** https://npm-stat.com/charts.html?package=@gagansaddal/fastify-enterprise-boilerplate

---

## 🎉 Usage After Publishing

Users can create new projects using your boilerplate:

```bash
# Using npx (recommended)
npx @gagansaddal/fastify-enterprise-boilerplate my-awesome-api

# Or install globally
npm install -g @gagansaddal/fastify-enterprise-boilerplate
create-fastify-enterprise-boilerplate my-awesome-api
```

---

## 🔧 Maintenance

### Update Package

1. Make your changes
2. Commit to git
3. Update version: `npm version patch/minor/major`
4. Push to GitHub: `git push && git push --tags`
5. Publish to NPM: `npm publish --access public`

### Unpublish (if needed)

```bash
# Unpublish specific version
npm unpublish @gagansaddal/fastify-enterprise-boilerplate@1.0.0

# Unpublish entire package (within 72 hours)
npm unpublish @gagansaddal/fastify-enterprise-boilerplate --force
```

**Note:** Unpublishing is discouraged. Use deprecation instead:
```bash
npm deprecate @gagansaddal/fastify-enterprise-boilerplate@1.0.0 "Use version 1.0.1 instead"
```

---

## ✅ Checklist

Before publishing, ensure:

- [ ] All tests pass: `npm test`
- [ ] README is complete and accurate
- [ ] LICENSE file exists
- [ ] .gitignore is properly configured
- [ ] package.json has correct information
- [ ] No sensitive data in repository
- [ ] Version number is correct
- [ ] Git repository is clean

---

## 🆘 Troubleshooting

### Error: "Package name already exists"

If `@gagansaddal/fastify-enterprise-boilerplate` is taken, try:
- `@gagansaddal/fastify-pro-boilerplate`
- `@gagansaddal/fastify-starter-kit`
- `@gagansaddal/fastify-api-boilerplate`

Check availability:
```bash
npm view @gagansaddal/fastify-enterprise-boilerplate
# If it returns 404, the name is available
```

### Error: "You must be logged in"

```bash
npm logout
npm login
```

### Error: "402 Payment Required"

Your package name might be reserved. Use a scoped package (`@username/package-name`).

---

## 📞 Support

- **Issues:** https://github.com/gagansaddal/fastify-enterprise-boilerplate/issues
- **Discussions:** https://github.com/gagansaddal/fastify-enterprise-boilerplate/discussions
- **NPM:** https://www.npmjs.com/package/@gagansaddal/fastify-enterprise-boilerplate

---

**Ready to publish!** 🚀
