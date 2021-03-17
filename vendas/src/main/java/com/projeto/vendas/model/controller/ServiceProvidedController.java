package com.projeto.vendas.model.controller;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.vendas.model.controller.dto.ServiceProvidedDTO;
import com.projeto.vendas.model.entity.Client;
import com.projeto.vendas.model.entity.ServiceProvided;
import com.projeto.vendas.model.entity.TypeService;
import com.projeto.vendas.model.repository.ClientRepository;
import com.projeto.vendas.model.repository.ServiceProvidedRepository;
import com.projeto.vendas.model.repository.TypeServiceRepository;
import com.projeto.vendas.util.BigDecimalConvert;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/servicos-prestados")
@RequiredArgsConstructor
public class ServiceProvidedController {
	

	private final ClientRepository clientRepository;	
	
	private final ServiceProvidedRepository serviceProvidedRepository;
	
	private final TypeServiceRepository typeServiceRepository;	
	
	private final BigDecimalConvert BigDecimalConvert;
				
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ServiceProvided salve(@RequestBody @Valid ServiceProvidedDTO dto) {
		
		LocalDate data = LocalDate.parse(dto.getDate(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
		Integer idClient = dto.getIdClient();
		Long idTypeService = dto.getIdTypeService();
		
		Client cliente =
				clientRepository.findById(idClient)
				.orElseThrow( () -> 
					new ResponseStatusException
						(HttpStatus.BAD_REQUEST, "Cliente inexistente"));
		
		TypeService typeService =
				typeServiceRepository.findById(idTypeService)
				.orElseThrow( () -> 
					new ResponseStatusException
						(HttpStatus.BAD_REQUEST, "Tipo de serviço inexistente"));
	
		
		ServiceProvided serviceProvided = new ServiceProvided();
		serviceProvided.setDescription(dto.getDescription());
		serviceProvided.setDate(data);
		serviceProvided.setClient(cliente);
		serviceProvided.setValue(BigDecimalConvert.convert(dto.getValue()));
		serviceProvided.setTypeService(typeService);
		
		
		return serviceProvidedRepository.save(serviceProvided);
	}
	
	
	@GetMapping
	public List<ServiceProvided> Search(
			@RequestParam (value ="name", required =false, defaultValue = "") String name,
			@RequestParam (value ="mes", required =false) Integer mes) {
		
		return serviceProvidedRepository.findByNameClientAndMes("%"+name+"%",mes);

	}
	
	
	@GetMapping("/date")
	public List<ServiceProvided> SearchDate(
			@RequestParam (value ="dateInitial", required =true) String dateInitial,
			@RequestParam (value ="dateFinal", required =true) String dateFinal) {
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate initialDate = LocalDate.parse(dateInitial, formatter);
		LocalDate finalDate = LocalDate.parse(dateFinal, formatter);
		return serviceProvidedRepository.findByDateBetween(initialDate,finalDate);

	}
	
	@GetMapping	("/all")
	public List<ServiceProvided> obterTodos(){		
		return serviceProvidedRepository.findAll();
	}
	
	
	

}
