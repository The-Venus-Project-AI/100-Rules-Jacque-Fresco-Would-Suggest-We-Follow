# GitHub Pages Deployment

This document explains how to deploy the RBE Platform dashboard to GitHub Pages.

## 🚀 Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment. Every push to the `main` branch will automatically build and deploy the frontend to GitHub Pages.

### Setup Steps

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **Push your code to trigger deployment:**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor the deployment:**
   - Go to the "Actions" tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow run
   - Once complete, your site will be available at:
     `https://yourusername.github.io/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow/`

## 🔧 Manual Deployment

If you prefer manual deployment or want to deploy from a different branch:

### Prerequisites
```bash
cd frontend
npm install
```

### Deploy Command
```bash
npm run deploy
```

This will:
1. Build the production version of your app
2. Deploy it to the `gh-pages` branch
3. GitHub Pages will automatically serve from this branch

## 📁 Configuration Details

### Vite Configuration
The `vite.config.ts` has been configured with:
- **Base path**: Set to your repository name for GitHub Pages compatibility
- **Production builds**: Automatically use the correct base path

### GitHub Actions Workflow
The `.github/workflows/deploy.yml` workflow:
- Triggers on pushes to `main` branch
- Builds the frontend using Node.js 20
- Deploys to GitHub Pages automatically
- Uses the latest GitHub Actions for security and performance

## 🌐 Accessing Your Deployed Site

Once deployed, your dashboard will be available at:
```
https://yourusername.github.io/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow/
```

Replace `yourusername` with your actual GitHub username.

## 🔄 Updating Your Site

To update your deployed site:
1. Make changes to your code
2. Commit and push to the `main` branch
3. GitHub Actions will automatically rebuild and redeploy

## 🐛 Troubleshooting

### Common Issues

1. **404 Error on GitHub Pages:**
   - Ensure the base path in `vite.config.ts` matches your repository name
   - Check that the GitHub Actions workflow completed successfully

2. **Assets Not Loading:**
   - Verify the base path configuration
   - Check browser developer tools for 404 errors

3. **Workflow Fails:**
   - Check the Actions tab for error details
   - Ensure all dependencies are properly listed in `package.json`

### Manual Fixes

If automatic deployment fails, you can manually deploy:
```bash
cd frontend
npm run build
npm run deploy
```

## 📊 Monitoring Deployments

- **GitHub Actions**: Monitor build status in the Actions tab
- **GitHub Pages**: Check deployment status in Settings → Pages
- **Site Health**: Use browser developer tools to verify all resources load correctly

## 🔒 Security Notes

- The GitHub Actions workflow uses secure, official actions
- No sensitive data should be committed to the repository
- The frontend is static and safe for public hosting

---

For more information about GitHub Pages, visit the [official documentation](https://docs.github.com/en/pages).
