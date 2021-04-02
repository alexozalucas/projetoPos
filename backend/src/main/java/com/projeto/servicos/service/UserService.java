package com.projeto.servicos.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;

import com.projeto.servicos.model.entity.User;
import com.projeto.servicos.model.entity.dto.LocalUser;
import com.projeto.servicos.model.entity.dto.SignUpRequest;
import com.projeto.servicos.service.exception.UserAlreadyExistAuthenticationException;

public interface UserService {
	
	public User registerNewUser(SignUpRequest signUpRequest) throws UserAlreadyExistAuthenticationException;
	User findUserByEmail(String email);
	Optional<User> findUserById(Long id);
	LocalUser processUserRegistration(String registrationId, Map<String, Object> attributes, OidcIdToken idToken, OidcUserInfo userInfo);

}
