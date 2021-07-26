package com.projeto.servicos.model.entity;


import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Schedule {
		
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id; 	
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "date")
	private LocalDate date;	
	
	@Column(name= "title")
	private String title;
	
	@Column(name= "observation")
	private String observation;


}
