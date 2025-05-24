'use client'
import React from 'react'

import { useState } from 'react'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', { email, password })
    // Acá harías la petición al backend
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form onSubmit={manejarSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Iniciar sesión</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </button>

        <div className="text-center mt-4 text-sm text-gray-600">
          ¿No tenés cuenta? <a href="/register" className="text-blue-600 hover:underline">Registrate</a>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;