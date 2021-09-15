package com.projeto.servicos.model.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.servicos.model.entity.Schedule;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
	
	
	List<Schedule> findByDateBetweenOrderByDateAsc(LocalDate start, LocalDate end);
	
	@Query(" select  CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END from Schedule s " +
	" where ((hourInitial < :hourInitial and hourFinal >= :hourInitial) or (hourInitial >= :hourInitial and \n"
	+ "			hourFinal <= :hourFinal) or (hourInitial <= :hourFinal and hourFinal > :hourFinal)) and s.date = :data ")
	Boolean existsByHourAndDate(		
			@Param("hourInitial") LocalTime hourInitial, @Param("hourFinal") LocalTime hourFinal,
			@Param("data") LocalDate data);
	

	
}
