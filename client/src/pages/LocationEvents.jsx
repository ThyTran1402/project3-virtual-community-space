import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { slug } = useParams()
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        let ignore = false
        setStatus('loading')

        ;(async () => {
            try {
                const [locationData, eventsData] = await Promise.all([
                    LocationsAPI.getLocationBySlug(slug),
                    LocationsAPI.getEventsByLocation(slug)
                ])

                if (ignore) return
                setLocation(locationData)
                setEvents(eventsData)
                setStatus('ready')
            }
            catch (error) {
                if (!ignore) setStatus('error')
            }
        })()

        return () => { ignore = true }
    }, [slug])

    if (status === 'loading') {
        return <p className='page-message' aria-busy='true'>Loading location…</p>
    }

    if (status === 'error') {
        return (
            <div className='page-message'>
                <h2>Location not found</h2>
                <Link to='/' role='button'>Back to the plaza</Link>
            </div>
        )
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p><i className='fa-solid fa-location-dot'></i>{location.address}, {location.city}, {location.state} {location.zip}</p>
                    <p>{location.description}</p>
                </div>
            </header>

            <main>
                {
                    events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            title={event.title}
                            description={event.description}
                            startsAt={event.starts_at}
                            image={event.image}
                        />
                    ) : <h2><i className='fa-regular fa-calendar-xmark fa-shake'></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
