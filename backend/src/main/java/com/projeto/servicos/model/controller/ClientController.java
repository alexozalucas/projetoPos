package com.projeto.servicos.model.controller;

import java.util.List;

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

import com.projeto.servicos.model.entity.Client;
import com.projeto.servicos.model.repository.ClientRepository;
import com.projeto.servicos.model.repository.ServiceProvidedRepository;

@RestController
@RequestMapping("/api/clientes")
public class ClientController {

	@Autowired
	private ClientRepository repository;

	@Autowired
	private ServiceProvidedRepository serviceProvidedRepository;

	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Client salve(@RequestBody @Valid Client client) {

		if (repository.existsByCpf(client.getCpf())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
		}

		return repository.save(client);
	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@GetMapping("{id}")
	public Client getClientById(@PathVariable Integer id) {

		return repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "cliente não encontrado"));
	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteClient(@PathVariable Integer id) {

		Client client = repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

		if (this.serviceProvidedRepository.existsByClient(client)) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Cliente está vinculado a um serviço!");
		}

		repository.delete(client);

	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@PutMapping("{id}")
	public Client updateClient(@PathVariable Integer id, @RequestBody @Valid Client updatedClient) {

		Client cliente = repository.findById(updatedClient.getId())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
		boolean exists = repository.existsByCpf(updatedClient.getCpf());

		if (!cliente.getCpf().equals(updatedClient.getCpf()) && exists) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
		}

		if (this.serviceProvidedRepository.existsByClientAndReleasedPaymentFalse(cliente)
				&& !updatedClient.getStatus()) {
			throw new ResponseStatusException(HttpStatus.CONFLICT,
					"Existe serviço prestado lançado para o cliente que ainda não foi quitado!");
		}

		return repository.save(updatedClient);

	}

	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ADMIN')")
	@GetMapping
	public List<Client> obterTodos() {

		return repository.findAll();
	}
	
	
	@GetMapping("/getAll")
	public List<Client> obterTodosSemDemonstrarCPF() {

		List<Client> clients =  repository.findAll();
		clients.stream().forEach(x -> {
			x.setCpf(x.getCpf().substring(5, 11));
		});
	
		
		return clients;
	}

}
