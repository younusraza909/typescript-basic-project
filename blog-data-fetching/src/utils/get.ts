import { z } from "zod";

export async function get<T>(url: string, schema: z.ZodType<T>) {
  const result = await fetch(url);

  const data = (await result.json()) as unknown;

  try {
    return schema.parse(data);
  } catch (error) {
    throw new Error("Invalid data received from server.");
  }
}
