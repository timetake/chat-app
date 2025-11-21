export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { hash } from 'bcryptjs';

const RegisterSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6).max(72),
});

export async function POST(req: Request) {
  const parsed = RegisterSchema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const { username, email, password } = parsed.data;

  const exists = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (exists)
    return NextResponse.json(
      { error: 'Username or email exists' },
      { status: 409 },
    );

  const passwordHash = await hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, passwordHash },
  });

  return NextResponse.json(
    { id: user.id, username: user.username },
    { status: 201 },
  );
}

export async function GET() {
  return NextResponse.json({ ok: true, where: '/api/auth/register' });
}
