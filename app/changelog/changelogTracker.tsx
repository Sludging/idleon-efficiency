"use client";

import { useEffect } from "react";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

/**
 * Client component that marks changelogs as seen when the page is visited
 */
export default function ChangelogTracker() {
  const { markChangelogsSeen } = useAppDataStore(
    useShallow((state) => ({ markChangelogsSeen: state.markChangelogsSeen }))
  );

  useEffect(() => {
    // Mark all changelogs as seen when the page is loaded
    markChangelogsSeen();
  }, [markChangelogsSeen]);

  // This component doesn't render anything
  return null;
} 