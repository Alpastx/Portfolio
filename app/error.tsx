"use client";

import { useEffect } from "react";
import { PageFrame } from "@/components/page-frame";
import { PageTitle } from "@/components/section-header";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageFrame>
      {/* TODO: owner copy */}
      <PageTitle title="Something went wrong" />
      <p className="text-[14.5px] leading-[1.75] text-muted-foreground">This page could not be loaded.</p>
      <button
        type="button"
        onClick={() => retry()}
        className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Try again
      </button>
    </PageFrame>
  );
}
