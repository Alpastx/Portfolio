import Link from "next/link";
import { PageFrame } from "@/components/page-frame";
import { PageTitle } from "@/components/section-header";

export default function NotFound() {
  return (
    <PageFrame>
      {/* TODO: owner copy */}
      <PageTitle title="Not found" />
      <p className="text-[14.5px] leading-[1.75] text-muted-foreground">This page is not available.</p>
      <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
        Home
      </Link>
    </PageFrame>
  );
}
