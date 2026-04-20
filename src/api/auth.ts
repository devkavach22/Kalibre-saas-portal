import Instance from "./Instance";

export const loginApi = async (email: string, password: string) => {
  const response = await Instance.post("/api/login", {
    email,
    password,
  });
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await Instance.post("/api/forgot-password", {
    email,
  });
  return response.data;
};

export const confirmPasswordReset = async (payload: any) => {
  const response = await Instance.post("/api/forgot-password/confirm", payload);
  return response.data;
};

export const verifyGST = async (gst_number: string) => {
  const response = await Instance.post("/api/check-gst-number", { gst_number });
  return response.data;
};

export const registerCompany = async (payload: any) => {
  const response = await Instance.post("/api/company_registrer", payload);
  return response.data;
};

export const candidateRegister = async (payload: any) => {
  const response = await Instance.post("/api/candidate_register", payload);
  return response.data;
};
