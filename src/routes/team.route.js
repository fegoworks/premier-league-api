import express from 'express'
import verifyToken from '../middlewares/auth/token.middleware'
import TeamController from '../controllers/team.controller'

const router = express.Router()

router.post('/team/', verifyToken.verify, TeamController.addTeam)

export default router