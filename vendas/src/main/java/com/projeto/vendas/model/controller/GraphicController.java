package com.projeto.vendas.model.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.vendas.model.controller.dto.GraphicDTO;
import com.projeto.vendas.service.GraphicService;

@RestController
@RequestMapping("/api/graphic")
public class GraphicController {
	
	@Autowired
	private GraphicService graphicService;
	
	@GetMapping
	public  List<GraphicDTO> getAll(@RequestParam (value ="datePaymentInitial", required =true) String datePaymentInitial,
			@RequestParam (value ="datePaymentFinal", required =true) String datePaymentFinal ) {
				
		return this.graphicService.getAll(datePaymentInitial,datePaymentFinal);
	}
	
	
	
	

}
