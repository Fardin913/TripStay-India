import Destination from "../models/Destination.js";
export async function getDestinations(_req, res) {
  res.json(await Destination.find({ country: "India" }).sort({ name: 1 }));
}
export async function getDestination(req, res) {
  const destination = await Destination.findOne({ _id: req.params.id, country: "India" });
  if (!destination) return res.status(404).json({ message: "Destination not found." });
  res.json(destination);
}
