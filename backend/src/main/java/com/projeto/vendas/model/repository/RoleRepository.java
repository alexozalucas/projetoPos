package com.projeto.vendas.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.vendas.model.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	
	Role findByName(String name);
}
