package com.traveleasy.traveleasy.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BusSearchDto {

    private String source;
    private String destination;
}