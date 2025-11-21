'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='nb-card'>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className='min-h-screen p-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='nb-card mb-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>
              Welcome, {session.user.username}!
            </h1>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className='nb-btn bg-red-300'
            >
              Logout
            </button>
          </div>
        </div>

        <div className='nb-card'>
          <h2 className='text-xl font-bold mb-4'>Chat Room</h2>
          <div className='h-96 border-4 border-black rounded-lg p-4 mb-4 bg-gray-50'>
            <p className='text-gray-500 text-center'>
              Chat functionality will be implemented here...
            </p>
          </div>
          <div className='flex gap-2'>
            <input
              className='nb-input flex-1'
              placeholder='Type a message...'
              disabled
            />
            <button className='nb-btn bg-blue-300' disabled>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
