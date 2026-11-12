import mongoose from "mongoose";
const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, default: "India" },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, default: "Popular place" },
  bestTimeToVisit: String
}, { timestamps: true });
export default mongoose.model("Destination", destinationSchema);
