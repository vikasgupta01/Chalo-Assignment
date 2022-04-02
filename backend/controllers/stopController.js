import expressAsyncHandler from "express-async-handler";
import Stop from "../models/stopModel.js";

// @desc Register new stop
// route POST /api/stops
// @access Public
const registerStop = expressAsyncHandler(async (req, res) => {
  const { name, latitude, longitude } = req.body;

  const stopExists = await Stop.findOne({ name });
  // assuming the stops are going to have unique names.

  if (stopExists) {
    res.status = 400;
    throw new Error("Stop already exists");
  }

  const stop = await Stop.create({
    name,
    latitude,
    longitude,
  });

  if (stop) {
    res.status(201).json({
      _id: stop._id,
      name: stop.name,
      latitude: stop.latitude,
      longitude: stop.longitude,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Stop data");
  }
});

// @desc Get all stops
// @route GET /api/stops
// @access Public
const getStops = expressAsyncHandler(async (req, res) => {
  const stops = await Stop.find({});
  res.json(stops);
});

// @desc Get stop by ID
// @route GET /api/stops/:id
// @access Public
const getStopById = expressAsyncHandler(async (req, res) => {
  const stop = await Stop.findById(req.params.id);
  if (stop) {
    res.json(stop);
  } else {
    res.status(404);
    throw new Error("Stop not found!");
  }
});

// @desc Update stop
// @route PUT /api/stops/:id
// @access Public
const updateStop = expressAsyncHandler(async (req, res) => {
  const stop = await Stop.findById(req.params.id);

  if (stop) {
    stop.name = req.body.name || stop.name;
    stop.latitude = req.body.latitude || stop.latitude;
    stop.longitude = req.body.longitude || stop.longitude;

    const updatedStop = await stop.save();

    res.json({
      _id: updatedStop._id,
      name: updatedStop.name,
      latitude: updatedStop.latitude,
      longitude: updatedStop.longitude,
    });
  } else {
    res.status(404);
    throw new Error("Stop not found!");
  }
});

// @desc Delete stop
// @route DELETE /api/stops/:id
// @access Public
const deleteStop = expressAsyncHandler(async (req, res) => {
  const stop = await Stop.findById(req.params.id);
  if (stop) {
    stop.remove();
    res.json({ message: "Stop Removed" });
  } else {
    res.status(404);
    throw new Error("Stop not found!");
  }
});

export { registerStop, getStops, deleteStop, getStopById, updateStop };
