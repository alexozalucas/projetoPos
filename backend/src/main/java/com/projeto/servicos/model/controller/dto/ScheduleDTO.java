package com.projeto.servicos.model.controller.dto;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import com.projeto.servicos.model.entity.Client;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ScheduleDTO {
	
	@NotEmpty(message = "{campo.scheduleDate.obrigatorio}")	
	private String date;
	private String observation;	
	private List<Client> client;
	
	
	

}
