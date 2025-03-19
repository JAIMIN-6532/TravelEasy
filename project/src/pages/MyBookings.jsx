import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaBus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";
import { getBookings } from "../api/BusApi";
import { useUser } from "../auth/UserContext";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const parseBookingTime = (timeArray) => {
    if (!timeArray || !Array.isArray(timeArray)) return new Date();

    // Create date in UTC
    const utcDate = Date.UTC(
      timeArray[0], // Year
      timeArray[1] - 1, // Month (adjusted for JS 0-based)
      timeArray[2], // Day
      timeArray[3] || 0, // Hours
      timeArray[4] || 0 // Minutes
    );

    // Convert to IST (UTC+5:30)
    return new Date(utcDate + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings(user);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
      setIsLoading(false);
    };

    if (user) fetchBookings();
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      <div className="flex items-center space-x-4 mb-8">
        <FaBus className="text-4xl text-blue-600" />
        <h1 className="text-3xl font-bold">My Bookings</h1>
      </div>

      <div className="space-y-6">
        {bookings
          .sort(
            (a, b) =>
              parseBookingTime(b.bookingTime) - parseBookingTime(a.bookingTime)
          )
          .map((booking) => {
            const bookingDate = parseBookingTime(booking.bookingTime);

            return (
              <motion.div
                key={booking.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">
                      {booking.busName}
                    </h2>
                    <span className="px-4 py-1 rounded-full bg-green-400 text-green-900 font-semibold">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-blue-100">Booking ID: {booking.id}</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <div>
                          <p className="text-gray-600">From</p>
                          <p className="font-semibold">{booking.source}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-purple-600" />
                        <div>
                          <p className="text-gray-600">To</p>
                          <p className="font-semibold">{booking.destination}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="text-blue-600" />
                        <div>
                          <p className="text-gray-600">Journey Date</p>
                          <p className="font-semibold">
                            {parseBookingTime(
                              booking.bookingTime
                            ).toLocaleDateString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaClock className="text-purple-600" />
                        <div>
                          <p className="text-gray-600">Timing</p>
                          <p className="font-semibold">
                            {parseBookingTime(
                              booking.bookingTime
                            ).toLocaleTimeString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-gray-600">Seat Numbers</p>
                      <div className="flex gap-2 mt-1">
                        {booking.seatNumbers.map((seat) => (
                          <span
                            key={seat}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold"
                          >
                            {seat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-blue-600 flex items-center">
                        <FaRupeeSign className="text-xl" />
                        {booking.pricePerSeat * booking.seatNumbers.length}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
}

export default MyBookings;
