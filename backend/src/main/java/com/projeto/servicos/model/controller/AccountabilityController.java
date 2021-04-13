package com.projeto.servicos.model.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.projeto.servicos.model.controller.dto.AccountabilityDTO;
import com.projeto.servicos.model.entity.Accountability;
import com.projeto.servicos.model.entity.ServiceProvided;
import com.projeto.servicos.model.entity.TypePayment;
import com.projeto.servicos.model.repository.AccountabilityRepository;
import com.projeto.servicos.model.repository.ServiceProvidedRepository;
import com.projeto.servicos.model.repository.TypePaymentRepository;
import com.projeto.servicos.util.BigDecimalConvert;

@RestController
@RequestMapping("/api/accountability")
public class AccountabilityController {

	@Autowired
	private AccountabilityRepository accountabilityRepository;

	@Autowired
	private ServiceProvidedRepository serviceProvidedRepository;

	@Autowired
	private TypePaymentRepository typePaymentRepository;
	
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasRole('ADMIN')")
	public Accountability salveAccountability(@RequestBody @Valid AccountabilityDTO accountabilityDTO) {
		
			
		ServiceProvided serviceProvided =  serviceProvidedRepository.findById(accountabilityDTO.getId_serviceProvided())
				.orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço prestado não encontrado"));
		
		TypePayment type = typePaymentRepository.findById(accountabilityDTO.getIdTypePayment())
				.orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Tipo de pagamento não encontrado"));
		
		serviceProvided.setReleasedPayment(true);
		Accountability accountability = new Accountability();
		accountability.setId(accountabilityDTO.getId());
		accountability.setAdditionValue(BigDecimalConvert.convert(accountabilityDTO.getAdditionValue()));
		accountability.setDatePayment(LocalDate.parse(accountabilityDTO.getDatePayment(), formatter));
		accountability.setDiscountValue(BigDecimalConvert.convert(accountabilityDTO.getDiscountValue()));
		accountability.setTotalValue(BigDecimalConvert.convert(accountabilityDTO.getTotalValue()));
		accountability.setTypePayment(type);
		accountability.setServiceProvided(serviceProvided);
		accountability.setObservation(accountability.getObservation());
		serviceProvidedRepository.save(serviceProvided);
			
		return accountabilityRepository.save(accountability);
		
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasRole('ADMIN')")
	public void deleteAccountability(@PathVariable Long id) {

	 Accountability accountability = accountabilityRepository.findById(id)
		.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Prestação de conta não encontrada!"));
	 
	 ServiceProvided serviceProvided =  serviceProvidedRepository.findById(accountability.getServiceProvided().getId())
				.orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Serviço vinculado a prestação de conta não foi encontrado!"));
	 		 
	 	accountabilityRepository.delete(accountability);
	 	serviceProvided.setReleasedPayment(false);
	 	serviceProvidedRepository.save(serviceProvided);

	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public List<Accountability> obterTodosAccountability() {
		return accountabilityRepository.findAll();
	}

	@GetMapping("{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public Accountability getAccountabilityById(@PathVariable Long id) {
		return accountabilityRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Prestação de contas não encontrada!"));
	}

	@PostMapping("/typepayment")	
	@ResponseStatus(HttpStatus.CREATED)	
	public TypePayment salve(@RequestBody @Valid TypePayment typePayment) {

		if (typePaymentRepository.existsBytypeIgnoreCase(typePayment.getType())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Tipo de pagamento já cadastrado");
		}

		return typePaymentRepository.save(typePayment);
	}

	@DeleteMapping("/typepayment/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {

		typePaymentRepository.findById(id).map(typePayment -> {
			typePaymentRepository.delete(typePayment);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

	}

	@GetMapping("/typepayment")	
	public List<TypePayment> obterTodos() {
		return typePaymentRepository.findAll();
	}

	@GetMapping("/typepayment/{id}")
	public TypePayment getTypeServiceById(@PathVariable Long id) {
		return typePaymentRepository.findById(id).orElseThrow(
				() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de pagamento não encontrado"));
	}

	@PutMapping("/typepayment")
	public TypePayment updatetypePayment(@RequestBody @Valid TypePayment typePayment) {

		Optional<TypePayment> type = typePaymentRepository.findById(typePayment.getId());
		boolean exists = typePaymentRepository.existsBytypeIgnoreCase(typePayment.getType());

		if (!type.get().getType().equalsIgnoreCase(typePayment.getType()) && exists) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Tipo de pagamento já cadastrado");
		}
		if (type.isPresent()) {
			return typePaymentRepository.save(typePayment);
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de pagamento não encontrado");
		}

	}

}
