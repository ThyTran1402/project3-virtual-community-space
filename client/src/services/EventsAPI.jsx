const request = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Request to ${url} failed with status ${response.status}`)
    }

    return response.json()
}

const getAllEvents = () => request('/api/events')

const getEventById = (id) => request(`/api/events/${id}`)

export default {
    getAllEvents,
    getEventById
}
