import express from 'express'
import FixtureController from '../controllers/fixture.controller'
import VerifyToken from '../middlewares/auth/token.middleware'
import permissions from '../middlewares/auth/role.middleware'
import validate from '../middlewares/helpers/validate'

const router = express.Router()

router.post('/fixtures',
  VerifyToken.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.createFixtureSchema),
  FixtureController.addFixture)

router.get('/fixtures/pending',
  VerifyToken.verify,
  FixtureController.getFixturesByStatus
)

router.get('/fixtures/completed',
  VerifyToken.verify,
  FixtureController.getFixturesByStatus
)

router.get('/fixtures/:id',
  VerifyToken.verify,
  permissions.adminOnly,
  FixtureController.viewFixture)

router.patch('/fixtures/:id',
  VerifyToken.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.createFixtureSchema),
  FixtureController.editFixture)

router.patch('/fixtures/:id/scores',
  VerifyToken.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.updateScoresSchema),
  FixtureController.addScore)

router.delete('/fixtures/:id',
  VerifyToken.verify,
  permissions.adminOnly,
  FixtureController.deleteFixture)

export default router