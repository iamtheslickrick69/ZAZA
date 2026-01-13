'use client';

import { IntegrationShowcase, Integration } from '@/components/ui/integration-showcase';
import { DockNav } from '@/components/DockNav';
import { MinimalFooter } from '@/components/ui/minimal-footer';

const integrationsData: Integration[] = [
  {
    name: 'OpenAI',
    description: 'GPT-4, DALL-E, Whisper and more AI models.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg',
  },
  {
    name: 'Anthropic',
    description: 'Claude AI for intelligent conversations.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/anthropic-2.svg',
  },
  {
    name: 'Stripe',
    description: 'Payment processing and subscriptions.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg',
  },
  {
    name: 'Supabase',
    description: 'Database, auth, and real-time subscriptions.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/supabase-logo-icon.svg',
  },
  {
    name: 'Twilio',
    description: 'SMS, voice, and communication APIs.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/twilio-2.svg',
  },
  {
    name: 'SendGrid',
    description: 'Transactional and marketing emails.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/sendgrid-1.svg',
  },
  {
    name: 'Google Cloud',
    description: 'Cloud infrastructure and AI services.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg',
  },
  {
    name: 'AWS',
    description: 'Enterprise cloud computing services.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
  },
  {
    name: 'Notion',
    description: 'Workspace and documentation sync.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/notion-2.svg',
  },
  {
    name: 'Slack',
    description: 'Team notifications and bot integrations.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  },
  {
    name: 'Zapier',
    description: 'Connect to 5,000+ apps automatically.',
    iconSrc: 'https://cdn.worldvectorlogo.com/logos/zapier.svg',
  },
  {
    name: 'Any API',
    description: 'Custom integrations with any REST or GraphQL API.',
    iconSrc: 'https://img.icons8.com/ios-glyphs/60/api-settings.png',
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DockNav />
      <main className="pt-20">
        <IntegrationShowcase
          title="We build AI & Software that connects to ~any~ API"
          subtitle="From AI models to payment processors to custom backends—we architect solutions that seamlessly integrate with the tools your business already uses. No limitations, no boundaries."
          illustrationSrc="https://tally.so/images/demo/v2/strategy.png"
          illustrationAlt="Integration strategy illustration"
          integrations={integrationsData}
        />
      </main>
      <MinimalFooter />
    </div>
  );
}
