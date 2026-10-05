import { useState, useEffect } from 'react'

// Re-renders the calling component every `interval` ms with the current time, for live countdowns
const useNow = (interval = 1000) => {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), interval)
        return () => clearInterval(id)
    }, [interval])

    return now
}

export default useNow
