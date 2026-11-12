import Place from "../models/Place.js";
export async function getPlaces(req, res) {
  const filter = { country: "India" };
  if (req.query.city) filter.city = new RegExp(String(req.query.city).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  if (req.query.category && req.query.category !== "All") filter.category = req.query.category;
  if (req.query.search) filter.$or = ["name", "city", "state", "category"].map((field) => ({ [field]: new RegExp(String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }));
  res.json(await Place.find(filter).sort({ city: 1, name: 1 }));
}
