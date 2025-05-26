import { BACKEND_URL } from "./backendURL";

// Authentication ENDS Points
export const authEndPoints = {
  SIGNUP_API: `${BACKEND_URL}/auth/signup`,
  SIGNIN_API: `${BACKEND_URL}/auth/signin`,
};

// Course ENDS Points
export const courseEndPoints = {
  CREATE_COURSE_API: `${BACKEND_URL}/course/create-course`,
  UPDATE_COURSE_API: `${BACKEND_URL}/course/update-course/${id}`,
  DELETE_COURSE_API: `${BACKEND_URL}/course/delete-course/${id}`,
  GET_ALL_COURSE_API: `${BACKEND_URL}/course/get-all-course`,
  GET_SINGLE_COURSE_API: `${BACKEND_URL}/course/get-single-course/${id}`,
};

// Section ENDS Points
export const sectionEndPoints = {
  CREATE_SECTION_API: `${BACKEND_URL}/section/create-section`,
  UPDATE_SECTION_API: `${BACKEND_URL}/sectiion/update-section`,
  DELETE_SECTION_API: `${BACKEND_URL}/section/delete-section/${id}`,
};

// Sub-Sections ENDS Points
export const subSectionEndPoints = {
  CREATE_SUB_SECTION_API: `${BACKEND_URL}/sub-section/create-sub-section`,
  UPDATE_SUB_SECTION_API: `${BACKEND_URL}/sub-section/update-sub-section`,
  DELETE_SUB_SECTION_API: `${BACKEND_URL}/sub-section/delete-sub-section`,
};

// Category END Points
export const CategoryEndPoints = {
  CREATE_CATEGORY_API: `${BACKEND_URL}/categries/create-category`,
  DELETE_CATEGORY_BYID_API: `${BACKEND_URL}/categries/delete-category/${id}`,
  GET_CATEGORY_API: `${BACKEND_URL}/categries/get-course`,
};
