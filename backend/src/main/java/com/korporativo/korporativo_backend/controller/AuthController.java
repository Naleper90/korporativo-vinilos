package com.korporativo.korporativo_backend.controller;

import com.korporativo.korporativo_backend.dto.LoginRequestDTO;
import com.korporativo.korporativo_backend.dto.LoginResponseDTO;
import com.korporativo.korporativo_backend.dto.RegisterRequestDTO;
import com.korporativo.korporativo_backend.model.Role;
import com.korporativo.korporativo_backend.model.User;
import com.korporativo.korporativo_backend.repository.UserRepository;
import com.korporativo.korporativo_backend.security.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class AuthController {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          JwtTokenProvider jwtTokenProvider,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    // --- LOGIN ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        
        User user = userRepository.findByEmail(loginRequest.getEmail())
            .orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        }

        String token = jwtTokenProvider.generateToken(
            user.getUsername(),
            user.getRole().name().replace("ROLE_", "")
        );

        // AuthController.java (dentro del método login)

    LoginResponseDTO response = new LoginResponseDTO(
        token,
        user.getUsername(),
        user.getRole().name().replace("ROLE_", ""),
        user.getId()
    );

    return ResponseEntity.ok(response);

    }

    // --- REGISTRO ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        
        // 1. Validar si el email ya existe
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("El email ya está en uso.");
        }

        // 2. Validar si el username ya existe
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("El nombre de usuario ya está en uso.");
        }

        // 3. Crear nuevo usuario
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(registerRequest.getPassword()); // Guardamos tal cual (NoOp) o encriptada según tu config
        newUser.setRole(Role.ROLE_USER); // Rol por defecto


        userRepository.save(newUser);

        // 4. Devolver respuesta de éxitos
        Map<String, String> response = new HashMap<>();
        response.put("message", "Usuario registrado con éxito");
        
        return ResponseEntity.ok(response);
    }
}
