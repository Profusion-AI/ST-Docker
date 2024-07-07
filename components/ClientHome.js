'use client';

import React from 'react';
import Link from 'next/link';

const stories = [
  { id: 1, title: "The Enchanted Forest", genre: "Fantasy" },
  { id: 2, title: "The Galactic Odyssey", genre: "Sci-Fi" },
  { id: 3, title: "The Haunted Mansion", genre: "Mystery" },
];

const StoryCard = ({ story }) => (
  <Link href={`/story/${story.id}`} className="block transform transition-transform hover:scale-105">
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">{story.title}</h3>
        <p className="text-gray-400">{story.genre}</p>
      </div>
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center tracking-tight">StoryTaxi</h1>
      </header>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-yellow-500">Welcome to Your Next Adventure</h2>
          <p className="text-xl text-gray-300">Your journey into interactive storytelling begins here.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </main>
    </div>
  );
}