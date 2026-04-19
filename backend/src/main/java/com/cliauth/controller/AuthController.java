package com.cliauth.controller;

import com.cliauth.model.AuthResponse;
import com.cliauth.model.LoginRequest;
import com.cliauth.model.SignupRequest;
import com.cliauth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        AuthResponse response = authService.register(request);
        if ("error".equals(response.getStatus())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if ("error".equals(response.getStatus())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody Map<String, String> googleData) {
        String email = googleData.get("email");
        String name = googleData.get("name");
        String avatar = googleData.get("avatar");

        if (email == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    AuthResponse.builder().status("error").message("Email is required").build()
            );
        }

        AuthResponse response = authService.googleLogin(email, name, avatar);
        return ResponseEntity.ok(response);
    }
}
