package com.traveleasy.traveleasy.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Bus")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String busName;

    private String source;

    private String destination;

    private int totalSeats;

    @Column(name = "available_seats")
    private int availableSeats;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime departureTime;

    private int pricePerSeat;

    //Automatically set availableSeats to totalSeats before persisting
    @PrePersist
    @PreUpdate
    public void updateAvailableSeats() {
        this.availableSeats = this.totalSeats;
    }
}
