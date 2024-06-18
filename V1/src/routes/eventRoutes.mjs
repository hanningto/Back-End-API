import { Router } from "express";
import { getAllEvents, getEventById, postEvent, putEvent, patchEvent, deleteEvent} from "../controllers/eventController.mjs";
import {  checkSchema} from "express-validator";
import { myValidationSchema, validateQuery } from "../utils/validationSchemas/validationSchema.mjs";


const router = Router()
router.route('/')
        .get(getAllEvents)
        .post(checkSchema(myValidationSchema), postEvent)
        

router.route('/:id')
        .get(getEventById)
        .put(checkSchema(myValidationSchema), putEvent)
        .patch(patchEvent)
        .delete(deleteEvent)
        
export default router