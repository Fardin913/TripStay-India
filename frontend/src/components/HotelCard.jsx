import { Link } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";
export default function HotelCard({ hotel, saved, onSave }) {
 return <article className="hotel-card"><div className="hotel-image"><img src={hotel.image} alt={hotel.name}/><button className={`heart-btn ${saved?"saved":""}`} onClick={()=>onSave(hotel._id)} aria-label="Toggle wishlist"><Heart size={18} fill={saved?"currentColor":"none"}/></button></div><div className="hotel-info"><div className="card-top"><span className="muted"><MapPin size={14}/>{hotel.city}, {hotel.country}</span><span className="rating"><Star size={14} fill="currentColor"/>{hotel.rating}</span></div><h3>{hotel.name}</h3><p className="muted clamp">{hotel.description}</p><div className="card-bottom"><div><strong>₹{hotel.pricePerNight?.toLocaleString("en-IN")}</strong><span className="muted"> / night</span></div><Link className="text-link" to={`/hotels/${hotel._id}`}>View stay →</Link></div></div></article>;
}
