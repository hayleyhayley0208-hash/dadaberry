# DadaBerry Website

A lightweight NestJS application optimized for Netlify's free tier.

## Features

- Built with NestJS framework
- Serverless function deployment on Netlify
- Modern, responsive landing page
- Minimal dependencies for fast builds

## Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building

```bash
npm run build
```

This will:
1. Build the NestJS application
2. Compile the Netlify serverless function

## Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. The site will be deployed automatically on each push

### Build Settings (already configured)

- **Build command**: `npm install && npm run build`
- **Publish directory**: `.` (root)
- **Functions directory**: `netlify/functions`

## Project Structure

```
.
├── src/
│   ├── app.controller.ts    # Main controller with landing page
│   ├── app.module.ts        # Root module
│   └── main.ts              # Application entry point
├── netlify/
│   └── functions/
│       └── serverless.ts    # Netlify serverless function handler
├── netlify.toml             # Netlify configuration
├── package.json
└── tsconfig.json
```

## Notes

- The application uses serverless functions to minimize compute usage on Netlify's free tier
- All routes are handled through a single serverless function
- The landing page is served directly from the controller to keep it simple and fast

