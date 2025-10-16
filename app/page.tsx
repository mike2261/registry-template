import * as React from "react";
import { QuizzesGame } from "@/registry/new-york/blocks/quizzes-game/quizzes-game";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Quizzes Component
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-[400px] relative">
            <QuizzesGame />
          </div>
        </div>
      </main>
    </div>
  );
}
