package com.projeto.servicos.model.controller.dto;

import javax.validation.constraints.NotEmpty;

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
	

}
