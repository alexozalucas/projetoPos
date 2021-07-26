package com.projeto.servicos.model.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.servicos.model.entity.Client;
import com.projeto.servicos.model.entity.ServiceProvided;
import com.projeto.servicos.model.entity.TypeService;

@Repository
public interface ServiceProvidedRepository extends JpaRepository<ServiceProvided, Integer>{
	
	@Query(" select s from ServiceProvided s join s.client c " +
	" where upper(c.name) like upper(:name) and MONTH (s.date)=:mes ")
	List<ServiceProvided> findByNameClientAndMes(		
			@Param("name") String name, @Param("mes") Integer mes);
	
	 
	@Query(" select s from ServiceProvided s join s.client c " +
			" where (upper(c.name) like upper(:name)) and ((s.date) >= :dataInicial and (s.date) <= :dataFinal)" )
			List<ServiceProvided> findByNameClientAndCompetencia(		
					@Param("name") String name,	@Param("dataInicial") LocalDate dataInicial, 
					@Param("dataFinal") LocalDate dataFinal);
					
	
	List<ServiceProvided> findByDateBetweenAndReleasedPaymentFalse(LocalDate start, LocalDate end);
	
	boolean existsByClient(Client client);
	
	boolean existsByTypeService(TypeService typeService);
	
	


	
	
	

}
