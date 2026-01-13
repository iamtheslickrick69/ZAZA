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
import ColorChangeCards from "@/components/ui/color-change-card";
import { HaestusFAQ } from "@/components/ui/faq-tabs";
import { PortfolioShowcase } from "@/components/PortfolioShowcase";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <DockNav />
      <main>
        <HeroSectionAnimated />
        <ServiceCards />
        <section className="w-full bg-[#0a0a0a] py-20 flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <span
              className="text-sm font-medium tracking-wider uppercase mb-4 block"
              style={{
                background: 'linear-gradient(90deg, #006AAA, #C00008)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Seamless Integrations
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Connect Everything
            </h2>
            <p className="max-w-2xl text-lg text-neutral-400 mx-auto px-4">
              Your Smart Site integrates with any tool, platform, or API your business needs.
            </p>
          </div>
          <DatabaseWithRestApi
            circleText="API"
            title="We connect to any API you need"
            buttonTexts={{ first: "Haestus", second: "Your Stack" }}
            badgeTexts={{ first: "GET", second: "POST", third: "PUT", fourth: "DELETE" }}
            lightColor="#006AAA"
          />
        </section>
        <section id="showcase" className="relative">
          <SmartSitesShowcase />
        </section>
        <TransformationBanner />
        <section className="min-h-screen py-20">
          <AnimatedGradientDemo />
        </section>
        <section className="bg-neutral-900">
          <ColorChangeCards />
        </section>
        <HowItWorks />
        <section className="min-h-screen">
          <InteractiveSelector />
        </section>
        <LetsWorkTogether />
        <PortfolioShowcase />
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
