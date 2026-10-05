import { pool } from './database.js'
import { locations, events } from '../data/data.js'

const createTables = async () => {
    const createTablesQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(100) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(2) NOT NULL,
            zip VARCHAR(10) NOT NULL,
            image TEXT NOT NULL,
            description TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            starts_at TIMESTAMPTZ NOT NULL,
            image TEXT NOT NULL,
            location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE
        );
    `

    await pool.query(createTablesQuery)
    console.log('locations and events tables created successfully')
}

const seedLocationsTable = async () => {
    const insertQuery = `
        INSERT INTO locations (slug, name, address, city, state, zip, image, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `

    for (const location of locations) {
        const values = [
            location.slug,
            location.name,
            location.address,
            location.city,
            location.state,
            location.zip,
            location.image,
            location.description
        ]

        await pool.query(insertQuery, values)
        console.log(`${location.name} added successfully`)
    }
}

const seedEventsTable = async () => {
    const insertQuery = `
        INSERT INTO events (title, description, starts_at, image, location_id)
        VALUES ($1, $2, $3, $4, (SELECT id FROM locations WHERE slug = $5))
    `

    for (const event of events) {
        const values = [
            event.title,
            event.description,
            event.starts_at,
            event.image,
            event.location
        ]

        await pool.query(insertQuery, values)
        console.log(`${event.title} added successfully`)
    }
}

const resetDatabase = async () => {
    try {
        await createTables()
        await seedLocationsTable()
        await seedEventsTable()
    }
    catch (error) {
        console.error('error resetting the database:', error.message)
        process.exitCode = 1
    }
    finally {
        await pool.end()
    }
}

resetDatabase()
