package com.kele.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * 全局跨域配置
 */
@Configuration
public class GlobalCorsConfig extends CorsFilter {

	/**
	 * 允许跨域调用的过滤器
	 */
	public GlobalCorsConfig() {
		super(configurationSource());
	}

	//	private CorsConfiguration buildConfig() {
	//		CorsConfiguration corsConfiguration = new CorsConfiguration();
	//		corsConfiguration.addAllowedOrigin("*"); // 1
	//		corsConfiguration.addAllowedHeader("*"); // 2
	//		corsConfiguration.addAllowedMethod("*"); // 3
	//		return corsConfiguration;
	//	}
	//
	//	@Bean
	//	public CorsFilter corsFilter() {
	//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	//		source.registerCorsConfiguration("/**", buildConfig()); // 4
	//		return new CorsFilter(source);
	//	}

	private static UrlBasedCorsConfigurationSource configurationSource() {
		CorsConfiguration corsConfig = new CorsConfiguration();
		List<String> allowedHeaders = Arrays.asList("x-auth-token", "content-type", "X-Requested-With",
				"XMLHttpRequest");
		List<String> exposedHeaders = Arrays.asList("x-auth-token", "content-type", "X-Requested-With",
				"XMLHttpRequest");
		List<String> allowedMethods = Arrays.asList("POST", "GET", "DELETE", "PUT", "OPTIONS");
		List<String> allowedOrigins = Arrays.asList("*");
		corsConfig.setAllowedHeaders(allowedHeaders);
		corsConfig.setAllowedMethods(allowedMethods);
		corsConfig.setAllowedOrigins(allowedOrigins);
		corsConfig.setExposedHeaders(exposedHeaders);
		corsConfig.setMaxAge(36000L);
		corsConfig.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfig);
		return source;
	}
}
