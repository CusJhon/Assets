import { NextRequest, NextResponse } from 'next/server'
import { generateDanaImage } from '@/lib/generators/dana-generator'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const saldo = searchParams.get('saldo')

    if (!saldo) {
      return NextResponse.json(
        { error: 'Parameter "saldo" is required' },
        { status: 400 }
      )
    }

    const saldoNum = parseInt(saldo)
    if (isNaN(saldoNum)) {
      return NextResponse.json(
        { error: 'Parameter "saldo" must be a number' },
        { status: 400 }
      )
    }

    const imageBuffer = await generateDanaImage(saldoNum)

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="dana_${saldoNum}.png"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error generating Dana image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}