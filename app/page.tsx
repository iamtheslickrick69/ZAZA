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
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import AppMenuBar from "@/components/ui/app-menu-bar";
import { UniqueAccordion } from "@/components/ui/interactive-accordion";
import { TechStackScroll } from "@/components/ui/tech-stack-scroll";
import { SeamlessIntegrations } from "@/components/ui/seamless-integrations";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <AppMenuBar />
      <main>
        <HeroSectionAnimated />
        <PortfolioShowcase />
        <section id="showcase" className="relative">
          <SmartSitesShowcase />
        </section>
        <section className="w-full bg-background py-20 flex flex-col items-center justify-center transition-colors duration-300">
          <div className="w-full max-w-6xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-foreground">How We Work</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From strategy to victory, we're with you every step of the way.</p>
            </div>
            <div className="flex justify-center">
              <UniqueAccordion />
            </div>
          </div>
        </section>
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
