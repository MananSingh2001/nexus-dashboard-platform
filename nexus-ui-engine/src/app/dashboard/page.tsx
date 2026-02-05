"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchWidgets } from "@/store/slices/widgetSlice";
import { WidgetLoader } from "@/components/widgets/WidgetLoader";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.widgets);

  useEffect(() => {
    // In production, you'd get the role from your OIDC/Keycloak token
    dispatch(fetchWidgets("ADMIN"));
  }, [dispatch]);

  if (status === "loading") return <div>Synchronizing Dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Nexus Engine Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((widget) => (
          <WidgetLoader key={widget.id} manifest={widget} />
        ))}
      </div>
    </div>
  );
}
