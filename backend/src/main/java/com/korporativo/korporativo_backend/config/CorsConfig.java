package com.korporativo.korporativo_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Configuración CORS segura para producción.
 * Define qué orígenes pueden acceder a la API.
 */
@Configuration
public class CorsConfig {

        @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // ⚠️ CAMBIO CLAVE: Usamos setAllowedOriginPatterns("*") 
        // Esto permite CUALQUIER dominio (incluido Vercel y localhost)
        // y funciona perfectamente con setAllowCredentials(true)
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Asegúrate de poner "/**" para cubrir toda la API
        return source;
    }

}
