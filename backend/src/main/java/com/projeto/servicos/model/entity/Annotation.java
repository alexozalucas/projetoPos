package com.projeto.servicos.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	private Integer id; 
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "date")
	private LocalDate date;
	
	@Column(name = "annotation")
	private String annotation;

}
