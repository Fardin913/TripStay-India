import Stripe from "stripe";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_SECRET_KEY.startsWith("sk_test_")) {
    const error = new Error("Stripe test mode is not configured. Add your sk_test_ key to backend/.env."); error.status = 503; throw error;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};
export async function createCheckoutSession(req, res) {
  const { hotel: hotelId, checkIn, checkOut, guests } = req.body;
  const start = new Date(checkIn), end = new Date(checkOut), guestCount = Number(guests);
  if (!hotelId || !checkIn || !checkOut || !Number.isInteger(guestCount) || guestCount < 1 || guestCount > 12 || Number.isNaN(+start) || Number.isNaN(+end) || end <= start)
    return res.status(400).json({ message: "Enter a hotel, valid dates and 1–12 guests. Check-out must be after check-in." });
  const hotel = await Hotel.findById(hotelId);
  if (!hotel || hotel.country !== "India") return res.status(404).json({ message: "Indian hotel not found." });
  const nights = Math.ceil((end - start) / 86400000);
  const booking = await Booking.create({ user: req.user._id, hotel: hotelId, checkIn: start, checkOut: end, guests: guestCount, totalPrice: nights * hotel.pricePerNight, status: "pending", paymentStatus: "pending" });
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment", payment_method_types: ["card"],
      line_items: [{ quantity: 1, price_data: { currency: (process.env.STRIPE_CURRENCY || "inr").toLowerCase(), unit_amount: Math.round(booking.totalPrice * 100), product_data: { name: `${hotel.name} — ${nights} night(s)`, description: `${hotel.city}, India · ${guestCount} guest(s)` } } }],
      metadata: { bookingId: booking._id.toString(), userId: req.user._id.toString() },
      success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/payment/cancel?booking_id=${booking._id}`
    });
    booking.stripeSessionId = session.id; await booking.save();
    res.status(201).json({ url: session.url, bookingId: booking._id, totalPrice: booking.totalPrice });
  } catch (error) {
    booking.paymentStatus = "failed"; booking.status = "cancelled"; await booking.save();
    res.status(error.status || 500).json({ message: error.status ? error.message : "Could not start Stripe Checkout. Check your test key and Stripe account settings." });
  }
}
export async function confirmCheckout(req, res) {
  const { session_id: sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ message: "Missing checkout session ID." });
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid" || session.metadata?.userId !== req.user._id.toString()) return res.status(400).json({ message: "Payment is not verified for this account." });
  const booking = await Booking.findOne({ _id: session.metadata.bookingId, user: req.user._id }).populate("hotel");
  if (!booking || booking.stripeSessionId !== session.id) return res.status(404).json({ message: "Booking not found for this checkout." });
  booking.status = "confirmed"; booking.paymentStatus = "paid"; await booking.save();
  res.json({ message: "Test payment verified and booking confirmed.", booking });
}
export async function cancelCheckout(req, res) {
  const booking = await Booking.findOne({ _id: req.body.bookingId, user: req.user._id });
  if (!booking) return res.status(404).json({ message: "Booking not found." });
  if (booking.paymentStatus !== "paid") { booking.status = "cancelled"; booking.paymentStatus = "failed"; await booking.save(); }
  res.json({ message: "Checkout cancelled. No payment was recorded." });
}
