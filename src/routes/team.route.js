import express from 'express'
import verifyToken from '../middlewares/auth/token.middleware'
import TeamController from '../controllers/team.controller'

const router = express.Router()

router.post('/team/', verifyToken.verify, TeamController.addTeam)
router.get('/team/:id', verifyToken.verify, TeamController.viewTeam)

export default router