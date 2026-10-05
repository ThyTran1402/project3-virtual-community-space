const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })

const formatDate = (timestamp) => dateFormatter.format(new Date(timestamp))

const formatTime = (timestamp) => timeFormatter.format(new Date(timestamp))

// Turns a millisecond duration into "3d 4h 12m 5s", dropping leading zero units
const formatDuration = (ms) => {
    const totalSeconds = Math.floor(Math.abs(ms) / 1000)
    const parts = [
        [Math.floor(totalSeconds / 86400), 'd'],
        [Math.floor(totalSeconds / 3600) % 24, 'h'],
        [Math.floor(totalSeconds / 60) % 60, 'm'],
        [totalSeconds % 60, 's']
    ]
    const firstNonZero = parts.findIndex(([value]) => value > 0)

    if (firstNonZero === -1) return '0s'
    return parts.slice(firstNonZero).map(([value, unit]) => `${value}${unit}`).join(' ')
}

const formatRemainingTime = (timestamp, now) => {
    const remaining = new Date(timestamp) - now

    return remaining > 0
        ? `Starts in ${formatDuration(remaining)}`
        : `Ended ${formatDuration(remaining)} ago`
}

const hasPassed = (timestamp, now) => new Date(timestamp) <= now

export default {
    formatDate,
    formatTime,
    formatRemainingTime,
    hasPassed
}
