package com.projeto.vendas.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.vendas.model.entity.TypePayment;

@Repository
public interface TypePaymentRepository extends JpaRepository<TypePayment, Long> {

}
