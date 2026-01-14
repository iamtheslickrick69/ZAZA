import { HeroSectionAnimated } from "@/components/ui/hero-section";
import { AnimatedGradientDemo } from "@/components/AnimatedGradientDemo";
import AnimatedCardStack from "@/components/AnimatedCardStack";
import { BackgroundBoxesDemo } from "@/components/BackgroundBoxesDemo";
import { MinimalFooter } from "@/components/ui/minimal-footer";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";
import { ScrollProgress } from "@/components/ScrollProgress";
import SmartSitesShowcase from "@/components/ui/spatial-product-showcase";
import { TransformationBanner } from "@/components/TransformationBanner";
import ColorChangeCards from "@/components/ui/color-change-card";
import { HaestusFAQ } from "@/components/ui/faq-tabs";
import { HowItWorks } from "@/components/HowItWorks";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import AppMenuBar from "@/components/ui/app-menu-bar";
import { UniqueAccordion } from "@/components/ui/interactive-accordion";
import { TechStackScroll } from "@/components/ui/tech-stack-scroll";
import { SeamlessIntegrations } from "@/components/ui/seamless-integrations";
import { HeroBranding } from "@/components/ui/hero-branding";
import { HowWeWorkShowcase } from "@/components/ui/how-we-work-showcase";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <AppMenuBar />
      <main>
        <HeroBranding />
        <HeroSectionAnimated />
        <StackedCircularFooter />
        <section id="showcase" className="relative">
          <SmartSitesShowcase />
        </section>
        <HowWeWorkShowcase />
        <TechStackScroll />
        <ProjectShowcase />
        <TransformationBanner />
        <section className="min-h-screen py-20">
          <AnimatedGradientDemo />
        </section>
        <section className="bg-background transition-colors duration-300">
          <ColorChangeCards />
        </section>
        <HowItWorks />
        <LetsWorkTogether />
        <SeamlessIntegrations />
        <section className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Infinite Card Stack</h2>
          <AnimatedCardStack />
        </section>
        <section className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <BackgroundBoxesDemo />
        </section>
        <HaestusFAQ />
      </main>
      <MinimalFooter />
    </>
  );
}
