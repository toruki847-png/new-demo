'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import CharacterArea from '@/components/CharacterArea';
import TodoList from '@/components/TodoList';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 読み込み中でなく、ユーザーもいない場合はログインページに飛ばす
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // ユーザーがいない場合（リダイレクト前）は何も表示しない
  if (loading || !user) {
    return <p>Loading...</p>; // またはスピナーなどを表示
  }

  return (
    <main className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-1">
        <CharacterArea />
        <TodoList />
      </div>
    </main>
  );
}