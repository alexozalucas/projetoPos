package com.projeto.servicos.model.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.servicos.model.entity.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	
	
	List<Schedule> findByDateBetweenOrderByDateAsc(LocalDate start, LocalDate end);
	
}
