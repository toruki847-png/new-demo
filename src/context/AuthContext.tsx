'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // ステップ2で作成したfirebase.tsを指します

// Contextで共有したい値の型を定義
type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// Contextを作成
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// Contextを提供するプロバイダーコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChangedでユーザーのログイン状態を監視
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // クリーンアップ関数
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Contextの値を使するためのカスタムフック
export const useAuth = () => useContext(AuthContext);