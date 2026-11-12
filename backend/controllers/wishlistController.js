import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
export async function getWishlist(req, res) {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist);
}
export async function addWishlist(req, res) {
  if (!(await Hotel.exists({ _id: req.params.hotelId }))) return res.status(404).json({ message: "Hotel not found." });
  await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.params.hotelId } });
  res.json({ message: "Hotel added to wishlist." });
}
export async function removeWishlist(req, res) {
  await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.hotelId } });
  res.json({ message: "Hotel removed from wishlist." });
}
