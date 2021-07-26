package com.projeto.servicos.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TypeAnnotation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id; 	
			
	@NotEmpty(message = "{campo.titleTypeAnotation.obrigatorio}")
	@Column(name= "title")
	private String type;
	
	@Column(name= "observation")
	private String observation;

}
