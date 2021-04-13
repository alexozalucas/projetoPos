package com.projeto.servicos.model.entity;


import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonFormat(pattern = "ddMMyyyy")
	@Column(name = "date")
	private LocalDate date;	

	@ManyToMany
	@JoinTable(name = "schedule_client", joinColumns = { @JoinColumn(name = "date") }, inverseJoinColumns = { @JoinColumn(name = "client_id") })
	private List<Client> client;
	
	@Column(name= "observation")
	private String observation;

}
