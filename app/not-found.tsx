import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <section className="bg-paper pb-24 pt-[calc(var(--nav-h)+5rem)] md:pb-36">
      <div className="container-fsp">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="font-display mt-8 text-mega">
          Page not
          <br />
          found<span className="text-orange">.</span>
        </h1>
        <p className="mt-8 max-w-md text-lede text-muted">The page you are looking for does not exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="outline">Join FSP</Button>
        </div>
      </div>
    </section>
  );
}
