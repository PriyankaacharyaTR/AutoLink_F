import { motion } from 'framer-motion';
import { ArrowRight, Car, Shield, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000); // Delay to match any potential car animation duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen dark-gradient overflow-hidden flex flex-col justify-between">
      {/* Hero Section */}
      <header className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Car Showcase"
            className="w-full h-[600px] object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-[600px] text-center px-4">
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-7xl font-bold text-gradient mb-4"
          >
            AutoLink
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xl sm:text-2xl text-gray-200 mb-8"
          >
            Experience Luxury. Drive Excellence.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Link
              to="/marketplace"
              className="inline-flex items-center px-8 py-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Main Body Content */}
      {showContent && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {/* Introduction Text */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-semibold text-white mb-4"
            >
              Welcome to AutoLink
            </motion.h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white"
            >
              Your smarter used vehicle marketplace – connecting buyers and sellers with ease.
            </motion.p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: 'Premium Selection',
                description: 'Curated collection of luxury vehicles from elite brands worldwide.'
              },
              {
                icon: Shield,
                title: 'Verified Authenticity',
                description: 'Every vehicle undergoes rigorous authentication and quality checks.'
              },
              {
                icon: Star,
                title: 'Concierge Service',
                description: 'Personal assistance throughout your car buying journey.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.3, duration: 0.8 }}
                className="glass-card p-8 rounded-xl hover:transform hover:scale-105 transition-transform duration-300"
              >
                <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.main>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <p className="mb-2">&copy; {new Date().getFullYear()} AutoLink. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="/login" className="hover:text-white transition-colors">Login</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a>
            <a href="/sell" className="hover:text-white transition-colors">Sell</a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
