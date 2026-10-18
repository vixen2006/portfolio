/**
 * Visitor Counter Helper
 * - Stores assigned visitor number in localStorage ('vt_no') so returning visitors keep their number
 * - Calls POST /api/visit for first-time visitors
 * - Graceful fallback to client counter or hide if completely unavailable
 */

export async function getVisitorNumber() {
  const STORAGE_KEY = 'vt_no'
  const TOTAL_KEY = 'vt_total'

  // 1. Check if this visitor already has an assigned number in this browser
  try {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (existing && !isNaN(parseInt(existing, 10))) {
      return String(parseInt(existing, 10)).padStart(4, '0')
    }
  } catch (e) {
    // LocalStorage might be disabled or unavailable
  }

  // 2. First time visitor: attempt to call backend API
  try {
    const res = await fetch('/api/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      const data = await res.json()
      if (data && typeof data.count === 'number' && data.count > 0) {
        try {
          localStorage.setItem(STORAGE_KEY, data.count.toString())
        } catch (e) {}
        return String(data.count).padStart(4, '0')
      }
    }
  } catch (err) {
    // API failed or offline - proceed to graceful fallback
  }

  // 3. Fallback: simulate local sequential count using localStorage
  try {
    let total = parseInt(localStorage.getItem(TOTAL_KEY) || '0', 10) + 1
    localStorage.setItem(TOTAL_KEY, total.toString())
    localStorage.setItem(STORAGE_KEY, total.toString())
    return String(total).padStart(4, '0')
  } catch (e) {
    return '0001'
  }
}
