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
    <LegalPageLayout title="Get in Touch with Pokemon Random" description="We'd love to hear from you.">
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
      {/* MASSIVE_SEO_V2 */}
      <H2>Frequently Asked Questions</H2>
      <P>
        <Strong>Is Pokémon Random free to use?</Strong> Yes, all of our tools and resources are completely free to use. We do not require any signup, registration, or payment. Our site is supported by optional display ads that do not interfere with the user experience. If you find our tools useful, please consider sharing them with your friends or supporting us by disabling your ad blocker on our site.
      </P>
      <P>
        <Strong>How accurate is the Pokémon data on your site?</Strong> All of our data is sourced from the official PokéAPI, which is a community-maintained open-source project that provides comprehensive data about every Pokémon, move, ability, and type in the franchise. The data is updated regularly to reflect the latest games and content. If you notice any inaccuracies, please contact us and we will address them as soon as possible.
      </P>
      <P>
        <Strong>Can I suggest a new feature or tool?</Strong> Absolutely! We love hearing from our users and are always looking for ways to improve the site. If you have an idea for a new tool, feature, or content piece, please send us an email at hello@pokemonrandom.com with your suggestion. We read every message and do our best to respond promptly.
      </P>
      <P>
        <Strong>How can I report a bug or technical issue?</Strong> If you encounter a bug or technical issue while using our site, please send us an email at bugs@pokemonrandom.com with a description of the problem, the page URL where it occurred, and any error messages you received. Screenshots are also very helpful. We appreciate your help in making our site better.
      </P>
      <H2>Connect with the Community</H2>
      <P>
        In addition to contacting us directly, you can connect with the Pokémon Random community on social media. We are active on Twitter at pokemonrandom, where we share updates, news, and featured Pokémon. You can also join Pokémon communities on Reddit, Discord, and other platforms to discuss the franchise, share your teams, and connect with other fans. If you create content about Pokémon, whether it is videos, streams, blog posts, or fan art, we would love to see it. Tag us on social media or send us a link, and we may feature it on our site or social media channels.
      </P>
      {/* Final push v2 */}
      <H2>Response Times and Availability</H2>
      <P>
        We strive to respond to all inquiries within 24 to 48 hours, though response times may vary depending on the volume of messages we receive. For urgent matters like security vulnerabilities or legal concerns, we prioritize responses and will get back to you as soon as possible. Our team operates in the UTC timezone, and we typically respond to messages during business hours, Monday through Friday. If you do not receive a response within 72 hours, please feel free to send a follow-up message, as sometimes emails can get lost or filtered into spam folders. When contacting us, please provide as much detail as possible about your inquiry, including relevant URLs, screenshots, and steps to reproduce any issues you are experiencing. This helps us understand your request and provide a faster, more accurate response.
      </P>
      <H2>Partnership and Collaboration Inquiries</H2>
      <P>
        We are open to partnerships and collaborations with other Pokémon fan sites, content creators, and communities. If you are interested in cross-promotion, content sharing, or other forms of collaboration, please contact us at hello@pokemonrandom.com with a description of your proposal. We are particularly interested in collaborating with content creators who can create guides, videos, or other content about our tools, and with other fan sites that share our commitment to providing free, accessible Pokémon resources. We are also open to feature requests and suggestions for new tools, so if you have an idea for a tool that would benefit the Pokémon community, please let us know. We cannot guarantee that we will implement every suggestion, but we read and consider all feedback from our users.
      </P>


    </LegalPageLayout>
  );
}
