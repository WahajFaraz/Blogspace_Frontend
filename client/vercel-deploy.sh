#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting Vercel deployment..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
  echo "Installing Vercel CLI..."
  npm install -g vercel@latest
fi

# Install project dependencies
echo "🔧 Installing dependencies..."
npm ci --prefer-offline --no-audit

# Build the project
echo "🔨 Building project..."
export NODE_OPTIONS=--max_old_space_size=4096
node vercel-build.mjs

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod --confirm --token=$VERCEL_TOKEN

echo "✅ Deployment completed successfully!"
