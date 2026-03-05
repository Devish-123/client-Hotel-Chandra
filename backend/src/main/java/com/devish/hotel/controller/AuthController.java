package com.devish.hotel.controller;

import com.devish.hotel.entity.Role;
import com.devish.hotel.entity.User;
import com.devish.hotel.repository.UserRepository;
import com.devish.hotel.security.JwtUtil;
import com.devish.hotel.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Register user
    @PostMapping("/register")
    public ResponseEntity<User> register(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam Role role) {

        User user = userService.createUser(username, password, role);
        return ResponseEntity.ok(user);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username,
            @RequestParam String password) {

        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return ResponseEntity.ok(token);
    }

    // Get all staff
    @GetMapping("/staff")
    public ResponseEntity<?> getAllStaff() {
        return ResponseEntity.ok(userService.getAllStaff());
    }

    // Update staff status (enable/disable)
    @PutMapping("/staff/{id}/status")
    public ResponseEntity<User> updateStaffStatus(@PathVariable Long id, @RequestParam Boolean enabled) {
        return ResponseEntity.ok(userService.updateStaffStatus(id, enabled));
    }

    // Delete staff member
    @DeleteMapping("/staff/{id}")
    public ResponseEntity<String> deleteStaff(@PathVariable Long id) {
        userService.deleteStaff(id);
        return ResponseEntity.ok("Staff member deleted successfully");
    }
}