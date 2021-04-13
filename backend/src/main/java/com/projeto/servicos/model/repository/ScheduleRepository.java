package com.projeto.servicos.model.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projeto.servicos.model.entity.Schedule;


public interface ScheduleRepository extends JpaRepository<Schedule, LocalDate> {
	
	@Query("SELECT DISTINCT sce FROM Schedule sce LEFT JOIN FETCH sce.client")
	List<Schedule> findScheduleWithClient();
	


}
