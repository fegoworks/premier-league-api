import express from 'express'
import verifyToken from '../middlewares/auth/token.middleware'
import TeamController from '../controllers/team.controller'
import validate from '../middlewares/helpers/validate'
import permissions from '../middlewares/auth/role.middleware'

const router = express.Router()

router.post('/teams/',
  verifyToken.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.createTeamSchema),
  TeamController.addTeam)

router.get('/teams/:id',
  verifyToken.verify,
  permissions.adminOnly,
  // validate.validateParams(validate.schemas.teamIdSchema),
  TeamController.viewTeam)

router.patch('/teams/:id',
  verifyToken.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.createTeamSchema),
  TeamController.editTeam)

router.delete('/teams/:id',
  verifyToken.verify,
  permissions.adminOnly,
  TeamController.deleteTeam)

export default router