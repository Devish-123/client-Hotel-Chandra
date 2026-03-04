package com.devish.hotel.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class BookingResponseDTO {

    private Long id;
    private String customerName;
    private String customerPhone;
    private String checkIn;
    private String checkOut;
    private double totalAmount;

    private String roomNumber;
    private String roomType;
}