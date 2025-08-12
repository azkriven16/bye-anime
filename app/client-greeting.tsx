"use client";
// <-- hooks can only be used in client components
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
export function ClientGreeting() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.home.queryOptions());
  console.log(data);
  return <div>{JSON.stringify(data)}</div>;
}
