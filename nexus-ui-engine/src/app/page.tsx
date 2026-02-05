"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchWidgets } from "@/store/slices/widgetSlice";
import { WidgetLoader } from "@/components/widgets/WidgetLoader";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  // Accessing the state you refactored for better reliability
  const { items, status, error } = useSelector(
    (state: RootState) => state.widgets,
  );

  useEffect(() => {
    // Fetching widgets from your Spring Boot BFF
    dispatch(fetchWidgets("ADMIN"));
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Nexus-UI Engine
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Enterprise Micro-frontend Registry
            </p>
          </div>
          <div className="px-4 py-2 bg-white shadow-sm rounded-full border text-sm font-medium text-slate-500">
            Status: {status === "loading" ? "🔄 Syncing..." : "✅ Connected"}
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            <strong>Engine Error:</strong> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((widget) => (
            <WidgetLoader key={widget.id} manifest={widget} />
          ))}
        </div>

        {items.length === 0 && status !== "loading" && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400">
              No widgets found in PostgreSQL registry.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
