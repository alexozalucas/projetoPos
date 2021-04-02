package com.projeto.servicos.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.servicos.model.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Integer>{
	
	Boolean existsByCpf(String cpf);
	
	

}
