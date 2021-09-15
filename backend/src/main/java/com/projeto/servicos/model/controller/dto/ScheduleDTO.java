package com.projeto.servicos.model.controller.dto;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.projeto.servicos.model.entity.Client;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ScheduleDTO {
		
	private Long id; 	
	
	@NotEmpty(message = "{campo.scheduleDate.obrigatorio}")	
	private String date;	
	
	@NotEmpty(message = "{campo.scheduleTitle.obrigatorio}")	
	private String title;
	
	private String observation;
	
	private List<Client> client;	

	@NotEmpty(message = "{campo.ScheduleHourInitial.obrigatorio}")	
	private String hourInitial;	
	
	@NotEmpty(message = "{campo.ScheduleHourFinal.obrigatorio}")	
	private String hourFinal;

	private Boolean flagConfirmation;
	

}
