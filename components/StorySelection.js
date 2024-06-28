import React from 'react';
import Link from 'next/link';

const stories = [
  { id: 1, title: "The Enchanted Forest", genre: "Fantasy" },
  { id: 2, title: "The Galactic Odyssey", genre: "Sci-Fi" },
  { id: 3, title: "The Haunted Mansion", genre: "Mystery" },
];

const StorySelection = () => {
  return (
    <div>
      <h2>Choose Your Adventure</h2>
      <ul>
        {stories.map((story) => (
          <li key={story.id}>
            <Link href={`/story/${story.id}`}>
  <h3>{story.title}</h3>
  <p>Genre: {story.genre}</p>
</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorySelection;