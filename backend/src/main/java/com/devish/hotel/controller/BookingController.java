package com.devish.hotel.controller;

import com.devish.hotel.dto.BookingRequestDTO;
import com.devish.hotel.dto.BookingResponseDTO;
import com.devish.hotel.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ✅ Create Booking
    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @Valid @RequestBody BookingRequestDTO request) {

        BookingResponseDTO booking = bookingService.createBooking(
                request.getRoomId(),
                request.getCustomerName(),
                request.getCustomerPhone(),
                LocalDate.parse(request.getCheckIn()),
                LocalDate.parse(request.getCheckOut()),
                request.getDiscount());

        return ResponseEntity.ok(booking);
    }

    // ✅ Get Revenue Between Dates
    @GetMapping("/revenue")
    public ResponseEntity<Double> getRevenue(
            @RequestParam("start") String start,
            @RequestParam("end") String end) {

        double revenue = bookingService.calculateRevenue(
                LocalDate.parse(start),
                LocalDate.parse(end));

        return ResponseEntity.ok(revenue);
    }

    // 🔥 Paginated + Sorted Bookings (Protected Page Size)
    @GetMapping
    public ResponseEntity<Page<BookingResponseDTO>> getBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        // 🚨 Protect against abuse
        if (size > 50) {
            size = 50;
        }

        return ResponseEntity.ok(
                bookingService.getBookingsPaginated(page, size, sortBy, direction));
    }

    // ✅ Debug Endpoint
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}