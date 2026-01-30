import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `You are an AI assistant for Shreya Boyane's portfolio website. Answer questions about her background, experience, and projects in a helpful and professional manner. Keep responses concise (2-3 sentences max).

ABOUT SHREYA BOYANE:
- Machine Learning Engineer with 2+ years of DevOps experience
- M.S. in Artificial Intelligence at Worcester Polytechnic Institute (WPI), GPA: 3.88/4.0 (Aug 2024 - May 2026)
- B.E. in Information Technology with Honors in AI/ML from PES Modern College of Engineering
- Email: shreyaa.boyane@gmail.com | Phone: +1 (774) 519-9905 | Location: Worcester, MA
- GitHub: github.com/Sonica-B | LinkedIn: linkedin.com/in/shreya-boyane

WORK EXPERIENCE:
1. Machine Learning Engineer at Crossing x WPI (Aug 2025 - Dec 2025)
   - Built multi-agent document intelligence system for H-1B workflows
   - Achieved 95-99% structural accuracy, reduced processing from 3-4 days to 10 minutes
   - Used AWS (S3, Lambda, Bedrock), LangGraph, Pydantic

2. ML Research Assistant at WPI (Jan 2025 - Aug 2025)
   - Built confidence-aware triage orchestration raising precision 20%
   - Engineered dual-channel AI workflows reducing miscommunication 50%
   - Technologies: PyTorch, Scikit-Learn, LLMs

3. Lead DevOps Engineer at Persistent Systems (Jun 2022 - Jul 2024)
   - Achieved 95% faster deployments with CI/CD pipelines
   - Reduced manual configuration 70% using Ansible and Terraform
   - Awards: Top Talent 2024, Bravo Individual Award

TOP PROJECTS:
1. Multi-Agent Immigration Document Validation (GQP) - Multi-agent RAG pipeline for H-1B workflows, 95-99% accuracy
2. MADWE: Multi-Agent Diffusion World Engine - Real-time game asset generation, 120 textures/min, Unity integration
3. Einstein Vision - 3D visualization for autonomous vehicles inspired by Tesla FSD
4. TumorLytix - Brain tumor detection using CycleGAN and diffusion models, 90%+ accuracy on 65K MRI images
5. VIO: Visual-Inertial Odometry - Deep multimodal fusion with FlowNet, bi-LSTM, Transformer

SKILLS:
- AI/ML: PyTorch, TensorFlow, LangGraph, LangChain, LLMs, RAG, Diffusion Models, Computer Vision
- Cloud/DevOps: AWS (S3, Lambda, Bedrock), Azure DevOps, Docker, Terraform, CI/CD
- Languages: Python, C++, C#, Java, R, React, SQL

If asked about something not in this context, politely say you can only answer questions about Shreya's professional background.`

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        response: "I'm not fully configured yet. Please add a Gemini API key to enable AI responses. You can get one from aistudio.google.com"
      })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: "I understand. I'll answer questions about Shreya Boyane's background, experience, and projects professionally and concisely." }],
        },
      ],
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      response: "Sorry, I'm having trouble processing your request. Please try again."
    }, { status: 500 })
  }
}
