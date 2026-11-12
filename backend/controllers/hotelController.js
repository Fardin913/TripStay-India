import Hotel from "../models/Hotel.js";
export async function getHotels(req, res) {
  const filter = { country: "India" };
  if (req.query.city) filter.city = new RegExp(req.query.city, "i");
  if (req.query.search) filter.$or = [{ name: new RegExp(req.query.search, "i") }, { city: new RegExp(req.query.search, "i") }];
  const hotels = await Hotel.find(filter).sort({ rating: -1 });
  res.json(hotels);
}
export async function getHotel(req, res) {
  const hotel = await Hotel.findOne({ _id: req.params.id, country: "India" });
  if (!hotel) return res.status(404).json({ message: "Hotel not found." });
  res.json(hotel);
}
export async function createHotel(req, res) {
  if (req.body.country && req.body.country !== "India") return res.status(400).json({ message: "TripStay accepts Indian hotels only." });
  const hotel = await Hotel.create({ ...req.body, country: "India" });
  res.status(201).json(hotel);
}
