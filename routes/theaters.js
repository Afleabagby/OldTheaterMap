import express from 'express'
import { create, edit, addPending, deletee, getAll, manager } from '../controllers/theaters.js'

const router = express.Router()

router.post('/', create)
router.post('/:pendings_id', addPending)
router.patch('/:id', edit)
router.delete('/:id', deletee)
router.get('/', getAll)
router.get('/manager/:manager', manager)

export default router
