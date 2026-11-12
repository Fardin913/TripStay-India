import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Hotel from "../models/Hotel.js";
import Destination from "../models/Destination.js";
import Place from "../models/Place.js";
dotenv.config();
const img = (id) => `https://images.unsplash.com/${id}?w=1100&q=85`;
const hotels = [
 ["The Grand Palace","Jaipur","Rajasthan",4200,4.8,"Civil Lines","Heritage-inspired stay near the Pink City's historic sights.","photo-1566073771259-6a8506099945"],
 ["Sea Breeze Retreat","Candolim","Goa",5600,4.7,"Candolim Beach Road","A relaxed coastal stay close to North Goa beaches.","photo-1571896349842-33c89424de2d"],
 ["Mountain View Inn","Manali","Himachal Pradesh",3100,4.6,"Old Manali","A peaceful mountain-view stay with a cosy cafe.","photo-1518780664697-55e3ad937233"],
 ["Urban Nest","Mumbai","Maharashtra",4800,4.5,"Andheri West","A modern city hotel with convenient access to Mumbai.","photo-1564501049412-61c2a3083791"],
 ["Lakeview Residency","Udaipur","Rajasthan",5200,4.8,"Lake Pichola","A charming stay for exploring Udaipur's lakes and palaces.","photo-1542314831-068cd1dbfeeb"],
 ["Ganga View Suites","Rishikesh","Uttarakhand",2900,4.6,"Tapovan","A calm base near the Ganga and riverside cafes.","photo-1445019980597-93fa8acb246c"],
 ["Backwater Haven","Alleppey","Kerala",3900,4.7,"Finishing Point","A restful stay close to Kerala's famous backwaters.","photo-1578683010236-d716f9a3f461"],
 ["Tea Garden Escape","Munnar","Kerala",3500,4.8,"Chithirapuram","A hillside retreat surrounded by tea-growing landscapes.","photo-1449158743715-0a90ebb6d2d8"],
 ["Himalayan Pine Stay","Shimla","Himachal Pradesh",3300,4.5,"Mall Road","A warm mountain stay with easy access to town.","photo-1510798831971-661eb04b3739"],
 ["Fort View Hotel","Jodhpur","Rajasthan",3700,4.6,"Paota","A comfortable base for exploring the Blue City.","photo-1564013799919-ab600027ffc6"],
 ["Temple Town Inn","Varanasi","Uttar Pradesh",2600,4.4,"Assi Ghat","A simple, welcoming stay near the old city.","photo-1566073771259-6a8506099945"],
 ["Tech Park Suites","Bengaluru","Karnataka",4500,4.5,"Whitefield","Contemporary rooms for a relaxed city visit.","photo-1551882547-ff40c63fe5fa"],
 ["Coastal Comfort","Kochi","Kerala",3200,4.4,"Fort Kochi","A boutique stay close to heritage streets and cafes.","photo-1566665797739-1674de7a421a"],
 ["Saffron Residency","Amritsar","Punjab",2800,4.5,"Ranjit Avenue","A convenient stay for visiting the Golden Temple.","photo-1564501049412-61c2a3083791"],
 ["City Lights Hotel","New Delhi","Delhi",5100,4.6,"Connaught Place","A central stay for museums, markets and monuments.","photo-1566073771259-6a8506099945"],
 ["Desert Dune Resort","Jaisalmer","Rajasthan",6100,4.7,"Sam Sand Dunes","A desert-themed stay for a memorable Rajasthan trip.","photo-1571896349842-33c89424de2d"],
 ["Shillong Cloud Inn","Shillong","Meghalaya",3400,4.6,"Police Bazaar","A cosy base for exploring Meghalaya's hill scenery.","photo-1518780664697-55e3ad937233"],
 ["Pondy French Quarter Stay","Puducherry","Puducherry",4000,4.7,"White Town","A colourful stay near cafes and the seaside promenade.","photo-1564013799919-ab600027ffc6"],
 ["Ooty Fern Cottage","Ooty","Tamil Nadu",3000,4.5,"Fern Hill","A quiet hill-station stay among green slopes.","photo-1449158743715-0a90ebb6d2d8"],
 ["Darjeeling Ridge Hotel","Darjeeling","West Bengal",3600,4.6,"Chowrasta","A hillside base with access to tea gardens and viewpoints.","photo-1510798831971-661eb04b3739"]
].map(([name,city,state,pricePerNight,rating,address,description,image])=>({name,city,country:"India",state,pricePerNight,rating,address,description,image:img(image),amenities:["Wi-Fi","Breakfast","Air conditioning","24-hour front desk"]}));
const destinations = [
 ["Jaipur","Rajasthan","Heritage city","Forts, palaces, colourful bazaars and Rajasthani food.","October to March","photo-1599661046827-dacff0c0f09a"],
 ["Goa","Goa","Beach escape","Sunny beaches, Portuguese-era lanes and coastal cuisine.","November to February","photo-1512343879784-a960bf40e7f2"],
 ["Manali","Himachal Pradesh","Mountain getaway","Mountain scenery, cafes and nature walks in the Himalayas.","March to June","photo-1626621341517-bbf3d9990a23"],
 ["Mumbai","Maharashtra","City experience","Waterfront promenades, architecture, markets and museums.","November to February","photo-1570168007204-dfb528c6958f"],
 ["Udaipur","Rajasthan","Lakeside retreat","Romantic lakes, ornate palaces and old-city streets.","September to March","photo-1577083552431-6e5fd01aa342"],
 ["Rishikesh","Uttarakhand","River & hills","Riverside views, suspension bridges and peaceful foothill scenery.","September to April","photo-1500530855697-b586d89ba3ee"],
 ["Alleppey","Kerala","Backwater escape","Palm-lined canals, houseboats and tranquil village landscapes.","November to February","photo-1602216056096-3b40cc0c9944"],
 ["Munnar","Kerala","Tea country","Rolling tea gardens, misty hills and cool weather.","September to March","photo-1500534314209-a25ddb2bd429"],
 ["Shimla","Himachal Pradesh","Hill station","Colonial-era architecture, pine forests and mountain views.","March to June","photo-1597074866923-dc0589150358"],
 ["Jodhpur","Rajasthan","Blue city","Blue-painted lanes, Mehrangarh Fort and desert culture.","October to March","photo-1599661046827-dacff0c0f09a"],
 ["Varanasi","Uttar Pradesh","Spiritual heritage","Ancient lanes, riverfront ghats and a deep cultural history.","October to March","photo-1561361513-2d000a50f0dc"],
 ["Bengaluru","Karnataka","Garden city","Green parks, creative neighbourhoods and a lively food scene.","October to February","photo-1596176530529-78163a4f7af2"],
 ["Kochi","Kerala","Coastal heritage","Historic waterfronts, art spaces and a distinctive food culture.","October to March","photo-1578662996442-48f60103fc96"],
 ["Amritsar","Punjab","Cultural city","Warm hospitality, Punjabi food and the Golden Temple.","October to March","photo-1609948543911-6f4f4f5c4f34"],
 ["New Delhi","Delhi","Capital city","Landmark monuments, museums, gardens and bustling markets.","October to March","photo-1587474260584-136574528ed5"],
 ["Jaisalmer","Rajasthan","Desert adventure","Golden sandstone architecture and sweeping Thar Desert dunes.","November to February","photo-1477587458883-47145ed94245"],
 ["Shillong","Meghalaya","Northeast escape","Green hills, waterfalls and a vibrant music culture.","October to April","photo-1500534314209-a25ddb2bd429"],
 ["Puducherry","Puducherry","Seaside town","French Quarter streets, cafes and a breezy promenade.","October to March","photo-1582510003544-4d00b7f74220"],
 ["Ooty","Tamil Nadu","Hill station","Tea estates, gardens and the Nilgiri mountain railway.","October to June","photo-1500530855697-b586d89ba3ee"],
 ["Darjeeling","West Bengal","Tea & mountains","Himalayan views, tea gardens and heritage railway rides.","March to May and October to November","photo-1544735716-392fe2489ffa"],
 ["Hampi","Karnataka","Ancient ruins","Remarkable stone temples and landscapes from the Vijayanagara era.","October to February","photo-1606293926075-69a00dbfde81"],
 ["Agra","Uttar Pradesh","Monument city","Mughal architecture and the world-famous Taj Mahal.","October to March","photo-1564507592333-c60657eea523"],
 ["Pune","Maharashtra","Culture & cafes","Historic forts, leafy districts and a lively student culture.","October to February","photo-1595658658481-d53d3f999875"],
 ["Mysuru","Karnataka","Royal heritage","Palaces, markets and the cultural traditions of Karnataka.","October to March","photo-1602216056096-3b40cc0c9944"]
].map(([name,state,category,description,bestTimeToVisit,image])=>({name,country:"India",state,category,description,bestTimeToVisit,image:img(image)}));
const placeRows = [
 ["Hawa Mahal","Jaipur","Rajasthan","Palace","Iconic pink sandstone facade in the old city.","photo-1599661046827-dacff0c0f09a",26.9239,75.8267],
 ["Amber Fort","Jaipur","Rajasthan","Fort","Hilltop fort known for courtyards and detailed architecture.","photo-1599661046827-dacff0c0f09a",26.9855,75.8513],
 ["City Palace","Udaipur","Rajasthan","Palace","A lakeside palace complex with museums and courtyards.","photo-1577083552431-6e5fd01aa342",24.5764,73.6835],
 ["Mehrangarh Fort","Jodhpur","Rajasthan","Fort","A dramatic hilltop fort overlooking the Blue City.","photo-1599661046827-dacff0c0f09a",26.2971,73.0186],
 ["Taj Mahal","Agra","Uttar Pradesh","Monument","A celebrated white-marble monument and UNESCO World Heritage Site.","photo-1564507592333-c60657eea523",27.1751,78.0421],
 ["Varanasi Ghats","Varanasi","Uttar Pradesh","Riverfront","Historic steps and riverfront views along the Ganga.","photo-1561361513-2d000a50f0dc",25.306,83.0107],
 ["Marine Drive","Mumbai","Maharashtra","Waterfront","A sweeping city promenade beside the Arabian Sea.","photo-1570168007204-dfb528c6958f",18.9432,72.8235],
 ["Gateway of India","Mumbai","Maharashtra","Monument","A landmark arch beside the Mumbai waterfront.","photo-1570168007204-dfb528c6958f",18.922,72.8347],
 ["Baga Beach","Goa","Goa","Beach","A popular North Goa beach with a lively shoreline.","photo-1512343879784-a960bf40e7f2",15.5553,73.7517],
 ["Palolem Beach","Canacona","Goa","Beach","A scenic crescent-shaped beach in South Goa.","photo-1512343879784-a960bf40e7f2",15.0099,74.0232],
 ["Hadimba Temple","Manali","Himachal Pradesh","Temple","A cedar-forest temple with traditional wooden architecture.","photo-1626621341517-bbf3d9990a23",32.2432,77.1892],
 ["Solang Valley","Manali","Himachal Pradesh","Nature","A mountain valley known for dramatic Himalayan scenery.","photo-1626621341517-bbf3d9990a23",32.3167,77.15],
 ["Mall Road","Shimla","Himachal Pradesh","Market","A pedestrian-friendly shopping and cafe street.","photo-1597074866923-dc0589150358",31.1048,77.1734],
 ["Laxman Jhula Area","Rishikesh","Uttarakhand","Riverfront","A well-known Ganga-side neighbourhood and viewpoint area.","photo-1500530855697-b586d89ba3ee",30.127,78.324],
 ["Alleppey Backwaters","Alleppey","Kerala","Nature","A network of palm-lined canals and waterways.","photo-1602216056096-3b40cc0c9944",9.4981,76.3388],
 ["Tea Museum","Munnar","Kerala","Museum","Learn about the region's tea-growing heritage.","photo-1500534314209-a25ddb2bd429",10.0889,77.0595],
 ["Fort Kochi","Kochi","Kerala","Heritage","A historic waterfront district with colourful streets.","photo-1578662996442-48f60103fc96",9.9658,76.2421],
 ["Golden Temple","Amritsar","Punjab","Heritage","A renowned spiritual and architectural landmark.","photo-1609948543911-6f4f4f5c4f34",31.62,74.8765],
 ["Qutub Minar","New Delhi","Delhi","Monument","A historic minaret and UNESCO World Heritage Site.","photo-1587474260584-136574528ed5",28.5245,77.1855],
 ["India Gate","New Delhi","Delhi","Monument","A prominent memorial in the heart of the capital.","photo-1587474260584-136574528ed5",28.6129,77.2295],
 ["Sam Sand Dunes","Jaisalmer","Rajasthan","Desert","A broad desert landscape near Jaisalmer.","photo-1477587458883-47145ed94245",26.8317,70.525],
 ["Umiam Lake","Shillong","Meghalaya","Lake","A scenic reservoir surrounded by green hills.","photo-1500534314209-a25ddb2bd429",25.668,91.8933],
 ["Promenade Beach","Puducherry","Puducherry","Beach","A seaside walkway near the French Quarter.","photo-1582510003544-4d00b7f74220",11.9344,79.8357],
 ["Botanical Gardens","Ooty","Tamil Nadu","Garden","A landscaped garden with diverse plant collections.","photo-1500530855697-b586d89ba3ee",11.411,76.711],
 ["Batasia Loop","Darjeeling","West Bengal","Viewpoint","A scenic railway loop with mountain views.","photo-1544735716-392fe2489ffa",27.041,88.249],
 ["Virupaksha Temple","Hampi","Karnataka","Temple","A historic temple in the Hampi monument complex.","photo-1606293926075-69a00dbfde81",15.335,76.46],
 ["Mysore Palace","Mysuru","Karnataka","Palace","A grand royal palace with ornate interiors.","photo-1602216056096-3b40cc0c9944",12.3052,76.6552],
 ["Lalbagh Botanical Garden","Bengaluru","Karnataka","Garden","A green urban garden with a historic glasshouse.","photo-1596176530529-78163a4f7af2",12.9507,77.5848],
 ["Shaniwar Wada","Pune","Maharashtra","Fort","A historic fortification in central Pune.","photo-1595658658481-d53d3f999875",18.5196,73.8553],
 ["Charminar","Hyderabad","Telangana","Monument","A landmark monument surrounded by lively markets.","photo-1589308078059-be1415eab4c3",17.3616,78.4747]
].map(([name,city,state,category,description,image,latitude,longitude])=>({name,city,state,country:"India",category,description,image:img(image),latitude,longitude,address:`${name}, ${city}, ${state}, India`}));
try {
 await connectDB();
 await Hotel.deleteMany({}); await Destination.deleteMany({}); await Place.deleteMany({});
 await Hotel.insertMany(hotels); await Destination.insertMany(destinations); await Place.insertMany(placeRows);
 console.log(`Inserted ${hotels.length} Indian hotels, ${destinations.length} Indian destinations and ${placeRows.length} Indian attractions.`);
} catch (error) { console.error(error); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
