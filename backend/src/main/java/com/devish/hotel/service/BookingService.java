package com.devish.hotel.service;

import com.devish.hotel.dto.BookingResponseDTO;
import com.devish.hotel.entity.Booking;
import com.devish.hotel.entity.Room;
import com.devish.hotel.repository.BookingRepository;
import com.devish.hotel.repository.RoomRepository;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository,
            RoomRepository roomRepository) {
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    // 🔥 UPDATED PAGINATION WITH SORTING
    public Page<BookingResponseDTO> getBookingsPaginated(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Booking> bookingsPage = bookingRepository.findAll(pageable);

        return bookingsPage.map(this::mapToDTO);
    }

    // 🔹 CREATE BOOKING
    public BookingResponseDTO createBooking(Long roomId,
            String customerName,
            String customerPhone,
            LocalDate checkIn,
            LocalDate checkOut,
            Double discount) {

        if (checkOut.isBefore(checkIn) || checkOut.equals(checkIn)) {
            throw new RuntimeException("Invalid check-in/check-out dates");
        }

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        List<Booking> overlappingBookings = bookingRepository.findByRoomIdAndCheckInLessThanAndCheckOutGreaterThan(
                roomId, checkOut, checkIn);

        if (!overlappingBookings.isEmpty()) {
            throw new RuntimeException("Room already booked for selected dates");
        }

        double baseAmount = room.getPrice();
        double discountAmount = discount != null && discount > 0 ? discount : 0.0;
        double finalAmount = baseAmount - discountAmount;

        // Ensure final amount is not negative
        if (finalAmount < 0) {
            finalAmount = 0.0;
        }

        Booking booking = Booking.builder()
                .customerName(customerName)
                .customerPhone(customerPhone)
                .checkIn(checkIn)
                .checkOut(checkOut)
                .totalAmount(finalAmount)
                .discountAmount(discountAmount)
                .discountPercentage(baseAmount > 0 ? (discountAmount / baseAmount) * 100 : 0.0)
                .room(room)
                .build();

        Booking saved = bookingRepository.save(booking);

        return mapToDTO(saved);
    }

    // 🔹 GET ALL BOOKINGS (Optional - Can remove later)
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // 🔹 GET BOOKINGS BETWEEN DATES (Optional - Can rework later)
    public List<BookingResponseDTO> getBookingsBetween(LocalDate start, LocalDate end) {

        if (end.isBefore(start)) {
            throw new RuntimeException("Invalid date range");
        }

        return bookingRepository
                .findByCheckInLessThanAndCheckOutGreaterThan(end, start)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    // 🔹 CALCULATE REVENUE
    public double calculateRevenue(LocalDate start, LocalDate end) {

        if (end.isBefore(start)) {
            throw new RuntimeException("Invalid date range");
        }

        List<Booking> bookings = bookingRepository.findByCheckInLessThanAndCheckOutGreaterThan(end, start);

        return bookings.stream()
                .mapToDouble(Booking::getTotalAmount)
                .sum();
    }

    // 🔥 DTO MAPPING METHOD
    private BookingResponseDTO mapToDTO(Booking booking) {
        return BookingResponseDTO.builder()
                .id(booking.getId())
                .customerName(booking.getCustomerName())
                .customerPhone(booking.getCustomerPhone())
                .checkIn(booking.getCheckIn().toString())
                .checkOut(booking.getCheckOut().toString())
                .totalAmount(booking.getTotalAmount())
                .roomNumber(booking.getRoom().getRoomNumber())
                .roomType(booking.getRoom().getType())
                .build();
    }
}