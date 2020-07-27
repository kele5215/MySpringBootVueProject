package com.kele.utils;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.kele.entity.User;

public class TokenUtil {

	/**
	 *  token 过期时间
	 *
	 */
	private static final long EXPIRE_TIME = 10 * 60 * 60 * 1000;

	/**
	 *  token 密钥鍵
	 *
	 */
	private static final String TOKEN_SECRET = "kele";

	/**
	 * * 签名生成
	 * @param user
	 * @return
	 */
	public static String sign(User user) {
		String token = null;

		try {
			Date expiresAt = new Date(System.currentTimeMillis() + EXPIRE_TIME);

			token = JWT.create()
					// jwt 签发者
					.withIssuer("auth0")
					.withClaim("username", user.getUsername())
					// 过期时间戳
					.withExpiresAt(expiresAt)
					// 使用了HMAC256加密算法。
					.sign(Algorithm.HMAC256(TOKEN_SECRET));

		} catch (Exception e) {
			e.printStackTrace();
		}
		return token;

	}

	/**
	 * 签名验证
	 * @param token
	 * @return
	 */
	public static boolean verify(String token) {
		try {
			JWTVerifier verifier = JWT.require(
					Algorithm.HMAC256(TOKEN_SECRET))
					.withIssuer("auth0").build();
			DecodedJWT jwt = verifier.verify(token);

			System.out.println("认证通过：");
			System.out.println("username: " + jwt.getClaim("username").asString());
			System.out.println("过期时间：      " + jwt.getExpiresAt());

			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
