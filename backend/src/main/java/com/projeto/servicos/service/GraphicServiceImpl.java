package com.projeto.servicos.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.servicos.model.controller.dto.GraphicDTO;
import com.projeto.servicos.model.entity.Accountability;
import com.projeto.servicos.model.repository.AccountabilityRepository;

@Service
public class GraphicServiceImpl implements GraphicService {

	@Autowired
	private AccountabilityRepository accountabilityRepository;

	public List<GraphicDTO> getAll(String datePaymentInitial, String datePaymentFinal) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDate dateInitial = LocalDate.parse(datePaymentInitial, formatter);
		LocalDate dateFinal = LocalDate.parse(datePaymentFinal, formatter);
		ArrayList<GraphicDTO> dtoList = new ArrayList<GraphicDTO>();

		List<Accountability> accountability = accountabilityRepository.findByDatePaymentBetween(dateInitial, dateFinal);

		for (int i = 0; i < 12; i++) {
			dtoList.add(new GraphicDTO());
			dtoList.get(i).setData(LocalDate.of(dateInitial.getYear(), dateInitial.getDayOfMonth() + i, 1));
			dtoList.get(i).setRecebido(BigDecimal.ZERO);
			dtoList.get(i).setAcrescimo(BigDecimal.ZERO);
			dtoList.get(i).setDesconto(BigDecimal.ZERO);
			dtoList.get(i).setServico((long) 0);
			dtoList.get(i).setContratado(BigDecimal.ZERO);
		}

		for (Accountability a : accountability) {

			for (GraphicDTO d : dtoList) {

				if ((a.getDatePayment().getYear() == d.getData().getYear())
						&& (a.getDatePayment().getMonth() == d.getData().getMonth())) {

					d.setRecebido((d.getRecebido().add(a.getTotalValue())));
					d.setAcrescimo((d.getAcrescimo().add(a.getAdditionValue())));
					d.setDesconto((d.getDesconto().add(a.getDiscountValue())));

					d.setContratado((d.getContratado().add(a.getServiceProvided().getValue())));

				}

				if ((a.getServiceProvided().getDate().getMonth() == d.getData().getMonth())
						&& (a.getServiceProvided().getDate().getYear() == d.getData().getYear())) {
					d.setServico(d.getServico() + 1);	

				}

			}

		}

		return dtoList;
	}

}
