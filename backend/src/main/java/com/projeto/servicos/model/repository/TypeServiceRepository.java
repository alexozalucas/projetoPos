package com.projeto.servicos.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.servicos.model.entity.TypeService;

@Repository
public interface TypeServiceRepository extends JpaRepository<TypeService, Long > {
	
	Boolean existsByServiceIgnoreCase(String service);

}
