import { Canvas, loadImage, FontLibrary } from 'skia-canvas'
import fs from 'fs'
import path from 'path'
import https from 'https'

const CONFIG = {
  avatar: { x: 0, y: -10, r: 370 },
  name: { size: 64, x: 0, y: 320 },
  duration: { size: 45, x: 0, y: 30 },
  baseUrl: 'https://raw.githubusercontent.com/CusJhon/Assets/main',
}

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

interface CallParams {
  name: string
  duration: string
  avatar: string
}

export async function generateCallImage(params: CallParams): Promise<Buffer> {
  const tmpDir = path.join(process.cwd(), 'tmp')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

  const fontDir = path.join(tmpDir, 'fonts')
  const imgDir = path.join(tmpDir, 'assets')
  if (!fs.existsSync(fontDir)) fs.mkdirSync(fontDir, { recursive: true })
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true })

  const B = CONFIG.baseUrl

  const assets = {
    bg: { url: `${B}/image/upscaled_2x%20(1).jpeg`, path: path.join(imgDir, 'bg-fakecall.jpg') },
    fontMed: { url: `${B}/fonts/Roboto-Medium.ttf`, path: path.join(fontDir, 'Roboto-Medium.ttf') },
    fontLight: { url: `${B}/fonts/Roboto-Light.ttf`, path: path.join(fontDir, 'Roboto-Light.ttf') },
  }

  for (const asset of Object.values(assets)) {
    if (!fs.existsSync(asset.path)) {
      await downloadFile(asset.url, asset.path)
    }
  }

  FontLibrary.use('Roboto-Medium', [assets.fontMed.path])
  FontLibrary.use('Roboto-Light', [assets.fontLight.path])

  const bg = await loadImage(assets.bg.path)
  
  // Download avatar
  const avatarPath = path.join(imgDir, 'avatar.webp')
  await downloadFile(params.avatar, avatarPath)
  const avatar = await loadImage(avatarPath)

  const W = bg.width
  const H = bg.height

  const canvas = new Canvas(W, H)
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  ctx.drawImage(bg, 0, 0)

  const avatarCX = W / 2 + CONFIG.avatar.x
  const avatarCY = H / 2 + CONFIG.avatar.y
  const avatarR = CONFIG.avatar.r

  const nameX = W / 2 + CONFIG.name.x
  const nameY = CONFIG.name.y

  const durX = W / 2 + CONFIG.duration.x
  const durY = nameY + CONFIG.name.size + CONFIG.duration.y

  const s = Math.min(avatar.width, avatar.height)
  const sx = (avatar.width - s) / 2
  const sy = (avatar.height - s) / 2

  ctx.save()
  ctx.beginPath()
  ctx.arc(avatarCX, avatarCY, avatarR, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(avatar, sx, sy, s, s, avatarCX - avatarR, avatarCY - avatarR, avatarR * 2, avatarR * 2)
  ctx.restore()

  ctx.font = `${CONFIG.name.size}px "Roboto-Medium"`
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(params.name, nameX, nameY)

  ctx.font = `${CONFIG.duration.size}px "Roboto-Light"`
  ctx.fillStyle = '#777e84'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(params.duration, durX, durY)

  // Cleanup
  for (const asset of Object.values(assets)) {
    try { fs.unlinkSync(asset.path) } catch {}
  }
  try { fs.unlinkSync(avatarPath) } catch {}
  try { fs.rmdirSync(imgDir, { recursive: true }) } catch {}
  try { fs.rmdirSync(fontDir, { recursive: true }) } catch {}

  return await canvas.toBuffer('png')
}