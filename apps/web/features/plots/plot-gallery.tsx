import Image from "next/image";

interface PlotGalleryProps {
  images: string[];
  title: string;
}

export function PlotGallery({ images, title }: PlotGalleryProps) {
  const galleryLabel = `Amafoto ${images.length} ya ${title}`;

  return (
    <section aria-label={galleryLabel} className="overflow-hidden rounded-2xl bg-[var(--bg-strong-950)]">
      <div className="flex snap-x snap-mandatory overflow-x-auto md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((imageUrl, index) => (
          <div key={imageUrl} className="relative aspect-[4/3] w-full shrink-0 snap-center">
            <Image
              fill
              priority={index === 0}
              sizes="100vw"
              src={imageUrl}
              alt={`${title} - ifoto ${index + 1}`}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="hidden h-[30rem] grid-cols-[1.35fr_0.65fr] gap-1.5 md:grid">
        <div className="relative min-h-0">
          <Image fill priority sizes="(max-width: 1024px) 60vw, 720px" src={images[0]} alt={`${title} - ifoto 1`} className="object-cover" />
        </div>
        <div className="grid min-h-0 grid-rows-2 gap-1.5">
          {images.slice(1, 3).map((imageUrl, index) => (
            <div key={imageUrl} className="relative min-h-0">
              <Image
                fill
                sizes="(max-width: 1024px) 40vw, 360px"
                src={imageUrl}
                alt={`${title} - ifoto ${index + 2}`}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-white">
        <span>Amafoto</span>
        <span>{images.length} yose</span>
      </div>
    </section>
  );
}
