import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, default: "India" },
  description: { type: String, required: true },
  image: { type: String, required: true },
  pricePerNight: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 4.5 },
  amenities: [String],
  address: String
}, { timestamps: true });
export default mongoose.model("Hotel", hotelSchema);
