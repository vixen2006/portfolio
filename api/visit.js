import { Redis } from '@upstash/redis'

// Simple in-memory fallback rate limiter for development / fallback
const ipCache = new Map()

function isBot(userAgent = '') {
  const bots = [
    'bot', 'spider', 'crawl', 'slurp', 'mediapartners', 'lighthouse',
    'headless', 'google', 'bing', 'yahoo', 'duckduck', 'baidu', 'yandex'
  ]
  const ua = userAgent.toLowerCase()
  return bots.some(b => ua.includes(b))
}

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userAgent = req.headers['user-agent'] || ''
  if (isBot(userAgent)) {
    return res.status(200).json({ count: null, ignored: true, reason: 'bot' })
  }

  // Get Client IP
  const forwarded = req.headers['x-forwarded-for']
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress || '127.0.0.1'

  // If Upstash Redis credentials are provided, use atomic INCR
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    // Graceful fallback when Redis is not configured (e.g. local dev)
    return res.status(200).json({ count: null, fallback: true })
  }

  try {
    const redis = new Redis({ url, token })

    // Rate-limit by IP: 1 request every 60 seconds per IP to prevent spamming INCR
    const ipKey = `rl:visit:${ip}`
    const isRateLimited = await redis.set(ipKey, '1', { nx: true, ex: 60 })
    
    if (!isRateLimited) {
      // Return the current count without incrementing if this IP visited within the last minute
      const current = await redis.get('vt_visitor_count')
      return res.status(200).json({ count: Number(current) || 1, rateLimited: true })
    }

    // Atomic increment
    const count = await redis.incr('vt_visitor_count')
    return res.status(200).json({ count })
  } catch (err) {
    console.error('Visitor API Error:', err)
    return res.status(200).json({ count: null, error: err.message })
  }
}
