import MediaCard from './MediaCard';

export default function MediaGrid({ media }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
      {media.map(item => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
}
