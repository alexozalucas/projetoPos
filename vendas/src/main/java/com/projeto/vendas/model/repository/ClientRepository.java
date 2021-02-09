package com.projeto.vendas.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.vendas.model.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Integer>{
	
	

}
