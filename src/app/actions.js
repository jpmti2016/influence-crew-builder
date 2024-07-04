"use server";
import { v4 as uuidv4 } from "uuid";

export const manageCrew = async (formData) => {
  const cremateId = uuidv4();

  console.log("Change crew button clicked", formData);
  const cremate = {
    id: cremateId,
    name: formData.get("name"),
  };
};
