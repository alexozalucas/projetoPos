package com.projeto.servicos.model.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.servicos.model.controller.dto.ScheduleDTO;
import com.projeto.servicos.model.entity.Schedule;
import com.projeto.servicos.model.repository.ScheduleRepository;
import com.projeto.servicos.service.ScheduleService;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

	@Autowired
	private ScheduleRepository scheduleRepository;
	
	@Autowired
	private ScheduleService scheduleService;
	
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void salve(@RequestBody @Valid ScheduleDTO dto) {		
		
		Schedule shedule = new Schedule();
		shedule.setDate(LocalDate.parse(dto.getDate(), formatter));
		shedule.setObservation(dto.getObservation());
		shedule.setClient(dto.getClient());
		scheduleRepository.save(shedule);		
		
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Schedule> obterTodos() {
		
		final List<Schedule> schedule = scheduleService.findAll();		
		return schedule;
	}
	
	
	
	
	
	
	
	
	
	
}
