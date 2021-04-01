package com.projeto.vendas.model.controller.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountabilityDTO {
	

	private Long id;
	
	@NotNull(message = "{campo.serviceProvided.obrigatorio}")
	private Integer id_serviceProvided;
	
	@NotEmpty(message = "{campo.discountValue.obrigatorio}")
	private String discountValue;	
	
	@NotEmpty(message = "{campo.additionValue.obrigatorio}")
	private String additionValue;

	private String observation;
	
	@NotNull (message = "{campo.idTypePayment.obrigatorio}")
	private Long idTypePayment;
	
	@NotEmpty(message = "{campo.totalValue.obrigatorio}")
	private String totalValue;
	
	@NotEmpty(message = "{campo.datePayment.obrigatorio}")
	private String datePayment;
	
	
		
}
