export const site = {
  name: "VITALIS",
  descriptor: "MEDICAL CENTER",
  tagline: "CARE THAT MOVES YOU FORWARD.",
  message: "Your health deserves a thoughtful approach, trusted professionals, and an experience designed around you.",
  email: "hello@vitalis-demo.com",
  phone: "+1 (212) 555-0182",
  phoneHref: "tel:+12125550182",
  address: { line1: "140 Riverside Avenue", line2: "New York, NY 10069" },
  coordinates: { lat: 40.7734, lng: -73.9857 },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ],
  hours: [
    { label: "Monday – Friday", value: "08:00 – 19:00" },
    { label: "Saturday", value: "09:00 – 14:00" },
    { label: "Sunday", value: "Closed" },
  ],
  nav: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Specialties", href: "#specialties" },
    { label: "Doctors", href: "#doctors" },
    { label: "Patient Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
};

export type Specialty = {
  id: string;
  name: string;
  description: string;
  image: string;
  focus: string[];
};

export const specialties: Specialty[] = [
  { id: "cardiology", name: "Cardiology", description: "Heart health consultations and cardiovascular care, with a calm, thorough approach to prevention and treatment.", image: "/images/spec-cardiology.webp", focus: ["Heart health", "Consultation", "Prevention"] },
  { id: "dermatology", name: "Dermatology", description: "Skin health, dermatological consultations and considered skin care for every stage of life.", image: "/images/spec-dermatology.webp", focus: ["Skin health", "Consultation", "Skin care"] },
  { id: "pediatrics", name: "Pediatrics", description: "Healthcare services focused on children and families, delivered with patience and warmth.", image: "/images/spec-pediatrics.webp", focus: ["Children", "Families", "Preventive care"] },
  { id: "orthopedics", name: "Orthopedics", description: "Musculoskeletal consultations and orthopedic care for movement, recovery and long-term comfort.", image: "/images/spec-orthopedics.webp", focus: ["Movement", "Recovery", "Consultation"] },
  { id: "neurology", name: "Neurology", description: "Neurological consultations and nervous system care, built around clear explanations and careful listening.", image: "/images/spec-neurology.webp", focus: ["Neurology", "Consultation", "Care plans"] },
  { id: "ophthalmology", name: "Ophthalmology", description: "Eye health and vision consultations, from routine checks to ongoing visual care.", image: "/images/spec-ophthalmology.webp", focus: ["Vision", "Eye health", "Consultation"] },
  { id: "dentistry", name: "Dentistry", description: "Dental consultations and oral health services with an emphasis on comfort and clarity.", image: "/images/spec-dentistry.webp", focus: ["Oral health", "Dental care", "Consultation"] },
  { id: "internal", name: "Internal Medicine", description: "General medical consultations and preventive care — a first stop for lasting wellbeing.", image: "/images/spec-internal.webp", focus: ["General medicine", "Preventive care", "Wellbeing"] },
];

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  specialtyId: string;
  image: string;
  bio: string;
  availability: string[];
};

export const doctors: Doctor[] = [
  { id: "amara", name: "Dr. Amara Chen", specialty: "Cardiology", specialtyId: "cardiology", image: "/images/doctor-1.webp", bio: "A fictional cardiologist focused on preventive heart health and clear, unhurried consultations.", availability: ["Tue · 09:30", "Thu · 11:00"] },
  { id: "daniel", name: "Dr. Daniel Reed", specialty: "Internal Medicine", specialtyId: "internal", image: "/images/doctor-2.webp", bio: "A fictional internal medicine specialist who enjoys untangling complex histories and making a practical plan.", availability: ["Mon · 10:00", "Wed · 15:30"] },
  { id: "michael", name: "Dr. Michael Osei", specialty: "Orthopedics", specialtyId: "orthopedics", image: "/images/doctor-3.webp", bio: "A fictional orthopedic clinician interested in movement, rehabilitation and everyday recovery.", availability: ["Tue · 14:00", "Fri · 09:00"] },
  { id: "sofia", name: "Dr. Sofia Marino", specialty: "Dermatology", specialtyId: "dermatology", image: "/images/doctor-4.webp", bio: "A fictional dermatologist known for a measured approach to skin health and patient education.", availability: ["Wed · 11:30", "Sat · 10:00"] },
  { id: "james", name: "Dr. James Porter", specialty: "Pediatrics", specialtyId: "pediatrics", image: "/images/doctor-5.webp", bio: "A fictional pediatrician who makes room for questions and puts families at ease.", availability: ["Mon · 16:00", "Thu · 09:30"] },
  { id: "nora", name: "Dr. Nora Bennett", specialty: "Neurology", specialtyId: "neurology", image: "/images/doctor-6.webp", bio: "A fictional neurologist focused on careful listening and explanations that make sense outside the clinic.", availability: ["Fri · 13:30", "Tue · 10:30"] },
];

