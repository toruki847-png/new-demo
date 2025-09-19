'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

type Todo = {
  id: string;
  text: string;
};

const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // ToDoリストを取得
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
        }));
        setTodos(todosData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // ToDoを追加
  const addTodo = async () => {
    if (input.trim() === '' || !user) return;
    await addDoc(collection(db, 'todos'), {
      text: input,
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
    setInput('');
  };

  // ToDoを削除
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ToDoリスト</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded text-black"
          placeholder="新しいタスク"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          追加
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-2 bg-white rounded shadow mb-2"
          >
            <span className="text-gray-700">{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;