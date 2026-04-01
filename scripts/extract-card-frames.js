const { chromium } = require('/Users/rajdeepchaudhari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, '../public/card-frames')
const TOTAL_FRAMES = 60
const DELTA_PER_STEP = 1   // absolute minimum — one tick per frame to capture every unique pose

fs.mkdirSync(OUT, { recursive: true })

;(async () => {
  console.log('Launching browser (visible window for GPU rendering)...')
  const browser = await chromium.launch({
    headless: false,
    args: ['--enable-gpu', '--start-maximized'],
  })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  })
  const page = await context.newPage()

  await page.goto('http://localhost:3000/card-capture.html', { waitUntil: 'networkidle', timeout: 30000 })

  console.log('Waiting 12s for card scene to load...')
  await page.waitForTimeout(12000)

  // Delete any old frames first
  const existing = fs.readdirSync(OUT).filter(f => f.endsWith('.jpg'))
  existing.forEach(f => fs.unlinkSync(path.join(OUT, f)))

  console.log(`Capturing ${TOTAL_FRAMES} frames while scrolling...`)
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    // Fire wheel event on the spline-viewer
    await page.evaluate(delta => {
      const el = document.querySelector('spline-viewer')
      if (el) el.dispatchEvent(new WheelEvent('wheel', { deltaY: delta, bubbles: true, cancelable: true }))
    }, DELTA_PER_STEP)

    // Small pause for the animation to update
    await page.waitForTimeout(100)

    // Screenshot
    const filename = `frame${String(i + 1).padStart(4, '0')}.jpg`
    await page.screenshot({
      path: path.join(OUT, filename),
      type: 'jpeg',
      quality: 85,
    })

    if ((i + 1) % 10 === 0) console.log(`  ${i + 1}/${TOTAL_FRAMES} frames captured`)
  }

  await browser.close()

  // Report
  const frames = fs.readdirSync(OUT).filter(f => f.endsWith('.jpg'))
  const totalSize = frames.reduce((s, f) => s + fs.statSync(path.join(OUT, f)).size, 0)

  console.log(`\n✓ ${frames.length} frames captured`)
  console.log(`  Total size: ${(totalSize / 1024 / 1024).toFixed(1)} MB`)
  console.log(`  Avg per frame: ${Math.round(totalSize / frames.length / 1024)} KB`)
})()
