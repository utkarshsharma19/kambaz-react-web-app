import axios from "axios";

const REMOTE_SERVER =
  import.meta.env.VITE_HTTP_SERVER ?? import.meta.env.VITE_REMOTE_SERVER;

const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// one axios with credentials for everything in this file
const axiosWithCredentials = axios.create({ withCredentials: true });

/* ---------- Courses ---------- */
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data; // returns the created course doc
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data; // returns the updated course doc
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

// alias to match your Dashboard usage
export const removeCourse = deleteCourse;

/* ---------- Modules ---------- */
export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

export const updateModuleForCourse = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const deleteModuleForCourse = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return data;
};


export const findUsersForCourse = async (courseId: string) => {
  const REMOTE_SERVER =
    import.meta.env.VITE_HTTP_SERVER ?? import.meta.env.VITE_REMOTE_SERVER;
  const COURSES_API = `${REMOTE_SERVER}/api/courses`;

  const { data } = await axios.get(`${COURSES_API}/${courseId}/users`, {
    withCredentials: true,
  });
  return data;
};