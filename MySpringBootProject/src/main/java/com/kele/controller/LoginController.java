package com.kele.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kele.api.CommonResult;
import com.kele.entity.User;

@RestController
public class LoginController {
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public CommonResult login(@RequestBody User user) {
		if (user.getUsername().equals("admin") && user.getPassword().equals("123456"))
			return CommonResult.success("admin");
		else
			return CommonResult.validateFailed();
	}
}
