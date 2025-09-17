#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Vercel deployment..."

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel@latest
fi

# Ensure we're in the client directory
cd "$(dirname "$0")"

# Install dependencies
echo "🔧 Installing dependencies..."
npm install --force

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
