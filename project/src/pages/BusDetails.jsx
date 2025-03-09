import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { bookSeats, getBookedSeats } from "../api/BusApi";
import toast from "react-hot-toast";
import "../index.css"

function BusDetails() {
  const { state } = useLocation();
  const bus = state ? state.bus : null;
  const userId = 1; // Replace with the actual userId (this could come from authentication)

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Fetch booked seats when the component mounts
  useEffect(() => {
    if (bus) {
      // Get the list of booked seats for this bus
      const fetchBookedSeats = async () => {
        try {
          const seats = await getBookedSeats(bus.id);
          console.log("seats", seats);
          setBookedSeats(seats);
        } catch (error) {
          toast.error("Failed to fetch booked seats.");
        }
      };

      fetchBookedSeats();
    }
  }, [bus]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return; // Prevent selecting already booked seats

    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((seat) => seat !== seatNumber);
      }
      return [...prev, seatNumber];
    });
  };
// BusDetails.js
const handleCheckout = async () => {
  if (selectedSeats.length === 0) {
    toast.error("Please select at least one seat");
    return;
  }

  try {
    await bookSeats(bus.id, selectedSeats, 1);  //userId to 1 later
    toast.success("Booking successful!");
    setSelectedSeats([]);
    // Refresh booked seats after successful booking
    const seats = await getBookedSeats(bus.id);
    setBookedSeats(seats);
  } catch (error) {
    toast.error(error.response?.data?.message || "Booking failed. Please try again.");
  }
};

  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return "seat-booked";
    if (selectedSeats.includes(seatNumber)) return "seat-selected";
    return "seat-available";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{bus.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Journey Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">From:</span> {bus.source}
                </p>
                <p>
                  <span className="text-gray-600">To:</span> {bus.destination}
                </p>
                {/* <p>
                  <span className="text-gray-600">Duration:</span>{" "}
                  {bus.duration}
                </p> */}
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Timing</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-gray-600">Departure:</span>{" "}
                  {bus.departureTime}
                </p>
                {/* <p>
                  <span className="text-gray-600">Arrival:</span>{" "}
                  {bus.arrivalTime}
                </p> */}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Your Seats</h2>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
              <span>Booked</span>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {Array.from({ length: bus.totalSeats }, (_, i) => i + 1).map(
              (seatNumber) => (
                <motion.button
                  key={seatNumber}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`seat ${getSeatStatus(seatNumber)}`}
                  onClick={() => handleSeatClick(seatNumber)}
                  disabled={bookedSeats.includes(seatNumber)}
                >
                  {seatNumber}
                </motion.button>
              )
            )}
          </motion.div>
        </div>

        <motion.div
          className="border-t pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-2">
              <p className="text-lg">
                Selected Seats:{" "}
                <span className="font-semibold">
                  {selectedSeats.join(", ") || "None"}
                </span>
              </p>
              <p className="text-2xl font-bold text-blue-600">
                Total: ₹{selectedSeats.length * bus.pricePerSeat}
              </p>
            </div>
            <motion.button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={selectedSeats.length === 0}
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default BusDetails;
