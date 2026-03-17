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
        <div className='events-conntainer'>
            {events && events.length > 0 ?
                events.map((event, index) => (
                    <Event
                        id = {event.id}
                    />
                )) : <h3>No Events Yet!</h3>
            
            }
        </div>
    )
}

export default Events