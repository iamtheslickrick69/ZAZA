import { HeroSectionAnimated } from "@/components/ui/hero-section";
import { AnimatedGradientDemo } from "@/components/AnimatedGradientDemo";
import InteractiveSelector from "@/components/ui/interactive-selector";
import AnimatedCardStack from "@/components/AnimatedCardStack";
import { BackgroundBoxesDemo } from "@/components/BackgroundBoxesDemo";
import { MinimalFooter } from "@/components/ui/minimal-footer";
import { DockNav } from "@/components/DockNav";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";
import { ScrollProgress } from "@/components/ScrollProgress";
import SmartSitesShowcase from "@/components/ui/spatial-product-showcase";
import { ServiceCards } from "@/components/ServiceCards";
import { TransformationBanner } from "@/components/TransformationBanner";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <DockNav />
      <main>
        <HeroSectionAnimated />
        <ServiceCards />
        <section id="showcase" className="relative">
          <SmartSitesShowcase />
        </section>
        <TransformationBanner />
        <section className="min-h-screen py-20">
          <AnimatedGradientDemo />
        </section>
        <section className="min-h-screen">
          <InteractiveSelector />
        </section>
        <LetsWorkTogether />
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
