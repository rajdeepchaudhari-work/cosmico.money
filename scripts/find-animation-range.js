const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const FRAMES_DIR = path.join(__dirname, '../public/card-frames')
const TMP = path.join(__dirname, '../temp-range')
fs.mkdirSync(TMP, { recursive: true })

const jpgs = fs.readdirSync(FRAMES_DIR).filter(f => f.endsWith('.jpg')).sort()
console.log(`Analysing ${jpgs.length} frames...\n`)

const W = 64, H = 40  // small resolution for fast comparison
const frameSize = W * H * 3

// Extract all frames as tiny raw pixels
const rawFile = path.join(TMP, 'all.raw')
const frameList = jpgs.map(f => path.join(FRAMES_DIR, f))

// Build a concat list for ffmpeg
const concatList = path.join(TMP, 'list.txt')
fs.writeFileSync(concatList, frameList.map(f => `file '${f}'`).join('\n'))

execSync(
  `ffmpeg -y -f concat -safe 0 -i "${concatList}" -vf "scale=${W}:${H}" -f rawvideo -pix_fmt rgb24 "${rawFile}"`,
  { stdio: 'pipe' }
)

const buf = fs.readFileSync(rawFile)
const total = Math.floor(buf.length / frameSize)

// Compare each frame to the previous — compute Mean Absolute Difference
const diffs = []
for (let i = 1; i < total; i++) {
  const prev = i - 1
  let sum = 0
  for (let j = 0; j < frameSize; j++) {
    sum += Math.abs(buf[i * frameSize + j] - buf[prev * frameSize + j])
  }
  diffs.push({ frame: i + 1, diff: sum / frameSize })
}

// Find first frame where card appears (non-black)
let firstFrame = 1
for (let i = 0; i < total; i++) {
  let brightness = 0
  for (let j = 0; j < frameSize; j++) brightness += buf[i * frameSize + j]
  if (brightness / frameSize > 10) { firstFrame = i + 1; break }
}

// Find last frame where animation is still changing (diff > threshold)
const STATIC_THRESHOLD = 0.5  // below this = animation stopped
let lastAnimated = firstFrame
for (let i = 0; i < diffs.length; i++) {
  if (diffs[i].diff > STATIC_THRESHOLD) lastAnimated = diffs[i].frame
}

console.log('Frame-by-frame diff (MAD):')
diffs.forEach(d => {
  const bar = '█'.repeat(Math.min(40, Math.round(d.diff * 2)))
  const status = d.diff < STATIC_THRESHOLD ? ' ← STATIC' : ''
  console.log(`  Frame ${String(d.frame).padStart(3)}: ${d.diff.toFixed(2).padStart(6)}  ${bar}${status}`)
})

console.log(`\n── Result ───────────────────────────`)
console.log(`  First frame with card: ${firstFrame}`)
console.log(`  Last animated frame:   ${lastAnimated}`)
console.log(`  Unique animation frames: ${lastAnimated - firstFrame + 1}`)
console.log(`\n  → Recapture with TOTAL_FRAMES = ${lastAnimated - firstFrame + 1}`)

fs.rmSync(TMP, { recursive: true, force: true })
