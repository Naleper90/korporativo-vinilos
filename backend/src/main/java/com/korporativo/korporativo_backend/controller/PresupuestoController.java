package com.korporativo.korporativo_backend.controller;

import com.korporativo.korporativo_backend.dto.CreatePresupuestoRequestDTO;
import com.korporativo.korporativo_backend.dto.PresupuestoDTO;
import com.korporativo.korporativo_backend.model.Presupuesto;
import com.korporativo.korporativo_backend.service.PresupuestoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/presupuestos")
public class PresupuestoController {

    private final PresupuestoService presupuestoService;

    public PresupuestoController(PresupuestoService presupuestoService) {
        this.presupuestoService = presupuestoService;
    }

    // LISTAR TODOS (DTO) - Para Admin o paginación general
    @GetMapping
    public ResponseEntity<Page<PresupuestoDTO>> listarPaginado(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<Presupuesto> pagePresupuestos = presupuestoService.findAllPaged(page, size);

        List<PresupuestoDTO> contenido = pagePresupuestos.getContent()
                .stream()
                .map(presupuestoService::toDTO)
                .collect(Collectors.toList());

        Page<PresupuestoDTO> pageDTO = new PageImpl<>(
                contenido,
                PageRequest.of(page, size),
                pagePresupuestos.getTotalElements()
        );

        return ResponseEntity.ok(pageDTO);
    }

    // OBTENER UNO (entidad)
    @GetMapping("/{id}")
    public ResponseEntity<Presupuesto> obtener(@PathVariable Long id) {
        Presupuesto p = presupuestoService.getPresupuestoById(id);
        return ResponseEntity.ok(p);
    }

    // --- OBTENER PRESUPUESTOS DE UN USUARIO ---
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Presupuesto>> getPresupuestosByUserId(@PathVariable Long userId) {
        List<Presupuesto> presupuestos = presupuestoService.getPresupuestosByUserId(userId);
        return ResponseEntity.ok(presupuestos);
    }

    // CREAR DESDE CALCULADORA
    @PostMapping
    public ResponseEntity<Presupuesto> crear(@RequestBody CreatePresupuestoRequestDTO request) {
        Presupuesto creado = presupuestoService.createFullBudget(request);
        return ResponseEntity
                .created(URI.create("/api/presupuestos/" + creado.getId()))
                .body(creado);
    }

    // CREAR DESDE FORMULARIO MANUAL (Fase 6)
    @PostMapping("/manual")
    public ResponseEntity<Presupuesto> crearManual(@Valid @RequestBody PresupuestoDTO dto) {
        Presupuesto creado = presupuestoService.createFromManualForm(dto);
        return ResponseEntity
                .created(URI.create("/api/presupuestos/" + creado.getId()))
                .body(creado);
    }

    // ACTUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<Presupuesto> actualizar(@PathVariable Long id,
                                                  @Valid @RequestBody Presupuesto datos) {
        Presupuesto existente = presupuestoService.getPresupuestoById(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }

        existente.setTitulo(datos.getTitulo());
        existente.setDescripcion(datos.getDescripcion());
        existente.setPrecio(datos.getPrecio());
        existente.setFecha(datos.getFecha());
        existente.setCliente(datos.getCliente());

        Presupuesto actualizado = presupuestoService.savePresupuesto(existente);
        return ResponseEntity.ok(actualizado);
    }

    // ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Presupuesto existente = presupuestoService.getPresupuestoById(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }
        presupuestoService.deletePresupuesto(id);
        return ResponseEntity.noContent().build();
    }

    // Contar vinilos de un presupuesto
    @GetMapping("/{id}/vinilos/count")
    public ResponseEntity<Long> contarVinilosDePresupuesto(@PathVariable Long id) {
        Presupuesto existente = presupuestoService.getPresupuestoById(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }
        Long count = presupuestoService.countVinilosByPresupuestoId(id);
        return ResponseEntity.ok(count);
    }
}
