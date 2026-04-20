import Instance from "./Instance";

/**
 * Interface for Plan Details (v2 schema)
 */
export interface PlanDetail {
  id: number;
  name: string;
  title: string;
  pricing: {
    display: string;
    amount: number;
  };
  validity: string;
  highlights: string[];
  description: string;
  ui_meta: {
    is_popular: boolean;
    badge: string;
  };
}

/**
 * API Response Interface
 */
interface PlanDetailsResponse {
  status: string;
  message: string;
  data: PlanDetail[];
}

/**
 * Fetches all available pricing plans
 */
export const getPlanDetails = async (): Promise<PlanDetailsResponse> => {
  const response = await Instance.get("/api/get_plan_details");
  return response.data;
};

