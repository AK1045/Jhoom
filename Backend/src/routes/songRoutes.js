import { Router } from "express";
import { featuredSongs, findAllSongs, madeForYouSongs, trendingSongs } from "../controller/songController.js";
import { onlyAdmin, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protectRoute,onlyAdmin,findAllSongs);
router.get("/featured",featuredSongs);
router.get("/for-you",madeForYouSongs);
router.get("/trending",trendingSongs);

export default router;