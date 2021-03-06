package com.projeto.servicos.model.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.servicos.model.entity.TypeService;
import com.projeto.servicos.model.repository.TypeServiceRepository;


@RestController
@RequestMapping("/api")
public class ServiceController {
	
	@Autowired
	private TypeServiceRepository typeServiceRepository;
	
		
	@PostMapping("/typeservice")
	@ResponseStatus(HttpStatus.CREATED)
	public TypeService salveTypeService(@RequestBody @Valid TypeService typeService) {
				
		if (typeServiceRepository.existsByServiceIgnoreCase(typeService.getService())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Tipo de serviço já cadastrado");
		}
			
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
	
	@PutMapping("/typeservice/{id}")
	public TypeService updateTypeService(@PathVariable Integer id, @RequestBody @Valid TypeService typeService) {
				
		Optional<TypeService> type = typeServiceRepository.findById(typeService.getId());
		boolean exists = typeServiceRepository.existsByServiceIgnoreCase(typeService.getService());

		if (!type.get().getService().equalsIgnoreCase(typeService.getService()) && exists) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Tipo de serviço já cadastrado");
		}
		if (type.isPresent()) {
			return typeServiceRepository.save(typeService);
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de serviço não encontrado");
		}
	
	}
	


}
