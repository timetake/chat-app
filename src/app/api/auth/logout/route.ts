import { NextRequest, NextResponse } from 'next/server';
import { getBearerToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized,' }, { status: 401 });
  }

  await prisma.session.delete({ where: { token } }).catch(() => {});

  return NextResponse.json({ ok: true });
}
