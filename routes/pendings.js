import express from 'express'
import { addPendings, getPendings, deletePendings } from '../controllers/pendings.js'

const router = express.Router()

router.post('/', addPendings)
router.get('/', getPendings)
router.delete('/:pendings_id/delete', deletePendings)

export default router
