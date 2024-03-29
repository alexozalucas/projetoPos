package com.projeto.servicos.model.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.servicos.model.controller.exception.ApiErrors;

@RestControllerAdvice
public class ApplicationControllerAdvice {

	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)	
	public ApiErrors handleValidationErros(MethodArgumentNotValidException ex) {

		BindingResult bindingResult = ex.getBindingResult();
		List<String> messages = bindingResult.getAllErrors().stream()
				.map(objectError -> objectError.getDefaultMessage()).collect(Collectors.toList());

		return new ApiErrors(messages);

	}

	@ExceptionHandler(ResponseStatusException.class)	
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ApiErrors> handleResponseStatusException(ResponseStatusException ex) {
		
		String mensagemErro = ex.getReason();
		HttpStatus codigoStatus = ex.getStatus();
		ApiErrors apiErrors = new ApiErrors(mensagemErro);
		return new ResponseEntity<ApiErrors>(apiErrors, codigoStatus);

	}
	
	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)	
	public ApiErrors handleValidationForbidden(AccessDeniedException ex) {

		List<String> messages = new ArrayList<String>();
		messages.add("Acesso negado, procure um administrador!");
		return new ApiErrors(messages);

	}
	
	

}
