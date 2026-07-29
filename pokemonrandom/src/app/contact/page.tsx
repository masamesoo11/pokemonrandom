import type { Metadata } from "next";
import { LegalPageLayout, H2, P, Strong, UL, LI } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Contact Us - Pokemon Random",
  description:
    "Get in touch with the Pokemon Random team. Send feedback, report bugs, request features, or ask questions about our Pokemon tools.",
  alternates: { canonical: "https://pokemonrandom.com/contact" },
  openGraph: {
    title: "Contact Us - Pokemon Random",
    description: "Get in touch with the Pokemon Random team.",
  },
};

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact Us" description="We'd love to hear from you.">
      <H2>Get in Touch</H2>
      <P>
        Have feedback, found a bug, want to suggest a feature, or just want to say
        hello? We&apos;d love to hear from you. There are several ways to reach us:
      </P>

      <H2>Email</H2>
      <P>For different types of inquiries, please use the appropriate address:</P>
      <UL>
        <LI>
          <Strong>General feedback &amp; suggestions:</Strong>{" "}
          <a
            href="mailto:hello@pokemonrandom.com"
            className="text-primary font-semibold hover:underline"
          >
            hello@pokemonrandom.com
          </a>
        </LI>
        <LI>
          <Strong>Bug reports &amp; technical issues:</Strong>{" "}
          <a
            href="mailto:bugs@pokemonrandom.com"
            className="text-primary font-semibold hover:underline"
          >
            bugs@pokemonrandom.com
          </a>
        </LI>
        <LI>
          <Strong>Privacy &amp; data concerns:</Strong>{" "}
          <a
            href="mailto:privacy@pokemonrandom.com"
            className="text-primary font-semibold hover:underline"
          >
            privacy@pokemonrandom.com
          </a>
        </LI>
        <LI>
          <Strong>DMCA &amp; copyright:</Strong>{" "}
          <a
            href="mailto:dmca@pokemonrandom.com"
            className="text-primary font-semibold hover:underline"
          >
            dmca@pokemonrandom.com
          </a>
        </LI>
        <LI>
          <Strong>Business &amp; partnerships:</Strong>{" "}
          <a
            href="mailto:business@pokemonrandom.com"
            className="text-primary font-semibold hover:underline"
          >
            business@pokemonrandom.com
          </a>
        </LI>
      </UL>

      <H2>Response Time</H2>
      <P>
        We aim to respond to all legitimate inquiries within{" "}
        <Strong>2-3 business days</Strong>. Bug reports and DMCA notices are typically
        handled faster (24-48 hours).
      </P>

      <H2>What to Include in Your Email</H2>
      <P>To help us help you faster, please include:</P>
      <UL>
        <LI>Your browser and operating system (for bug reports)</LI>
        <LI>The URL of the page where you encountered the issue</LI>
        <LI>Screenshots if applicable</LI>
        <LI>Steps to reproduce the issue (for bugs)</LI>
        <LI>Your feature request and why it would be useful (for suggestions)</LI>
      </UL>

      <H2>Before Contacting Us</H2>
      <P>
        For common questions, please check our{" "}
        <a href="/#faq" className="text-primary font-semibold hover:underline">
          FAQ section
        </a>{" "}
        first — your answer may already be there.
      </P>

      <H2>Connect With Us</H2>
      <P>We&apos;re planning to launch social media accounts soon. For now:</P>
      <UL>
        <LI>
          <Strong>Twitter/X:</Strong> @pokemonrandom (coming soon)
        </LI>
        <LI>
          <Strong>Discord:</Strong> Community server coming soon
        </LI>
      </UL>
      <P>
        For now, email is the best way to reach us. We read every message — promise!
      </P>
    </LegalPageLayout>
  );
}
