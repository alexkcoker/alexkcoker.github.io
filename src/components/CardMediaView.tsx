import { asset } from '@/lib/asset';
import type { CardMedia } from '@/data/content';
import Slideshow from './Slideshow';
import VideoPlayer from './VideoPlayer';

/** Renders the media column of a card: video embed, image, or slideshow. */
export default function CardMediaView({
  media,
  className = '',
  featured = false,
}: {
  media: CardMedia;
  className?: string;
  featured?: boolean;
}) {
  if (media.type === 'video') {
    return (
      <div className={`card-media ${className}`}>
        <iframe
          src={media.src}
          title={media.title}
          allowFullScreen
          className="h-[200px] w-full rounded-sm border-none"
        />
      </div>
    );
  }

  if (media.type === 'slideshow') {
    return (
      <div className={`card-media ${className}`}>
        <Slideshow images={media.images} feature={featured} />
      </div>
    );
  }

  if (media.type === 'showcase') {
    return (
      <div className={`card-media ${className}`}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {media.video && (
            <div>
              <VideoPlayer src={media.video.src} poster={media.video.poster} />
              <p className="mt-1.5 text-sm text-text-secondary">
                Autonomous A → B navigation (sim)
              </p>
            </div>
          )}
          <div>
            <Slideshow images={media.images} />
            <p className="mt-1.5 text-sm text-text-secondary">
              Results across obstacle courses
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-media group-hover:[&_img]:scale-[1.04] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(media.src)}
        alt={media.alt}
        className="w-full rounded-sm transition-transform duration-medium ease"
      />
    </div>
  );
}
