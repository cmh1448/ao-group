import { FormModel } from "@/models/application.ts";
import axios from "axios";

export const submitApplication = async (form: FormModel) => {
  const res = await axios.post("api/applications", form);
  return res.data;
};
