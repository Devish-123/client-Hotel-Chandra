package com.devish.hotel.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDTO {

    @NotNull
    private Long roomId;

    @NotBlank
    private String customerName;

    @NotBlank
    private String customerPhone;

    @NotBlank
    private String checkIn;

    @NotBlank
    private String checkOut;

    private Double discount = 0.0;
}