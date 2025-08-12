import axios from "axios";

const REMOTE_SERVER =
  import.meta.env.VITE_HTTP_SERVER ?? import.meta.env.VITE_REMOTE_SERVER;

const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const axiosWC = axios.create({ withCredentials: true });

export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWC.delete(`${MODULES_API}/${moduleId}`);
  return data;
};

export const updateModule = async (module: any) => {
  const { data } = await axiosWC.put(`${MODULES_API}/${module._id}`, module);
  return data; // updated doc from server
};
