import { NextRequest, NextResponse } from 'next/server'

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

    // HTML email template with modern design
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.7;
              color: #1a1a1a;
              background: #f5f5f5;
            }
            .wrapper {
              background: #f5f5f5;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .logo {
              font-size: 32px;
              font-weight: 800;
              color: white;
              letter-spacing: -1px;
              margin-bottom: 10px;
            }
            .tagline {
              color: rgba(255, 255, 255, 0.9);
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .content {
              padding: 40px 30px;
            }
            .badge {
              display: inline-block;
              background: #f0f9ff;
              color: #0369a1;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 20px;
            }
            h2 {
              color: #1a1a1a;
              font-size: 24px;
              font-weight: 700;
              margin-bottom: 24px;
              line-height: 1.3;
            }
            .info-grid {
              background: #fafafa;
              border-radius: 8px;
              padding: 24px;
              margin-bottom: 24px;
            }
            .info-row {
              display: table;
              width: 100%;
              padding: 12px 0;
              border-bottom: 1px solid #e5e5e5;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              display: table-cell;
              width: 120px;
              font-weight: 600;
              color: #6b7280;
              font-size: 14px;
              vertical-align: top;
            }
            .value {
              display: table-cell;
              color: #1a1a1a;
              font-size: 14px;
            }
            .value a {
              color: #667eea;
              text-decoration: none;
            }
            .message-section {
              margin-top: 32px;
            }
            .message-label {
              font-weight: 600;
              color: #374151;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 12px;
            }
            .message-box {
              background: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 20px;
              color: #374151;
              font-size: 15px;
              line-height: 1.8;
            }
            .cta-section {
              margin-top: 32px;
              padding: 24px;
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border-radius: 8px;
              text-align: center;
            }
            .cta-text {
              color: #0369a1;
              font-weight: 600;
              margin-bottom: 16px;
            }
            .btn {
              display: inline-block;
              padding: 12px 32px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              font-size: 14px;
            }
            .footer {
              padding: 24px 30px;
              background: #fafafa;
              border-top: 1px solid #e5e5e5;
              text-align: center;
            }
            .footer p {
              color: #9ca3af;
              font-size: 13px;
              margin: 4px 0;
            }
            .timestamp {
              color: #d1d5db;
              font-size: 12px;
              margin-top: 8px;
            }
            @media only screen and (max-width: 600px) {
              .container { border-radius: 0; }
              .header { padding: 30px 20px; }
              .content { padding: 30px 20px; }
              .label { display: block; width: 100%; margin-bottom: 4px; }
              .value { display: block; width: 100%; }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <div class="logo">CKS</div>
                <div class="tagline">Contract • Know • Succeed</div>
              </div>

              <div class="content">
                <div class="badge">New Lead</div>
                <h2>Demo Request Received</h2>

                <div class="info-grid">
                  <div class="info-row">
                    <div class="label">Contact Name</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Company</div>
                    <div class="value">${company}</div>
                  </div>
                  <div class="info-row">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="info-row">
                    <div class="label">Phone</div>
                    <div class="value">${phone || '<span style="color: #9ca3af;">Not provided</span>'}</div>
                  </div>
                </div>

                <div class="message-section">
                  <div class="message-label">Customer Message</div>
                  <div class="message-box">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </div>

                <div class="cta-section">
                  <div class="cta-text">Quick Actions</div>
                  <a href="mailto:${email}?subject=Re:%20CKS%20Demo%20Request" class="btn">
                    Reply to Customer
                  </a>
                </div>
              </div>

              <div class="footer">
                <p><strong>Action Required:</strong> Please respond within 24 hours</p>
                <p>This lead was captured from the CKS website contact form</p>
                <div class="timestamp">Received: ${new Date().toLocaleString()}</div>
              </div>
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
      try {
        // Dynamic import only when needed
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Send email using Resend
        const { data, error } = await resend.emails.send({
          from: 'CKS Website <onboarding@resend.dev>', // Use your verified domain in production
          to: ['admin@ckscontracting.ca'],
          subject: `New Demo Request - ${company}`,
          html: htmlContent,
          text: textContent,
          replyTo: email, // Customer can reply directly
        })

        if (error) {
          console.error('Resend error:', error)
          throw new Error('Failed to send email')
        }

        console.log('Email sent successfully:', data)
      } catch (importError) {
        console.error('Failed to import or use Resend:', importError)
        // Fallback to logging
        console.log('📧 FALLBACK MODE - Email would be sent to: admin@ckscontracting.ca')
        console.log('Subject: New Demo Request - ' + company)
        console.log('Content:', textContent)
      }
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