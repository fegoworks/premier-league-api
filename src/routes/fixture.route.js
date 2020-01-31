import express from 'express'
import FixtureController from '../controllers/fixture.controller'
import VerifyToken from '../middlewares/auth/token.middleware'

const router = express.Router()

router.post('/fixtures', VerifyToken.verify, FixtureController.addFixture)

export default router