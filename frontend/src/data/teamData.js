// Image Imports
import drAliRaza from "../assets/dr-AliRaza.jpeg";
import drAtiya from "../assets/dr-Atiya.jpg";
import drDua from "../assets/dr-Dua.jpg";
import drMahnoor from "../assets/dr-Mahnoor.jpg";
import drAlina from "../assets/dr-Alina.jpg";
import drZobia from "../assets/dr-Zobia.jpeg";
import drRimsha from "../assets/dr-Rimsha.jpg";
import drNaba from '../assets/dr-Naba.jpeg';
import drMehmood from '../assets/dr-Mehmood.jpeg';
import drGhafoor from '../assets/dr-Ghafoor.jpeg';
import drZobiaaba from '../assets/dr-Zobiaaba.jpeg';
import sirBasit from '../assets/sir-Basit.jpeg';
import drSidra from '../assets/dr-Sidra.jpeg';
import drqandeel from '../assets/dr-Qandeel.jpg';
import drMuhammadSaiulla from "../assets/drMuhammadSaiulla.jpeg";
import raiShahzadImg from "../assets/raiShahzad.jpeg"; // Apni image ka path check kar lein
import drSania from "../assets/drSania.jpeg";
import drTaliya from "../assets/drTaliya.jpeg";
import drRafia from "../assets/drRafia.jpeg";
 // Agar drRimsha ka import nahi tha toh upar add kar lein

