package com.traveleasy.traveleasy.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyBookingsDto {
    private String busName;
    private List<Integer> seatNumbers;
    private double pricePerSeat;
    private String source;
    private String destination;
    private LocalDateTime bookingtime;

}
