package com.projeto.servicos.model.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.servicos.model.controller.dto.ScheduleDTO;
import com.projeto.servicos.model.entity.Schedule;
import com.projeto.servicos.model.repository.ScheduleRepository;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

	@Autowired
	private ScheduleRepository scheduleRepository;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@RequestBody @Valid ScheduleDTO dto) {

		
		LocalDate data = LocalDate.parse(dto.getDate(), formatter);
		Schedule schedule = new Schedule();
		schedule.setId(dto.getId());
		schedule.setDate(data);
		schedule.setObservation(dto.getObservation());
		schedule.setTitle(dto.getTitle());

		scheduleRepository.save(schedule);

	}

	@GetMapping("/date")
	@ResponseStatus(HttpStatus.OK)
	public List<Schedule> getByDate(
			@RequestParam(value = "dateInitial", required = true, defaultValue = "31/12/1900") String dateInitial,
			@RequestParam(value = "dateFinal", required = true, defaultValue = "31/12/1900") String dateFinal) {

	
		LocalDate initialDate = null;
		LocalDate finalDate = null;
		try {
			initialDate = LocalDate.parse(dateInitial, formatter);
			finalDate = LocalDate.parse(dateFinal, formatter);
		} catch (Exception e) {
			initialDate = LocalDate.parse("31/12/1900", formatter);
			finalDate = LocalDate.parse("31/12/1900", formatter);
		}

		List<Schedule> response = this.scheduleRepository.findByDateBetweenOrderByDateAsc(initialDate, finalDate);

		return response;
	}

	@GetMapping("{id}")
	public Schedule getScheduleById(@PathVariable Long id) {
		
		
		return scheduleRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Id de agenda não encontrado"));
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {

		scheduleRepository.findById(id).map(schedule -> {
			scheduleRepository.delete(schedule);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ID não encontrado"));

	}

}
