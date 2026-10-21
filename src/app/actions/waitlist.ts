'use server';

import {
  waitlistStep1Schema,
  waitlistStep2Schema,
  type WaitlistStep1Input,
  type WaitlistStep2Input,
} from '@/lib/waitlist-schema';
import { WaitlistService } from '@/lib/waitlist-service';

const waitlistService = new WaitlistService();

export async function submitWaitlistStep1Action(rawData: unknown) {
  const parsed = waitlistStep1Schema.safeParse(rawData);

  if (!parsed.success) {
    const errorMap = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      errors: errorMap,
      error: 'Por favor, revise os dados informados.',
    };
  }

  const result = await waitlistService.captureStep1(parsed.data);
  return result;
}

export async function submitWaitlistStep2Action(rawData: unknown) {
  const parsed = waitlistStep2Schema.safeParse(rawData);

  if (!parsed.success) {
    const errorMap = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      errors: errorMap,
      error: 'Por favor, revise as opções selecionadas.',
    };
  }

  const result = await waitlistService.qualifyStep2(parsed.data);
  return result;
}
