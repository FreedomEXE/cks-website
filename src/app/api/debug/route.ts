import { NextResponse } from 'next/server'

export async function GET() {
  const hasApiKey = !!process.env.RESEND_API_KEY
  const apiKeyPreview = process.env.RESEND_API_KEY
    ? `${process.env.RESEND_API_KEY.substring(0, 7)}...`
    : 'NOT SET'

  return NextResponse.json({
    resendApiKey: apiKeyPreview,
    hasApiKey,
    isConfigured: hasApiKey && process.env.RESEND_API_KEY !== 're_YOUR_API_KEY_HERE',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  })
}