export const teamMembers = [
  // Speech Therapy Department
  {
    id: 1,
    slug: "ms-zobia-pervaiz",
    name: "Ms. Zobia Pervaiz",
    designation: "Senior Speech & Language Pathology",
    category: "Speech Therapy Department",
    image: drZobiaaba,
    specialization: "MS Speech & Language Pathology",
    bio: ""
  },
  {
    id: 2,
    slug: "mr-ali-raza",
    name: "Mr. Ali Raza",
    designation: "Special Educator & Speech Therapist",
    category: "Speech Therapy Department",
    image: drAliRaza,
    specialization: "MA Special Education Intellectual Development Disability Diploma in Behaviour Management Autism Spectrum Disorder PGD Speech and Language Therapy",
    bio: ""
  },
  {
    id: 3,
    slug: "ms-alina-fatima",
    name: "Ms. Alina Fatima",
    designation: "Speech and Language Pathologist",
    category: "Speech Therapy Department",
    image: drAlina,
    specialization: "BS Speech & Language Pathology",
    bio: ""
  },
  {
    id: 4,
    slug: "ms-dua-zainab",
    name: "Ms. Dua Zainab",
    designation: "Speech Therapist",
    category: "Speech Therapy Department",
    image: drDua,
    specialization: "",
    bio: ""
  },

  // Occupational Therapy & Physiotherapy Department
  {
    id: 5,
    slug: "dr-naba-areej",
    name: "Dr. Naba Areej",
    designation: "Senior Occupational Therapist and Physiotherapist",
    category: "Occupational Therapy & Physiotherapy Department",
    image: drNaba,
    specialization: "MS Sports Physical Therapy",
    bio: ""
  },
{
  id: 6,
  slug: "dr-muhammad-saifullah",
  name: "Dr. Muhammad Saifullah",
  designation: "Doctor of Physical Therapy (DPT)",
  category: "Occupational Therapy & Physiotherapy Department",
  image: drMuhammadSaiulla,
  specialization: "DPT - King Edward Medical University, Mayo Hospital Lahore",
  bio: "Dr. Muhammad Saifullah is a Doctor of Physical Therapy (DPT) from King Edward Medical University, Mayo Hospital Lahore, with 7 years of clinical experience in stroke rehabilitation, paralysis, pediatric physiotherapy (including CP children), geriatric care, and post-operative stiffness management."
},
  {
    id: 7,
    slug: "ms-atiya-akbar",
    name: "Ms. Atiya Akbar",
    designation: "PET & Sports Therapist",
    category: "Occupational Therapy & Physiotherapy Department",
    image: drAtiya,
    specialization: "BS Sports Sciences & Physical Education.",
    bio: ""
  },

  // ABA Therapy & Psychology Department
  {
    id: 8,
    slug: "ms-zobia-naseer",
    name: "Ms. Zobia Naseer",
    designation: "Clinical Psychologist",
    category: "ABA Therapy & Psychology Department",
    image: drZobia,
    specialization: "MS Clinical Psychology ",
    bio: ""
  },
  {
    id: 9,
    slug: "ms-qandeel-amjad",
    name: "Ms. Qandeel Amjad",
    designation: "Psychologist & ABA Therapist",
    category: "ABA Therapy & Psychology Department",
    image: drqandeel,
    specialization: "BS Psychology",
    bio: ""
  },

  // Special Education Department
  {
    id: 10,
    slug: "ms-rimsha",
    name: "Ms. Rimsha",
    designation: "Senior Special Educator",
    category: "Special Education Department",
    image: drRimsha,
    specialization: "MA Special Education",
    bio: ""
  },
  {
    id: 11,
    slug: "ms-mahnoor",
    name: "Ms. Mahnoor",
    designation: "Special Educator",
    category: "Special Education Department",
    image: drMahnoor,
    specialization: "MA Special Education",
    bio: ""
  },

  // Montessori & Early Childhood Education
  {
    id: 12,
    slug: "",
    name: "",
    designation: "",
    category: "Montessori & Early Childhood Education",
    image: "",
    specialization: "",
    bio: ""
  },

  // Receptionists
  {
    id: 13,
    slug: "mr-ansab-nazeer",
    name: "Mr. Ansab Nazeer",
    designation: "Receptionist",
    category: "Receptionists",
    image: "",
    specialization: "",
    bio: ""
  },
  {
    id: 14,
    slug: "ms-sidra-batool",
    name: "Ms. Sidra Batool",
    designation: "Receptionist",
    category: "Receptionists",
    image: drSidra,
    specialization: "",
    bio: ""
  },

  // Mentors
  {
    id: 15,
    slug: "mr-arshad-mehmood-awan",
    name: "Mr. Arshad Mehmood Awan",
    designation: "Mentor",
    category: "Mentors",
    image: drGhafoor,
    specialization: "",
    bio: ""
  },
  {
    id: 16,
    slug: "dr-abdul-basit-rana",
    name: "Dr. Abdul Basit Rana",
    designation: "Mentor",
    category: "Mentors",
    image: sirBasit,
    specialization: "",
    bio: ""
  },
  {
    id: 17,
    slug: "mr-abdul-ghafoor",
    name: "Mr. Abdul Ghafoor",
    designation: "Mentor",
    category: "Mentors",
    image: drMehmood,
    specialization: "",
    bio: ""
  },
  {
  id: 18,
  slug: "rai-shahzad-ahmed-kalyar",
  name: "Rai Shahzad Ahmed Kalyar",
  designation: "Advocate High Court",
  category: "Legal Advisor",
  image: raiShahzadImg,
  specialization: "Legal Services & Law",
  bio: "Kalyar & Associates Law Firm, Al-Rehman Garden Phase II, Lahore. Contact: 0300-0744785"
},
{
  id: 19,
  slug: "sania-qaisar",
  name: "Sania Qaisar",
  designation: "Speech Language Therapist (SLP)",
  category: "Speech Therapy Department",
  image: drSania,
  specialization: "Speech Language Therapy - Riphah International University, Lahore",
  bio: "Sania Qaisar is a Speech Language Therapist (SLP) from Riphah International University, Lahore, with clinical experience in managing autism, ADHD, cerebral palsy (CP) in children, stammering, articulation disorders, and speech delays."
},
{
  id: 20,
  slug: "taliya-speech-language-pathologist",
  name: "Taliya",
  designation: "Speech Language Pathologist (SLP)",
  category: "Speech Therapy Department",
  image: drTaliya,
  specialization: "Speech Language Pathology - Riphah International University",
  bio: "Taliya is a Speech Language Pathologist from Riphah International University, with clinical and rotational experience at Ghurki Trust Teaching Hospital and professional experience at REX Clinic. She is currently working at ABC Centre, an Autism and Behavioural Centre, where she works with children with autism and other communication and developmental needs."
},
{
  id: 21,
  slug: "rafia-iqbal-applied-psychologist",
  name: "Rafia Iqbal",
  designation: "Applied psychologist/ABA Therapist",
  category: "Psychology Department",
  image: drRafia,
  specialization: "BS (Hons) Applied Psychology - University of the Punjab",
  bio: "Rafia Iqbal is a BS (Hons) Applied Psychology graduate from the University of the Punjab. With an academic background in clinical psychology, psychological assessment, and counseling, she has developed an understanding of human behavior and mental health. Her interests include psychological well-being, mental health awareness, and evidence-based therapeutic approaches. She aspires to contribute to creating a supportive environment where individuals feel understood, valued, and empowered."
},
];
