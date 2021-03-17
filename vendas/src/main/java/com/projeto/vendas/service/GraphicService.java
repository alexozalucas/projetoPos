package com.projeto.vendas.service;

import java.util.List;

import com.projeto.vendas.model.controller.dto.GraphicDTO;


public interface GraphicService {
	
	
	List<GraphicDTO> getAll(String datePaymentInitial, String datePaymentFinal);
	

}
