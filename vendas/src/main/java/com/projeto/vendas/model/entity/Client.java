package com.projeto.vendas.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.br.CPF;

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
public class Client {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", nullable = false)
	@NotEmpty (message = "{campo.nome.obrigatorio}")
	private String name;

	@Column(name = "cpf", nullable = false, unique = true )
	@NotNull (message = "{campo.cpf.obrigatorio}")	
	@CPF (message = "{campo.cpf.invalido}")	
	private String cpf;

	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "dateRegister" , updatable = false)
	private LocalDate dateRegister;

	@PrePersist
	public void prePersist() {
		setDateRegister(LocalDate.now());
	}

}
