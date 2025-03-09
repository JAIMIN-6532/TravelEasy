package com.traveleasy.traveleasy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyBookingsDto {
    private String busName;
    private List<Integer> seatNumbers;
    private double pricePerSeat;

}
