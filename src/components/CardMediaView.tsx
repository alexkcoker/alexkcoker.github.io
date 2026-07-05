import { asset } from '@/lib/asset';
import type { CardMedia } from '@/data/content';
import Slideshow from './Slideshow';
import VideoPlayer from './VideoPlayer';
import SyncedVideos from './SyncedVideos';

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

  if (media.type === 'segments') {
    return (
      <div className={`card-media flex flex-col gap-10 ${className}`}>
        {media.segments.map((seg) => (
          <div key={seg.heading}>
            <h4 className="border-l-2 border-accent pl-3 text-base font-semibold text-text-primary">
              {seg.heading}
            </h4>
            {seg.body && (
              <p className="mb-3 mt-2 max-w-prose text-text-secondary">
                {seg.body}
              </p>
            )}
            {!seg.body && <div className="mb-3" />}

            {seg.synced ? (
              <SyncedVideos
                left={seg.synced.left}
                right={seg.synced.right}
                caption={seg.synced.caption}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {seg.video && (
                  <figure>
                    <VideoPlayer src={seg.video.src} poster={seg.video.poster} />
                    {seg.video.caption && (
                      <figcaption className="mt-1.5 text-sm text-text-secondary">
                        {seg.video.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {seg.image && (
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(seg.image.src)}
                      alt={seg.image.alt}
                      className="w-full rounded-sm"
                    />
                    {seg.image.caption && (
                      <figcaption className="mt-1.5 text-sm text-text-secondary">
                        {seg.image.caption}
                      </figcaption>
                    )}
                  </figure>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (media.type === 'showcase') {
    return (
      <div className={`card-media ${className}`}>
        {media.placeholder && (
          <div className="mb-4 flex aspect-video w-full items-center justify-center rounded-sm border border-dashed border-border bg-black/20 px-6 text-center text-sm text-text-secondary">
            {media.placeholder}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {media.video && (
            <div>
              <VideoPlayer src={media.video.src} poster={media.video.poster} />
              {media.videoCaption && (
                <p className="mt-1.5 text-sm text-text-secondary">
                  {media.videoCaption}
                </p>
              )}
            </div>
          )}
          <div>
            <Slideshow images={media.images} />
            {media.imagesCaption && (
              <p className="mt-1.5 text-sm text-text-secondary">
                {media.imagesCaption}
              </p>
            )}
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
