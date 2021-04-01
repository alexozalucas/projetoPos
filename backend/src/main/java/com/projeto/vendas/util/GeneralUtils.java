package com.projeto.vendas.util;

import java.util.ArrayList;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.projeto.vendas.model.entity.Role;
import com.projeto.vendas.model.entity.User;
import com.projeto.vendas.model.entity.dto.LocalUser;
import com.projeto.vendas.model.entity.dto.SocialProvider;
import com.projeto.vendas.model.entity.dto.UserInfo;
import java.util.List;

public class GeneralUtils {

	public static List<SimpleGrantedAuthority> buildSimpleGrantedAuthorities(final Set<Role> roles) {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		for (Role role : roles) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		}
		return authorities;
	}

	public static SocialProvider toSocialProvider(String providerId) {
		for (SocialProvider socialProvider : SocialProvider.values()) {
			if (socialProvider.getProviderType().equals(providerId)) {
				return socialProvider;
			}
		}
		return SocialProvider.LOCAL;
	}

	public static UserInfo buildUserInfo(LocalUser localUser) {
		List<String> roles = localUser.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
		User user = localUser.getUser();
		return new UserInfo(user.getId().toString(), user.getDisplayName(), user.getEmail(), roles);
	}
}