import pg from 'pg'
import 'dotenv/config'

const isLocal = /localhost|127\.0\.0\.1/.test(process.env.PGHOST ?? '')

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    // Render requires SSL; a local Postgres usually doesn't support it
    ssl: isLocal ? false : {
      rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)
