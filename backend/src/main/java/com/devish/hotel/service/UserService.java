package com.devish.hotel.service;

import com.devish.hotel.entity.Role;
import com.devish.hotel.entity.User;
import com.devish.hotel.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(String username, String password, Role role) {

        String encodedPassword = passwordEncoder.encode(password);

        User user = User.builder()
                .username(username)
                .password(encodedPassword)
                .role(role)
                .enabled(true)
                .build();

        return userRepository.save(user);
    }

    // Get all staff (employees)
    public List<User> getAllStaff() {
        return userRepository.findByRole(Role.EMPLOYEE);
    }

    // Update staff status
    public User updateStaffStatus(Long userId, Boolean enabled) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setEnabled(enabled);
        return userRepository.save(user);
    }

    // Delete staff member
    public void deleteStaff(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(userId);
    }
}