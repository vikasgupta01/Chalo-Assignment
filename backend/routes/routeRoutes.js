import express from "express";
import {
  deleteRoute,
  getRouteById,
  getRoutes,
  registerRoute,
  updateRoute,
} from "../controllers/routeController.js";
const router = express.Router();

router.route("/").post(registerRoute).get(getRoutes);
router.route("/:id").delete(deleteRoute).get(getRouteById).put(updateRoute);

export default router;
