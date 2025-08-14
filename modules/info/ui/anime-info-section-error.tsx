"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { AlertCircleIcon } from "lucide-react";

export const AnimeInfoSectionError = ({
  refetch,
}: {
  refetch?: () => void;
}) => {
  const handleClick = () => {
    if (refetch) {
      refetch();
    } else {
      window.location.reload();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-red-900/20 via-black to-gray-900 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-6 max-w-md mx-auto px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <AlertCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-400 mb-6">
            We couldn't load the anime information. Please try again.
          </p>
          <Button
            onClick={handleClick}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full"
          >
            Try Again
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
