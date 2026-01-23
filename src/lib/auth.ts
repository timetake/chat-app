import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export function getBearerToken(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth) return null;
  if (!auth.startsWith('Bearer ')) return null;
  return auth.slice('Bearer '.length).trim();
}

export async function getSession(req: NextRequest) {
  const token = getBearerToken(req);
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await prisma.session.delete({ where: { token } }).catch(() => {});
    return null;
  }

  return session;
}

export async function requireUser(req: NextRequest) {
  const session = getSession(req);
  if (!session) return null;

  return {
    user: session.user,
    token: session.token,
    sessionId: session.id,
  };
}
