import { Router } from "express";
import { auth, incharge } from "../middleware/auth.js";
import * as announcementController from "../controllers/announcementController.js";

const router = Router();

router.get("/", auth, announcementController.listAnnouncements);
router.post("/", auth, incharge, announcementController.createAnnouncement);

export default router;
