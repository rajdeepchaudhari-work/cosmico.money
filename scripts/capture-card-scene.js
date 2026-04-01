const { chromium } = require('/Users/rajdeepchaudhari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright')
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, '../temp-card')
fs.mkdirSync(OUT, { recursive: true })

;(async () => {
  const browser = await chromium.launch({ args: ['--enable-gpu'] })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  // Load the card scene directly
  await page.goto('http://localhost:3000/hero-capture.html', { timeout: 30000 })

  // Swap to card scene
  await page.evaluate(() => {
    const viewer = document.querySelector('spline-viewer')
    if (viewer) viewer.setAttribute('url', '/card-scene.splinecode')
  })

  console.log('Waiting for card scene to load (15s)...')
  await page.waitForTimeout(15000)

  // Take screenshots from multiple angles by injecting mouse events to rotate
  console.log('Capturing card scene screenshots...')

  // Center of viewport
  const cx = 720, cy = 450

  for (let i = 0; i < 8; i++) {
    await page.screenshot({ path: path.join(OUT, `card-${i}.png`) })
    // Move mouse to simulate slight interaction
    await page.mouse.move(cx + (i * 30 - 90), cy)
    await page.waitForTimeout(800)
  }

  await browser.close()

  console.log(`Screenshots saved to ${OUT}`)
  execSync(`open "${OUT}"`)
})()
