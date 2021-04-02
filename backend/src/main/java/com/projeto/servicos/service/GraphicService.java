package com.projeto.servicos.service;

import java.util.List;

import com.projeto.servicos.model.controller.dto.GraphicDTO;


public interface GraphicService {
	
	
	List<GraphicDTO> getAll(String datePaymentInitial, String datePaymentFinal);
	

}
