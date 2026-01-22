package com.korporativo.korporativo_backend.config;

import com.korporativo.korporativo_backend.model.Role;
import com.korporativo.korporativo_backend.model.User;
import com.korporativo.korporativo_backend.repository.UserRepository;
import com.korporativo.korporativo_backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .requiresChannel(channel -> channel.anyRequest().requiresInsecure())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Swagger y H2 abiertos
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/api-docs",
                                "/v3/api-docs/**",
                                "/h2-console/**"
                        ).permitAll()
                        
                        // Login y Registro públicos
                        .requestMatchers("/api/auth/**").permitAll()
                        
                        // --- PERMITIR PRESUPUESTOS SIN LOGIN (SOLO PARA PRUEBAS) ---
                        .requestMatchers("/api/presupuestos/**").permitAll()

                        // Toda la API requiere estar autenticado
                        .requestMatchers("/api/**").authenticated()
                        
                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        // H2 console
        http.headers(headers -> headers
                .frameOptions(frame -> frame.disable())
                .httpStrictTransportSecurity(hsts -> hsts.disable())
        );

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole().name().replace("ROLE_", ""))
                    .build();
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
