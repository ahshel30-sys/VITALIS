import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Doctors from "@/components/Doctors";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import Journey from "@/components/Journey";
import PatientServices from "@/components/PatientServices";
import Reveal from "@/components/Reveal";
import Specialties from "@/components/Specialties";
import Trust from "@/components/Trust";
import { site } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "VITALIS Medical Center",
  description: "A fictional medical center concept created for a portfolio demonstration.",
  telephone: site.phone,
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address.line1, addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
  sameAs: site.socials.map((item) => item.href),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Reveal />
        <Hero />
        <Trust />
        <Specialties />
        <Doctors />
        <Booking />
        <PatientServices />
        <Journey />
        <Insights />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
