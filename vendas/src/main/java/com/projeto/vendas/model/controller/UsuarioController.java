package com.projeto.vendas.model.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.vendas.model.entity.Usuario;
import com.projeto.vendas.service.UsuarioService;
import com.projeto.vendas.service.exception.UsuarioCadastradoException;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

	@Autowired
	private UsuarioService service;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public void salvar(@RequestBody @Valid Usuario usuario) {
		
		try {
			service.salvar(usuario);
			
		}catch (UsuarioCadastradoException e) {
			  throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
		}
		
		
	}

}
