import { z } from "zod";

export const GetTokenFormSchema = z.object({
  api_url: z.string().min(1, "Api Url cannot be blank"),
});
