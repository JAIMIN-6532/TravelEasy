import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import { searchBuses } from "../api/BusApi";


function Home() {
  const navigate = useNavigate();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date());
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bus,setbus] = useState({});


  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await searchBuses(source, destination, date);
      setBuses(data);
    } catch (error) {
      console.error("Error searching buses:", error);
    }
    setIsLoading(false);
  };

  const handleViewSeats = (busId) => {
    const bus = buses.find((bus) => bus.id === busId);
    setbus(bus);
    console.log("bus",bus);
    navigate(`/bus/${busId}`, {state:{bus,date}});
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  // Mock bus data
  // const mockBuses = [
  //   {
  //     id: 1,
  //     name: "Luxury Express",
  //     image:
  //       "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
  //     price: 1200,
  //     totalSeats: 40,
  //     availableSeats: 25,
  //     source: "Mumbai",
  //     destination: "Delhi",
  //     features: ["WiFi", "AC", "USB Charging", "Snacks"],
  //   },
  //   {
  //     id: 2,
  //     name: "Night Rider",
  //     image:
  //       "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop",
  //     price: 1500,
  //     totalSeats: 36,
  //     availableSeats: 20,
  //     source: "Bangalore",
  //     destination: "Chennai",
  //     features: ["Sleeper", "AC", "Blanket", "Water Bottle"],
  //   },
  // ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find Your Perfect Bus Journey
          </motion.h1>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-blue-500" />
                </div>
                <input
                  type="text"
                  placeholder="From"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="pl-10 w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-purple-500" />
                </div>
                <input
                  type="text"
                  placeholder="To"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-blue-500" />
                </div>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className="pl-10 w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                  minDate={new Date()}
                />
              </motion.div>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSearch className="text-xl" />
              <span className="text-lg font-semibold">Search Buses</span>
            </motion.button>
          </form>
        </div>

        <div className="space-y-6">
          {buses && buses.map((bus) => (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative overflow-hidden">
                  <img
                    src={bus.image}
                    alt={bus.name}
                    className="h-64 w-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Premium
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {bus.name}
                      </h2>
                      <div className="flex items-center text-gray-600 mb-4">
                        <span>{bus.source}</span>
                        <FaArrowRight className="mx-2" />
                        <span>{bus.destination}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">
                        ₹{bus.pricePerSeat}
                      </p>
                      <p className="text-sm text-gray-500">per seat</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-gray-600">Available Seats</p>
                      <p className="text-xl font-semibold text-blue-600">
                        {bus.availableSeats}/{bus.totalSeats}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-gray-600">Departure Time</p>
                      <p className="text-xl font-semibold text-blue-600">
                        {bus.departureTime}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleViewSeats(bus.id)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Seats
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
