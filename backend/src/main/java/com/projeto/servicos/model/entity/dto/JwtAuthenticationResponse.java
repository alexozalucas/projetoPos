package com.projeto.servicos.model.entity.dto;


import lombok.Value;

@Value
public class JwtAuthenticationResponse {
	private String accessToken;
	private UserInfo user;
}
