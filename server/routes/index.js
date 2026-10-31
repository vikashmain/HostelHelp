import { Router } from "express";
import authRoutes from "./authRoutes.js";
import complaintRoutes from "./complaintRoutes.js";
import announcementRoutes from "./announcementRoutes.js";
import { auth } from "../middleware/auth.js";
import { getPublicComplaints } from "../controllers/complaintController.js";
import { checkSimilar } from "../controllers/complaintController.js";

const router = Router();
router.use("/auth", authRoutes);
router.get("/public", auth, getPublicComplaints);
router.post("/check-similar", auth, checkSimilar);
router.use("/complaints", complaintRoutes);
router.use("/announcements", announcementRoutes);

export default router;
