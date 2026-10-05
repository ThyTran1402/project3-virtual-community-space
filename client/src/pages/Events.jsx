import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import LocationsAPI from '../services/LocationsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])
    const [locationFilter, setLocationFilter] = useState('all')
    const [sortOrder, setSortOrder] = useState('soonest')
    const [hidePast, setHidePast] = useState(false)
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        (async () => {
            try {
                const [eventsData, locationsData] = await Promise.all([
                    EventsAPI.getAllEvents(),
                    LocationsAPI.getAllLocations()
                ])
                setEvents(eventsData)
                setLocations(locationsData)
                setStatus('ready')
            }
            catch (error) {
                setStatus('error')
            }
        })()
    }, [])

    const now = new Date()
    const visibleEvents = events
        .filter((event) => locationFilter === 'all' || event.location_slug === locationFilter)
        .filter((event) => !hidePast || new Date(event.starts_at) > now)
        .sort((a, b) => {
            const difference = new Date(a.starts_at) - new Date(b.starts_at)
            return sortOrder === 'soonest' ? difference : -difference
        })

    return (
        <div className='all-events'>
            <header className='events-toolbar'>
                <h2>All Events</h2>

                <div className='events-controls'>
                    <label>
                        Location
                        <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)}>
                            <option value='all'>All locations</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.slug}>{location.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Sort by date
                        <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                            <option value='soonest'>Earliest first</option>
                            <option value='latest'>Latest first</option>
                        </select>
                    </label>

                    <label className='hide-past'>
                        <input type='checkbox' role='switch' checked={hidePast} onChange={(event) => setHidePast(event.target.checked)} />
                        Hide past events
                    </label>
                </div>
            </header>

            <main>
                {status === 'loading' && <p aria-busy='true'>Loading events…</p>}
                {status === 'error' && <h2>Could not load events. Is the server running?</h2>}
                {status === 'ready' && (
                    visibleEvents.length > 0 ? visibleEvents.map((event) =>
                        <Event
                            key={event.id}
                            title={event.title}
                            description={event.description}
                            startsAt={event.starts_at}
                            image={event.image}
                            locationName={event.location_name}
                            locationSlug={event.location_slug}
                        />
                    ) : <h2><i className='fa-regular fa-calendar-xmark fa-shake'></i> No events match these filters.</h2>
                )}
            </main>
        </div>
    )
}

export default Events
