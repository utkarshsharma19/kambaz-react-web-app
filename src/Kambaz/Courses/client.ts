import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_HTTP_SERVER;
const COURSES_API   = `${REMOTE_SERVER}/api/courses`;

/* ---------- queries ---------- */
export const fetchAllCourses = async () =>
  (await axios.get(COURSES_API)).data;

/* ---------- commands ---------- */
export const createCourse  = async (course: any) =>
  (await axios.post(COURSES_API,            course)).data;

export const updateCourse  = async (course: any) =>
  (await axios.put(`${COURSES_API}/${course._id}`, course)).data;

export const removeCourse  = async (courseId: string) =>
  (await axios.delete(`${COURSES_API}/${courseId}`)).data;

  export const findModulesForCourse = async (courseId: string) => {
    const response = await axios
      .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
  };
  export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/modules`,
      module
    );
    return response.data;
  };
  
  
  