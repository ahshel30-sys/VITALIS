import { timeSlots } from "./content";

export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d][\d\s().-]{6,}$/;

export type Booking = {
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function formatDate(value: string) {
  if (!value) return "";
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date(y, m - 1, d));
}

export function validateBookingPart(step: number, values: Booking): Errors {
  const errors: Errors = {};
  if (step === 1 && !values.specialty) errors.specialty = "Please choose a specialty.";
  if (step === 2 && !values.doctor) errors.doctor = "Please choose a doctor.";
  if (step === 3) {
    if (!values.date) errors.date = "Please choose a date.";
    else if (values.date < todayISO()) errors.date = "Please choose today or a future date.";
  }
  if (step === 4 && !timeSlots.includes(values.time)) errors.time = "Please choose an available time.";
  if (step === 5) {
    if (values.name.trim().length < 2) errors.name = "Please enter your full name.";
    if (!PHONE.test(values.phone.trim())) errors.phone = "Please enter a valid phone number.";
    if (!EMAIL.test(values.email.trim())) errors.email = "Please enter a valid email address.";
    if (values.notes.length > 500) errors.notes = "Please keep notes under 500 characters.";
  }
  return errors;
}

export function bookingReference() {
  return `VT-${Date.now().toString(36).toUpperCase().slice(-5)}`;
}

/** Store only a non-sensitive demo summary — no name, phone, email or notes. */
export function persistBookingSummary(values: Booking, reference: string) {
  const existing = localStorage.getItem("vitalis:bookings");
  const list = existing ? (JSON.parse(existing) as unknown[]) : [];
  const safe = Array.isArray(list) ? list : [];
  safe.push({
    reference,
    specialty: values.specialty,
    doctor: values.doctor,
    date: values.date,
    time: values.time,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("vitalis:bookings", JSON.stringify(safe));
}

export function validateContact(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please write at least 10 characters.";
  return errors;
}

export function validateNewsletter(email: string) {
  return EMAIL.test(email.trim()) ? null : "Please enter a valid email address.";
}

export function persistDemo(key: string, record: unknown) {
  const raw = localStorage.getItem(key);
  const parsed = raw ? (JSON.parse(raw) as unknown[]) : [];
  const list = Array.isArray(parsed) ? parsed : [];
  list.push(record);
  localStorage.setItem(key, JSON.stringify(list));
}
