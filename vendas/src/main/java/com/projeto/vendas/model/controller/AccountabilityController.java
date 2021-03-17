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

import com.projeto.vendas.model.entity.Accountability;
import com.projeto.vendas.model.entity.ServiceProvided;
import com.projeto.vendas.model.entity.TypePayment;
import com.projeto.vendas.model.repository.AccountabilityRepository;
import com.projeto.vendas.model.repository.ServiceProvidedRepository;
import com.projeto.vendas.model.repository.TypePaymentRepository;

@RestController
@RequestMapping("/api/accountability")
public class AccountabilityController {
	
	@Autowired
	private AccountabilityRepository accountabilityRepository;
	
	@Autowired
	private ServiceProvidedRepository serviceProvidedRepository;
	
	@Autowired
	private TypePaymentRepository typePaymentRepository;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Accountability salveAccountability(@RequestBody Accountability accountability) {
		
		/*
		Integer id_serviceProvided = accountabilityDTO.getId_serviceProvided();
		Long id_typePayment = accountabilityDTO.getIdTypePayment();		
		
		ServiceProvided serviceProvided =
				serviceProvidedRepository.findById(id_serviceProvided)
				.orElseThrow( () -> 
					new ResponseStatusException
						(HttpStatus.BAD_REQUEST, "Serviço prestado não encontrado"));
		
		TypePayment typePayment =
				typePaymentRepository.findById(id_typePayment)
				.orElseThrow( () -> 
					new ResponseStatusException
						(HttpStatus.BAD_REQUEST, "Tipo de pagamento não encontrado"));	
		
		Accountability accountability = new Accountability();
		accountability.setId(accountabilityDTO.getId());
		accountability.setServiceProvided(serviceProvided);
		accountability.setDiscountValue(BigDecimalConvert.convert(accountabilityDTO.getDiscountValue()));
		accountability.setAdditionValue(BigDecimalConvert.convert(accountabilityDTO.getAdditionValue()));
		accountability.setObservation(accountabilityDTO.getObservation());		
		accountability.setTotalValue(BigDecimalConvert.convert(accountabilityDTO.getTotalValue()));		
		accountability.setTypePayment(typePayment);		
		*/
		
		ServiceProvided serviceProvided = new ServiceProvided();
		 serviceProvided = 	serviceProvidedRepository.findById(accountability.getServiceProvided().getId())
				.orElseThrow( () -> 
					new ResponseStatusException
						(HttpStatus.BAD_REQUEST, "Serviço prestado não encontrado"));
		
		TypePayment typePayment =
				typePaymentRepository.findById(accountability.getTypePayment().getId())
				.orElseThrow( () -> 
					new ResponseStatusException
						(HttpStatus.BAD_REQUEST, "Tipo de pagamento não encontrado"));
		accountability.setTypePayment(typePayment);
		
		
		return accountabilityRepository.save(accountability);
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteAccountability(@PathVariable Long id) {

		accountabilityRepository.findById(id).map(accountability -> {
			accountabilityRepository.delete(accountability);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
	@GetMapping
	public List<Accountability> obterTodosAccountability(){						
		return accountabilityRepository.findAll();
	}
	
	@GetMapping("{id}")
	public Accountability getAccountabilityById(@PathVariable Long id) {
		return accountabilityRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Prestação de contas não encontrada!"));
	}
	
	
	
	@PostMapping("/typepayment")
	@ResponseStatus(HttpStatus.CREATED)
	public TypePayment salve(@RequestBody @Valid TypePayment typePayment) {			
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
	
	@GetMapping	("/typepayment")
	public List<TypePayment> obterTodos(){		
		return typePaymentRepository.findAll();
	}
		
	@GetMapping("/typepayment/{id}")
	public TypePayment getTypeServiceById(@PathVariable Long id) {
		return typePaymentRepository.findById(id).orElseThrow(() -> 
			new ResponseStatusException(HttpStatus.NOT_FOUND, "Tipo de pagamento não encontrado"));
	}
		
	

}
