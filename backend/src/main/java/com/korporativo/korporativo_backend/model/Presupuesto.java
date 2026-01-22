package com.korporativo.korporativo_backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "presupuestos")
public class Presupuesto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private Double precio;

    private String descripcion;

    @Column(nullable = false)
    private LocalDate fecha = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = true)
    @JsonIgnoreProperties({"presupuestos"})
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // AÑADIDO: fetch = FetchType.EAGER para evitar errores de carga
    @OneToMany(mappedBy = "presupuesto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ViniloConfig> viniloConfigs = new ArrayList<>();

    public Presupuesto() {}

    public Presupuesto(String titulo, Double precio, String descripcion, Cliente cliente) {
        this.titulo = titulo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cliente = cliente;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<ViniloConfig> getViniloConfigs() { return viniloConfigs; }
    public void setViniloConfigs(List<ViniloConfig> viniloConfigs) { this.viniloConfigs = viniloConfigs; }
}
