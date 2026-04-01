const { chromium } = require('/Users/rajdeepchaudhari/.npm/_npx/e41f203b7505f1fb/node_modules/playwright')
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const URL = 'https://www.cosmico.money'
const OUT = path.join(__dirname, '../temp-audit')
fs.mkdirSync(OUT, { recursive: true })

;(async () => {
  console.log('Launching browser (desktop)...')
  const browser = await chromium.launch({
    args: ['--enable-gpu', '--no-sandbox'],
  })

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: OUT, size: { width: 1440, height: 900 } },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  })

  const page = await context.newPage()

  // Collect console errors
  const errors = []
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
  page.on('pageerror', err => errors.push(err.message))

  // Collect slow/large network requests
  const requests = []
  page.on('response', async res => {
    try {
      const timing = res.request().timing()
      const size = parseInt(res.headers()['content-length'] || '0')
      requests.push({
        url: res.url().replace('https://www.cosmico.money', ''),
        status: res.status(),
        type: res.request().resourceType(),
        duration: Math.round(timing.responseEnd - timing.requestStart),
        sizeKB: Math.round(size / 1024),
      })
    } catch (_) {}
  })

  // ── Load the page ──────────────────────────────────────────────────────────
  console.log(`Navigating to ${URL}...`)
  const t0 = Date.now()
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
  const domReady = Date.now() - t0
  console.log(`DOM ready in ${domReady}ms`)

  // Screenshot at DOM ready
  await page.screenshot({ path: path.join(OUT, '1-dom-ready.png') })

  // Wait for network idle
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {})
  const fullyLoaded = Date.now() - t0
  console.log(`Network idle in ${fullyLoaded}ms`)
  await page.screenshot({ path: path.join(OUT, '2-network-idle.png') })

  // Collect Web Vitals
  const vitals = await page.evaluate(() => {
    return new Promise(resolve => {
      const result = {}
      // LCP
      new PerformanceObserver(list => {
        const entries = list.getEntries()
        result.LCP = Math.round(entries[entries.length - 1].startTime)
      }).observe({ type: 'largest-contentful-paint', buffered: true })

      // FCP
      const fcp = performance.getEntriesByName('first-contentful-paint')[0]
      if (fcp) result.FCP = Math.round(fcp.startTime)

      // Navigation timing
      const nav = performance.getEntriesByType('navigation')[0]
      if (nav) {
        result.TTFB = Math.round(nav.responseStart)
        result.domInteractive = Math.round(nav.domInteractive)
        result.domComplete = Math.round(nav.domComplete)
        result.loadEvent = Math.round(nav.loadEventEnd)
      }

      // Long tasks
      const longTasks = []
      new PerformanceObserver(list => {
        list.getEntries().forEach(e => longTasks.push({ duration: Math.round(e.duration), start: Math.round(e.startTime) }))
      }).observe({ type: 'longtask', buffered: true })

      setTimeout(() => {
        result.longTasks = longTasks
        resolve(result)
      }, 3000)
    })
  })

  // ── Scroll through the page ────────────────────────────────────────────────
  console.log('Scrolling through page...')
  const scrollT0 = Date.now()
  for (let i = 0; i <= 5; i++) {
    await page.evaluate(i => window.scrollTo(0, i * window.innerHeight), i)
    await page.waitForTimeout(1200)
    await page.screenshot({ path: path.join(OUT, `3-scroll-${i}.png`) })
  }
  const scrollDuration = Date.now() - scrollT0
  console.log(`Scroll completed in ${scrollDuration}ms`)

  // Wait a bit more then grab final screenshot
  await page.waitForTimeout(2000)
  await page.screenshot({ path: path.join(OUT, '4-final.png') })

  await context.close()
  await browser.close()

  // ── Report ─────────────────────────────────────────────────────────────────
  const slow = requests
    .filter(r => r.duration > 500 || r.sizeKB > 500)
    .sort((a, b) => b.duration - a.duration)

  const byType = {}
  requests.forEach(r => {
    if (!byType[r.type]) byType[r.type] = { count: 0, totalKB: 0, totalMs: 0 }
    byType[r.type].count++
    byType[r.type].totalKB += r.sizeKB
    byType[r.type].totalMs += r.duration
  })

  console.log('\n═══════════════════════════════════════')
  console.log('           PERFORMANCE REPORT')
  console.log('═══════════════════════════════════════')
  console.log(`TTFB:            ${vitals.TTFB}ms`)
  console.log(`FCP:             ${vitals.FCP}ms`)
  console.log(`LCP:             ${vitals.LCP}ms`)
  console.log(`DOM Interactive: ${vitals.domInteractive}ms`)
  console.log(`DOM Complete:    ${vitals.domComplete}ms`)
  console.log(`Load Event:      ${vitals.loadEvent}ms`)

  if (vitals.longTasks?.length > 0) {
    console.log(`\nLong Tasks (>50ms): ${vitals.longTasks.length}`)
    vitals.longTasks.sort((a, b) => b.duration - a.duration).slice(0, 5).forEach(t =>
      console.log(`  ${t.duration}ms at t=${t.start}ms`)
    )
  }

  console.log('\nRequests by type:')
  Object.entries(byType).sort((a, b) => b[1].totalKB - a[1].totalKB).forEach(([type, stats]) =>
    console.log(`  ${type.padEnd(12)} ${stats.count} reqs  ${stats.totalKB}KB  avg ${Math.round(stats.totalMs / stats.count)}ms`)
  )

  if (slow.length > 0) {
    console.log('\nSlowest / largest requests:')
    slow.slice(0, 15).forEach(r =>
      console.log(`  [${r.type.padEnd(8)}] ${r.duration}ms  ${r.sizeKB}KB  ${r.url.substring(0, 80)}`)
    )
  }

  if (errors.length > 0) {
    console.log('\nConsole errors:')
    errors.forEach(e => console.log('  ✗', e.substring(0, 120)))
  }

  console.log(`\nScreenshots saved to: ${OUT}`)
  console.log('═══════════════════════════════════════')

  // Open screenshots
  execSync(`open "${OUT}"`)
})()
