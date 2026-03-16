import {pool} from '../config/database.js'
console.log('PGHOST used by pool:', process.env.PGHOST)
const getLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        console.log("ERRRRRRROOOOOOR")
        console.error('getLocations error:', error)
        res.status(409).json({error: error.message})
    }
}

export default {
    getLocations
}