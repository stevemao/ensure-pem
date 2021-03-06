import ensurePem from "..";
import crypto from "crypto";

test("encrypt and decrypt should work", () => {
  const data = "foo-bar";

  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgGkXLhQjd8uhPO8W61NUHd+JoeXFM0II9IW3AwiJzq4MSk2Hy/+H
PeYxgIBON2WfsVHd6P+rQM63SUclUy4M0UdjB9gZK+3o5VnFvWGGM0rLExZuaU71
zBF/Vi+ISGR/4WDQY9gk1y6rslZpKKjCrNiRTMB7hcIjQQ6bD+CTNUkXAgMBAAEC
gYAPaiwDHjS7NLpoY5c/EM6U9G4/8s4S+JdNacvTG8uqMflQKAQfRiopMsejilWL
3YG3/XHo1qjZ6X6hJfNuhMjJm6KEQvBLzpQGCkvRCQLrdBqXwpcdyoZJpvP/dOXl
05p8VYUoCgDV/33HMmrE8KI9KNN5CaPggfS9HYL02LhXIQJBAMrc6YvV9GckiJCm
ZehRBdYK/oFYWpNDlBGmIL/1QROdYOW/mErelGXjuEqAdvbCIO212KPWvIo/d/r0
YEJTLfECQQCEnhXYw/c/IMA1YvN/vT2Nn62xEh3AdQt/D2k5Cuxq2Iv+Tv1uM0vj
3Z518/nIGprL3V+0L/ab7dOaU6EG5f+HAkAGL0H3f2haFKUNM+V7dazl36PusZDh
WHgVKalp8MIxJOUlW/f6oFqJ2K1vqAb4cuaqGJcoN4278T9pKTYeD4chAkB6+792
zgSz3kNhPuphQ7WZaMNCunIs0F5g7oG+DItCap8or0gGsjtmjVcuO5sgHsv+0sS1
7OTdpafeLj/ejdxxAkEAxojMWYaIvG2hn0e/xiLuGElg//50l13n6/2nHok4Q0s1
bop8AAc6325RpF4FiY0K5C8SJ/Lx9cZxpB2otbC9bA==
-----END RSA PRIVATE KEY-----`;

  const publicKey = `-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgGkXLhQjd8uhPO8W61NUHd+JoeXFM0II9IW3AwiJzq4MSk2Hy/+HPeYxgIBON2WfsVHd6P+rQM63SUclUy4M0UdjB9gZK+3o5VnFvWGGM0rLExZuaU71zBF/Vi+ISGR/4WDQY9gk1y6rslZpKKjCrNiRTMB7hcIjQQ6bD+CTNUkXAgMBAAE=-----END PUBLIC KEY-----`;

  const encrypted = crypto.publicEncrypt(
    {
      key: ensurePem(publicKey),
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(data, "utf8")
  );

  const decrypted = crypto
    .privateDecrypt(
      {
        key: ensurePem(privateKey),
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      encrypted
    )
    .toString("utf8");

  expect(decrypted).toEqual(data);
});
