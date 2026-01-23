'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

type Conversations = { id: string; name: string };
type Message = {
  id: string;
  conversationId: string;
  fromMe: boolean;
  text: string;
  ts: number;
};

export default function ChatPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.push('/');
    }
  }, [isLoading, user, router]);

  const [messageText, setMessageText] = useState('');
  const [selectedConversationId, setSelectedConversationId] =
    useState<string>('c1');

  const conversations: Conversations[] = useMemo(
    () => [
      { id: 'c1', name: 'Alice' },
      { id: 'c2', name: 'Bob' },
      { id: 'c3', name: 'Study Group' },
    ],
    [],
  );

  const allMessages: Message[] = useMemo(
    () => [
      {
        id: 'm1',
        conversationId: 'c1',
        fromMe: false,
        text: 'Hi! How are you?',
        ts: 1,
      },
      {
        id: 'm2',
        conversationId: 'c1',
        fromMe: true,
        text: 'Good! Building our chat app',
        ts: 2,
      },
      {
        id: 'm3',
        conversationId: 'c1',
        fromMe: false,
        text: 'Nice, Make it look consistent!',
        ts: 3,
      },
      {
        id: 'm4',
        conversationId: 'c2',
        fromMe: false,
        text: 'Yo, texting message list',
        ts: 1,
      },
      {
        id: 'm5',
        conversationId: 'c2',
        fromMe: true,
        text: 'Works, Next: real API',
        ts: 2,
      },
      {
        id: 'm6',
        conversationId: 'c3',
        fromMe: false,
        text: 'Reminder: homework due Friday',
        ts: 1,
      },
    ],
    [],
  );

  const selectedConversation =
    conversations.find((c) => c.id === selectedConversationId) ??
    conversations[0];

  const messages = allMessages
    .filter((m) => m.conversationId === selectedConversation.id)
    .sort((a, b) => a.ts - b.ts);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='nb-card'>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  function handleSend() {
    if (!messageText.trim()) return;

    // connect to api

    setMessageText('');
  }

  return (
    <div className='min-h-screen p-4'>
      <div className='mx-auto max-w-6xl flex gap-4'>
        <aside className='w-72 nb-card flex flex-col gap-4'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <div className='text-lg font-bold tracking-tight'>
                Conversations
              </div>
              <div className='text-sm opacity-80'>
                Logged in as{' '}
                <span className='font-semibold'>{user.name ?? user.email}</span>
              </div>
            </div>
            <button
              type='button'
              className='nb-btn'
              onClick={() => {
                logout();
                router.push('/');
              }}
            >
              Logout
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            {conversations.map((c) => {
              const active = c.id === selectedConversationId;
              return (
                <button
                  key={c.id}
                  type='button'
                  className={[
                    'nb-tab text-left',
                    active ? 'nb-tab-active' : 'nb-tab-inactive',
                  ].join(' ')}
                  onClick={() => setSelectedConversationId(c.id)}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </aside>

        <main className='flex-1 nb-card flex flex-col'>
          <div className='flex items-start justify-center gap-3 pb-4 border-b-4 border-black'>
            <div>
              <div className='text-lg font-bold tracking-tight'>
                {selectedConversation.name}
              </div>
              <div className='text-sm opacity-80'>
                Conversation ID:
                <span className='font-semibold'>{selectedConversation.id}</span>
              </div>
            </div>
            <div className='flex-1 py-4 flex flex-col gap-3'>
              {messages.length === 0 ? (
                <div className='opacity-80'>No messages yet.</div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex  ${
                      m.fromMe ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={[
                        'max-w-[70%]',
                        'border-4 border-black rounded-xl px-4 py-2 ',
                        'shadow-[6px_6px_0_0_#000]',
                        m.fromMe ? 'bg-[#fffb8f]' : 'bg-white',
                      ].join(' ')}
                    >
                      <div className='text-sm leading-relaxed'>{m.text}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <form
            className='pt-4 border-t-4 border-black flex gap-3 items-center'
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              className='nb-input flex-1'
              placeholder='Type a message'
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button
              type='submit'
              className='nb-btn'
              disabled={!messageText.trim()}
            >
              Send
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
