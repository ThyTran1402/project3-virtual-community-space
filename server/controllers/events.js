import { pool } from '../config/database.js'

// Each event comes back with its location's name and slug so the Events page can label and filter it
const selectEvents = `
    SELECT events.*, locations.name AS location_name, locations.slug AS location_slug
    FROM events
    JOIN locations ON locations.id = events.location_id
`

const getEvents = async (req, res) => {
    try {
        const results = await pool.query(`${selectEvents} ORDER BY events.starts_at ASC`)
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const results = await pool.query(`${selectEvents} WHERE events.id = $1`, [req.params.id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export default {
    getEvents,
    getEventById
}
