package com.korporativo.korporativo_backend.dto;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreatePresupuestoRequestDTO {
    // --- Datos del Vinilo (Frontend) ---
    private Double anchoCm;
    private Double altoCm;
    private String tipoVinilo;
    private String tipoCorte;
    private String tipoAdhesivo;
    private Boolean incluirInstalacion;
    private Boolean incluirIva;
    private String pais;

    // --- Datos económicos ---
    @JsonProperty("precioFinal")
    private Double precioFinal;
    private Long userId;

    // Getters y Setters
    public Double getAnchoCm() { 
        return anchoCm; 
    }
    public void setAnchoCm(Double anchoCm) { 
        this.anchoCm = anchoCm; 
    }

    public Double getAltoCm() { 
        return altoCm; 
    }
    public void setAltoCm(Double altoCm) { 
        this.altoCm = altoCm; 
    }

    public String getTipoVinilo() { 
        return tipoVinilo; 
    }
    public void setTipoVinilo(String tipoVinilo) { 
        this.tipoVinilo = tipoVinilo; 
    }

    public String getTipoCorte() { 
        return tipoCorte; 
    }
    public void setTipoCorte(String tipoCorte) { 
        this.tipoCorte = tipoCorte; 
    }

    public String getTipoAdhesivo() { 
        return tipoAdhesivo; 
    }
    public void setTipoAdhesivo(String tipoAdhesivo) { 
        this.tipoAdhesivo = tipoAdhesivo; 
    }

    public Boolean getIncluirInstalacion() { 
        return incluirInstalacion; 
    }
    public void setIncluirInstalacion(Boolean incluirInstalacion) { 
        this.incluirInstalacion = incluirInstalacion; 
    }

    public Boolean getIncluirIva() { 
        return incluirIva; 
    }
    public void setIncluirIva(Boolean incluirIva) { 
        this.incluirIva = incluirIva; 
    }

    public String getPais() { 
        return pais; 
    }
    public void setPais(String pais) { 
        this.pais = pais; 
    }

    public Double getPrecioFinal() { 
        return precioFinal; 
    }
    public void setPrecioFinal(Double precioFinal) { 
        this.precioFinal = precioFinal; 
    }
    public Long getUserId() {
        return this.userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