export const facilities = [
  { title: "Consultation rooms", text: "Quiet, well-lit rooms designed for unhurried conversations.", image: "/images/facility-consult.webp" },
  { title: "Reception", text: "A warm welcome and a clear path from the moment you arrive.", image: "/images/facility-reception.webp" },
  { title: "Waiting lounge", text: "A calm space with natural light and room to breathe.", image: "/images/facility-lounge.webp" },
  { title: "Examination rooms", text: "Thoughtful spaces equipped for focused, comfortable care.", image: "/images/facility-exam.webp" },
  { title: "Patient rooms", text: "Private, restful rooms for follow-up visits and recovery.", image: "/images/facility-room.webp" },
];

export const journey = [
  { no: "01", title: "Discover", text: "Explore medical specialties and healthcare services." },
  { no: "02", title: "Choose", text: "Find the appropriate doctor and department." },
  { no: "03", title: "Book", text: "Select a preferred appointment date and time." },
  { no: "04", title: "Visit", text: "Receive clear guidance for your visit." },
  { no: "05", title: "Follow up", text: "Understand the next steps in your healthcare journey." },
];

export const patientServices = [
  { no: "01", title: "Appointment Scheduling", text: "A simple, guided way to choose a department, doctor and time that works for you." },
  { no: "02", title: "Patient Guidance", text: "Clear directions and a calm first-visit experience, explained in plain language." },
  { no: "03", title: "Medical Consultation Information", text: "What to expect from a consultation, and how to prepare for a useful conversation." },
  { no: "04", title: "Insurance Information", text: "Demonstration guidance on what to ask about coverage. No real claims are processed here." },
  { no: "05", title: "Laboratory Services", text: "Information about common tests and how results are discussed with you." },
  { no: "06", title: "Diagnostic Services", text: "An overview of diagnostic pathways, described without medical jargon." },
  { no: "07", title: "Patient Support", text: "A single point of contact for questions before and after your visit." },
];

export const testimonials = [
  { quote: "The whole visit felt considered — from the first message to the follow-up. It never felt rushed.", name: "Sample Patient 01", detail: "Fictional demonstration content" },
  { quote: "For the first time I understood what the next step was, and why. That clarity stayed with me.", name: "Sample Patient 02", detail: "Fictional demonstration content" },
  { quote: "The space is calm, the people are attentive, and nothing felt unnecessarily complicated.", name: "Sample Patient 03", detail: "Fictional demonstration content" },
];

export const articles = [
  { title: "Everyday Habits for Better Heart Health", category: "Heart health", time: "5 min read", image: "/images/article-1.webp", intro: "Small, repeatable routines can support cardiovascular wellbeing over time — a general overview." },
  { title: "Understanding the Importance of Regular Checkups", category: "Preventive care", time: "4 min read", image: "/images/article-2.webp", intro: "Why routine conversations with a clinician matter, even when nothing feels wrong." },
  { title: "Healthy Sleep and Your Wellbeing", category: "Wellbeing", time: "6 min read", image: "/images/article-3.webp", intro: "A look at how sleep habits shape energy, focus and daily recovery." },
];

export const faqs = [
  { q: "How can I book an appointment?", a: "Use the demo booking flow on this page: choose a specialty, a doctor, a date and a time, then enter sample details. Nothing is sent to a real medical center." },
  { q: "Can I choose a specific doctor?", a: "Yes — in this demonstration you can select an available doctor from the chosen specialty before confirming a time." },
  { q: "What should I bring to my appointment?", a: "For a real visit, a photo ID, insurance details and any relevant medical records are typically useful. This site is a portfolio concept and does not provide medical instructions." },
  { q: "How can I find the medical center?", a: "The address shown is fictional demonstration information. The map on this page is illustrative and not a live location." },
  { q: "Can I reschedule my appointment?", a: "In a real clinic, rescheduling would happen through the patient support team. Here, you can simply start the demo booking flow again." },
  { q: "Which medical specialties are available?", a: "The demo includes Cardiology, Dermatology, Pediatrics, Orthopedics, Neurology, Ophthalmology, Dentistry and Internal Medicine." },
];

export const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];
