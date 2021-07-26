package com.projeto.servicos.model.controller.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AnnotationDTO {
	
		
	private Long id; 	
	
	@NotBlank(message = "{campo.annotationTitle.obrigatorio}")	
	private String title;
	
	private String annotation;	
	
	@NotNull(message = "{campo.typeAnnotation.obrigatorio}")
	private TypeAnnotationDTO typeAnnotation;	

}
