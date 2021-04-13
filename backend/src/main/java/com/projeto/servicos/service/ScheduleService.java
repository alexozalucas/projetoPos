package com.projeto.servicos.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projeto.servicos.model.entity.Schedule;
import com.projeto.servicos.model.repository.ScheduleRepository;

@Service
public class ScheduleService {
	
	
	@Autowired
	private ScheduleRepository scheduleRepository;
	

	public List<Schedule> findAll() {
		
		return scheduleRepository.findScheduleWithClient();

	}
}
