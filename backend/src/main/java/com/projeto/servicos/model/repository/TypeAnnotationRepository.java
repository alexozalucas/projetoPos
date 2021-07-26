package com.projeto.servicos.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.servicos.model.entity.TypeAnnotation;

@Repository
public interface TypeAnnotationRepository extends JpaRepository<TypeAnnotation, Long>{
	
	Boolean existsByTypeIgnoreCase(String type);

}
