package com.projeto.servicos.model.controller.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GraphicDTO {
	
	private LocalDate data;
	
	private BigDecimal recebido;
	
	private BigDecimal desconto;
	
	private BigDecimal acrescimo;
	
	private Long servico;
	
	private BigDecimal contratado;
	

}
