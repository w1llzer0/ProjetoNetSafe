
import React, { useState } from "react";
import NetSafeApp from "../components/NetSafeApp";

export default function App() {
  const [logado, setLogado] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = () => {
    if (email.includes("@")) {
      setLogado(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-700 text-white p-4">
        <h1 className="text-xl font-bold">NetSafe</h1>
        <p>Proteja seus direitos digitais</p>
      </header>
      <main className="p-4">
        {!logado ? (
          <div className="max-w-md mx-auto bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold mb-2">Login</h2>
            <input
              type="email"
              className="border p-2 w-full mb-2"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Entrar
            </button>
          </div>
        ) : (
          <NetSafeApp email={email} />
        )}
      </main>
    </div>
  );
}
