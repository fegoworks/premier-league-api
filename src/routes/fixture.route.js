import express from 'express'
import FixtureController from '../controllers/fixture.controller'
import VerifyToken from '../middlewares/auth/token.middleware'
import permissions from '../middlewares/auth/role.middleware'

const router = express.Router()

router.post('/fixtures',
  VerifyToken.verify,
  permissions.adminOnly,
  FixtureController.addFixture)

router.get('/fixtures/:id',
  VerifyToken.verify,
  permissions.adminOnly,
  FixtureController.viewFixture)

router.patch('/fixtures/:id',
  VerifyToken.verify,
  permissions.adminOnly,
  FixtureController.editFixture)

router.patch('/fixtures/:id/scores',
  VerifyToken.verify,
  permissions.adminOnly,
  FixtureController.addScore)


export default router