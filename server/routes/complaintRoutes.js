import { Router } from "express";
import { auth, incharge } from "../middleware/auth.js";
import * as complaintController from "../controllers/complaintController.js";

const router = Router();
router.post("/", auth, complaintController.create);
router.get("/", auth, complaintController.list);
router.post("/:id/upvote", auth, complaintController.toggleUpvote);
router.patch("/:id/status", auth, incharge, complaintController.changeStatus);

export default router;
