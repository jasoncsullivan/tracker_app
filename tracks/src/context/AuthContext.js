import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import trackerAPI from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signin":
      return { ...state, token: action.payload, errorMessage: "" };
    case "signout":
      return { ...state, token: null };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerAPI.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup.",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerAPI.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });

    navigate("TrackList");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in.",
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("Signin");
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
