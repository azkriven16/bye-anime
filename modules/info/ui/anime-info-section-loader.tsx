import { motion } from "framer-motion";

export const AnimeInfoSectionLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative z-10 px-4 md:px-8 py-8 md:py-12">
        {/* Navigation skeleton */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-gray-700 rounded animate-pulse" />
            <span className="text-gray-600">•</span>
            <div className="h-4 w-8 bg-gray-700 rounded animate-pulse" />
            <span className="text-gray-600">•</span>
            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-7xl">
          {/* Poster skeleton */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <div className="w-48 sm:w-56 lg:w-full max-w-sm h-72 lg:h-96 bg-gray-700 rounded-lg animate-pulse mx-auto sm:mx-0" />
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="lg:col-span-6">
            <div className="space-y-4 md:space-y-6">
              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-8 md:h-10 lg:h-12 w-3/4 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 md:h-8 w-1/2 bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Badges skeleton */}
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <div className="h-6 w-12 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 w-8 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 w-6 bg-gray-700 rounded animate-pulse" />
                <div className="h-6 w-12 bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Buttons skeleton */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="h-12 w-full sm:w-32 bg-pink-600 rounded-full animate-pulse" />
                <div className="h-12 w-full sm:w-32 bg-gray-700 rounded-full animate-pulse" />
                <div className="h-12 w-full sm:w-24 bg-gray-700 rounded-full animate-pulse" />
              </div>

              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-16 bg-gray-600 rounded animate-pulse mt-2" />
              </div>

              {/* Additional info skeleton */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-700 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Info panel skeleton */}
          <div className="lg:col-span-3">
            <div className="space-y-3 md:space-y-4 bg-black bg-opacity-40 p-4 rounded-lg lg:bg-transparent lg:p-0">
              {/* Info items skeleton */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-600 rounded animate-pulse" />
                </div>
              ))}

              {/* Genres skeleton */}
              <div>
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse mb-2" />
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-6 w-16 bg-gray-700 rounded-full animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
