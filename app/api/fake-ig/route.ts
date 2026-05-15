import { NextRequest, NextResponse } from 'next/server'
import { generateIGStoryImage } from '@/lib/generators/ig-generator'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const text = searchParams.get('text')
    const name = searchParams.get('name') || 'Someone'
    const avatar = searchParams.get('avatar') || 'https://raw.githubusercontent.com/uploader762/dat4/main/uploads/e0f993-1777126212302.jpg'

    if (!text) {
      return NextResponse.json(
        { error: 'Parameter "text" is required' },
        { status: 400 }
      )
    }

    const imageBuffer = await generateIGStoryImage({
      text,
      name,
      avatar,
    })

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="igstory.png"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error generating IG story image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}