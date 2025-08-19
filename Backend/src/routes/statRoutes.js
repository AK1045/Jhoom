import { Router } from "express";
import { onlyAdmin, protectRoute } from "../middleware/authMiddleware.js";
import { getStats } from "../controller/statController.js";

const router = Router();

router.get("/",protectRoute,onlyAdmin,getStats)
export default router;