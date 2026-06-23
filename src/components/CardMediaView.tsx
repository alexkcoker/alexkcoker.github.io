import { asset } from '@/lib/asset';
import type { CardMedia } from '@/data/content';
import Slideshow from './Slideshow';

/** Renders the media column of a card: video embed, image, or slideshow. */
export default function CardMediaView({
  media,
  className = '',
}: {
  media: CardMedia;
  className?: string;
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
        <Slideshow images={media.images} />
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
