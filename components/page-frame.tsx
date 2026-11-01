export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="content"
      tabIndex={-1}
      className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col gap-6 px-4 pt-24 pb-28 sm:gap-8 sm:px-6 sm:pt-28"
    >
      {children}
    </main>
  );
}
