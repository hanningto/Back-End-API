//Custom file to export all routers
import { Router } from "express";

//import all routes
import userRouter from './eventRoutes.mjs'

const router = Router()
//use all the imported routes
router.use(userRouter)

export default router
