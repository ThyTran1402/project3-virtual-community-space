import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import unitygrid from '../assets/unitygrid.jpg'
import '../css/Locations.css'

const VIEWBOX_WIDTH = 1000.32
const VIEWBOX_HEIGHT = 500

// Outlines of the four buildings on the plaza image, in viewBox coordinates.
// venue1-venue4 map to the locations table in id order.
const venueShapes = [
    `2.97,234.52 17.94,198.9 34.45,188.58 52.52,191.68 56.65,196.32 69.03,162.26 84,137.48
    103.61,121.48 126.32,109.61 154.71,125.61 175.87,149.87 189.81,176.71 199.61,206.13 205.81,229.35 210.45,243.81 206.84,272.19
    214.58,285.1 214.58,302.13 203.74,334.13 194.45,351.68 205.29,366.65 132.52,366.65 159.35,391.42 155.74,399.68 119.61,399.68
    86.06,399.68 62.84,399.68 25.16,399.68 0,397.61`,
    `358.58,353.74 376.65,322.77 389.55,314.52 384.39,280.45 407.61,272.19 422.06,220.58
    438.58,126.65 449.42,38.39 457.68,16.71 468,35.81 474.19,103.42 491.74,203.03 508.26,261.87 517.03,281.48 517.03,214.9
    529.42,194.26 540.77,197.35 540.77,169.48 552.13,167.94 556.77,149.87 566.06,156.06 566.06,193.74 577.42,211.81 577.42,238.65
    601.16,254.65 594.45,302.13 575.87,335.68 587.23,353.74 601.16,363.55 358.58,363.55`,
    `998.06,83.81 952.65,31.16 914.45,16.71 877.29,43.55 833.94,102.39 811.74,161.23
    796.77,241.23 802.97,303.16 833.94,353.23 871.61,385.23 954.71,385.23 1000.32,387.81`,
    `625,291 615,305 608,318 625,338 637,354 622.5,358 673,363.5 751,363.5 793,363.5
    769,352 772,347 793,340 806,321 796.8,291 784,269 757,261 730,272 707,281 672,283`
]

// Where to pin each venue's name label, as a percentage of the map: horizontally centered, vertically mid-building
const labelPosition = (points) => {
    const coords = points.trim().split(/\s+/).map((pair) => pair.split(',').map(Number))
    const xs = coords.map(([x]) => x)
    const ys = coords.map(([, y]) => y)
    const left = (Math.min(...xs) + Math.max(...xs)) / 2
    const top = (Math.min(...ys) + Math.max(...ys)) / 2

    return {
        left: `${Math.min(Math.max(left / VIEWBOX_WIDTH * 100, 10), 90)}%`,
        top: `${top / VIEWBOX_HEIGHT * 100}%`
    }
}

const Locations = () => {
    const navigate = useNavigate()
    const [locations, setLocations] = useState([])
    const [hovered, setHovered] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const locationsData = await LocationsAPI.getAllLocations()
                setLocations(locationsData)
            }
            catch (error) {
                setError(true)
            }
        })()
    }, [])

    const venues = locations.slice(0, venueShapes.length).map((location, index) => ({
        ...location,
        points: venueShapes[index]
    }))

    const goTo = (slug) => navigate(`/locations/${slug}`)

    return (
        <div className='available-locations'>
            <p className='map-hint'>
                {error
                    ? 'Could not load locations. Is the server running?'
                    : 'Pick a building on the plaza to see what’s happening there.'}
            </p>

            <div className='plaza-map'>
                <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} role='group' aria-label='UnityGrid Plaza map'>
                    <image href={unitygrid} width='2084' height='1043' transform='matrix(0.48 0 0 0.48 0 0)' />

                    {venues.map((venue) => (
                        <polygon
                            key={venue.id}
                            points={venue.points}
                            className={hovered === venue.id ? 'active' : ''}
                            role='link'
                            tabIndex={0}
                            aria-label={`${venue.name} events`}
                            onMouseEnter={() => setHovered(venue.id)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => setHovered(venue.id)}
                            onBlur={() => setHovered(null)}
                            onClick={() => goTo(venue.slug)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    goTo(venue.slug)
                                }
                            }}
                        />
                    ))}
                </svg>

                {venues.map((venue) => (
                    <button
                        key={venue.id}
                        type='button'
                        tabIndex={-1}
                        className={`venue-label ${hovered === venue.id ? 'active' : ''}`}
                        style={labelPosition(venue.points)}
                        onMouseEnter={() => setHovered(venue.id)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => goTo(venue.slug)}
                    >
                        {venue.name}
                    </button>
                ))}
            </div>

            <nav className='venue-chips' aria-label='Locations'>
                {venues.map((venue) => (
                    <Link
                        key={venue.id}
                        to={`/locations/${venue.slug}`}
                        className={hovered === venue.id ? 'active' : ''}
                        onMouseEnter={() => setHovered(venue.id)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <img src={venue.image} alt='' />
                        <span>{venue.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}

export default Locations
