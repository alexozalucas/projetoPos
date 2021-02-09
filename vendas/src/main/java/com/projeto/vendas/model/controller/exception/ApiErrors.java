package com.projeto.vendas.model.controller.exception;



import java.util.Arrays;
import java.util.List;

import lombok.Getter;


@Getter
public class ApiErrors {

	
	private List<String> erros;
	
	public ApiErrors(List<String> erros) {
		this.erros = erros;		
	}
	
	public ApiErrors(String message) {
		this.erros = Arrays.asList(message);			
	}
}
