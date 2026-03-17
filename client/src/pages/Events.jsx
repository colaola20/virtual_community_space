import EventsAPI from '../services/EventsAPI'
import {useState, useEffect} from 'react'
import Event from '../components/Event'

const Events = () => {
    const [events, setEvents] = useState([])

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
        <div className='events'>
            <main>
                {events && events.length > 0 ?
                    events.map((event, index) => (
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.imageurl}
                        />
                    )) : <h3>No Events Yet!</h3>
                
                }
            </main>
        </div>
    )
}

export default Events