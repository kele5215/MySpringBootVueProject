package com.kele.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Executors;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ConcurrentTaskExecutor;
import org.springframework.web.servlet.config.annotation.AsyncSupportConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.kele.interceptor.TokenInterceptor;

/**
 * 跨域请求支持/token拦截
 * tip:只能写在一个配置类里
 */
@Configuration
public class WebConfiguration implements WebMvcConfigurer {
	private TokenInterceptor tokenInterceptor;

	//构造方法
	public WebConfiguration(TokenInterceptor tokenInterceptor) {
		this.tokenInterceptor = tokenInterceptor;
	}

	/**
	 *  设置跨域问题
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {

		List<String> allowedHeaders = Arrays.asList("x-auth-token", "content-type", "X-Requested-With",
				"XMLHttpRequest");
		//		List<String> exposedHeaders = Arrays.asList("x-auth-token", "content-type", "X-Requested-With",
		//				"XMLHttpRequest");
		List<String> allowedMethods = Arrays.asList("POST", "GET", "DELETE", "PUT", "OPTIONS");
		List<String> allowedOrigins = Arrays.asList("*");

		registry.addMapping("/**")
				.allowCredentials(true)
				.allowedHeaders((String[]) allowedHeaders.toArray())
				.allowedMethods((String[]) allowedMethods.toArray())
				.allowedOrigins((String[]) allowedOrigins.toArray());

	}

	/**
	 * 处理异步请求
	 * 超时时间（毫秒，Tomcat下默认是10000毫秒，即10秒）
	 * 异步任务执行器
	 */
	@Override
	public void configureAsyncSupport(AsyncSupportConfigurer configurer) {
		configurer.setTaskExecutor(new ConcurrentTaskExecutor(Executors.newFixedThreadPool(3)));
		configurer.setDefaultTimeout(30000);
	}

	/**
	 * 自定义写拦截器，并指定拦截路径
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		List<String> excludePath = new ArrayList<>();
		//排除拦截，除了注册登录(此时还没token)，其他都拦截
		excludePath.add("/user/register"); //登录
		excludePath.add("/user/login"); //注册
		excludePath.add("/static/**"); //静态资源
		excludePath.add("/assets/**"); //静态资源

		registry.addInterceptor(tokenInterceptor)
				.addPathPatterns("/**")
				.excludePathPatterns(excludePath);

		WebMvcConfigurer.super.addInterceptors(registry);
	}
}
