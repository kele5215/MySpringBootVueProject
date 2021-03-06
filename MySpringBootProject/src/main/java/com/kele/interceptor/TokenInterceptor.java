package com.kele.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.kele.utils.TokenUtil;

@Component
public class TokenInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (request.getMethod().equals("OPTIONS")) {
			response.setStatus(HttpServletResponse.SC_OK);
			return true;
		}
		response.setCharacterEncoding("utf-8");
		String token = request.getHeader("token");
		if (token != null) {
			boolean result = TokenUtil.verify(token);
			if (result) {
				System.out.println("通过拦截器");
				return true;
			}
		}
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=utf-8");
		try {

			Map<String, Object> data = new HashMap<String, Object>();
			data.put("msg", "token verify fail");
			data.put("code", "50000");
			JSONObject jsonObj = new JSONObject(data);

			response.getWriter().append(jsonObj.toString());

			System.out.println("认证失败，未通过拦截器");
		} catch (Exception e) {
			e.printStackTrace();
			response.sendError(500);
			return false;
		}
		return false;
	}
}
