package com.projeto.vendas.model.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.vendas.model.entity.TypeService;
import com.projeto.vendas.model.repository.TypeServiceRepository;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/api")
public class ServiceController {
	
	@Autowired
	private TypeServiceRepository typeServiceRepository;
	
		
	@PostMapping("/typeservice")
	@ResponseStatus(HttpStatus.CREATED)
	public TypeService salveTypeService(@RequestBody @Valid TypeService typeService) {
		
		return typeServiceRepository.save(typeService);
	}
	
	@DeleteMapping("/typeservice/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTypeService(@PathVariable Long id) {

		typeServiceRepository.findById(id).map(typeService -> {
			typeServiceRepository.delete(typeService);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
	@GetMapping	("/typeservice")
	public List<TypeService> obterTodosTypeService(){
		
		return typeServiceRepository.findAll();
	}
	
	@GetMapping("/typeservice/{id}")
	public TypeService getTypeServiceById(@PathVariable Long id) {

		return typeServiceRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de serviço não encontrado"));

	}
	


}
