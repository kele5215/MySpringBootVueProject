package com.kele.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@RequestMapping("/Home")
	public String Home() {
		return "My First Home Page";
	}
}
