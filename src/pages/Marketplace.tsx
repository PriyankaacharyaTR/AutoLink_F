import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Sample vehicle data (same as before)
const vehicles = Array.from({ length: 20 }, (_, i) => ({
id: (i + 1).toString(),
brand: ['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Tesla'][i % 5],
model: ['S-Class', 'M8 Gran Coupe', 'RS e-tron GT', '911 Turbo S', 'Model S Plaid'][i % 5],
year: 2024,
price: [120000, 140000, 160000, 220000, 130000][i % 5],
location: ['Los Angeles, CA', 'Miami, FL', 'New York, NY', 'San Francisco, CA', 'Chicago, IL'][i % 5],
image: [
'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8',
'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13fGVufDB8fDB8fHww',
'https://www.bmw.cc/content/dam/bmw/common/all-models/m-series/series-overview/bmw-m-series-seo-overview-ms-04.jpg',
'https://hips.hearstapps.com/hmg-prod/images/2024-audi-rs7-performance-beach-front-2-1669663938.jpg?crop=0.478xw:0.318xh;0.413xw,0.421xh&resize=1200:*',
'https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/10/audi-q7-q8-steering-issue-recall-4-1602224509.jpg'
][i % 5] + '?auto=format&fit=crop&q=80&w=800'
}));

export default function Marketplace() {
const [search, setSearch] = useState('');
const [brandFilter, setBrandFilter] = useState('');
const [locationFilter, setLocationFilter] = useState('');
const [yearFilter, setYearFilter] = useState('');

const filteredVehicles = useMemo(() => {
return vehicles.filter(v => {
const matchesSearch =
v.brand.toLowerCase().includes(search.toLowerCase()) ||
v.model.toLowerCase().includes(search.toLowerCase());

const matchesBrand = brandFilter ? v.brand === brandFilter : true;
const matchesLocation = locationFilter ? v.location === locationFilter : true;
const matchesYear = yearFilter ? v.year.toString() === yearFilter : true;

return matchesSearch && matchesBrand && matchesLocation && matchesYear;
});
}, [search, brandFilter, locationFilter, yearFilter]);

return (
<div className="min-h-screen dark-gradient">
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
>
<div className="text-center mb-12">
<h1 className="text-4xl font-bold text-gradient mb-4">Luxury Vehicle Collection</h1>
<p className="text-gray-300 text-lg">Discover our handpicked selection of premium vehicles</p>
</div>

{/* Search and Filters */}
<div className="mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
<input
type="text"
placeholder="Search by brand or model..."
value={search}
onChange={(e) => setSearch(e.target.value)}
className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
/>
<select
value={brandFilter}
onChange={(e) => setBrandFilter(e.target.value)}
className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
>
<option value="">All Brands</option>
{[...new Set(vehicles.map(v => v.brand))].map(brand => (
<option key={brand} value={brand}>{brand}</option>
))}
</select>
<select
value={locationFilter}
onChange={(e) => setLocationFilter(e.target.value)}
className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
>
<option value="">All Locations</option>
{[...new Set(vehicles.map(v => v.location))].map(location => (
<option key={location} value={location}>{location}</option>
))}
</select>
<select
value={yearFilter}
onChange={(e) => setYearFilter(e.target.value)}
className="px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
>
<option value="">All Years</option>
{[...new Set(vehicles.map(v => v.year))].map(year => (
<option key={year} value={year}>{year}</option>
))}
</select>
</div>

{/* Vehicle Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{filteredVehicles.map((vehicle, index) => (
<motion.div
key={vehicle.id}
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ delay: index * 0.1 }}
whileHover={{ scale: 1.03 }}
className="glass-card rounded-xl overflow-hidden"
>
<Link to={`/vehicle/${vehicle.id}`}>
<div className="relative">
<img
src={vehicle.image}
alt={`${vehicle.brand} ${vehicle.model}`}
className="w-full h-48 object-cover"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
</div>
<div className="p-6">
<h2 className="text-xl font-semibold text-white mb-2">
{vehicle.brand} {vehicle.model}
</h2>
<p className="text-gray-300 mb-4">{vehicle.year}</p>
<div className="flex justify-between items-center">
<span className="text-blue-400 font-semibold text-lg">
${vehicle.price.toLocaleString()}
</span>
<span className="text-gray-400 text-sm">{vehicle.location}</span>
</div>
</div>
</Link>
</motion.div>
))}
</div>
</motion.div>
</div>
);
}