import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ExternalLink, Upload, Video, X, Check } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPricePredictions } from '../data/mockDatabase';
import { addVehicle } from '../data/vehicles';
import type { MediaFiles } from '../types/vehicle';

const brands = ['Tesla', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen', 'Porsche'];
const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissions = ['Manual', 'Automatic'];
const owners = ['First', 'Second', 'Third', 'Fourth'];
const seats = [2, 4, 5, 7];

export default function Sell() {
  const navigate = useNavigate();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    kmDriven: '',
    fuelType: '',
    transmission: '',
    owner: '',
    seats: '',
    engine: '',
    maxPower: '',
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFiles>({
    photos: [],
    video: undefined,
  });

  const [showOffers, setShowOffers] = useState(false);
  const [offers, setOffers] = useState<{ platform: string; price: number; url: string }[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setMediaFiles(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 5), // Limit to 5 photos
      }));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaFiles(prev => ({
        ...prev,
        video: e.target.files![0],
      }));
    }
  };

  const removePhoto = (index: number) => {
    setMediaFiles(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const removeVideo = () => {
    setMediaFiles(prev => ({
      ...prev,
      video: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const predictions = getPricePredictions(
      formData.brand,
      formData.year,
      formData.kmDriven,
      formData.fuelType,
      formData.transmission
    );
    
    const autoLinkPrice = Math.round(predictions[0].price * 1.05);
    const allOffers = [
      ...predictions,
      {
        platform: 'AutoLink',
        price: autoLinkPrice,
        url: '#'
      }
    ];
    
    setOffers(allOffers);
    setShowOffers(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAutoLinkSell = async () => {
    // Convert uploaded images to URLs
    const imageUrls = await Promise.all(
      mediaFiles.photos.map(photo => URL.createObjectURL(photo))
    );

    // Create video URL if exists
    let videoUrl = '';
    if (mediaFiles.video) {
      videoUrl = URL.createObjectURL(mediaFiles.video);
    }

    const newVehicle = addVehicle({
      brand: formData.brand,
      model: formData.brand, // You might want to add a model field to the form
      year: parseInt(formData.year),
      price: offers.find(o => o.platform === 'AutoLink')?.price || 0,
      location: 'Listed on AutoLink',
      kmDriven: parseInt(formData.kmDriven),
      fuelType: formData.fuelType as 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid',
      transmission: formData.transmission as 'Manual' | 'Automatic',
      owner: formData.owner,
      seats: parseInt(formData.seats),
      engine: formData.engine,
      maxPower: formData.maxPower,
      images: imageUrls,
      video: videoUrl
    });

    setShowOffers(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      navigate('/my-listings');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sell Your Vehicle</h1>
          <p className="text-lg text-gray-600">
            Compare offers from top platforms and get the best value for your car
          </p>
        </div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-8"
        >
          {/* Media Upload Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Vehicle Media</h3>
            
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos (up to 5)
              </label>
              <input
                type="file"
                ref={photoInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                multiple
                className="hidden"
              />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {mediaFiles.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Vehicle photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {mediaFiles.photos.length < 5 && (
                  <button
                    type="button"
                    onClick={handlePhotoClick}
                    className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
                  >
                    <Camera className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Add Photo</span>
                  </button>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video (optional)
              </label>
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoChange}
                accept="video/*"
                className="hidden"
              />
              {mediaFiles.video ? (
                <div className="relative group inline-block">
                  <div className="rounded-lg overflow-hidden bg-gray-100 p-4 flex items-center space-x-2">
                    <Video className="h-6 w-6 text-gray-500" />
                    <span className="text-gray-700">{mediaFiles.video.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleVideoClick}
                  className="w-full rounded-lg border-2 border-dashed border-gray-300 p-4 flex items-center justify-center hover:border-blue-500 transition-colors"
                >
                  <Video className="h-6 w-6 text-gray-400 mr-2" />
                  <span className="text-gray-500">Upload Video</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="kmDriven" className="block text-sm font-medium text-gray-700 mb-2">
                Kilometers Driven
              </label>
              <input
                type="number"
                id="kmDriven"
                name="kmDriven"
                value={formData.kmDriven}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="e.g., 50000"
                required
              />
            </div>

            <div>
              <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select Fuel Type</option>
                {fuelTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                Transmission
              </label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select Transmission</option>
                {transmissions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-2">
                Owner
              </label>
              <select
                id="owner"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select Owner</option>
                {owners.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="seats" className="block text-sm font-medium text-gray-700 mb-2">
                Seats
              </label>
              <select
                id="seats"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="">Select Seats</option>
                {seats.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="engine" className="block text-sm font-medium text-gray-700 mb-2">
                Engine
              </label>
              <input
                type="text"
                id="engine"
                name="engine"
                value={formData.engine}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="e.g., 2.0L Turbo"
                required
              />
            </div>

            <div>
              <label htmlFor="maxPower" className="block text-sm font-medium text-gray-700 mb-2">
                Max Power
              </label>
              <input
                type="text"
                id="maxPower"
                name="maxPower"
                value={formData.maxPower}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="e.g., 250 hp"
                required
              />
            </div>
          </div>

          <div className="pt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg"
            >
              Get Instant Offers
            </motion.button>
          </div>
        </motion.form>
      </div>

      {/* Offers Modal */}
      <AnimatePresence>
        {showOffers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Instant Offers</h2>
                <button
                  onClick={() => setShowOffers(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {offers.map((offer, index) => (
                  <motion.div
                    key={offer.platform}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-xl p-6 ${
                      offer.platform === 'AutoLink'
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className={`text-xl font-semibold ${
                        offer.platform === 'AutoLink' ? 'text-green-700' : 'text-gray-900'
                      }`}>
                        {offer.platform}
                        {offer.platform === 'AutoLink' && (
                          <span className="ml-2 inline-block px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                            Recommended
                          </span>
                        )}
                      </h3>
                      <span className={`text-2xl font-bold ${
                        offer.platform === 'AutoLink' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        ${offer.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        {offer.platform === 'AutoLink'
                          ? 'Best value with instant listing and wider reach'
                          : 'AI-predicted value based on current market trends'}
                      </p>
                      {offer.platform === 'AutoLink' ? (
                        <button
                          onClick={handleAutoLinkSell}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          List on AutoLink
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </button>
                      ) : (
                        <a
                          href={offer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                          Sell on {offer.platform}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                * These are estimated values. Final price may vary based on vehicle condition and market factors.
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Listed!</h2>
              <p className="text-gray-600">
                Your vehicle has been added to the AutoLink marketplace.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}