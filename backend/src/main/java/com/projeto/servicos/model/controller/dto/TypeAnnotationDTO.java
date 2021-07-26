package com.projeto.servicos.model.controller.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TypeAnnotationDTO {
	
	@NotNull(message = "{campo.typeAnnotation.obrigatorio}")		
	private Long id; 	
			
	@NotEmpty(message = "{campo.titleTypeAnotation.obrigatorio}")
	private String type;
	
	private String observation;
	
	

}
