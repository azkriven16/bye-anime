"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2, Play, Plus, Share } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { AnimeInfo } from "../types";
import { AnimeInfoSectionError } from "./anime-info-section-error";
import { AnimeInfoSectionLoader } from "./anime-info-section-loader";
import Link from "next/link";

interface AnimeInfoSectionProps {
  data: AnimeInfo | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const AnimeInfoSection = ({
  data,
  isLoading,
  isError,
  refetch,
}: AnimeInfoSectionProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [shareStatus, setShareStatus] = useState<"idle" | "copying" | "copied">(
    "idle"
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleShare = async () => {
    setShareStatus("copying");
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");
      toast("Link copied to clipboard");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch (err) {
      setShareStatus("idle");
      console.error("Failed to copy URL:", err);
    }
  };

  if (!isMounted) {
    return <AnimeInfoSectionLoader />;
  }

  if (isLoading) {
    return <AnimeInfoSectionLoader />;
  }

  if (isError || !data) {
    return <AnimeInfoSectionError refetch={refetch} />;
  }

  const { info, moreInfo } = data;

  const truncateDescription = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const shouldShowMoreButton =
    info.description && info.description.length > 200;

  // Helper function to replace "?" with "Unknown"
  const formatValue = (value: string | undefined) => {
    if (!value || value === "?") return "Unknown";
    return value;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-white relative overflow-hidden px-4 md:px-8 py-8 md:py-12"
    >
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${info.poster})`,
          filter: "blur(8px)",
        }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 px-4 md:px-8 py-8 md:py-12"
      >
        <motion.nav
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="text-white">
              Home
            </Link>
            <span>•</span>
            <span className="text-white">TV</span>
            <span>•</span>
            <span>{info.name}</span>
          </div>
        </motion.nav>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-7xl">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={info.poster || "/placeholder.svg"}
                alt={info.name}
                className="w-48 sm:w-56 lg:w-full max-w-sm rounded-lg shadow-2xl mx-auto sm:mx-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="space-y-4 md:space-y-6">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
              >
                {info.name}
              </motion.h1>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 md:gap-3 flex-wrap"
              >
                <Badge
                  className="bg-gray-700 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-medium"
                  title="Content rating - indicates appropriate age group"
                >
                  {formatValue(info.stats.rating)}
                </Badge>
                <Badge
                  className="bg-gray-700 text-white px-2 md:px-3 py-1 text-xs md:text-sm font-medium"
                  title="High Definition video quality"
                >
                  HD
                </Badge>
                <div className="flex items-center gap-1">
                  <div
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold"
                    title="MyAnimeList score - community rating out of 10"
                  >
                    {formatValue(moreInfo.malscore)}
                  </div>
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-sm text-gray-300">
                    {formatValue(moreInfo.malscore)}
                  </span>
                </div>
                <span className="text-sm text-gray-300">•</span>
                <span
                  className="text-sm text-gray-300"
                  title="Content type - TV series, movie, OVA, etc."
                >
                  {formatValue(info.stats.type)}
                </span>
                <span className="text-sm text-gray-300">•</span>
                <span
                  className="text-sm text-gray-300"
                  title="Average episode duration"
                >
                  {formatValue(info.stats.duration)}
                </span>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={`/watch/${info.id}`}>
                    <Button
                      size="lg"
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full w-full sm:w-auto transition-all duration-200"
                    >
                      <Play className="w-4 md:w-5 h-4 md:h-5 mr-2 fill-current" />
                      Watch now
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleShare}
                    disabled={shareStatus === "copying"}
                    className="border-2 border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-full bg-transparent w-full sm:w-auto transition-all duration-200"
                  >
                    <AnimatePresence mode="wait">
                      {shareStatus === "copying" && (
                        <motion.div
                          key="copying"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Loader2 className="w-4 md:w-5 h-4 md:h-5 mr-2 animate-spin" />
                        </motion.div>
                      )}
                      {shareStatus === "copied" && (
                        <motion.div
                          key="copied"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                        </motion.div>
                      )}
                      {shareStatus === "idle" && (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Share className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {shareStatus === "copied"
                      ? "Copied!"
                      : shareStatus === "copying"
                      ? "Copying..."
                      : "Share"}
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={isDescriptionExpanded ? "expanded" : "collapsed"}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-300 leading-relaxed text-sm md:text-base"
                    >
                      {isDescriptionExpanded
                        ? info.description
                        : truncateDescription(info.description)}
                    </motion.p>
                  </AnimatePresence>
                  {shouldShowMoreButton && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                    >
                      {isDescriptionExpanded ? "Show less" : "More"}
                    </motion.button>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-gray-300 text-xs md:text-sm">
                    <span className="font-medium">HiAnime</span> is the best
                    site to watch{" "}
                    <span className="font-medium">{info.name}</span> SUB online,
                    or you can even watch{" "}
                    <span className="font-medium">{info.name}</span> DUB in HD
                    quality. You can also find{" "}
                    <span className="font-medium">{moreInfo.studios}</span>{" "}
                    anime on HiAnime website.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="lg:col-span-3"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="space-y-3 md:space-y-4 text-xs md:text-sm bg-black bg-opacity-40 p-4 rounded-lg lg:bg-transparent lg:p-0"
            >
              <div>
                <span className="text-gray-400">Japanese: </span>
                <span className="text-white" title="Original Japanese title">
                  {formatValue(moreInfo.japanese)}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Aired: </span>
                <span className="text-white" title="Original broadcast dates">
                  {moreInfo.aired
                    ? moreInfo.aired.replace(" to ?", " to Unknown")
                    : "Unknown"}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Premiered: </span>
                <span
                  className="text-white"
                  title="Season and year when first aired"
                >
                  {formatValue(moreInfo.premiered)}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Duration: </span>
                <span className="text-white" title="Average episode length">
                  {formatValue(info.stats.duration)}
                </span>
              </div>

              <div>
                <span className="text-gray-400">Status: </span>
                <span className="text-white" title="Current airing status">
                  {formatValue(moreInfo.status)}
                </span>
              </div>

              <div>
                <span className="text-gray-400">MAL Score: </span>
                <span
                  className="text-white"
                  title="MyAnimeList community rating - average score from user reviews"
                >
                  {formatValue(moreInfo.malscore)}
                </span>
              </div>

              <div>
                <span
                  className="text-gray-400"
                  title="Story categories and themes"
                >
                  Genres:{" "}
                </span>
                <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
                  {moreInfo.genres.slice(0, 4).map((genre, index) => (
                    <motion.div
                      key={genre}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-gray-700 text-white hover:bg-gray-600 text-xs px-2 md:px-3 py-1 rounded-full transition-colors"
                      >
                        {genre}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <span
                  className="text-gray-400"
                  title="Animation studio responsible for production"
                >
                  Studios:{" "}
                </span>
                <span className="text-white">
                  {formatValue(moreInfo.studios)}
                </span>
              </div>

              <div>
                <span
                  className="text-gray-400"
                  title="Companies involved in funding and production"
                >
                  Producers:{" "}
                </span>
                <span className="text-white break-words">
                  {moreInfo.producers && moreInfo.producers.length > 0
                    ? moreInfo.producers.join(", ")
                    : "Unknown"}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
