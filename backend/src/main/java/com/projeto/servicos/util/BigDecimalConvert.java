package com.projeto.servicos.util;

import java.math.BigDecimal;

import org.springframework.stereotype.Component;

@Component
public class BigDecimalConvert {

	
	public static BigDecimal convert(String value) {
		if(value == null) {
			return null;
		}
		
		value = value.replace(",", ".");
		//value = value.replace(".", "").replace(",", ".");
		return new BigDecimal(value);
				
		
	}
}
