package com.projeto.vendas.model.controller.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ServiceProvidedDTO {
	
	@NotEmpty (message = "{campo.descricao.obrigatorio}")
	private String description;	
	
	@NotEmpty (message = "{campo.preco.obrigatorio}") 
	private String value;

	@NotNull (message = "{campo.cliente.obrigatorio}") 
	private Integer idClient;	
	
	@NotEmpty (message = "{campo.data.obrigatorio}")
	private String date;
	
	

}
