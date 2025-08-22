"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <main className="flex items-center justify-center h-screen w-full px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl flex-col items-center gap-4"
      >
        <Input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-16 text-xl px-6 rounded-2xl shadow-lg"
        />
        <Button
          type="submit"
          size="lg"
          className="rounded-2xl px-8 py-6 text-lg"
        >
          Search
        </Button>
      </form>
    </main>
  );
}
