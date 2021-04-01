package com.projeto.vendas.model.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ServiceProvided salve(@RequestBody @Valid ServiceProvidedDTO dto) {

		LocalDate data = LocalDate.parse(dto.getDate(), formatter);				
		Integer idClient = dto.getIdClient();
		Long idTypeService = dto.getIdTypeService();

		Client cliente = clientRepository.findById(idClient)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente inexistente"));

		TypeService typeService = typeServiceRepository.findById(idTypeService)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de serviço inexistente"));

		ServiceProvided serviceProvided = new ServiceProvided();
		serviceProvided.setId(dto.getId());
		serviceProvided.setDescription(dto.getDescription());
		serviceProvided.setDate(data);
		serviceProvided.setClient(cliente);
		serviceProvided.setValue(BigDecimalConvert.convert(dto.getValue()));
		serviceProvided.setTypeService(typeService);
		if(dto.getId() == null) {
			serviceProvided.setReleasedPayment(false);
		}

		return serviceProvidedRepository.save(serviceProvided);
	}

	@GetMapping
	public List<ServiceProvided> Search(@RequestParam(value = "name", required = false, defaultValue = "") String name,
			@RequestParam(value = "mes", required = false) int mes) {

		return serviceProvidedRepository.findByNameClientAndMes("%" + name + "%", mes);

	}

	@GetMapping("/SearchNameDate")
	public List<ServiceProvided> SearchNameDate(
			@RequestParam(value = "name", required = false, defaultValue = "") String name,
			@RequestParam(value = "dateInitial", required = false, defaultValue = "31/12/1900") String dateInitial,
			@RequestParam(value = "dateFinal", required = false, defaultValue = "31/12/1900") String dateFinal) {

		LocalDate initialDate = LocalDate.parse(dateInitial, formatter);
		LocalDate finalDate = LocalDate.parse(dateFinal, formatter);
				
		return serviceProvidedRepository.findByNameClientAndCompetencia("%"+ name+"%",initialDate, finalDate);		

	}

	@GetMapping("/date")
	public List<ServiceProvided> SearchDate(@RequestParam(value = "dateInitial", required = true) String dateInitial,
			@RequestParam(value = "dateFinal", required = true) String dateFinal) {

		LocalDate initialDate = LocalDate.parse(dateInitial, formatter);
		LocalDate finalDate = LocalDate.parse(dateFinal, formatter);
		return serviceProvidedRepository.findByDateBetweenAndReleasedPaymentFalse(initialDate, finalDate);

	}

	@GetMapping("/all")
	public List<ServiceProvided> obterTodos() {
		return serviceProvidedRepository.findAll();
	}
	
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {

		serviceProvidedRepository.findById(id).map(service -> {			
			serviceProvidedRepository.delete(service);
			return Void.TYPE;			
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
	@GetMapping("/{id}")
	public ServiceProvided getServiceProvided(@PathVariable Integer id) {

		return serviceProvidedRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço prestado não encontrado"));
	}

}