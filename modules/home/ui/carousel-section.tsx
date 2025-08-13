import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SpotlightAnime } from "../types";

interface CarouselSectionProps {
  data: SpotlightAnime[];
  isLoading: boolean;
  isError: boolean;
}

export const CarouselSection = ({
  data,
  isLoading,
  isError,
}: CarouselSectionProps) => {
  return (
    <section className="max-w-[100vw] mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((anime, index) => (
            <CarouselItem key={anime.id} className="relative h-[100vh]">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={anime.poster}
                  alt={anime.name}
                  className="w-full h-full object-cover"
                  // onError={(e) => {
                  //   e.target.src =
                  //     "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTM2NiIgaGVpZ2h0PSI3NjgiIHZpZXdCb3g9IjAgMCAxMzY2IDc2OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEzNjYiIGhlaWdodD0iNzY4IiBmaWxsPSIjMjEyMTIxIi8+Cjx0ZXh0IHg9IjY4MyIgeT0iNDA0IiBmaWxsPSIjNzEzRjdGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0Ij5BbmltZSBQb3N0ZXI8L3RleHQ+Cjwvc3ZnPgo=";
                  // }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex items-center px-8 md:px-16">
                <div className="max-w-2xl text-white">
                  {/* Rank Badge */}
                  <div className="flex items-center mb-4">
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">
                      #{anime.rank}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <span className="bg-gray-700 px-2 py-1 rounded">
                        {anime.type}
                      </span>
                      {anime.otherInfo.map((info, i) => (
                        <span key={i} className="bg-gray-700 px-2 py-1 rounded">
                          {info}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {anime.name}
                  </h1>

                  {/* Japanese Title */}
                  {anime.jname !== anime.name && (
                    <h2 className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
                      {anime.jname}
                    </h2>
                  )}

                  {/* Episode Info */}
                  <div className="flex items-center space-x-4 mb-6 text-lg">
                    {anime.episodes.sub && (
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        {anime.episodes.sub} Episodes (Sub)
                      </span>
                    )}
                    {anime.episodes.dub && (
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        {anime.episodes.dub} Episodes (Dub)
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed line-clamp-4 max-w-3xl">
                    {anime.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4">
                    <button className="bg-white text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      Play
                    </button>
                    <button className="bg-gray-600 bg-opacity-70 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all flex items-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      My List
                    </button>
                    <button className="bg-gray-600 bg-opacity-70 text-white p-3 rounded-full hover:bg-opacity-90 transition-all">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Maturity Rating (if available) */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-bold">
                  HD
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
