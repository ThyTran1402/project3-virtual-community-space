import React from 'react'
import { Link } from 'react-router-dom'
import useNow from '../hooks/useNow'
import dates from '../utils/dates'
import '../css/Event.css'

const Event = ({ title, description, startsAt, image, locationName, locationSlug }) => {
    const now = useNow()
    const passed = dates.hasPassed(startsAt, now)

    return (
        <article className={`event-information ${passed ? 'event-passed' : ''}`} tabIndex={0}>
            <img src={image} alt='' loading='lazy' />

            <div className='event-caption'>
                <h3>{title}</h3>
                <p className={passed ? 'negative-time-remaining' : 'time-remaining'}>
                    <i className={`fa-regular ${passed ? 'fa-calendar-xmark' : 'fa-clock'}`}></i>
                    {dates.formatRemainingTime(startsAt, now)}
                </p>
            </div>

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    <p><i className='fa-regular fa-calendar'></i>{dates.formatDate(startsAt)} <br /> {dates.formatTime(startsAt)}</p>
                    {locationName && (
                        <p><i className='fa-solid fa-location-dot'></i><Link to={`/locations/${locationSlug}`}>{locationName}</Link></p>
                    )}
                    <p className='event-description'>{description}</p>
                    {passed && <p className='negative-time-remaining'>This event has passed</p>}
                </div>
            </div>
        </article>
    )
}

export default Event
