package com.projeto.servicos.model.controller.dto;

import java.util.Set;

import com.projeto.servicos.model.entity.Role;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
	
	private Long id;
	private String email;
	private boolean enabled;
	private String displayName;
	private Set<Role> roles;

}
