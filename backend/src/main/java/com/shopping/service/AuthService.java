package com.shopping.service;

import com.shopping.dto.LoginRequest;
import com.shopping.dto.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private static final String VALID_USERNAME = "admin";
    private static final String VALID_PASSWORD = "admin123";

    public LoginResponse login(LoginRequest request) {
        if (VALID_USERNAME.equals(request.getUsername()) &&
            VALID_PASSWORD.equals(request.getPassword())) {
            return new LoginResponse(true, "Login successful");
        } else {
            return new LoginResponse(false, "Invalid username or password");
        }
    }
}
