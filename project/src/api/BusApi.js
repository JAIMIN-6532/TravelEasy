// BusApi.js
import axios from "axios";

// Set your backend URL
const API_BASE_URL = "http://localhost:8080"; // Change this as needed

// Searches buses by sending a POST request to /search endpoint
export const searchBuses = async (source, destination, date) => {
  // Note: The backend search endpoint accepts source and destination,
  // date can be included if your backend is extended to support it.
  const response = await axios.post(`${API_BASE_URL}/api/v1/bus/search`, {
    source,
    destination,
    // date // include this if needed by your backend
  });
  console.log(response.data);
  return response.data;
};



// Fetches all buses by sending a GET request to /getAllBuses endpoint
export const getAllBuses = async () => {
  const response = await axios.get(`${API_BASE_URL}/ai/v1/bus/getAllBuses`);
  return response.data;
};


// BusApi.js
export const getBookedSeats = async (busId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/booking/${busId}`);
    console.log("response", response.data);
    return response.data.map(booking => booking.seatNumber);
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    throw new Error("Failed to fetch booked seats");
  }
};
// BusApi.js
export const bookSeats = async (busId, selectedSeats, userId) => {
  const bookingData = {
    busId: busId,
    userId: userId,
    seatNumbers: selectedSeats,
    totalbookedseats: selectedSeats.length,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/booking/book-multiple`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error booking seats:', error);
    throw error;
  }
};

export const getBookings = async (user) => {

  try{
    const response = await axios.get(`${API_BASE_URL}/api/v1/booking/mybooking/${user.id}`);
    return response.data;
  }catch(error){
    console.error('Error fetching tickets:', error);
    throw error;
  }

}

