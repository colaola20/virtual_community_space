import express from 'express'
import locationController from '../controllers/locations.js'

const router  = express.Router()
router.get('/', locationController.getLocations)

router.get('/:locationId', locationController.getLocationById)

export default router