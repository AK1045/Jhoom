import { Router } from "express";
import {createAlbum, createSong,deleteAlbum,deleteSong, verifyAdmin } from "../controller/adminController.js";
import { onlyAdmin, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protectRoute,onlyAdmin);
router.get("/check",protectRoute,onlyAdmin,verifyAdmin);

router.post('/songs',protectRoute,onlyAdmin,createSong);
router.delete('/songs/:id',protectRoute,onlyAdmin,deleteSong);

router.post('/albums',protectRoute,onlyAdmin,createAlbum);
router.delete('/albums/:id',protectRoute,onlyAdmin,deleteAlbum);
export default router;

