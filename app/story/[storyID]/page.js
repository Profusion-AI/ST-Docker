import StoryDevelopment from '@/components/StoryDevelopment';

export default function StoryPage({ params }) {
  return (
    <div>
      <StoryDevelopment storyId={params.storyID} />
    </div>
  );
}