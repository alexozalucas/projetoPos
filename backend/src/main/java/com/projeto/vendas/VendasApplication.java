package com.projeto.vendas;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication(scanBasePackages = "com.projeto.vendas")
@EnableJpaRepositories
@EnableTransactionManagement
public class VendasApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplicationBuilder app = new SpringApplicationBuilder(VendasApplication.class);
		app.run();
		//SpringApplication.run(VendasApplication.class, args);
	}
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(VendasApplication.class);
	}

}
