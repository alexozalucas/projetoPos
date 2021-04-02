package com.projeto.servicos.model.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.servicos.config.CurrentUser;
import com.projeto.servicos.model.entity.dto.LocalUser;
import com.projeto.servicos.util.GeneralUtils;

@RestController
@RequestMapping("/api")
public class UserController {

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getCurrentUser(@CurrentUser LocalUser user) {
		return ResponseEntity.ok(GeneralUtils.buildUserInfo(user));
	}

	@GetMapping("/all")
	@ResponseStatus(value = HttpStatus.OK)
	public ResponseEntity<?> getContent() {
		return ResponseEntity.ok("return");
	}

	/*
	@GetMapping("/user")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getUserContent() {
		return ResponseEntity.ok("User content goes here");
	}
	*/

	/*
	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> getAdminContent() {
		return ResponseEntity.ok("Admin content goes here");
	}*/

	/*
	@GetMapping("/mod")
	@PreAuthorize("hasRole('MODERATOR')")
	public ResponseEntity<?> getModeratorContent() {
		return ResponseEntity.ok("Moderator content goes here");
	}
	*/
}