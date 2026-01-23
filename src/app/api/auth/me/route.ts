import { NextResponse, NextRequest } from 'next/server';
import { requireUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = await requireUser(req);

  if (!auth) {
    return NextResponse.json({ message: 'Unauthorized,' }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: auth.user.id,
      name: auth.user.name,
      email: auth.user.email,
    },
  });
}
