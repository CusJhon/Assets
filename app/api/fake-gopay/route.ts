import { NextRequest, NextResponse } from 'next/server'
import { generateGoPayImage } from '@/lib/generators/gopay-generator'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const saldo = searchParams.get('saldo')
    const koin = searchParams.get('koin') || '159'
    const bulan = searchParams.get('bulan') || 'Mei'
    const terpakai = searchParams.get('terpakai') || '0'

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

    const imageBuffer = await generateGoPayImage({
      saldo: saldoNum.toString(),
      koin,
      bulan,
      terpakai,
    })

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="gopay_${saldoNum}.jpg"`,
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('Error generating GoPay image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}