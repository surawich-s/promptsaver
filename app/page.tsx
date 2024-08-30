'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Prompt {
  id?: number;
  text: string;
  name: string;
  link: string;
}

export default function Component() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [newPrompt, setNewPrompt] = useState<Prompt>({ id: 0, text: '', name: '', link: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)

  useEffect(() => {
    // Load prompts from localStorage on component mount
    const storedPrompts = localStorage.getItem('prompts')
    if (storedPrompts) {
      setPrompts(JSON.parse(storedPrompts))
    }
  }, [])

  useEffect(() => {
    // Save prompts to localStorage whenever they change
    if (prompts.length > 0) {
      localStorage.setItem('prompts', JSON.stringify(prompts))
    }
  }, [prompts])

  const addPrompt = (e: React.FormEvent) => {
    e.preventDefault()
    const newPrompts: Prompt[] = [...prompts, { ...newPrompt, id: Date.now() }]
    setPrompts(newPrompts)
    localStorage.setItem('prompts', JSON.stringify(newPrompts))
    setNewPrompt({ text: '', name: '', link: '' })
  }

  const deletePrompt = (id: number) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id))
  }

  const editPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    setNewPrompt({ text: prompt.text, name: prompt.name, link: prompt.link })
  }

  const updatePrompt = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPrompt) {
      setPrompts(prompts.map(p => p.id === editingPrompt.id ? { ...newPrompt, id: p.id } : p))
      setNewPrompt({ text: '', name: '', link: '' })
      setEditingPrompt(null)
    }
  }

  const filteredPrompts = prompts.filter(prompt => 
    prompt.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prompt.link.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 dark:text-gray-200 dark:bg-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={editingPrompt ? updatePrompt : addPrompt} className="mb-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <div className="mb-4">
            <textarea
              placeholder="Enter your prompt..."
              className="w-full px-3 py-2 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
              rows={4}
              value={newPrompt.text}
              onChange={(e) => setNewPrompt({ ...newPrompt, text: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Prompt Name"
              className="flex-1 mr-2 px-3 py-2 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
              value={newPrompt.name}
              onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
            />
            <input
              type="url"
              placeholder="Prompt Link"
              className="flex-1 ml-2 px-3 py-2 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
              value={newPrompt.link}
              onChange={(e) => setNewPrompt({ ...newPrompt, link: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <PlusIcon className="inline-block w-5 h-5 mr-2" />
            {editingPrompt ? 'Update Prompt' : 'Add Prompt'}
          </button>
        </form>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPrompts.map((prompt) => (
              <li key={prompt.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{prompt.name || 'Unnamed Prompt'}</p>
                    <a href={prompt.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                      {new URL(prompt.link).hostname}
                    </a>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{prompt.text}</p>
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
                    <button 
                      onClick={() => editPrompt(prompt)}
                      className="mr-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Edit</span>
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deletePrompt(prompt.id!)}
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