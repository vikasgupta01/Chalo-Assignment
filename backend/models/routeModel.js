import mongoose from "mongoose";

const routeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    direction: {
      type: Boolean,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    listOfStopsInSeq: [
      {
        name: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        stop: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Stop",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.model("Route", routeSchema);

export default Route;
