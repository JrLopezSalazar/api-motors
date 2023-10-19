import z from 'zod';
import { extractValidationData } from '../../utils/errorData.js';

export const repairSchema = z.object({
  date: z.string(),
  status: z.enum([('completed', 'pending', 'cancelled')]),
  motorsNumber: z.number(),
  description: z.string()

});
 
export const validateRepair = (data) => {
  const result = repairSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);

  return {
      hasError,
      errorMessages,
      repairData
  }
};
