import HeroSection from "@/components/HeroSection";
import { AnimatedGradientDemo } from "@/components/AnimatedGradientDemo";
import InteractiveSelector from "@/components/ui/interactive-selector";
import AnimatedCardStack from "@/components/AnimatedCardStack";
import { BackgroundBoxesDemo } from "@/components/BackgroundBoxesDemo";
import { MinimalFooter } from "@/components/ui/minimal-footer";
import { DockNav } from "@/components/DockNav";

export default function Home() {
  return (
    <>
      <DockNav />
      <main className="min-h-screen">
        <HeroSection />
        <section className="min-h-screen py-20">
          <AnimatedGradientDemo />
        </section>
        <section className="min-h-screen">
          <InteractiveSelector />
        </section>
        <section className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Infinite Card Stack</h2>
          <AnimatedCardStack />
        </section>
        <section className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <BackgroundBoxesDemo />
        </section>
      </main>
      <MinimalFooter />
    </>
  );
}
