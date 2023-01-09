import { z } from 'zod';

const side = ['LONG', 'SHORT'] as const;

export const Trade = z.object({
	date: z.string().datetime({ precision: 3 }),
	symbol: z.string().min(1).max(10),
	entry: z.number().min(0),
	exit: z.number().min(0),
	size: z.number().min(0),
	side: z.enum(side),
	setups: z.string()
});

export type Trade = z.infer<typeof Trade>;
