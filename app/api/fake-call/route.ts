import { NextRequest, NextResponse } from 'next/server'
import { generateCallImage } from '@/lib/generators/call-generator'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get('name') || 'Ditzzx'
    const duration = searchParams.get('duration') || '19.45'
    const avatar = searchParams.get('avatar') || 'https://files.catbox.moe/6fzqf0.webp'

    const imageBuffer = await generateCallImage({
      name,
      duration,
      avatar,
    })

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="fakecall_${name}.png"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error generating Call image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}