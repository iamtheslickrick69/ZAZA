import { HeroSectionAnimated } from "@/components/ui/hero-section";
import { AnimatedGradientDemo } from "@/components/AnimatedGradientDemo";
import AnimatedCardStack from "@/components/AnimatedCardStack";
import { MinimalFooter } from "@/components/ui/minimal-footer";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";
import { ScrollProgress } from "@/components/ScrollProgress";
import SmartSitesShowcase from "@/components/ui/spatial-product-showcase";
import { HaestusFAQ } from "@/components/ui/faq-tabs";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { BottomNavBar } from "@/components/ui/bottom-nav-bar";
import { UniqueAccordion } from "@/components/ui/interactive-accordion";
import { TechStackScroll } from "@/components/ui/tech-stack-scroll";
import { TextScrambleSection } from "@/components/ui/text-scramble-section";
import { SeamlessIntegrations } from "@/components/ui/seamless-integrations";
import { HeroBranding } from "@/components/ui/hero-branding";
import { HowWeWorkShowcase } from "@/components/ui/how-we-work-showcase";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { Testimonial } from "@/components/ui/clean-testimonial";
import { CTAButton } from "@/components/ui/cta-button";
import ClientBeforeAfter from "@/components/ui/client-before-after";
import { LaunchTimeline } from "@/components/ui/launch-timeline";
import { AIFeaturesGrid } from "@/components/ui/ai-features-grid";
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <BottomNavBar stickyTop={true} />
      <main>
        <section id="home" className="relative">
          <HeroBranding />
          <HeroSectionAnimated />
          <ClientBeforeAfter />
          <LaunchTimeline />
          <StackedCircularFooter />
        </section>
        <section id="showcase" className="relative">
          <SmartSitesShowcase />
          <AIFeaturesGrid />
        </section>
        <section id="about">
          <HowWeWorkShowcase />
        </section>
        <TechStackScroll />
        <TextScrambleSection />
        <ProjectShowcase />
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <CTAButton />
          </div>
        </section>
        <section className="min-h-screen py-20">
          <AnimatedGradientDemo />
        </section>
        <section id="contact">
          <LetsWorkTogether />
        </section>
        <section id="book">
          <SeamlessIntegrations />
        </section>
        <section className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Infinite Card Stack</h2>
          <AnimatedCardStack />
        </section>
        <section className="bg-background">
          <Testimonial />
        </section>
        <HaestusFAQ />
      </main>
      <MinimalFooter />
    </>
  );
}
