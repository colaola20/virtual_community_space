import express from 'express'
import eventsController from '../controllers/events.js'

const router = express.Router()

router.get('/', eventsController.getEvents)
router.get('/:eventId', eventsController.getEventById)

export default router