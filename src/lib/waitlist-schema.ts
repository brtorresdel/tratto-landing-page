import { z } from 'zod';

export const waitlistStep1Schema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Informe um endereço de e-mail válido.'),
  consent: z
    .boolean()
    .default(true)
    .refine((val) => val === true, {
      message: 'É necessário concordar com os termos para continuar.',
    }),
  painPoints: z
    .string()
    .trim()
    .max(1500, 'Texto muito longo (máximo de 1500 caracteres).')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  suggestions: z
    .string()
    .trim()
    .max(1500, 'Texto muito longo (máximo de 1500 caracteres).')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  honeypot: z.string().optional().default(''),
});

export type WaitlistStep1Input = z.input<typeof waitlistStep1Schema>;
export type WaitlistStep1Output = z.output<typeof waitlistStep1Schema>;

export const waitlistStep2Schema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Informe um endereço de e-mail válido.'),
  painPoints: z
    .string()
    .trim()
    .max(1500, 'Texto muito longo (máximo de 1500 caracteres).')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  suggestions: z
    .string()
    .trim()
    .max(1500, 'Texto muito longo (máximo de 1500 caracteres).')
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  segment: z
    .enum(['Coworking', 'Advocacia', 'Academias', 'Escolas', 'Contabilidade', 'Outro'])
    .optional(),
  contractsVolume: z
    .enum(['< 5', '5-20', '20-50', '> 50'])
    .optional(),
  currentTool: z
    .string()
    .trim()
    .max(100)
    .optional(),
  interviewOptIn: z.boolean().optional().default(false),
});

export type WaitlistStep2Input = z.input<typeof waitlistStep2Schema>;
export type WaitlistStep2Output = z.output<typeof waitlistStep2Schema>;
