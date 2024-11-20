"use client";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="animate-spin w-12 h-12 border-4 border-grey-200 border-t-blue-500 rounded-full" />
    </div>
  );
}
