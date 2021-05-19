package com.projeto.servicos.model.entity;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

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
	private Integer id; 	
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "date")
	private LocalDate date;	
	
	@Column(name= "description")
	private String description;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "schedule_client",  joinColumns = { @JoinColumn(name = "id") }, inverseJoinColumns = { @JoinColumn(name = "client_id") })
	private List<Client> client;
	
	@Column(name= "observation")
	private String observation;
	
	@Column(name= "timeInital")
	private String timeInital;
	
	@Column(name= "timeFinal")
	private String timeFinal;

}
