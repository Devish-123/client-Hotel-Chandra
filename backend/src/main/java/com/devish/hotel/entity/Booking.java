package com.devish.hotel.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String customerPhone;

    private LocalDate checkIn;

    private LocalDate checkOut;

    private Double totalAmount; // 🔥 ADD THIS

    private Double discountAmount = 0.0;

    private Double discountPercentage = 0.0;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}