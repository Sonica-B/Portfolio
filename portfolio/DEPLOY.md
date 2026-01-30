# Deployment Guide - Shreya Boyane Portfolio

## Prerequisites

### 1. Get Gemini API Key
1. Go to https://aistudio.google.com/apikey
2. Click "Create API Key"
3. Copy the key and save it

### 2. Install Google Cloud CLI
**Windows:**
1. Download from: https://cloud.google.com/sdk/docs/install
2. Run the installer
3. Open a new terminal after installation

**Or use PowerShell:**
```powershell
# Download installer
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:TEMP\GoogleCloudSDKInstaller.exe")
# Run installer
& "$env:TEMP\GoogleCloudSDKInstaller.exe"
```

### 3. Initialize Google Cloud
```bash
# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing)
gcloud projects create shreya-portfolio-2026 --name="Portfolio"

# Set the project
gcloud config set project shreya-portfolio-2026

# Enable billing (required for Cloud Run)
# Go to: https://console.cloud.google.com/billing

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

## Deployment

### Deploy to Cloud Run
Run this command from the `portfolio` directory:

```bash
gcloud run deploy portfolio \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE \
  --labels dev-tutorial=devnewyear2026
```

**Replace `YOUR_GEMINI_API_KEY_HERE` with your actual Gemini API key.**

### Verify Deployment
```bash
# Check the service URL
gcloud run services describe portfolio --region us-central1 --format="value(status.url)"

# Verify the label
gcloud run services describe portfolio --region us-central1 --format="value(metadata.labels)"
```

## Local Development

### Run locally
```bash
npm run dev
```
Open http://localhost:3000

### Build for production
```bash
npm run build
npm start
```

## Project Structure
```
portfolio/
├── app/
│   ├── api/chat/route.ts    # Gemini AI endpoint
│   ├── globals.css          # Tailwind styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── NeuralNetwork.tsx    # 3D visualization
│   ├── Hero.tsx             # Hero section
│   ├── About.tsx            # Terminal-style about
│   ├── Projects.tsx         # Project cards
│   ├── Experience.tsx       # Timeline
│   ├── Skills.tsx           # Tech stack
│   ├── Contact.tsx          # Contact info
│   └── ChatBot.tsx          # Gemini chatbot
├── Dockerfile               # Cloud Run container
└── package.json
```

## Features
- Interactive 3D Neural Network (Three.js/React Three Fiber)
- Gemini AI-powered chatbot
- Terminal-style about section
- Responsive dark theme
- Smooth animations (Framer Motion)

## Tech Stack
- Next.js 14
- React Three Fiber
- Tailwind CSS
- Framer Motion
- Google Gemini API
- Google Cloud Run
