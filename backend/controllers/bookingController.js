import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
export async function createBooking(req, res) {
  const { hotel: hotelId, checkIn, checkOut, guests } = req.body;
  const start = new Date(checkIn), end = new Date(checkOut);
  if (!hotelId || !checkIn || !checkOut || !guests || Number(guests) < 1 || Number.isNaN(+start) || Number.isNaN(+end) || end <= start)
    return res.status(400).json({ message: "Provide a hotel, valid dates and at least one guest. Check-out must be after check-in." });
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) return res.status(404).json({ message: "Hotel not found." });
  const nights = Math.ceil((end - start) / 86400000);
  const booking = await Booking.create({ user: req.user._id, hotel: hotelId, checkIn: start, checkOut: end, guests: Number(guests), totalPrice: nights * hotel.pricePerNight });
  res.status(201).json(await booking.populate("hotel"));
}
export async function getMyBookings(req, res) {
  res.json(await Booking.find({ user: req.user._id }).populate("hotel").sort({ createdAt: -1 }));
}
