import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const { VITE_JSON_SERVER } = import.meta.env;

export default defineStore("admin", () => {
  const member = ref({});
  const isLoggedIn = ref(false);
  const tokenKey = "jamblogToken";

  const signUp = async (user) => {
    const apiUrl = `${VITE_JSON_SERVER}users`;
    try {
      await axios.post(apiUrl, user);
      const account = { email: user.email, password: user.password };
      logIn(account);
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async (account) => {
    const apiUrl = `${VITE_JSON_SERVER}login`;
    try {
      const res = await axios.post(apiUrl, account);
      member.value = res.data.user;
      localStorage.setItem("userId", res.data.user.id);
      isLoggedIn.value = true;
      const token = res.data.accessToken;
      //set cookie expireation to 1 hour
      document.cookie = `${tokenKey}=${token};max-age=3600;`;
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    isLoggedIn.value = false;
    document.cookie = `${tokenKey}=;max-age=0;`;
    member.value = {};
  };

  const getToken = () => {
    const regex = new RegExp(
      "(?:(?:^|.*;\\s*)" + tokenKey + "\\s*=\\s*([^;]*).*$)|^.*$",
    );
    const token = document.cookie.replace(regex, "$1");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  };

  const fetchMember = async () => {
    const id = localStorage.getItem("userId");
    const apiUrl = `${VITE_JSON_SERVER}600/users/${id}`;
    try {
      const res = await axios.get(apiUrl);
      member.value = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkLogin = async () => {
    getToken();
    if (isLoggedIn.value) {
      await fetchMember();
    }
  };

  return {
    member,
    isLoggedIn,
    signUp,
    logIn,
    logOut,
    checkLogin,
  };
});
