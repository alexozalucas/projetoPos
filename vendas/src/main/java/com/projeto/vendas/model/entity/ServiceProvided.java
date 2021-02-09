package com.projeto.vendas.model.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceProvided {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name= "descricao" , nullable = false)
	private String description;
	
	@ManyToOne
	@JoinColumn(name= "id_client")
	private Client client;	
	
	@Column(name= "value")
	private BigDecimal value;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "date")
	private LocalDate date;
	
	
	
	

}
