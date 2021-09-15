package com.projeto.servicos.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Annotation {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id; 
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "annotation", length = 1200)
	private String annotation;
	
	@ManyToOne
	@JoinColumn(name= "typeAnnotation")
	private TypeAnnotation typeAnnotation;

}
