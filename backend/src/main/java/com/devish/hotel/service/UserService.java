package com.devish.hotel.service;

import com.devish.hotel.entity.Role;
import com.devish.hotel.entity.User;
import com.devish.hotel.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
                .build();

        return userRepository.save(user);
    }
}