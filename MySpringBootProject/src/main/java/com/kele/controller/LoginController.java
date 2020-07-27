package com.kele.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kele.api.CommonResult;
import com.kele.entity.User;
import com.kele.utils.TokenUtil;

@RestController
public class LoginController {
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public CommonResult login(@RequestBody User user) {
		String userName = user.getUsername();
		String password = user.getPassword();

		if (userName.equals("admin") && password.equals("123456")) {

			String token = TokenUtil.sign(user);

			Map<String, Object> tokenMap = new HashMap<String, Object>();
			tokenMap.put("userName", user.getUsername());
			tokenMap.put("token", token);

			return CommonResult.success(tokenMap);
		} else
			return CommonResult.validateFailed();
	}
}
