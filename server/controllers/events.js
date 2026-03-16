import {pool} from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER By is ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({error: error.message})
    }
} 

export default {
    getEvents
}