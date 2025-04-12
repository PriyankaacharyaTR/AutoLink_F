import { motion } from 'framer-motion';
import { ArrowLeft, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import { vehicles } from '../data/vehicles';

export default function MyListings() {
  // Filter vehicles that were listed on AutoLink
  const myListings = vehicles.filter(v => v.location === 'Listed on AutoLink');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen dark-gradient py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/marketplace"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Marketplace
          </Link>
          <Link
            to="/sell"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Car className="h-5 w-5 mr-2" />
            List Another Vehicle
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gradient mb-8">My Listed Vehicles</h1>

        {myListings.length === 0 ? (
          <div className="text-center py-12">
            <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">No Vehicles Listed Yet</h2>
            <p className="text-gray-300 mb-6">Start selling your vehicles on AutoLink today!</p>
            <Link
              to="/sell"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              List Your First Vehicle
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myListings.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card rounded-xl overflow-hidden"
              >
                <div className="relative aspect-video">
                  <img
                    src={vehicle.images[0]}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h2>
                  <div className="space-y-2 text-gray-300 mb-4">
                    <p>Year: {vehicle.year}</p>
                    <p>Mileage: {vehicle.kmDriven.toLocaleString()} km</p>
                    <p>Price: ${vehicle.price.toLocaleString()}</p>
                  </div>

                  {/* 3D Preview Section */}
                  {vehicle.video && (
                    <div className="mt-4 rounded-lg overflow-hidden bg-black/30">
                      <h3 className="text-lg font-medium text-white mb-2">3D Preview</h3>
                      <div className="h-48">
                        <a-scene embedded>
                          <a-assets>
                            <video 
                              id={`video-${vehicle.id}`}
                              src={vehicle.video}
                              preload="auto"
                              loop="true"
                              crossOrigin="anonymous"
                            ></video>
                          </a-assets>
                          <a-videosphere src={`#video-${vehicle.id}`}></a-videosphere>
                          <a-camera position="0 1.6 0"></a-camera>
                        </a-scene>
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/vehicle/${vehicle.id}`}
                    className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}