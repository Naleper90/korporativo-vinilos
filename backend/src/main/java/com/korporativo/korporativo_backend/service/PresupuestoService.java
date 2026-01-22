package com.korporativo.korporativo_backend.service;

import com.korporativo.korporativo_backend.dto.CreatePresupuestoRequestDTO;
import com.korporativo.korporativo_backend.dto.PresupuestoDTO;
import com.korporativo.korporativo_backend.model.Cliente;
import com.korporativo.korporativo_backend.model.Presupuesto;
import com.korporativo.korporativo_backend.model.User;
import com.korporativo.korporativo_backend.model.ViniloConfig;
import com.korporativo.korporativo_backend.repository.ClienteRepository;
import com.korporativo.korporativo_backend.repository.PresupuestoRepository;
import com.korporativo.korporativo_backend.repository.UserRepository;
import com.korporativo.korporativo_backend.repository.ViniloConfigRepository;
import com.korporativo.korporativo_backend.exception.RecursoNoEncontradoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PresupuestoService {

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ViniloConfigRepository viniloConfigRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Presupuesto> getAllPresupuestos() {
        return presupuestoRepository.findAll();
    }

    public Presupuesto getPresupuestoById(Long id) {
        return presupuestoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNoEncontradoException("Presupuesto no encontrado: " + id)
                );
    }

    /**
     * MÉTODO PRINCIPAL PARA GUARDAR DESDE CALCULADORA ANGULAR
     */
    public Presupuesto createFullBudget(CreatePresupuestoRequestDTO dto) {

        // 1. Crear la entidad Presupuesto (Cabecera)
        Presupuesto presupuesto = new Presupuesto();
        presupuesto.setFecha(LocalDate.now());
        presupuesto.setPrecio(dto.getPrecioFinal() != null ? dto.getPrecioFinal() : 0.0);
        
        String tituloAuto = "Vinilo " + dto.getTipoVinilo() + " (" + dto.getAnchoCm() + "x" + dto.getAltoCm() + ")";
        presupuesto.setTitulo(tituloAuto);
        presupuesto.setDescripcion("Pedido desde calculadora web. País: " + dto.getPais());

        // 2. ASIGNAR USUARIO
        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId()).orElse(null);
            
            if (user != null) {
                System.out.println("✅ Usuario asignado: " + user.getUsername());
                presupuesto.setUser(user);
            } else {
                System.err.println("❌ Usuario con ID " + dto.getUserId() + " NO encontrado en BD");
            }
        } else {
            System.err.println("⚠️ ATENCIÓN: El DTO llegó sin User ID. Buscando en SecurityContext...");
            // Fallback de seguridad
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
                userRepository.findByUsername(auth.getName())
                        .ifPresent(u -> {
                            System.out.println("✅ Usuario recuperado de SecurityContext: " + u.getUsername());
                            presupuesto.setUser(u);
                        });
            }
        }

        // Cliente se queda null por ahora
        presupuesto.setCliente(null);

        // Guardamos
        Presupuesto savedPresupuesto = presupuestoRepository.save(presupuesto);

        // 3. Crear ViniloConfig
        ViniloConfig config = new ViniloConfig();
        config.setPresupuesto(savedPresupuesto);
        config.setAnchoCm(dto.getAnchoCm());
        config.setAltoCm(dto.getAltoCm());
        config.setTipoVinilo(dto.getTipoVinilo());
        config.setTipoCorte(dto.getTipoCorte());
        config.setTipoAdhesivo(dto.getTipoAdhesivo());
        config.setIncluirInstalacion(dto.getIncluirInstalacion());
        config.setIncluirIva(dto.getIncluirIva());
        config.setPais(dto.getPais());
        
        viniloConfigRepository.save(config);

        return savedPresupuesto;
    }

    // --- OBTENER PRESUPUESTOS POR USUARIO ---
    public List<Presupuesto> getPresupuestosByUserId(Long userId) {
        return presupuestoRepository.findByUser_Id(userId);
    }

    public Presupuesto savePresupuesto(Presupuesto presupuesto) {
        return presupuestoRepository.save(presupuesto);
    }

    public void deletePresupuesto(Long id) {
        presupuestoRepository.deleteById(id);
    }

    public List<Presupuesto> getPresupuestosByClienteId(Long clienteId) {
        return presupuestoRepository.findByClienteId(clienteId);
    }

    public Double getTotalPresupuestosByClienteId(Long clienteId) {
        return presupuestoRepository.sumPrecioByClienteId(clienteId);
    }

    public Long countVinilosByPresupuestoId(Long presupuestoId) {
        return viniloConfigRepository.countByPresupuestoId(presupuestoId);
    }

    // -------- DTOs --------

    public PresupuestoDTO toDTO(Presupuesto presupuesto) {
        PresupuestoDTO dto = new PresupuestoDTO();
        dto.setId(presupuesto.getId());
        dto.setTitulo(presupuesto.getTitulo());
        dto.setPrecio(presupuesto.getPrecio());
        dto.setDescripcion(presupuesto.getDescripcion());
        dto.setFecha(presupuesto.getFecha());
        dto.setClienteId(
                presupuesto.getCliente() != null ? presupuesto.getCliente().getId() : null
        );
        return dto;
    }

    public Presupuesto toEntity(PresupuestoDTO dto) {
        Presupuesto presupuesto = new Presupuesto();
        presupuesto.setId(dto.getId());
        presupuesto.setTitulo(dto.getTitulo());
        presupuesto.setPrecio(dto.getPrecio());
        presupuesto.setDescripcion(dto.getDescripcion());
        presupuesto.setFecha(dto.getFecha());

        if (dto.getClienteId() != null) {
            Cliente cliente = clienteRepository.findById(dto.getClienteId())
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
            presupuesto.setCliente(cliente);
        }
        return presupuesto;
    }

    public List<PresupuestoDTO> findAllDTO() {
        return presupuestoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Page<Presupuesto> findAllPaged(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return presupuestoRepository.findAll(pageable);
    }
}
