'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'register') {
        const r = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          alert(j.error || 'Registration failed');
          return;
        }
        alert('Registration successful, please login');
        setMode('login');
        return;
      }

      const res = await signIn('credentials', {
        username: form.username,
        password: form.password,
        redirect: false,
      });

      if (res?.error) {
        alert('Login failed');
        return;
      }
      router.push('/chat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='max-w-md mx-auto p-8'>
      <div className='nb-card'>
        <h1 className='text-3xl font-extrabold mb-4'>Chat App</h1>

        <div className='flex gap-3 mb-6'>
          <button
            className={`nb-tab ${
              mode === 'login' ? 'nb-tab-active' : 'nb-tab-inactive'
            }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`nb-tab ${
              mode === 'register' ? 'nb-tab-active' : 'nb-tab-inactive'
            }`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={submit} className='space-y-3'>
          <input
            className='nb-input w-full'
            placeholder='Username'
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          {mode === 'register' && (
            <input
              className='nb-input w-full'
              placeholder='Email'
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          )}
          <input
            className='nb-input w-full'
            placeholder='Password'
            type='password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type='submit'
            className='nb-btn w-full bg-lime-300'
            disabled={loading}
          >
            {loading
              ? 'Submitting...'
              : mode === 'login'
              ? 'Login'
              : 'Register'}
          </button>
        </form>
      </div>
    </main>
  );
}
