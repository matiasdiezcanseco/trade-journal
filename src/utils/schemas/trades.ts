import { z } from 'zod';

const side = ['LONG', 'SHORT'] as const;

export const EditTrade = z.object({
	date: z.string().datetime({ precision: 3 }).optional(),
	symbol: z.string().min(1).max(10).optional(),
	entry: z.number().min(0).optional(),
	exit: z.number().min(0).optional(),
	size: z.number().min(0).optional(),
	side: z.enum(side).optional(),
	setups: z.string().optional()
});

export const AddTrade = z.object({
	date: z.string().datetime({ precision: 3 }),
	symbol: z.string().min(1).max(10),
	entry: z.number().min(0),
	exit: z.number().min(0),
	size: z.number().min(0),
	side: z.enum(side),
	setups: z.string()
});

export type EditTrade = z.infer<typeof EditTrade>;

export type AddTrade = z.infer<typeof AddTrade>;

export type Trade = AddTrade & { id: number };
