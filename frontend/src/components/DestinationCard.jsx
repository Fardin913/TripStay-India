import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function DestinationCard({ place }) {
 return <Link to={`/destinations/${place._id}`} className="destination-card"><img src={place.image} alt={place.name}/><div className="destination-overlay"><span>{place.category}</span><h3>{place.name}</h3><p>{place.country}</p></div><span className="destination-arrow"><ArrowUpRight size={20}/></span></Link>;
}
