<div align="center">

# Shreya Boyane | AI Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live-shreyaboyane.dev-00d4ff?style=for-the-badge&logo=vercel&logoColor=white)](https://shreyaboyane.dev)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<br />

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" alt="-----------------------------------------------------" width="100%">

### An immersive, interactive portfolio featuring a sci-fi neural network background, draggable glass-morphic bubbles, and AI-powered chat.

<br />

[View Live Site](https://shreyaboyane.dev) · [Report Bug](https://github.com/Sonica-B/Portfolio/issues) · [Request Feature](https://github.com/Sonica-B/Portfolio/issues)

</div>

<br />

## Features

<table>
<tr>
<td width="50%">

### Interactive Neural Network
- Real-time animated neural mesh with 280+ nodes
- Signal pulses that propagate through connections
- Mouse parallax effect for depth perception
- Organic wave-like node movement
- Dynamic twinkling effect simulating neural activity

</td>
<td width="50%">

### Glass-Morphic Navigation Bubbles
- Draggable bubbles with spring physics
- Morphing blob shapes with CSS animations
- Iridescent rim effects
- Click or drag to navigate sections
- 3D rotation on drag

</td>
</tr>
<tr>
<td width="50%">

### AI-Powered Chat
- Integrated Google Gemini AI
- Context-aware responses about my background
- Real-time streaming responses
- Sleek glass UI design

</td>
<td width="50%">

### Apple-Inspired Design
- Minimalist dark theme
- Smooth Framer Motion animations
- Backdrop blur glass effects
- Responsive layout
- Custom Inter typography

</td>
</tr>
</table>

<br />

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Animations** | Framer Motion |
| **AI Integration** | Google Gemini API |
| **Deployment** | Vercel |

<br />

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Sonica-B/Portfolio.git

# Navigate to portfolio directory
cd Portfolio/portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

<br />

## Environment Variables

Create a `.env.local` file in the `portfolio` directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

<br />

## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── chat/          # AI chat endpoint
│   │   └── linkedin/      # LinkedIn integration
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/
│   ├── Scene3D.tsx        # Neural network background
│   ├── SoapBubbles3D.tsx  # Navigation bubbles
│   ├── LandingPage.tsx    # Main landing section
│   ├── ChatBot.tsx        # AI chat interface
│   └── ...                # Section components
└── public/
    └── shreya.png         # Profile image
```

<br />

## Deployment

This project is configured for automatic deployment on Vercel:

1. Push to `master` branch
2. Vercel automatically builds and deploys
3. Preview deployments for pull requests

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sonica-B/Portfolio)

<br />

## Performance

- Optimized Three.js rendering with instanced meshes
- Lazy loading for heavy components
- Static generation where possible
- Edge-optimized API routes

<br />

## Connect

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-shreyaboyane.dev-00d4ff?style=for-the-badge)](https://shreyaboyane.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/shreyaboyane)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Sonica-B)

</div>

<br />

---

<div align="center">

**Built with passion by Shreya Boyane**

*MS in Artificial Intelligence @ Worcester Polytechnic Institute*

</div>
