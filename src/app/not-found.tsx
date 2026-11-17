import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-24 sm:px-8">
        <p className="text-sm text-muted">404</p>
        <h1 className="display mt-3 text-[clamp(3.5rem,11vw,9rem)]">Page not found.</h1>
        <Link href="/" className="mt-8 inline-block bg-accent px-2 py-1 text-lg">
          Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
