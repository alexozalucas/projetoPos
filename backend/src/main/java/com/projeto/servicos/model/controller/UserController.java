package com.projeto.servicos.model.controller;


import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.servicos.config.CurrentUser;
import com.projeto.servicos.model.controller.dto.RoleDTO;
import com.projeto.servicos.model.controller.dto.UserDTO;
import com.projeto.servicos.model.entity.Role;
import com.projeto.servicos.model.entity.User;
import com.projeto.servicos.model.entity.dto.LocalUser;
import com.projeto.servicos.model.repository.RoleRepository;
import com.projeto.servicos.model.repository.UserRepository;
import com.projeto.servicos.service.UserService;
import com.projeto.servicos.util.GeneralUtils;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
	
	@Autowired
	private final UserRepository userRepository;
	
	@Autowired
	private final UserService userService;
	
	@Autowired
	private final RoleRepository roleRepository;

	@GetMapping("/user/me")
	//@PreAuthorize("hasRole('USER')")	
	public ResponseEntity<?> getCurrentUser(@CurrentUser LocalUser user) {
		return ResponseEntity.ok(GeneralUtils.buildUserInfo(user));
	}
	
	
	@GetMapping("/user/all")
	@PreAuthorize("hasRole('ADMIN')")
	public List<UserDTO> getUserAll() {
		
		List<User> users = userService.findUserAll();
		final List<UserDTO> response= users.stream().map(m -> mapperUserFromUserDTO(m))
		.collect(Collectors.toList());
		
		return response;
		
	}	
	

	@PutMapping("/user/role/user/{id}/status/{active}")
	@PreAuthorize("hasRole('ADMIN')")
	public void updateUserRole(@PathVariable Long id, @PathVariable boolean active, @RequestBody List<RoleDTO> roles ) {
		
		User user = userRepository.findById(id)
				.orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ID de usuário não encontrado"));
		
		user.setRoles(mapperRoleListFromRoleSet(roles));
		user.setEnabled(active);
		userRepository.save(user);
				
	}
	
	@GetMapping("/user/role/all")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Role> getRoleAll() {
		
		List<Role> role = roleRepository.findAll();		
		return role;
		
	}
	
	private HashSet<Role> mapperRoleListFromRoleSet( List<RoleDTO> roles) {
		
		final HashSet<Role> role = new HashSet<Role>();
		roles.stream().forEach(x -> {
			Role rol = new Role();
			rol.setName(x.getName());
			rol.setRoleId(x.getRoleId());
			role.add(rol);
		});
	
		return role;
	}
	
	private UserDTO mapperUserFromUserDTO(final User user){
		
		UserDTO userDto = new UserDTO();
		userDto.setDisplayName(user.getDisplayName());
		userDto.setEmail(user.getEmail());
		userDto.setEnabled(user.isEnabled());
		userDto.setId(user.getId());
		final HashSet<Role> roles = new HashSet<Role>();
		user.getRoles().stream().forEach(x -> {
			Role rol = new Role();
			rol.setName(x.getName());
			rol.setRoleId(x.getRoleId());
			roles.add(rol);
		});
		userDto.setRoles(roles);
		
		return userDto;
		
	}
	

	/*
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