import {pool} from './database.js'
import './dotenv.js'
import locationsData from '../data/locations.js'
import eventsData from '../data/events.js'

const createLocationsTable = async () => {
    const creatLocationTableQuery = `
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            imageURL TEXT,
            description TEXT
        )
    `

    try {
        const res = await pool.query(creatLocationTableQuery)
        console.log('🎉 locations table created successfully')
    } catch (err) {
        console.error('⚠️ error creating trips table', err)
    }
}

const seedLocationsTable = async () => {
    await createLocationsTable()

    locationsData.forEach((location) => {
        const insertQuesry = {
            text: 'INSERT INTO locations (name, address, imageURL, description) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            location.name,
            location.address,
            location.imageURL,
            location.description
        ]

        pool.query(insertQuesry, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err)
                return
            }
            console.log(`✅ ${location.name} added successfully`)
        })
    })
}

const createEventsTable = async () => {
    const createEventsTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            locationId INTEGER NOT NULL,
            imageURL TEXT,
            shortDescription TEXT
        )
    `

    try {
        const res = await pool.query(createEventsTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    eventsData.forEach((event) => {
        const insertQuesry = {
            text: 'INSERT INTO events (name, date, time, locationId, imageURL, shortDescription) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            event.name,
            event.date,
            event.time,
            event.locationId,
            event.imageURL,
            event.shortDescription
        ]

        pool.query(insertQuesry, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }
            console.log(`✅ ${event.name} added successfully`)
        })
    })
}

seedLocationsTable()
seedEventsTable()