import { Canvas, loadImage, FontLibrary } from 'skia-canvas'
import fs from 'fs'
import path from 'path'
import https from 'https'

const DEBUG = false

const HEADER = {
  text: "Jhon",
  x: 543,
  y: 200,
  fontSize: 130,
  color: "#E8F0F0",
  fakeBoldOffset: 4,
  letterSpacing: "0px",
  debug: { x: 40, y: 130, w: 1006, h: 140 }
}

const PESAN = {
  fontSize: 63,
  lineHeight: 110,
  color: "#000000",
  strokeWidth: 0,
  scaleY: 1.3,
  letterSpacing: "5px",
  padding: { top: 20, bottom: 20, left: 30, right: 30 },
  debug: { x: 0, y: 280, w: 1086, h: 700 }
}

const INFO = {
  fontSize: 48,
  lineHeight: 80,
  color: "#000000",
  strokeWidth: 0,
  scaleY: 1.3,
  letterSpacing: "5px",
  gap: 120,
  debug: { x: 0, y: 980, w: 1086, h: 320 }
}

const WIDTH = 1086
const HEIGHT = 1448

const BG_URL = "https://raw.githubusercontent.com/CusJhon/Assets/main/image/file_00000000a9f47208a295c9c984f92b7a.jpeg"
const FONT_URL = "https://raw.githubusercontent.com/CusJhon/Assets/main/fonts/nokia-6000-series-medium.ttf"

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doGet = (targetUrl: string) => {
      https.get(targetUrl, (res) => {
        if ([301, 302].includes(res.statusCode || 0)) {
          const location = res.headers.location
          if (location) return doGet(location)
        }
        const file = fs.createWriteStream(dest)
        res.pipe(file)
        file.on('finish', () => file.close(resolve))
        file.on('error', reject)
      }).on('error', reject)
    }
    doGet(url)
  })
}

interface NokiaQuoteParams {
  text: string
  sender: string
}

export async function generateNokiaQuote(params: NokiaQuoteParams): Promise<Buffer> {
  const tmpDir = path.join(process.cwd(), 'tmp')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

  const fontDir = path.join(tmpDir, 'fonts')
  const imgDir = path.join(tmpDir, 'assets')
  if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir, { recursive: true })
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true })

  const fontPath = path.join(fontDir, 'nokia.ttf')
  const bgPath = path.join(imgDir, 'bg.jpg')

  await downloadFile(FONT_URL, fontPath)
  await downloadFile(BG_URL, bgPath)

  FontLibrary.use("FontNokia", fontPath)

  const canvas = new Canvas(WIDTH, HEIGHT)
  const ctx = canvas.getContext("2d")

  const bg = await loadImage(bgPath)
  ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT)

  // Draw header
  const headerCfg = { ...HEADER, text: params.sender }
  ctx.fillStyle = headerCfg.color
  ctx.font = `${headerCfg.fontSize}px FontNokia`
  ctx.letterSpacing = headerCfg.letterSpacing
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  for (let i = 0; i <= headerCfg.fakeBoldOffset; i++) {
    ctx.fillText(headerCfg.text, headerCfg.x + i, headerCfg.y)
  }

  // Wrap and draw body text
  const maxW = PESAN.debug.w - PESAN.padding.left - PESAN.padding.right
  const textX = PESAN.debug.x + PESAN.padding.left
  const textY = PESAN.debug.y + PESAN.padding.top
  const maxH = INFO.debug.y - textY - PESAN.padding.bottom

  function wrapLine(ctx: any, text: string, maxWidth: number, fontSize: number): string[] {
    ctx.font = `${fontSize}px FontNokia`
    ctx.letterSpacing = PESAN.letterSpacing
    const words = text.split(" ")
    const wrapped: string[] = []
    let current = ""
    for (const word of words) {
      const test = current ? current + " " + word : word
      if (ctx.measureText(test).width > maxWidth && current) {
        wrapped.push(current)
        current = word
      } else {
        current = test
      }
    }
    if (current) wrapped.push(current)
    return wrapped
  }

  function getFitFontSize(ctx: any, text: string, maxWidth: number, maxHeight: number): number {
    let fontSize = PESAN.fontSize
    while (fontSize > 10) {
      const lines = wrapLine(ctx, text, maxWidth, fontSize)
      const lineH = fontSize * (PESAN.lineHeight / PESAN.fontSize)
      const totalH = lines.length * lineH
      if (totalH <= maxHeight) break
      fontSize -= 1
    }
    return fontSize
  }

  const fitFontSize = getFitFontSize(ctx, params.text, maxW, maxH)
  const fitLineHeight = fitFontSize * (PESAN.lineHeight / PESAN.fontSize)
  const wrappedLines = wrapLine(ctx, params.text, maxW, fitFontSize)

  ctx.save()
  ctx.font = `${fitFontSize}px FontNokia`
  ctx.letterSpacing = PESAN.letterSpacing
  ctx.textAlign = "left"
  ctx.textBaseline = "top"
  ctx.fillStyle = PESAN.color
  wrappedLines.forEach((line, i) => {
    ctx.fillText(line, textX, textY + i * fitLineHeight)
  })
  ctx.restore()

  // Draw info
  const infoY = textY + wrappedLines.length * fitLineHeight + INFO.gap
  const infoLines = ["Dari:", params.sender, new Date().toLocaleDateString('id-ID'), new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })]

  ctx.save()
  ctx.font = `${INFO.fontSize}px FontNokia`
  ctx.letterSpacing = INFO.letterSpacing
  ctx.textAlign = "left"
  ctx.textBaseline = "top"
  ctx.fillStyle = INFO.color
  infoLines.forEach((line, i) => {
    ctx.fillText(line, INFO.debug.x, infoY + i * INFO.lineHeight)
  })
  ctx.restore()

  // Cleanup
  try { fs.unlinkSync(fontPath) } catch {}
  try { fs.unlinkSync(bgPath) } catch {}
  try { fs.rmdirSync(imgDir, { recursive: true }) } catch {}
  try { fs.rmdirSync(fontDir, { recursive: true }) } catch {}

  return await canvas.toBuffer("png")
}