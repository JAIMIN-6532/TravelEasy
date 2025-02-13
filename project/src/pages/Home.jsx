import { useState } from 'react';
import { Calendar, MapPin, Search, Clock, Users } from 'lucide-react';
import BusSeatLayout from '../components/BusSeatLayout';

const Home = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [showBuses, setShowBuses] = useState(false);
  const [showSeatLayout, setShowSeatLayout] = useState(false);

  const buses = [
    {
      id: 1,
      name: "Express Deluxe",
      departure: "06:00 AM",
      arrival: "12:00 PM",
      price: 25,
      seats: 30,
      available: 25
    },
    {
      id: 2,
      name: "Premium Express",
      departure: "08:00 AM",
      arrival: "02:00 PM",
      price: 35,
      seats: 30,
      available: 18
    },
    {
      id: 3,
      name: "Super Deluxe",
      departure: "10:00 AM",
      arrival: "04:00 PM",
      price: 30,
      seats: 30,
      available: 22
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setShowBuses(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2070"
          alt="Bus Travel"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Your Journey Begins Here</h1>
            <p className="text-xl mb-8">Book your bus tickets with ease and comfort</p>
            
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
                  <MapPin className="text-indigo-600" />
                  <input 
                    type="text" 
                    placeholder="From"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="bg-transparent w-full focus:outline-none text-gray-800"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
                  <MapPin className="text-indigo-600" />
                  <input 
                    type="text" 
                    placeholder="To"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent w-full focus:outline-none text-gray-800"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
                  <Calendar className="text-indigo-600" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent w-full focus:outline-none text-gray-800"
                  />
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>Search Buses</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBuses && (
        <div className="max-w-7xl mx-auto py-12 px-4">
          <h2 className="text-2xl font-bold mb-8">Available Buses</h2>
          <div className="space-y-6">
            {buses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{bus.name}</h3>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{bus.departure} - {bus.arrival}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{bus.available} seats available</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">${bus.price}</p>
                      <p className="text-sm text-gray-500">per seat</p>
                    </div>
                    <button
                      onClick={() => setShowSeatLayout(true)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showSeatLayout && (
        <BusSeatLayout onClose={() => setShowSeatLayout(false)} />
      )}
    </div>
  );
};

export default Home;