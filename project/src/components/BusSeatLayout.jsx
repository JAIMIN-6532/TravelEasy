import { useState } from 'react';

const BusSeatLayout = ({ onClose }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = 10;
  const seatsPerRow = 3;

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Select Your Seats</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {/* Bus Layout */}
          <div className="col-span-3">
            <div className="grid grid-cols-4 gap-2 mb-4">
              {/* Driver's seat */}
              <div className="col-span-4 flex justify-end mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  🚌
                </div>
              </div>

              {/* Passenger seats */}
              {Array.from({ length: rows * seatsPerRow }, (_, index) => {
                const seatNumber = index + 1;
                const isSelected = selectedSeats.includes(seatNumber);
                return (
                  <button
                    key={seatNumber}
                    onClick={() => toggleSeat(seatNumber)}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-colors
                      ${isSelected 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Legend and booking summary */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold">Seat Legend</h3>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-100 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-indigo-600 rounded"></div>
                <span className="text-sm">Selected</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <p className="text-sm text-gray-600">Selected Seats: {selectedSeats.join(', ')}</p>
              <p className="text-sm text-gray-600">Total Amount: ${selectedSeats.length * 25}</p>
              <button 
                className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={selectedSeats.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSeatLayout;