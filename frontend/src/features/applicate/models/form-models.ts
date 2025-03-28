import { z } from "zod";

export const formModel = z.object({
  studentInfo: z.object({
    name: z.string(),
    studentId: z.string(),
  }),
  survey: z.array(z.number().min(1).max(5).optional()),
});

export type FormModel = z.infer<typeof formModel>;
