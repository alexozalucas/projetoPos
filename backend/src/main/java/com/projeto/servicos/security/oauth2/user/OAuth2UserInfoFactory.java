package com.projeto.servicos.security.oauth2.user;

import java.util.Map;

import com.projeto.servicos.model.entity.dto.SocialProvider;
import com.projeto.servicos.service.exception.OAuth2AuthenticationProcessingException;

public class OAuth2UserInfoFactory {
	public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
		if (registrationId.equalsIgnoreCase(SocialProvider.GOOGLE.getProviderType())) {
			return new GoogleOAuth2UserInfo(attributes);
		} else {
			throw new OAuth2AuthenticationProcessingException("Desculpa! Entrar com  " + registrationId + "ainda não é compatível. ");
		}
	}
}