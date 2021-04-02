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

import com.projeto.servicos.model.entity.Client;
import com.projeto.servicos.model.repository.ClientRepository;

@RestController
@RequestMapping("/api/clientes")
public class ClientController {

	@Autowired
	private ClientRepository repository;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Client salve(@RequestBody @Valid Client client) {

		if (repository.existsByCpf(client.getCpf())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
		}
		return repository.save(client);
	}

	@GetMapping("{id}")
	public Client getClientById(@PathVariable Integer id) {

		return repository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "cliente não encontrado"));
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteClient(@PathVariable Integer id) {

		repository.findById(id).map(client -> {
			repository.delete(client);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

	}

	@PutMapping("{id}")
	public Client updateClient(@PathVariable Integer id, @RequestBody @Valid Client updatedClient) {

		Optional<Client> cliente = repository.findById(updatedClient.getId());
		boolean exists = repository.existsByCpf(updatedClient.getCpf());

		if (!cliente.get().getCpf().equals(updatedClient.getCpf()) && exists) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
		}
		if (cliente.isPresent()) {
			repository.save(updatedClient);
		} else {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");
		}
		return updatedClient;

	}

	@GetMapping
	public List<Client> obterTodos() {
		return repository.findAll();
	}

}
