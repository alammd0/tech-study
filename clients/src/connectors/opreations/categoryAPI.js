import { setloading } from "../../redux/slices/authSlice";
import { apiconnector } from "../apiconector";
import { CategoryEndPoints } from "../apis";
import { toast } from "react-toastify";

const { CREATE_CATEGORY_API, DELETE_CATEGORY_BYID_API, GET_CATEGORY_API } =
  CategoryEndPoints;

export const createCategory = ({ name, navigate }) => {
  return async (dispatch) => {
    const toastId = toast.loading("Please wait...");
    dispatch(setloading(true));
    try {
      const response = await apiconnector(
        CREATE_CATEGORY_API,
        "POST",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.success) {
        toast.error(response.message);
        console.log("Error in createCategory: ", response);
        toast.dismiss(toastId);
        return;
      }

      toast.dismiss(toastId);
      toast.success("Category created successfully");
      dispatch(setloading(false));
      navigate("/dashboard/categories");
    } catch (err) {
      console.log("Error in createCategory: ", err);
      toast.dismiss(toastId);
    }
  };
};

export const getAllCategories = () => {
  return async (dispatch) => {
    const toastId = toast.loading("Please wait...");
    dispatch(setloading(true));
    try {
      const response = await apiconnector(GET_CATEGORY_API, "GET", {});

      if (!response) {
        toast.error(response.message);
        console.log("Error in getAllCategories: ", response);
        toast.dismiss(toastId);
        return;
      }

      toast.dismiss(toastId);
      dispatch(setloading(false));
      return response;
    } catch (err) {
      console.log("Error in getAllCategories: ", err);
      toast.dismiss(toastId);
      dispatch(setloading(false));
    }
  };
};
