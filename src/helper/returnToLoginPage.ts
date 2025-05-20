import Cookies from "js-cookie";
import { useRouter } from "next/router";

const router = useRouter();

export const returnToLoginPage = () => {
  Cookies.remove("token");
  router.push("/auth/login");
};
