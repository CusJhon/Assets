import { NextRequest, NextResponse } from 'next/server'
import { generateReminder } from '@/lib/generators/reminder-generator'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const text = searchParams.get('text')
    const author = searchParams.get('author') || 'Someone'

    if (!text) {
      return NextResponse.json(
        { error: 'Parameter "text" is required' },
        { status: 400 }
      )
    }

    const imageBuffer = await generateReminder({
      text,
      author,
    })

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="reminder.jpg"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error generating reminder:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}