package com.traveleasy.traveleasy.repository;

import com.traveleasy.traveleasy.dto.MyBookingsDto;
import com.traveleasy.traveleasy.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Find all bookings for a specific bus
    List<Booking> findByBusId(Long busId);

    // Find if a seat is already booked on a specific bus
    List<Booking> findByBusIdAndSeatNumber(Long busId, Integer seatNumber);

    boolean existsByBusIdAndSeatNumber(Long id, Integer seatNumber);

    List<MyBookingsDto> findByUserId(Long uid);
}
