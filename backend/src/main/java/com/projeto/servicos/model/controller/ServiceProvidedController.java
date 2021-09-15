package com.projeto.servicos.model.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.projeto.servicos.model.controller.dto.ServiceProvidedDTO;
import com.projeto.servicos.model.entity.Client;
import com.projeto.servicos.model.entity.ServiceProvided;
import com.projeto.servicos.model.entity.TypeService;
import com.projeto.servicos.model.repository.ClientRepository;
import com.projeto.servicos.model.repository.ServiceProvidedRepository;
import com.projeto.servicos.model.repository.TypeServiceRepository;
import com.projeto.servicos.util.BigDecimalConvert;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/servicos-prestados")
@RequiredArgsConstructor
public class ServiceProvidedController {

	private final ClientRepository clientRepository;

	private final ServiceProvidedRepository serviceProvidedRepository;

	private final TypeServiceRepository typeServiceRepository;

	private final BigDecimalConvert bigDecimalConvert;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
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
		
		if(serviceProvidedRepository.existsByIdAndReleasedPaymentTrue(dto.getId())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Serviço prestado já possui lançamento de prestação de conta!");
		}
		
		ServiceProvided serviceProvided = new ServiceProvided();
		serviceProvided.setId(dto.getId());
		serviceProvided.setDescription(dto.getDescription());
		serviceProvided.setDate(data);
		serviceProvided.setClient(cliente);
		serviceProvided.setValue(bigDecimalConvert.convert(dto.getValue()));
		serviceProvided.setTypeService(typeService);		
		serviceProvided.setReleasedPayment(false);		

		return serviceProvidedRepository.save(serviceProvided);
	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@GetMapping
	public List<ServiceProvided> Search(@RequestParam(value = "name", required = false, defaultValue = "") String name,
			@RequestParam(value = "mes", required = false) int mes) {

		return serviceProvidedRepository.findByNameClientAndMes("%" + name + "%", mes);

	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@GetMapping("/SearchNameDate")
	public List<ServiceProvided> SearchNameDate(
			@RequestParam(value = "name", required = false, defaultValue = "") String name,
			@RequestParam(value = "dateInitial", required = false, defaultValue = "31/12/1900") String dateInitial,
			@RequestParam(value = "dateFinal", required = false, defaultValue = "31/12/1900") String dateFinal) {

		LocalDate initialDate = LocalDate.parse(dateInitial, formatter);
		LocalDate finalDate = LocalDate.parse(dateFinal, formatter);
				
		return serviceProvidedRepository.findByNameClientAndCompetencia("%"+ name+"%",initialDate, finalDate);		

	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@GetMapping("/date")
	public List<ServiceProvided> SearchDate(@RequestParam(value = "dateInitial", required = true) String dateInitial,
			@RequestParam(value = "dateFinal", required = true) String dateFinal) {

		LocalDate initialDate = LocalDate.parse(dateInitial, formatter);
		LocalDate finalDate = LocalDate.parse(dateFinal, formatter);
		return serviceProvidedRepository.findByDateBetweenAndReleasedPaymentFalse(initialDate, finalDate);

	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@GetMapping("/all")
	public List<ServiceProvided> obterTodos() {
		return serviceProvidedRepository.findAll();
	}
	
	
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Integer id) {
		
		if(serviceProvidedRepository.existsByIdAndReleasedPaymentTrue(id)) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Serviço prestado já possui lançamento de prestação de conta!");
		}

		serviceProvidedRepository.findById(id).map(service -> {			
			serviceProvidedRepository.delete(service);
			return Void.TYPE;			
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@GetMapping("/{id}")
	public ServiceProvided getServiceProvided(@PathVariable Integer id) {

		return serviceProvidedRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço prestado não encontrado"));
	}

}
