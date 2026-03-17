import React, { useState, useEffect } from 'react'
import '../css/Event.css'
import EventsAPI from '../services/EventsAPI'
import dates from '../utils/dates'

const Event = (props) => {

    const [event, setEvent] = useState([])
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(props.id)
                console.log(eventData)
                setEvent(eventData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        if (!event.time) return
        setTime(dates.formatTime(event.time))
    }, [event])

    useEffect(() => {
        if (!event.date || !event.time) return
        const timeRemaining = dates.formatRemainingTime(event.date, event.time)
        setRemaining(timeRemaining)
        dates.formatNegativeTimeRemaining(timeRemaining, event.id)
    }, [event])

    return (
        <article className='event-information'>
            <img src={event.imageurl} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event