package com.devish.hotel.repository;

import com.devish.hotel.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRoomIdAndCheckInLessThanAndCheckOutGreaterThan(
            Long roomId,
            LocalDate checkOut,
            LocalDate checkIn);

    List<Booking> findByCheckInLessThanAndCheckOutGreaterThan(
            LocalDate endDate,
            LocalDate startDate);
}