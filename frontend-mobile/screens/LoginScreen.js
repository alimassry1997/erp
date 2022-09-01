import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      await login(email, password);
    } catch (err) {
      Alert.alert(
        err.response.data.message,
        "Please check your credentials or try again later!"
      );
    }
    setIsAuthenticating(false);
  };

  const login = async (email, password) => {
    const response = await axios.post(
      `https://erp-lamp-api.herokuapp.com/api/login`,
      { email, password }
    );
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in" />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
