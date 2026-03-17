import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        ( async () => {
            try {
                const locationData = await LocationsAPI.getLocationById(index)
                setLocation(locationData)
            } catch (error) {
                throw error
            }
        })()
    }, [index])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            } catch (err) {
                throw err
            }
        })()
    }, [])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.imageurl} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) => {
                        if (event.locationid === index) {
                            console.log(event)
                            return <Event
                                key={event.id}
                                id={event.id}
                                title={event.name}
                                date={event.date}
                                time={event.time}
                                image={event.imageurl}
                            />
                        }
                        return null
                }) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents