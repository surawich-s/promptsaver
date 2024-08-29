'use client'

import { useState } from 'react'
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function Component() {
  const [prompts, setPrompts] = useState([])
  const [newPrompt, setNewPrompt] = useState({ text: '', name: '', type: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const addPrompt = (e) => {
    e.preventDefault()
    setPrompts([...prompts, { ...newPrompt, id: Date.now() }])
    setNewPrompt({ text: '', name: '', type: '' })
  }

  const deletePrompt = (id) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id))
  }

  const filteredPrompts = prompts.filter(prompt => 
    prompt.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="relative flex-grow max-w-xl">
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Login with Google
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={addPrompt} className="mb-8 bg-white shadow sm:rounded-lg p-6">
          <div className="mb-4">
            <textarea
              placeholder="Enter your prompt..."
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              value={newPrompt.text}
              onChange={(e) => setNewPrompt({ ...newPrompt, text: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Prompt Name"
              className="flex-1 mr-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={newPrompt.name}
              onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Prompt Type"
              className="flex-1 ml-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={newPrompt.type}
              onChange={(e) => setNewPrompt({ ...newPrompt, type: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <PlusIcon className="inline-block w-5 h-5 mr-2" />
            Add Prompt
          </button>
        </form>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredPrompts.map((prompt) => (
              <li key={prompt.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{prompt.name || 'Unnamed Prompt'}</p>
                    <p className="text-sm text-gray-500">{prompt.type || 'No Type'}</p>
                    <p className="mt-1 text-sm text-gray-600">{prompt.text}</p>
                  </div>
                  <div className="flex ml-4">
                    <button
                      onClick={() => navigator.clipboard.writeText(prompt.text)}
                      className="mr-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Copy</span>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                    </button>
                    <button className="mr-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Edit</span>
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deletePrompt(prompt.id)}
                      className="p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Delete</span>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}