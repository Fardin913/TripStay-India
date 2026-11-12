import mongoose from "mongoose";
const placeSchema = new mongoose.Schema({
  name: { type: String, required: true }, city: { type: String, required: true }, state: { type: String, required: true },
  country: { type: String, enum: ["India"], default: "India" }, category: { type: String, default: "Attraction" },
  description: { type: String, required: true }, image: { type: String, required: true }, address: String,
  latitude: Number, longitude: Number
}, { timestamps: true });
export default mongoose.model("Place", placeSchema);
