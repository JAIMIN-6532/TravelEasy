package com.traveleasy.traveleasy.dto;

import lombok.*;

import java.util.List;

// BookingRequest.java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private Long busId;
    private Long userId;
    private List<Integer> seatNumbers;
}
