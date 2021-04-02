package com.projeto.servicos.model.controller.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServiceProvidedDTO {
	
	private Integer id;
	
	@NotEmpty (message = "campo.description.obrigatorio")
	private String description;	
	
	@NotEmpty (message = "{campo.preco.obrigatorio}") 
	private String value;

	@NotNull (message = "{campo.cliente.obrigatorio}") 
	private Integer idClient;	
	
	@NotEmpty (message = "{campo.data.obrigatorio}")
	private String date;
	
	@NotNull (message = "{campo.type.obrigatorio}") 
	private Long idTypeService;	
	
	private boolean releasedPayment;
	
	

}
