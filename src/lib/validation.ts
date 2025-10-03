import { z } from 'zod';

export const onboardingSchema = z.object({
  campus: z.string().min(1, 'Выберите кампус'),
  budget: z.tuple([z.number().min(0), z.number().min(0)]),
  moveInDate: z.string().min(1)
});

export const publishDetailsSchema = z.object({
  title: z.string().min(4).max(80),
  description: z.string().min(20).max(800),
  price: z.number().min(1000).max(200000),
  address: z.string().min(5),
  minutesToCampus: z.number().min(1).max(120),
  roommatesCount: z.number().min(0).max(5)
});

export const publishConditionsSchema = z.object({
  furnished: z.boolean(),
  petsAllowed: z.boolean(),
  smokingAllowed: z.boolean(),
  alcohol: z.enum(['no', 'rare', 'social']),
  cleanliness: z.enum(['low', 'mid', 'high']),
  sleep: z.enum(['early', 'flex', 'late'])
});

export const messageSchema = z.object({
  text: z.string().min(1).max(1000)
});

export const verificationSchema = z.object({
  method: z.enum(['edu_email', 'student_card']),
  value: z.string().optional()
});

export type OnboardingForm = z.infer<typeof onboardingSchema>;
export type PublishDetailsForm = z.infer<typeof publishDetailsSchema>;
export type PublishConditionsForm = z.infer<typeof publishConditionsSchema>;
export type MessageForm = z.infer<typeof messageSchema>;
