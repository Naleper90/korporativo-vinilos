package com.korporativo.korporativo_backend;

import com.korporativo.korporativo_backend.model.Role;
import com.korporativo.korporativo_backend.model.User;
import com.korporativo.korporativo_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class KorporativoBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(KorporativoBackendApplication.class, args);
    }

    @Bean
    @Profile("!test")
    public CommandLineRunner initUsers(UserRepository userRepository) {
        return args -> {
            // Si la base de datos está vacía, creamos los usuarios
            if (userRepository.count() == 0) {
                
                // 1. Crear ADMIN
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@korporativo.com"); // <--- IMPORTANTE: Necesario para el login
                admin.setPassword("admin123");           // Contraseña simple para pruebas
                admin.setRole(Role.ROLE_ADMIN);

                // 2. Crear USER normal
                User user = new User();
                user.setUsername("user");
                user.setEmail("user@korporativo.com");
                user.setPassword("user123");
                user.setRole(Role.ROLE_USER);

                userRepository.save(admin);
                userRepository.save(user);
                
                System.out.println("Usuarios iniciales creados: admin@korporativo.com / admin123");
            }
        };
    }
}
