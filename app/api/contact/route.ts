import { NextRequest, NextResponse } from 'next/server'

// Rate limiting map (simple in-memory solution)
const rateLimitMap = new Map<string, number[]>()

function isRateLimited(ip: string, maxRequests: number = 5, windowMs: number = 3600000): boolean {
  const now = Date.now()
  const userRequests = rateLimitMap.get(ip) || []

  // Filter out old requests outside the window
  const recentRequests = userRequests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return true
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)

  return false
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ message: 'Invalid field types' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 })
    }

    // Length validation
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ message: 'Name must be between 2 and 100 characters' }, { status: 400 })
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ message: 'Message must be between 10 and 5000 characters' }, { status: 400 })
    }

    // Simulate email sending (in production, integrate with Resend or similar)
    // For now, we'll just return success
    // To integrate with Resend, uncomment the code below and add your API key to environment variables

    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    //
    // const emailResult = await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: 'your-email@example.com',
    //   replyTo: email,
    //   subject: `New contact form submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    //     <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    //   `,
    // })
    //
    // if (emailResult.error) {
    //   return NextResponse.json({ message: 'Failed to send email' }, { status: 500 })
    // }

    // For demo purposes, we'll just log and return success
    console.log(`[Contact Form] Received message from ${name} (${email}): ${message.substring(0, 50)}...`)

    return NextResponse.json(
      { message: 'Message sent successfully! I will get back to you soon.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ message: 'An error occurred. Please try again.' }, { status: 500 })
  }
}

// Helper function to escape HTML (if needed for email)
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
