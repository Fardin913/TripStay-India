import { useEffect,useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/client";
import HotelCard from "../components/HotelCard";
import { useAuth } from "../context/AuthContext";
export default function Hotels(){
 const [params]=useSearchParams();const [hotels,setHotels]=useState([]),[search,setSearch]=useState(params.get("search")||""),[wishlist,setWishlist]=useState([]),[error,setError]=useState("");
 const {user}=useAuth();
 const load=()=>api.get("/hotels",{params:search?{search}:{}}).then(r=>setHotels(r.data)).catch(()=>setError("Unable to load hotels. Check backend connection."));
 useEffect(()=>{load();},[]);
 useEffect(()=>{if(user)api.get("/wishlist").then(r=>setWishlist(r.data.map(x=>x._id))).catch(()=>{});},[user]);
 const toggle=async id=>{if(!user){setError("Please log in to save hotels.");return;}try{if(wishlist.includes(id)){await api.delete(`/wishlist/${id}`);setWishlist(w=>w.filter(x=>x!==id));}else{await api.post(`/wishlist/${id}`);setWishlist(w=>[...w,id]);}}catch(e){setError(e.response?.data?.message||"Wishlist update failed.");}};
 return <main className="page-wrap"><div className="page-heading"><span className="eyebrow">FIND YOUR STAY</span><h1>Hotels & stays</h1><p>Explore welcoming places across India.</p></div><form className="filter-bar" onSubmit={e=>{e.preventDefault();load();}}><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by hotel or city"/><button className="btn btn-primary">Search</button></form>{error&&<div className="alert">{error}</div>}<div className="hotel-grid">{hotels.map(h=><HotelCard key={h._id} hotel={h} saved={wishlist.includes(h._id)} onSave={toggle}/>)}</div>{!hotels.length&&!error&&<p className="empty">No stays found. Try another search.</p>}</main>;
}
