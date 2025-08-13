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
  data = [],
  isLoading,
  isError,
}: CarouselSectionProps) => {
  // Handle loading state
  if (isLoading) {
    return (
      <section className="max-w-[100vw] mx-auto h-[100vh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <section className="max-w-[100vw] mx-auto h-[100vh] flex items-center justify-center bg-black">
        <div className="text-red-500 text-xl">Error loading content</div>
      </section>
    );
  }

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <section className="max-w-[100vw] mx-auto h-[100vh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">No content available</div>
      </section>
    );
  }

  return (
    <section className="max-w-[100vw] mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          // dragFree: true,
          containScroll: "trimSnaps",
        }}
        plugins={[
          Autoplay({
            delay: 4000, // Increased delay for better mobile experience
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((anime, index) => (
            <CarouselItem
              key={anime.id}
              className="relative h-[90vh] md:h-[100vh]"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={anime.poster || "/placeholder.svg"}
                  alt={anime.name}
                  className="w-full h-full object-center object-cover"
                />
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex items-end md:items-center px-4 md:px-8 lg:px-16 pb-20 md:pb-0">
                <div className="max-w-full md:max-w-2xl text-white w-full">
                  {/* Rank Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-4 gap-2 sm:gap-0">
                    <div className="bg-red-600 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold mr-0 sm:mr-4 w-fit">
                      #{anime.rank}
                    </div>
                    <div className="flex items-center flex-wrap gap-1 md:gap-2 text-xs md:text-sm text-gray-300">
                      <span className="bg-gray-700 px-2 py-1 rounded text-xs">
                        {anime.type}
                      </span>
                      {anime.otherInfo.slice(0, 2).map((info, i) => (
                        <span
                          key={i}
                          className="bg-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {info}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                    {anime.name}
                  </h1>

                  {/* Japanese Title */}
                  {anime.jname !== anime.name && (
                    <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 mb-2 md:mb-4 font-light">
                      {anime.jname}
                    </h2>
                  )}

                  {/* Episode Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 md:mb-6 text-sm md:text-lg">
                    {anime.episodes.sub && (
                      <span className="flex items-center">
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full mr-2"></span>
                        <span className="text-xs md:text-base">
                          {anime.episodes.sub} Episodes (Sub)
                        </span>
                      </span>
                    )}
                    {anime.episodes.dub && (
                      <span className="flex items-center">
                        <span className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-xs md:text-base">
                          {anime.episodes.dub} Episodes (Dub)
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Description - Hidden on small mobile, shown on larger screens */}
                  <p className="hidden sm:block text-sm md:text-lg lg:text-xl text-gray-200 mb-4 md:mb-8 leading-relaxed line-clamp-2 md:line-clamp-4 max-w-3xl">
                    {anime.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 md:gap-4">
                    <button className="bg-white text-black px-4 md:px-8 py-2 md:py-3 rounded-md md:rounded-lg font-bold text-sm md:text-lg hover:bg-gray-200 transition-all flex items-center flex-1 sm:flex-none justify-center">
                      <svg
                        className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                      Play
                    </button>
                    <button className="bg-gray-600 bg-opacity-70 text-white px-3 md:px-8 py-2 md:py-3 rounded-md md:rounded-lg font-bold text-sm md:text-lg hover:bg-opacity-90 transition-all flex items-center">
                      <svg
                        className="w-4 h-4 md:w-6 md:h-6 mr-1 md:mr-2"
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
                      <span className="hidden sm:inline">My List</span>
                      <span className="sm:hidden">List</span>
                    </button>
                    <button className="bg-gray-600 bg-opacity-70 text-white p-2 md:p-3 rounded-full hover:bg-opacity-90 transition-all">
                      <svg
                        className="w-4 h-4 md:w-6 md:h-6"
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

              {/* Maturity Rating */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
                <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs md:text-sm font-bold">
                  HD
                </div>
              </div>

              {/* Mobile slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
                <div className="flex space-x-2">
                  {data.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i === index ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
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
