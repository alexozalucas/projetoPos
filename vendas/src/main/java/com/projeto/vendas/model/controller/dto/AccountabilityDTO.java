package com.projeto.vendas.model.controller.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountabilityDTO {
	

	private Long id;
	
	private Integer id_serviceProvided;	

	private String discountValue;	

	private String additionValue;	

	private String observation;
	
	private Long idTypePayment;

	private String totalValue;
	
	
		
}
