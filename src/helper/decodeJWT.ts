import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface JwtPayload {
  name: string;
  role: string;
  departemen: string;
  iat: number;
  exp: number;
}

export const decodeJWT = () => {
  const token = Cookies.get("token");

  if (!token) {
    return;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded;
  } catch (err) {
    console.error("Token tidak valid:", err);
    return;
  }
};
