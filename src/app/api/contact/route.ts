import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, phone, message } = body

    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // HTML email template for better formatting
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            h2 { color: #2c3e50; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; margin-left: 10px; }
            .message-box { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 New Demo Request from CKS Website</h2>
            </div>

            <div class="field">
              <span class="label">👤 Name:</span>
              <span class="value">${name}</span>
            </div>

            <div class="field">
              <span class="label">🏢 Company:</span>
              <span class="value">${company}</span>
            </div>

            <div class="field">
              <span class="label">📧 Email:</span>
              <span class="value"><a href="mailto:${email}">${email}</a></span>
            </div>

            <div class="field">
              <span class="label">📱 Phone:</span>
              <span class="value">${phone || 'Not provided'}</span>
            </div>

            <div class="message-box">
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>

            <div class="footer">
              <p>This email was sent from the CKS website contact form.</p>
              <p>Please respond to the customer within 24 hours.</p>
            </div>
          </div>
        </body>
      </html>
    `

    // Plain text version as fallback
    const textContent = `
New Demo Request from CKS Website

Contact Details:
================
Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
================
${message}

--
This email was sent from the CKS website contact form.
Please respond to the customer within 24 hours.
    `

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_YOUR_API_KEY_HERE') {
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: 'CKS Website <onboarding@resend.dev>', // Use your verified domain in production
        to: ['admin@ckscontracting.ca'],
        subject: `New Demo Request - ${company}`,
        html: htmlContent,
        text: textContent,
        reply_to: email, // Customer can reply directly
      })

      if (error) {
        console.error('Resend error:', error)
        throw new Error('Failed to send email')
      }

      console.log('Email sent successfully:', data)
    } else {
      // Development mode - just log the email
      console.log('📧 DEVELOPMENT MODE - Email would be sent to: admin@ckscontracting.ca')
      console.log('Subject: New Demo Request - ' + company)
      console.log('Reply-To:', email)
      console.log('Content:', textContent)
      console.log('\n⚠️  To enable email sending:')
      console.log('1. Sign up at https://resend.com')
      console.log('2. Get your API key from the dashboard')
      console.log('3. Add RESEND_API_KEY to your .env.local file')
    }

    // Optional: Store in database or CRM here
    // await saveToDatabase({ name, company, email, phone, message })

    return NextResponse.json(
      { message: 'Demo request received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing demo request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}