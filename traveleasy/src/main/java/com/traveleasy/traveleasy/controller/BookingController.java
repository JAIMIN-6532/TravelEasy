package com.traveleasy.traveleasy.controller;

import com.traveleasy.traveleasy.dto.BookingRequest;
import com.traveleasy.traveleasy.dto.MyBookingsDto;
import com.traveleasy.traveleasy.model.Booking;
import com.traveleasy.traveleasy.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/booking")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Get all bookings for a bus
    @GetMapping("/{busId}")
    public List<Booking> getBookingsByBus(@PathVariable Long busId) {
        return bookingService.getBookingsByBus(busId);
    }

    // Book seats for a bus
    @PostMapping("/book")
    public Booking bookSeats(@RequestBody Booking bookingRequest) {
        return bookingService.bookSeats(bookingRequest);
    }

    // BookingController.java
    @PostMapping("/book-multiple")
    public List<Booking> bookMultipleSeats(@RequestBody BookingRequest bookingRequest) {
        return bookingService.bookMultipleSeats(bookingRequest);
    }

    @GetMapping("/{uid}")
    public List<MyBookingsDto> getMyBookings(@PathVariable Long uid){
        return bookingService.getMyBookings(uid);
    }

}
