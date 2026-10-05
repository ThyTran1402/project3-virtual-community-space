const request = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Request to ${url} failed with status ${response.status}`)
    }

    return response.json()
}

const getAllLocations = () => request('/api/locations')

const getLocationBySlug = (slug) => request(`/api/locations/${slug}`)

const getEventsByLocation = (slug) => request(`/api/locations/${slug}/events`)

export default {
    getAllLocations,
    getLocationBySlug,
    getEventsByLocation
}
