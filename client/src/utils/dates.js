const dates = {
    // Formats "19:00" → "7:00 PM"
    formatTime(timeStr) {
        if (!timeStr) return ''
        const [hours, minutes] = timeStr.split(':').map(Number)
        const period = hours >= 12 ? 'PM' : 'AM'
        const displayHour = hours % 12 || 12
        return `${displayHour}:${String(minutes).padStart(2, '0')} ${period}`
    },

    // Returns a human-readable string like "47 days, 3 hours, 22 minutes"
    // or "Event has passed" if the event date/time is in the past
    formatRemainingTime(dateStr, timeStr) {
        const eventDate = new Date(`${dateStr}T${timeStr}:00`)
        const ms = eventDate - Date.now()
        if (ms <= 0) return 'Event has passed'

        const totalMinutes = Math.floor(ms / 1000 / 60)
        const days = Math.floor(totalMinutes / 60 / 24)
        const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
        const minutes = totalMinutes % 60

        const parts = []
        if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`)
        if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`)
        if (minutes > 0 || parts.length === 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`)

        return parts.join(', ')
    },

    // Styles the remaining-time element if the event has passed
    formatNegativeTimeRemaining(remainingText, eventId) {
        const el = document.getElementById(`remaining-${eventId}`)
        if (!el) return
        if (remainingText === 'Event has passed') {
            el.style.color = 'gray'
            el.style.fontStyle = 'italic'
        }
    }
}

export default dates
