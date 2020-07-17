package com.kele.model;

import lombok.Data;

@Data
public class Test {

	private final long id;
	private final String content;

	public Test(long id, String content) {
		this.id = id;
		this.content = content;
	}
}
