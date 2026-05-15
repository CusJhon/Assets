import { NextRequest, NextResponse } from 'next/server'
import { generateNokiaQuote } from '@/lib/generators/nokia-generator'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const text = searchParams.get('text')
    const sender = searchParams.get('sender') || 'Jhon'

    if (!text) {
      return NextResponse.json(
        { error: 'Parameter "text" is required' },
        { status: 400 }
      )
    }

    const imageBuffer = await generateNokiaQuote({
      text,
      sender,
    })

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="nokia_quote.png"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error generating Nokia quote:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}