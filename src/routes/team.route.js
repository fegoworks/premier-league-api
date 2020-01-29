import express from 'express'
import verifyToken from '../middlewares/auth/token.middleware'
import TeamController from '../controllers/team.controller'

const router = express.Router()

router.post('/teams/', verifyToken.verify, TeamController.addTeam)
router.get('/teams/:id', verifyToken.verify, TeamController.viewTeam)
router.patch('/teams/:id', verifyToken.verify, TeamController.editTeam)
router.delete('/teams/:id', verifyToken.verify, TeamController.deleteTeam)

export default router