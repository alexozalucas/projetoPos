package com.projeto.servicos.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.servicos.model.entity.TypePayment;

@Repository
public interface TypePaymentRepository extends JpaRepository<TypePayment, Long> {

	Boolean existsBytypeIgnoreCase(String type);
}
