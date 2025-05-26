import { authEndPoints } from "../apis";
import { toast } from "react-toastify";
import { apiconnector } from "../apiconector";
import { setloading, setToken, setUser } from "../../redux/slices/authSlice";

const { SIGNUP_API, SIGNIN_API } = authEndPoints;

export const signup = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  accountType,
  navigate,
}) => {
  return async (dispatch) => {
    const toastId = toast.loading("Please wait...");
    dispatch(setloading(true));

    try {
      const response = await apiconnector(SIGNIN_API, "POST", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        accountType,
      });

      console.log("Response Inside Singup: ", response);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      dispatch(setUser(response.data));
      dispatch(setToken(response.token));
      toast.dismiss(toastId);

      toast.success("User created successfully");
      dispatch(setloading(false));
      navigate("/singin");
    } catch (err) {
      console.error("Error in signup:", err);
      toast.dismiss(toastId);
      toast.error("Something went wrong, please try again later");
      dispatch(setloading(false));
    }
  };
};

export const signin = ({ email, password, navigate }) => {
  return async (dispatch) => {
    const toastId = toast.loading("Please wait...");
    dispatch(setloading(true));
    try {
      const response = await apiconnector(SIGNIN_API, "POST", {
        email,
        password,
      });

      if (!response.success) {
        toast.error(response.message);
        console.log("Error in signin:", response.message);
        return;
      }

      dispatch(setUser(response.data));
      dispatch(setToken(response.token));
      toast.dismiss(toastId);
      dispatch(setloading(false));
      toast.success("User signed in successfully");
      navigate("/");
    } catch (err) {}
  };
};
