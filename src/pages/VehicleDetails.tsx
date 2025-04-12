import { motion } from 'framer-motion';
import { ArrowLeft, Battery, Fuel, Gauge, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { vehicles } from '../data/vehicles';

export default function VehicleDetails() {
  const { id } = useParams();
  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-red-600">Vehicle not found</h1>
        <Link to="/marketplace" className="text-blue-600 hover:underline">
          Return to marketplace
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Link
        to="/marketplace"
        className="inline-flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-4"
        >
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {vehicle.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${vehicle.brand} ${vehicle.model} - View ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            ))}
          </div>

          {/* 360 View Section */}
          {vehicle.video && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">360° View</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <a-scene embedded>
                  <a-assets>
                    <video 
                      id="vehicle-video" 
                      src={vehicle.video} 
                      preload="auto"
                      loop="true"
                      crossOrigin="anonymous"
                    ></video>
                  </a-assets>
                  <a-videosphere src="#vehicle-video"></a-videosphere>
                  <a-camera position="0 1.6 0"></a-camera>
                </a-scene>
              </div>
            </div>
          )}

          {/* 3D Model Viewer */}
          {vehicle.modelViewer && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">3D Model</h2>
              <model-viewer
                src={vehicle.modelViewer}
                alt={`${vehicle.brand} ${vehicle.model} 3D Model`}
                auto-rotate
                camera-controls
                style={{ width: '100%', height: '400px' }}
              ></model-viewer>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-xl text-blue-600 font-semibold mt-2">
              ${vehicle.price.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Gauge className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">{vehicle.kmDriven.toLocaleString()} km</span>
            </div>
            <div className="flex items-center space-x-2">
              <Fuel className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">{vehicle.seats} seats</span>
            </div>
            <div className="flex items-center space-x-2">
              <Battery className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">{vehicle.maxPower}</span>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <dl className="grid grid-cols-1 gap-4">
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-600">Transmission</dt>
                <dd className="font-medium">{vehicle.transmission}</dd>
              </div>
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-600">Engine</dt>
                <dd className="font-medium">{vehicle.engine}</dd>
              </div>
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-600">Owner</dt>
                <dd className="font-medium">{vehicle.owner} Owner</dd>
              </div>
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-600">Location</dt>
                <dd className="font-medium">{vehicle.location}</dd>
              </div>
            </dl>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Contact Seller
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}