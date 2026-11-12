import { useEffect,useState } from "react";
import api from "../api/client";
import DestinationCard from "../components/DestinationCard";
export default function Destinations(){const [places,setPlaces]=useState([]),[error,setError]=useState("");useEffect(()=>{api.get("/destinations").then(r=>setPlaces(r.data)).catch(()=>setError("Could not load destinations. Check backend connection."));},[]);return <main className="page-wrap"><div className="page-heading"><span className="eyebrow">GET INSPIRED</span><h1>Explore destinations</h1><p>From colourful cities to peaceful coastlines.</p></div>{error&&<div className="alert">{error}</div>}<div className="destination-grid destination-grid-large">{places.map(p=><DestinationCard key={p._id} place={p}/>)}</div></main>;}
