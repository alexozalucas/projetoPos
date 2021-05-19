package com.projeto.servicos.model.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
import com.projeto.servicos.model.entity.Client;
import com.projeto.servicos.model.entity.Schedule;
import com.projeto.servicos.model.repository.ClientRepository;
import com.projeto.servicos.model.repository.ScheduleRepository;
import com.projeto.servicos.service.ScheduleService;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

	@Autowired
	private ScheduleRepository scheduleRepository;

	@Autowired
	private ScheduleService scheduleService;

	@Autowired
	private ClientRepository clientRepository;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@RequestBody @Valid ScheduleDTO dto) {
		List<Client> listClient = new ArrayList<Client>();

		if (dto.getClient() != null) {

			for (Client x : dto.getClient()) {
				Client client = clientRepository.findById(x.getId())
						.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
								"ID de cliente não encontrado : " + x.getId()));
				listClient.add(client);
			}
		}

		Schedule shedule = new Schedule();
		shedule.setDate(LocalDate.parse(dto.getDate(), formatter));
		shedule.setObservation(dto.getObservation());
		shedule.setClient(listClient);

		scheduleRepository.save(shedule);

	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Schedule> getAll() {

		final List<Schedule> schedule = scheduleService.findAll();
		return schedule;
	}

	@GetMapping("/date")
	@ResponseStatus(HttpStatus.OK)
	public List<Schedule> getByDate(@RequestParam(value = "dateInitial", required = true) String dateInitial,
			@RequestParam(value = "dateFinal", required = true) String dateFinal) {

		LocalDate initialDate = LocalDate.parse(dateInitial, formatter);
		LocalDate finalDate = LocalDate.parse(dateFinal, formatter);

		return this.scheduleService.searchByDate(initialDate, finalDate);
	}

	@DeleteMapping("delete/{date}")
	@ResponseStatus(HttpStatus.OK)
	public void delete(@PathVariable String date) {

		LocalDate dateDelete = LocalDate.parse(date, DateTimeFormatter.ofPattern("ddMMyyyy"));
		try {
			this.scheduleRepository.deleteById(dateDelete);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ocorreu um erro ao excluir o registro");
		}

	}

}
