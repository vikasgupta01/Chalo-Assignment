import expressAsyncHandler from "express-async-handler";
import Route from "../models/routeModel.js";

// @desc Register new route
// route POST /api/routes
// @access Public
const registerRoute = expressAsyncHandler(async (req, res) => {
  const { name, direction, active, listOfStopsInSeq } = req.body;

  const routeExists = await Route.findOne({ name });
  // assuming the routes are going to have unique names.

  if (routeExists) {
    res.status = 400;
    throw new Error("Route with same name already exists");
  }

  const route = await Route.create({
    name,
    direction,
    active,
    listOfStopsInSeq,
  });

  if (route) {
    res.status(201).json({
      _id: route._id,
      name: route.name,
      direction: route.direction,
      active: route.active,
      listOfStopsInSeq: listOfStopsInSeq,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Route data");
  }
});

// @desc Get all routes
// @route GET /api/routes
// @access Public
const getRoutes = expressAsyncHandler(async (req, res) => {
  const routes = await Route.find({});
  res.json(routes);
});

// @desc Get route by ID
// @route GET /api/routes/:id
// @access Public
const getRouteById = expressAsyncHandler(async (req, res) => {
  const route = await Route.findById(req.params.id);
  if (route) {
    res.json(route);
  } else {
    res.status(404);
    throw new Error("Route not found!");
  }
});

// @desc Update route
// @route PUT /api/routes/:id
// @access Public
const updateRoute = expressAsyncHandler(async (req, res) => {
  const route = await Route.findById(req.params.id);

  if (route) {
    route.name = req.body.name || route.name;
    route.direction =
      req.body.direction != null || req.body.direction != undefined
        ? req.body.direction
        : route.direction;
    // direction is a boolean in DB. true means up and false means down.
    route.active =
      req.body.active != null || req.body.active != undefined
        ? req.body.active
        : route.active;
    route.listOfStopsInSeq =
      req.body.listOfStopsInSeq || route.listOfStopsInSeq;

    const updatedRoute = await route.save();

    res.json({
      _id: updatedRoute._id,
      name: updatedRoute.name,
      direction: updatedRoute.direction,
      active: updatedRoute.active,
      listOfStopsInSeq: updatedRoute.listOfStopsInSeq,
    });
  } else {
    res.status(404);
    throw new Error("Route not found!");
  }
});

// @desc Delete route
// @route DELETE /api/routes/:id
// @access Public
const deleteRoute = expressAsyncHandler(async (req, res) => {
  const route = await Route.findById(req.params.id);
  if (route) {
    route.remove();
    res.json({ message: "Route Removed" });
  } else {
    res.status(404);
    throw new Error("Route not found!");
  }
});

export { registerRoute, getRoutes, deleteRoute, getRouteById, updateRoute };
