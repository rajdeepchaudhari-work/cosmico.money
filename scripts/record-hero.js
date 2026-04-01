const { chromium } = require('/Users/rajdeepchaudhari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright')
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const TMP = path.join(__dirname, '../temp-video')
const FPS = 25
const W = 32, H = 18
const LOOP_DURATION = 60.040  // confirmed from pixel analysis

;(async () => {
  fs.mkdirSync(TMP, { recursive: true })

  // ── 1. Record 70s ─────────────────────────────────────────────────────────
  console.log('Launching browser...')
  const browser = await chromium.launch({ args: ['--enable-gpu'] })
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: TMP, size: { width: 1920, height: 1080 } },
  })
  const page = await context.newPage()
  await page.goto('http://localhost:3000/hero-capture.html', { waitUntil: 'networkidle', timeout: 30000 })
  console.log('Waiting 3s for Spline to initialise...')
  await page.waitForTimeout(3000)
  console.log(`Recording ${LOOP_DURATION + 5}s...`)
  await page.waitForTimeout((LOOP_DURATION + 5) * 1000)

  const video = await page.video()
  await context.close()
  await browser.close()
  const rawWebm = await video.path()
  console.log('Raw recording:', rawWebm)

  const start = 3 // seconds to skip (Spline init)

  // ── 2. hero.mp4 — 1920×1080, H.264, for desktop ──────────────────────────
  const outMp4 = path.join(__dirname, '../public/hero.mp4')
  console.log('\nEncoding hero.mp4 (1920×1080)...')
  execSync(
    `ffmpeg -y -ss ${start} -t ${LOOP_DURATION} -i "${rawWebm}" ` +
    `-vf "scale=1920:1080:flags=lanczos" ` +
    `-c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p ` +
    `-movflags +faststart -an "${outMp4}"`,
    { stdio: 'inherit' }
  )

  // ── 3. hero-mobile.mp4 — 960×540, lighter for mobile ─────────────────────
  const outMobile = path.join(__dirname, '../public/hero-mobile.mp4')
  console.log('\nEncoding hero-mobile.mp4 (960×540)...')
  execSync(
    `ffmpeg -y -ss ${start} -t ${LOOP_DURATION} -i "${rawWebm}" ` +
    `-vf "scale=960:540:flags=lanczos" ` +
    `-c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p ` +
    `-movflags +faststart -an "${outMobile}"`,
    { stdio: 'inherit' }
  )

  // ── 4. Cleanup ─────────────────────────────────────────────────────────────
  fs.rmSync(TMP, { recursive: true, force: true })

  const mb  = (fs.statSync(outMp4).size    / 1024 / 1024).toFixed(1)
  const mbm = (fs.statSync(outMobile).size / 1024 / 1024).toFixed(1)
  console.log(`\n✓ hero.mp4         ${mb} MB   (desktop 1920×1080)`)
  console.log(`✓ hero-mobile.mp4  ${mbm} MB   (mobile  960×540)`)
})()
