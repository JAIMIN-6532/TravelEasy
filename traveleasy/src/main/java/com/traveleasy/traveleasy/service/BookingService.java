package com.traveleasy.traveleasy.service;

import com.traveleasy.traveleasy.dto.BookingRequest;
import com.traveleasy.traveleasy.dto.MyBookingsDto;
import com.traveleasy.traveleasy.model.Booking;
import com.traveleasy.traveleasy.model.Bus;
import com.traveleasy.traveleasy.model.User;
import com.traveleasy.traveleasy.repository.BookingRepository;
import com.traveleasy.traveleasy.repository.BusRepo;
import com.traveleasy.traveleasy.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BusRepo busRepository;
    private final UserRepo userRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, BusRepo busRepository, UserRepo userRepository) {
        this.bookingRepository = bookingRepository;
        this.busRepository = busRepository;
        this.userRepository = userRepository;
    }

    // Get all bookings for a specific bus
    public List<Booking> getBookingsByBus(Long busId) {
        return bookingRepository.findByBusId(busId);
    }

    // Book seats for a bus
    public Booking bookSeats(Booking bookingRequest) {
        // Fetch the bus and user details from the database
        Bus bus = busRepository.findById(bookingRequest.getBus().getId()).orElseThrow(() -> new RuntimeException("Bus not found"));
        User user = userRepository.findById(bookingRequest.getUserId().getId()).orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the seat is already booked
        List<Booking> existingBookings = bookingRepository.findByBusIdAndSeatNumber(bookingRequest.getBus().getId(), bookingRequest.getSeatNumber());
        if (!existingBookings.isEmpty()) {
            throw new RuntimeException("Seat already booked");
        }

        // Create a new booking
        bookingRequest.setBookingTime(LocalDate.now());
        bookingRequest.setUserId(user);
        bookingRequest.setBus(bus);

        // Save the booking
        return bookingRepository.save(bookingRequest);
    }

    // BookingService.java
    public List<Booking> bookMultipleSeats(BookingRequest bookingRequest) {
        Bus bus = busRepository.findById(bookingRequest.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        int seatsToBook = bookingRequest.getSeatNumbers().size();
        System.out.println(seatsToBook);
        LocalDate travelDate = bookingRequest.getDate();

        System.out.println(bus.getAvailableSeats());
        // Check available seats first
        if (bus.getAvailableSeats() < seatsToBook) {
            throw new RuntimeException("Not enough available seats");
        }

        // Check each seat availability
        for (Integer seatNumber : bookingRequest.getSeatNumbers()) {
            if (bookingRepository.existsByBusIdAndSeatNumber(bus.getId(), seatNumber)) {
                throw new RuntimeException("Seat " + seatNumber + " already booked");
            }
        }

        // Create bookings
        List<Booking> bookings = bookingRequest.getSeatNumbers().stream()
                .map(seatNumber -> Booking.builder()
                        .bus(bus)
                        .userId(userRepository.findById(bookingRequest.getUserId())
                                .orElseThrow(() -> new RuntimeException("User not found")))
                        .seatNumber(seatNumber)
                        .bookingTime(travelDate)
                        .build())
                .collect(Collectors.toList());

        List<Booking> savedBookings = bookingRepository.saveAll(bookings);

        // Update available seats
        bus.setAvailableSeats(bus.getAvailableSeats() - seatsToBook);
        System.out.println(bus.getAvailableSeats() );
        busRepository.save(bus);
        System.out.println(savedBookings);

        return savedBookings;
    }
    public List<MyBookingsDto> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);

        // Group by both bus and booking date
        Map<Map.Entry<Bus, LocalDate>, List<Booking>> bookingsByBusAndDate = bookings.stream()
                .collect(Collectors.groupingBy(b ->
                        new AbstractMap.SimpleEntry<>(b.getBus(), b.getBookingTime())
                ));

        return bookingsByBusAndDate.entrySet().stream()
                .map(entry -> {
                    Bus bus = entry.getKey().getKey();
                    LocalDate bookingDate = entry.getKey().getValue();
                    List<Integer> seatNumbers = entry.getValue().stream()
                            .map(Booking::getSeatNumber)
                            .collect(Collectors.toList());

                    return MyBookingsDto.builder()
                            .busName(bus.getBusName())
                            .seatNumbers(seatNumbers)
                            .pricePerSeat(bus.getPricePerSeat())
                            .source(bus.getSource())
                            .destination(bus.getDestination())
                            // Combine booking date with bus departure time
                            .bookingTime(bookingDate.atTime(bus.getDepartureTime()))
                            .departureTime(bus.getDepartureTime())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
