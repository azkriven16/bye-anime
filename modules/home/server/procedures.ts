import { baseProcedure } from "@/trpc/init";

export const homeRouter = baseProcedure.query(async () => {
  try {
    const response = await fetch(
      "https://hianime-ruby.vercel.app/api/v2/hianime/home"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching HiAnime data:", error);

    // Return error response or fallback data
    return {
      success: false,
      error: "Failed to fetch anime data",
      data: null,
    };
  }
});
