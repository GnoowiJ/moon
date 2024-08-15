import { getCookie, removeCookie } from "./cookies"

export const getAdmin = () => {
  return localStorage.getItem("adminInfo") && getCookie("x-auth-jwt")
    ? JSON.parse(localStorage.getItem("adminInfo")) : null;
}

export const removeAdmin = () => {
  removeCookie("x-auth-jwt");
  localStorage.removeItem("adminInfo");
}