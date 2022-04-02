import express from "express";
import {
  deleteStop,
  getStopById,
  getStops,
  registerStop,
  updateStop,
} from "../controllers/stopController.js";
const router = express.Router();

router.route("/").post(registerStop).get(getStops);
router.route("/:id").delete(deleteStop).get(getStopById).put(updateStop);

export default router;
