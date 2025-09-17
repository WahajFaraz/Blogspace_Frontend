# Vercel Deployment Guide

This guide will help you deploy your Vite + React application to Vercel.

## Prerequisites

1. Node.js (v16 or later)
2. npm or yarn
3. Vercel account (sign up at [vercel.com](https://vercel.com))
4. Vercel CLI (optional, but recommended)

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
VITE_API_BASE_URL=https://blogs-backend-ebon.vercel.app/api/v1
```

## Local Development

1. Install dependencies:
   ```bash
   npm install --force
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Deploying to Vercel

### Option 1: Using Vercel Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [Vercel Dashboard](https://vercel.com/dashboard).
3. Click "Add New..." > "Project".
4. Import your Git repository.
5. Configure the project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install --force`
6. Add environment variables from your `.env` file.
7. Click "Deploy".

### Option 2: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```
   For production:
   ```bash
   vercel --prod
   ```

### Option 3: Using the deployment script

1. Make the script executable (Linux/Mac):
   ```bash
   chmod +x vercel-deploy.sh
   ```

2. Run the deployment script:
   ```bash
   ./vercel-deploy.sh
   ```

## Environment Variables in Vercel

Make sure to add the following environment variables in your Vercel project settings:

- `VITE_API_BASE_URL`: Your API base URL

## Troubleshooting

1. **Build Fails**
   - Check the build logs in the Vercel dashboard
   - Ensure all dependencies are properly installed
   - Make sure the Node.js version in your project matches Vercel's

2. **Environment Variables Not Working**
   - Ensure all environment variables are added to Vercel
   - Variable names should start with `VITE_` to be accessible in the client
   - Redeploy after adding new environment variables

3. **Routing Issues**
   - Ensure the `_redirects` file is being copied to the build output
   - Check the Vercel project settings for proper routing configuration

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
