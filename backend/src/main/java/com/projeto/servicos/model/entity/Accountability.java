package com.projeto.servicos.model.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

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
public class Accountability {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name= "id_serviceProvided")
	private ServiceProvided serviceProvided;
	
	@Column(name= "discountValue")
	private BigDecimal discountValue;
	
	@Column(name= "additionValue")
	private BigDecimal additionValue;
	
	@Column(name= "observation")
	private String observation;
	
	@ManyToOne
	@JoinColumn(name= "id_typePayment")
	private TypePayment typePayment;	
	
	@Column(name= "totalValue")
	private BigDecimal totalValue;
	
	@JsonFormat(pattern = "ddMMyyyy")
	@Column(name = "datePayment")
	private LocalDate datePayment;
	
	


		

}
