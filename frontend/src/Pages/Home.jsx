import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Assets folder se image imports (Exact matching file extensions)
import heroImg from '../assets/hero-banner.jpg';
// Exact Image Imports matching your assets folder
import drBilal from '../assets/dr-Bilal.jpeg';
import drAliRaza from '../assets/dr-AliRaza.jpeg';
import drAtiya from '../assets/dr-Atiya.jpg';
import drMahnoor from '../assets/dr-Mahnoor.jpg';
import drMonina from '../assets/dr-Monina.jpeg';
import drRimsha from '../assets/dr-Rimsha.jpg';
import zobiaPervaiz from '../assets/dr-Zobiaaba.jpeg';
import drNaba from '../assets/dr-Naba.jpeg';





const dynamicWords = ["Building", "Better", "Future", "Together"];

// 9 Services Data
const servicesData = [
  {
    title: "Speech & Language Therapy",
    desc: "Improving articulation, expressive/receptive language capabilities, and functional communication skills.",
    color: "#00A8CD",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/speech-therapy"
  },
  {
    title: "Nutrition Therapy & Dietetics",
    desc: "Specialized pediatric dietary plans and nutritional guidance tailored to support growth and sensory needs.",
    color: "#FF5271",
    img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/nutrition-dietetics"
  },
  {
    title: "Special Education",
    desc: "Customized academic and cognitive learning frameworks designed to unlock every child's unique potential.",
    color: "#F5A623",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/special-education"
  },
  {
    title: "Physiotherapy",
    desc: "Improving gross motor skills, core posture, physical strength, and overall bodily coordination.",
    color: "#003B5C",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/physiotherapy"
  },
  {
    title: "Occupational Therapy & Sensory Integration",
    desc: "Developing fine motor skills, independence in daily routines, and healthy sensory regulation.",
    color: "#00A8CD",
    img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/occupational-therapy"
  },
  {
    title: "Day Care",
    desc: "A secure, nurturing, and highly structured environment designed for safe supervision and holistic care.",
    color: "#FF5271",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/day-care"
  },
  {
    title: "Montessori & Early Childhood Education",
    desc: "Guided interactive learning that promotes natural confidence, attention spans, and self-reliance.",
    color: "#F5A623",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/montessori-education"
  },
  {
    title: "Dysphagia Management & NG Tube Feeding",
    desc: "Specialized clinical swallowing therapy and tube feeding support administered by expert practitioners.",
    color: "#003B5C",
    img: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/dysphagia-management"
  },
  {
    title: "ABA Therapy & Psychology",
    desc: "Evidence-based behavior analysis and psychological counseling fostering positive reinforcement and emotional health.",
    color: "#FF5271",
    img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
    path: "/Pages/aba-psychology"
  }
];

// Why Choose Us Data Points
const whyChooseData = [
  {
    title: "Personalized Care",
    desc: "Tailored programs designed around your child's unique capabilities, interests, and developmental pace.",
    color: "#FF5271",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    title: "Multidisciplinary Team",
    desc: "Collaborative therapy experts, BCBAs, speech pathologists, and therapists working together.",
    color: "#00A8CD",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Services Under One Roof",
    desc: "Complete spectrum from speech, motor, behavior, to learning support in a single unified center.",
    color: "#F5A623",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    title: "Individualized Learning",
    desc: "Fostering active curiosity, attention, confidence, and natural skill building step-by-step.",
    color: "#003B5C",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Family-Centered Support",
    desc: "Guiding and involving parents directly to extend successful therapy habits into everyday home life.",
    color: "#FF5271",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: "Progress-Focused Care",
    desc: "Data-driven session tracking to measure improvements and adapt therapy plans continuously.",
    color: "#00A8CD",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: "Safe & Nurturing Setup",
    desc: "Child-friendly rooms and supportive atmospheres designed to spark joy, safety, and engagement.",
    color: "#F5A623",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Evidence-Based Methods",
    desc: "Grounded in scientifically validated ABA, speech, sensory, and occupational health techniques.",
    color: "#003B5C",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    )
  },
  {
    title: "Holistic Well-Being",
    desc: "Support designed for every stage of childhood, nurturing mental, physical, and social wellness.",
    color: "#FF5271",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

// Our Team Members Data with Local Images
const teamMembersData = [
  {
    name: " Dr. Muhammad Bilal Bhatti",
    role: "Chairman -ABC Autism Behavioral Center",
    degree: "PhD Speech therapy from  Tehran University of Medical sciences (Continue)/MS in Speech and language pathology (RCRS)",
    image: drBilal
  },
  {
    name: "Dn. Momna",
    role: "CEO -Consultant Nutritionist & Dietitian",
    degree: "MPhil Food Science (FST, UET) & Doctor of Nutrition & Dietetics (DND, UVAS)",
    image: drMonina
  },
  {
name: "Ms. Zobia Pervaiz",
role: "Senior Speech & Language Pathologist",
degree: "MS Speech & Language Pathology",
image: zobiaPervaiz
},
 {
    name: "Mr. Ali Raza",
    role: " Special Educator & Speech Therapist",
    degree: " MA Special Education Intellectual Development Disability Diploma in Behaviour Management Autism Spectrum Disorder PGD Speech and Language Therapy ",
    image: drAliRaza
  },
    {
  
    name: "Ms. Rimsha",
    role: "Senior Special Educator",
    degree: "MA Special Education",
    image: drRimsha
  },
   {

    name: "Dr. Naba Areej",
    role: "Senior Occupational Therapist and Physiotherapist",
    degree: "Ms Sports physical therapy",
    image: drNaba
  },

  {
    name: "Ms. Atiya",
    role: " PET & Sports Therapist",
    degree: "Ms Sports physical therapy",
    image: drAtiya
  },

  {
    name: "Ms. Mahnoor Khan",
    role: " Special Educator",
    degree: "M.A Special Education",
    image: drMahnoor
  },
];

// FAQ Data List
const faqData = [
  {
    question: "What age groups does ABC Centre cater to?",
    answer: "ABC Centre provides services for children, adolescents, adults, and families, with programs tailored according to individual needs, developmental stage, abilities, and goals. Our child development services focus on early childhood through school-age years, while our nutrition, speech and language, physiotherapy, rehabilitation, and other specialized services are available for individuals across different age groups."
  },
  {
    question: "Does ABC Centre offer support or resources for parents and caregivers?",
    answer: "Yes. We believe that parents and caregivers are an important part of an individual’s progress. We provide parent and caregiver guidance, education, home-based strategies, and recommendations where appropriate. Our multidisciplinary team also works with families to help them understand their child’s needs and support development and independence at home."
  },
  {
    question: "What is the process for enrolling my child at ABC Centre?",
    answer: "The process begins with an initial consultation or assessment to understand your child’s developmental, behavioral, communication, sensory, educational, nutritional, or functional needs. Based on the assessment, our professionals develop an individualized plan and recommend the appropriate services and frequency of sessions. Parents and caregivers are involved throughout the process."
  },
  {
    question: "How does ABC Centre collaborate with schools or other professionals involved in my child’s care?",
    answer: "We believe in coordinated and multidisciplinary care. With appropriate parental consent, our team can communicate with teachers, schools, healthcare professionals, therapists, and other relevant caregivers involved in the child’s care. This helps promote consistency between therapy, education, and everyday environments."
  },
  {
    question: "Are there any support groups or community activities organized by ABC Centre?",
    answer: "ABC Centre aims to promote family education, awareness, and community support through educational activities, nutrition and health awareness sessions, parent guidance, and developmental initiatives. Details of upcoming workshops, awareness programs, and community activities will be shared through our centre’s official communication channels."
  },
  {
    question: "Does ABC Centre accept insurance or offer financial assistance options?",
    answer: "Our payment and financial assistance policies may vary depending on the service and individual circumstances. Families are encouraged to contact ABC Centre directly to discuss consultation fees, therapy packages, payment options, and any available concessions or assistance programs."
  },
  {
    question: "Can I schedule a tour of ABC Centre before enrolling my child?",
    answer: "Yes. Families are welcome to contact ABC Centre to schedule a visit or consultation before starting services. A visit allows parents and caregivers to learn more about our environment, services, multidisciplinary approach, and the support available for their child."
  }
];
// Parents & Clients Reviews List
const reviewsData = [
  {
    name: "Muhammad Abubakar",
    role: "Parent",
    initial: "M",
    bgInitial: "bg-[#005F60]",
    comment: "Every session felt well planned, and I appreciated how much attention was given to individual goals. Communication has become much easier for my son."
  },
  {
    name: "Shumaila",
    role: "Parent",
    initial: "S",
    bgInitial: "bg-[#005F60]",
    comment: "My child could only speak 8 to 10 words. Now, Alhamdulillah, he is able to communicate, recognizes things and responds well. A great improvement is being observed day by day."
  },
  {
    name: "Fiz Malik",
    role: "Parent",
    initial: "F",
    bgInitial: "bg-[#005F60]",
    comment: "My son M. Ahsan was speech delayed. Ma'am Afifa's way of teaching and techniques are so good and helpful, giving instant results. She is truly an angel of Allah for us."
  },
  {
    name: "Hamza Shahzad",
    role: "Parent",
    initial: "H",
    bgInitial: "bg-[#005F60]",
    comment: "After taking her sessions my child went from 2 words to 4-word complete sentences, and his stubborn behavior issues are 80% resolved. She trained us wholeheartedly with true passion."
  },
  {
    name: "Sadia Tahir",
    role: "Parent",
    initial: "S",
    bgInitial: "bg-[#005F60]",
    comment: "The ABA therapy sessions have been a game changer for my daughter's social interactions and daily routine. Highly dedicated and caring team!"
  },
  {
    name: "Usman Ghani",
    role: "Parent",
    initial: "U",
    bgInitial: "bg-[#005F60]",
    comment: "Exceptional occupational therapy center. We noticed drastic improvements in sensory integration and handwriting within just a few weeks."
  }
];

// Speech Therapy Video Cards Data
const speechVideosData = [
  {
    id: "sAovlt4kaSI",
    title: "Speech Therapy Sessions for Children",
    desc: "Communication and language development activities."
  },
  {
    id: "k8ecQxHgFlI",
    title: "Speech Therapy Session for Kids",
    desc: "Speech delay and communication-focused therapy session."
  },
  {
    id: "CRy1DgBmo9Y",
    title: "Early Language Development",
    desc: "A practical communication strategy parents can use at home."
  },
  {
    id: "-pYIuECn0Z8",
    title: "Language Development at Home",
    desc: "Simple everyday activities to encourage vocabulary and language."
  }
];

// ============================================================
// PREMIUM CONDITIONS SECTION
// Bento Cards + Professional Micro Animations
// ============================================================

const ConditionsSection = () => {
  const conditions = [
    {
      number: "01",
      title: "Speech & Language Therapy",
      description:
        "Supporting communication, speech clarity, language development and confident expression.",
      color: "#FF5271",
      animation: "left",
    },
    {
      number: "02",
      title: "Special Education",
      description:
        "Personalized learning support designed around each child's individual needs.",
      color: "#00A8CD",
      animation: "up",
    },
    {
      number: "03",
      title: "Occupational Therapy & Sensory Integration",
      description:
        "Helping children build independence, coordination and sensory regulation skills.",
      color: "#003B5C",
      animation: "right",
    },
    {
      number: "04",
      title: "Montessori & Early Childhood Education",
      description:
        "Encouraging independence, curiosity and meaningful early learning experiences.",
      color: "#003B5C",
      animation: "left",
    },
    {
      number: "05",
      title: "ABA Therapy & Psychology",
      description:
        "Evidence-informed behavioral support focused on meaningful developmental progress.",
      color: "#FF5271",
      animation: "up",
    },
    {
      number: "06",
      title: "Nutrition Therapy & Dietetics",
      description:
        "Individualized nutrition guidance supporting healthy growth and development.",
      color: "#00A8CD",
      animation: "right",
    },
    {
      number: "07",
      title: "Physiotherapy",
      description:
        "Supporting movement, strength, balance, mobility and physical independence.",
      color: "#FF5271",
      animation: "left",
    },
    {
      number: "08",
      title: "Day Care",
      description:
        "A supportive environment where children can learn, play and develop confidently.",
      color: "#00A8CD",
      animation: "up",
    },
    {
      number: "09",
      title: "Dysphagia Management & NG Tube Feeding",
      description:
        "Specialized feeding support designed around safety, comfort and individual needs.",
      color: "#003B5C",
      animation: "right",
    },
  ];

  // ----------------------------------------------------------
  // Icons
  // ----------------------------------------------------------

  const CheckIcon = () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  const ArrowIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );

  // ----------------------------------------------------------
  // Animation variants
  // ----------------------------------------------------------

  const getAnimation = (type) => {
    if (type === "left") {
      return {
        initial: {
          opacity: 0,
          x: -45,
        },
        whileInView: {
          opacity: 1,
          x: 0,
        },
      };
    }

    if (type === "right") {
      return {
        initial: {
          opacity: 0,
          x: 45,
        },
        whileInView: {
          opacity: 1,
          x: 0,
        },
      };
    }

    return {
      initial: {
        opacity: 0,
        y: 40,
      },
      whileInView: {
        opacity: 1,
        y: 0,
      },
    };
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        py-20
        sm:py-24
        lg:py-28
        bg-[#F8FAFC]
      "
    >

      {/* ========================================================
          BACKGROUND DECORATION
      ======================================================== */}

      <div
        className="
          absolute
          -top-40
          -left-40
          w-[450px]
          h-[450px]
          rounded-full
          bg-[#00A8CD]/[0.035]
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-40
          -right-40
          w-[450px]
          h-[450px]
          rounded-full
          bg-[#FF5271]/[0.04]
          blur-3xl
          pointer-events-none
        "
      />

      {/* Subtle center glow */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#003B5C]/[0.02]
          blur-3xl
          pointer-events-none
        "
      />

      {/* ========================================================
          CONTAINER
      ======================================================== */}

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* ======================================================
            HEADER
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            text-center
            max-w-3xl
            mx-auto
            mb-14
            lg:mb-16
          "
        >

          {/* Label */}

          <div
            className="
              inline-flex
              items-center
              gap-3
              mb-5
            "
          >

            <span
              className="
                w-9
                h-[2px]
                bg-[#FF5271]
                rounded-full
              "
            />

            <span
              className="
                text-[10px]
                sm:text-xs
                font-extrabold
                tracking-[0.25em]
                uppercase
                text-[#003B5C]
              "
            >
              Our Expertise
            </span>

            <span
              className="
                w-9
                h-[2px]
                bg-[#00A8CD]
                rounded-full
              "
            />

          </div>

          {/* Heading */}

          <h2
            className="
              font-serif
              text-4xl
              sm:text-5xl
              lg:text-[56px]
              leading-tight
              font-extrabold
              text-[#003B5C]
              tracking-tight
            "
          >
            Conditions We{" "}
            <span
              className="
                italic
                text-[#FF5271]
              "
            >
              Support
            </span>
          </h2>

          <p
            className="
              mt-5
              text-sm
              sm:text-base
              text-slate-500
              leading-7
              max-w-2xl
              mx-auto
            "
          >
            Comprehensive multidisciplinary care designed to support
            communication, learning, independence and every stage of
            your child's development.
          </p>

        </motion.div>

        {/* ======================================================
            CARDS GRID
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
            lg:gap-6
            max-w-6xl
            mx-auto
          "
        >

          {conditions.map((item, index) => {

            const animation = getAnimation(item.animation);

            return (
              <motion.div
                key={item.number}

                initial={animation.initial}

                whileInView={animation.whileInView}

                viewport={{
                  once: true,
                  amount: 0.15,
                }}

                transition={{
                  duration: 0.65,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}

                whileHover={{
                  y: -8,
                }}

                className="
                  group
                  relative
                  cursor-pointer
                "
              >

                {/* =================================================
                    MAIN CARD
                ================================================= */}

                <div
                  className="
                    relative
                    h-full
                    min-h-[235px]
                    p-6
                    sm:p-7
                    rounded-[24px]
                    bg-white
                    border
                    border-slate-100
                    shadow-[0_10px_35px_rgba(15,23,42,0.055)]
                    overflow-hidden
                    transition-all
                    duration-500
                    group-hover:shadow-[0_22px_50px_rgba(15,23,42,0.11)]
                  "
                >

                  {/* =================================================
                      COLORED TOP LINE
                  ================================================= */}

                  <div
                    className="
                      absolute
                      top-0
                      left-0
                      w-full
                      h-[3px]
                      scale-x-0
                      origin-left
                      group-hover:scale-x-100
                      transition-transform
                      duration-500
                    "
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                  {/* =================================================
                      SOFT HOVER GLOW
                  ================================================= */}

                  <div
                    className="
                      absolute
                      -top-20
                      -right-20
                      w-40
                      h-40
                      rounded-full
                      opacity-0
                      group-hover:opacity-100
                      blur-3xl
                      transition-opacity
                      duration-700
                      pointer-events-none
                    "
                    style={{
                      backgroundColor: `${item.color}20`,
                    }}
                  />

                  {/* =================================================
                      NUMBER
                  ================================================= */}

                  <div
                    className="
                      absolute
                      top-5
                      right-6
                      text-5xl
                      font-black
                      leading-none
                      select-none
                      opacity-[0.045]
                      group-hover:opacity-[0.10]
                      transition-all
                      duration-500
                    "
                    style={{
                      color: item.color,
                    }}
                  >
                    {item.number}
                  </div>

                  {/* =================================================
                      ICON
                  ================================================= */}

                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}

                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                    }}

                    className="
                      relative
                      w-12
                      h-12
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      mb-6
                      transition-all
                      duration-300
                      group-hover:shadow-lg
                    "
                    style={{
                      backgroundColor: `${item.color}12`,
                      color: item.color,
                    }}
                  >

                    {/* Icon inner ring */}

                    <div
                      className="
                        absolute
                        inset-[5px]
                        rounded-xl
                        border
                        border-current
                        opacity-10
                        group-hover:opacity-30
                        transition-opacity
                      "
                    />

                    <CheckIcon />

                  </motion.div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="relative z-10">

                    <h3
                      className="
                        text-base
                        sm:text-[17px]
                        font-extrabold
                        leading-snug
                        text-[#003B5C]
                        pr-10
                        group-hover:translate-x-1
                        transition-transform
                        duration-300
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-xs
                        sm:text-[13px]
                        leading-6
                        text-slate-500
                        group-hover:text-slate-600
                        transition-colors
                      "
                    >
                      {item.description}
                    </p>

                  </div>

                  {/* =================================================
                      BOTTOM ACTION
                  ================================================= */}

                  <div
                    className="
                      absolute
                      bottom-6
                      left-6
                      right-6
                      flex
                      items-center
                      justify-between
                    "
                  >

                    {/* Accent line */}

                    <div className="flex items-center gap-2">

                      <span
                        className="
                          w-7
                          h-[2px]
                          rounded-full
                          group-hover:w-12
                          transition-all
                          duration-500
                        "
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                      <span
                        className="
                          w-1.5
                          h-1.5
                          rounded-full
                          opacity-30
                        "
                        style={{
                          backgroundColor: item.color,
                        }}
                      />

                    </div>

                    {/* Arrow */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -8,
                      }}

                      whileHover={{
                        opacity: 1,
                        x: 0,
                      }}

                      className="
                        w-8
                        h-8
                        rounded-full
                        flex
                        items-center
                        justify-center
                        bg-slate-50
                        group-hover:bg-[#003B5C]
                        transition-all
                        duration-300
                      "
                    >

                      <svg
                        className="
                          w-4
                          h-4
                          text-slate-400
                          group-hover:text-white
                          transition-colors
                        "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>

                    </motion.div>

                  </div>

                  {/* =================================================
                      CORNER DECORATION
                  ================================================= */}

                  <div
                    className="
                      absolute
                      bottom-0
                      right-0
                      w-16
                      h-16
                      rounded-tl-[60px]
                      opacity-[0.035]
                      group-hover:opacity-[0.08]
                      transition-opacity
                      duration-500
                    "
                    style={{
                      backgroundColor: item.color,
                    }}
                  />

                </div>

              </motion.div>
            );
          })}

        </div>

        {/* ======================================================
            BOTTOM FEATURE STRIP
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.7,
            delay: 0.25,
          }}

          className="
            max-w-6xl
            mx-auto
            mt-10
            p-5
            sm:p-6
            rounded-[24px]
            bg-[#003B5C]
            relative
            overflow-hidden
            shadow-xl
            shadow-[#003B5C]/15
          "
        >

          {/* Background decoration */}

          <div
            className="
              absolute
              -right-10
              -top-20
              w-56
              h-56
              rounded-full
              bg-[#00A8CD]/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -left-10
              -bottom-20
              w-48
              h-48
              rounded-full
              bg-[#FF5271]/15
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-5
            "
          >

            {/* Text */}

            <div className="text-center md:text-left">

              <p
                className="
                  text-white
                  font-bold
                  text-sm
                  sm:text-base
                "
              >
                Every child deserves personalized care.
              </p>

              <p
                className="
                  mt-1
                  text-white/60
                  text-xs
                  sm:text-sm
                "
              >
                Our multidisciplinary team works together
                for meaningful developmental progress.
              </p>

            </div>

            {/* Button */}

            <motion.div
              whileHover={{
                scale: 1.04,
              }}

              whileTap={{
                scale: 0.97,
              }}
            >

              <Link
                to="/conditions"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  whitespace-nowrap
                  bg-white
                  text-[#003B5C]
                  px-6
                  py-3
                  rounded-full
                  text-xs
                  sm:text-sm
                  font-extrabold
                  shadow-lg
                  hover:bg-[#FF5271]
                  hover:text-white
                  transition-all
                  duration-300
                "
              >

                Explore Our Services

                <span
                  className="
                    group-hover:translate-x-1
                    transition-transform
                  "
                >
                  <ArrowIcon />
                </span>

              </Link>

            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
// ================= PROFESSIONAL DUAL CARE SHOWCASE SECTION =================
const DualCareShowcaseSection = () => {
  const childServicesList = [
    "Speech & Language Therapy",
    "Nutrition Therapy & Dietetics",
    "Special Education",
    "Physiotherapy",
    "Occupational Therapy & Sensory Integration",
    "Day Care",
    "Montessori & Early Childhood Education",
    "Dysphagia Management & NG Tube Feeding",
    "ABA Therapy & Psychology"
  ];

  const adultServicesList = [
    "Speech & Language Therapy",
    "Nutrition Therapy & Dietetics",
    "Special Education",
    "Physiotherapy",
    "Occupational Therapy & Sensory Integration",
    "Dysphagia Management & NG Tube Feeding",
    "ABA Therapy & Psychology"
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="inline-flex items-center gap-2 bg-[#00A8CD]/10 border border-[#00A8CD]/30 text-[#00A8CD] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#00A8CD] animate-pulse" />
            Comprehensive Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B5C]">
            Specialized Care for All Ages
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Personalized, multidisciplinary support tailored specifically for children and adults under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Card 1: Child Development & Family Support */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:border-[#FF5271]/40 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FF5271] to-[#F5A623]" />
            
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#FF5271] uppercase tracking-wider bg-[#FF5271]/10 px-3.5 py-1 rounded-full inline-block">
                  Child Care
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#003B5C]">
                  Child Development & Family Support
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Supporting every child’s growth and development through personalized multidisciplinary intervention[cite: 1, 2].
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {childServicesList.map((service, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-[#FF5271]/5 transition-colors">
                    <span className="w-5 h-5 rounded-full bg-[#FF5271]/15 text-[#FF5271] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Holistic Care Approach</span>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  to="/book-a-free-consult"
                  className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md shadow-[#003B5C]/20 transition-all duration-300 text-center inline-block"
                >
                  Book Child Care
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Card 2: Adult Health & Wellness */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:border-[#00A8CD]/40 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00A8CD] to-[#003B5C]" />
            
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#00A8CD] uppercase tracking-wider bg-[#00A8CD]/10 px-3.5 py-1 rounded-full inline-block">
                  Adult Wellness
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#003B5C]">
                  Adult Health, Rehabilitation & Specialized Care
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Personalized multidisciplinary support focused on improving nutrition, function, swallowing, and quality of life[cite: 1, 2].
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {adultServicesList.map((service, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-[#00A8CD]/5 transition-colors">
                    <span className="w-5 h-5 rounded-full bg-[#00A8CD]/15 text-[#00A8CD] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">Specialized Rehabilitation</span>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  to="/book-a-free-consult"
                  className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md shadow-[#003B5C]/20 transition-all duration-300 text-center inline-block"
                >
                  Book Adult Care
                </Link>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// ================= OUR MISSION SECTION =================
const MissionSection = () => {
  return (
    <section className="py-24 bg-[#003B5C] text-white relative overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 w-96 h-96 bg-[#00A8CD]/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FF5271]/30 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div>
              <span className="inline-flex items-center gap-2 bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
                Our Mission & Philosophy
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
              Comprehensive Care <br />
              <span className="text-[#FF5271] italic font-bold">Under One Roof</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              Our mission is to provide <strong className="text-white">integrated, personalized, and compassionate care</strong> for health, nutrition, rehabilitation, learning, and child development under one roof[cite: 1, 2].
            </p>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              Through our multidisciplinary team and individualized care plans, we aim to address each person's unique needs, strengthen their abilities, promote independence, and empower children and families to achieve better health, development, and quality of life[cite: 1, 2].
            </p>

            <div className="pt-2">
              <motion.div whileHover={{ y: -3 }} className="inline-block w-full sm:w-auto">
                <Link 
                  to="/book-a-free-consult" 
                  className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md shadow-[#003B5C]/20 transition-all duration-300 text-center inline-block"
                >
                  Join Our Mission
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {[
              { title: "Integrated Care", desc: "Health, nutrition, rehab & learning combined under one roof.", color: "#00A8CD" },
              { title: "Personalized Support", desc: "Individualized care plans tuned to each child's needs.", color: "#FF5271" },
              { title: "Promoting Independence", desc: "Strengthening abilities to foster natural self-reliance.", color: "#F5A623" },
              { title: "Empowering Families", desc: "Collaborating with families for long-term development.", color: "#00A8CD" }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-xl shadow-slate-950/20 text-left space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: `${card.color}25`, color: card.color }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-[#F5A623] transition-colors">{card.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ================= WHY CHOOSE US SECTION =================
const WhyChooseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#F8F9FA] to-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[2px] bg-[#FF5271]" />
            <span className="text-[#FF5271] font-bold text-xs uppercase tracking-widest">THE ABC DIFFERENCE</span>
            <span className="w-8 h-[2px] bg-[#FF5271]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B5C]">
            Why Choose ABC Centre?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            We combine expert multidisciplinary therapy, evidence-based methods, and compassionate care to empower your child's journey[cite: 1, 2].
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="p-7 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 text-left flex flex-col justify-between group relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <span className="w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: item.color }} />
                </div>

                <h3 className="font-bold text-base sm:text-lg text-[#003B5C] group-hover:text-[#FF5271] transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-[#003B5C] transition-colors">
                <span>Core Pillar</span>
                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= OUR TEAM SECTION =================
const OurTeamSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-3"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5271]" />

            <span className="text-[#FF5271] font-bold text-xs uppercase tracking-widest">
              OUR TEAM
            </span>

            <span className="w-2 h-2 rounded-full bg-[#FF5271]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003B5C] leading-tight">
            Meet the experts behind your{" "}
            <span className="text-[#FF5271] italic">
              personalized treatment
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-500 text-sm sm:text-base leading-relaxed">
            Our multidisciplinary team of experienced professionals is
            dedicated to providing personalized care and helping every child
            reach their full potential.
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembersData.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
              className="relative rounded-2xl overflow-hidden bg-[#EAE8DF]/60 border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-[400px]"
            >

              {/* Doctor Image */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/70 via-transparent to-transparent opacity-60" />
              </div>

              {/* Doctor Information */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#0F2A4A]/95 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 shadow-lg group-hover:bg-[#003B5C] transition-colors duration-300">

                <h3 className="font-serif font-bold text-white text-base leading-tight mb-1">
                  {doctor.name}
                </h3>

                <p className="text-[#38BDF8] text-xs font-semibold mb-2">
                  {doctor.role}
                </p>

                <p className="text-slate-300 text-[10px] leading-relaxed font-normal line-clamp-3">
                  {doctor.degree}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Team Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 400,
            }}
          >
            <Link
              to="/about/our-team"
              className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md shadow-[#003B5C]/20 transition-all duration-300 text-center inline-block"
            >
              View All Team Members
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
// ================= FAQ SECTION =================
const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderFaqCard = (faq, index) => {
    const isOpen = openIndex === index;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="rounded-2xl overflow-hidden border border-[#FF5271]/30 bg-white shadow-sm transition-all duration-300"
      >
        <button
          onClick={() => toggleFaq(index)}
          className="w-full flex items-center gap-4 text-left p-4 sm:p-5 transition-all duration-300 cursor-pointer bg-[#FF5271] text-white hover:bg-[#e04360]"
        >
          <span
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-base transition-transform duration-300 ${
              isOpen 
                ? 'bg-white text-[#FF5271] rotate-180' 
                : 'bg-white text-[#003B5C]'
            }`}
          >
            {isOpen ? '−' : '+'}
          </span>

          <span className="font-bold text-sm sm:text-base leading-snug flex-1 text-white">
            {faq.question}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="p-5 sm:p-6 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-white">
                {faq.answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-[#F8F9FA] relative border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[2px] bg-[#FF5271]" />
            <span className="text-[#FF5271] font-bold text-xs uppercase tracking-widest">GOT QUESTIONS?</span>
            <span className="w-8 h-[2px] bg-[#FF5271]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B5C]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about our programs, therapies, assessments, and enrolment processes.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, i) => renderFaqCard(faq, i))}
        </div>
      </div>
    </section>
  );
};
// ================= WHAT PARENTS & CLIENTS SAY (INFINITE SLOW MARQUEE LOOP) =================
const ReviewsCarouselSection = () => {
  const doubleReviews = [...reviewsData, ...reviewsData];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200/60">
      <div className="bg-[#FFFBEA] py-8 px-4 text-center border-b border-amber-100 shadow-sm mb-12">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B5C] tracking-tight">
          What Parents & Clients Say
        </h2>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <style>{`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marqueeScroll 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="animate-marquee gap-6 px-4">
          {doubleReviews.map((item, index) => (
            <div
              key={index}
              className="w-[320px] sm:w-[360px] flex-shrink-0 bg-white rounded-2xl p-6 shadow-md shadow-slate-900/5 border border-slate-100 flex flex-col justify-between hover:shadow-xl hover:border-[#00A8CD]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-[#F5A623] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="text-slate-300 text-2xl font-serif leading-none mb-1">“</div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  {item.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.bgInitial} text-white font-bold text-sm flex items-center justify-center shadow-inner`}>
                  {item.initial}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-slate-400 text-[11px] font-normal">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ================= SPEECH THERAPY VIDEO SECTION =================
const SpeechTherapyVideoSection = () => {
  return (
    <section
      className="relative py-24 px-4 sm:px-8 lg:px-12 bg-cover bg-center overflow-hidden border-t border-slate-800"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1800&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-[#003B5C]/90 backdrop-blur-sm z-0" />

      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#00A8CD]/20 rounded-full blur-3xl pointer-events-none z-0"
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF5271]/20 rounded-full blur-3xl pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#FF5271]/20 border border-[#FF5271]/40 text-[#FF5271] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF5271] animate-pulse" />
            Video Resource Center
          </span>

          <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-white tracking-wide">
            SPEECH THERAPY <span className="text-[#00A8CD] italic font-bold">RESOURCES</span>
          </h2>

          <p className="w-full max-w-3xl mx-auto text-center text-slate-200 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Explore helpful speech and communication therapy videos for children, including language development, communication skills and practical therapy activities.
          </p>

          <div className="w-24 h-1 bg-[#FF5271] mx-auto mt-6 rounded-full shadow-sm" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[950px] mx-auto">
          {speechVideosData.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white/10 backdrop-blur-md p-4 shadow-2xl border border-white/15 rounded-2xl transition duration-300 group hover:border-[#00A8CD]/50"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-950 border border-white/10 shadow-inner">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 px-2 space-y-1">
                <h3 className="text-white font-bold text-base group-hover:text-[#F5A623] transition-colors leading-snug">
                  {video.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {video.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen w-full m-0 p-0 overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full bg-[#003B5C] text-white overflow-hidden m-0 p-0 border-none shadow-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none"
        />

        <div className="w-full flex flex-col lg:flex-row items-stretch min-h-[520px] lg:min-h-[580px] m-0 p-0">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 p-6 sm:p-12 lg:pl-16 xl:pl-24 lg:pr-10 z-20 flex flex-col justify-center py-12"
          >
         <div className="mb-4">
  <span className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-xs font-bold px-5 py-2 rounded-full shadow-sm shadow-slate-950/20 backdrop-blur-sm">
    
    {/* Support - Yellow */}
    <span className="inline-flex items-center gap-1.5 text-[#F5A623]">
      <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
      Support
    </span>

    <span className="text-white/30"></span>

    {/* Learn - Pink */}
    <span className="inline-flex items-center gap-1.5 text-[#FF5271]">
      <span className="w-2 h-2 rounded-full bg-[#FF5271] animate-pulse" />
      Learn
    </span>

    <span className="text-white/30"></span>

    {/* Grow - Blue */}
    <span className="inline-flex items-center gap-1.5 text-[#00A8CD]">
      <span className="w-2 h-2 rounded-full bg-[#00A8CD] animate-pulse" />
      Grow
    </span>

  </span>
</div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[1.25] tracking-tight mb-5"
            >
              Our Team{" "}
              <span className="inline-flex items-center justify-start min-w-[130px] sm:min-w-[180px] text-[#FF5271] italic font-bold px-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={dynamicWords[currentWordIndex]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    {dynamicWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span className="whitespace-nowrap block">
                Child Development Specialists
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-normal"
            >
              Empowering every child through personalized care that nurtures development, learning, confidence, and independence.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5 mb-8 text-left max-w-md"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#F5A623]">500+</h3>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">children supported</p>
              </div>
              <div className="border-l border-white/10 pl-4">
                <h3 className="text-sm sm:text-base font-bold text-[#FF5271]">Expert Team</h3>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">qualified therapists</p>
              </div>
              <div className="border-l border-white/10 pl-4">
                <h3 className="text-sm sm:text-base font-bold text-[#00A8CD]">Personalized</h3>
                <p className="text-[11px] sm:text-xs text-slate-300 font-medium mt-0.5">child-focused care</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
              <div className="pt-3">
                <Link 
                  to="/book-a-free-consult" 
                  className="bg-[#FF5271] hover:bg-[#003B5C] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md shadow-[#003B5C]/20 transition-all duration-300 text-center inline-block"
                >
                  Start Therapy Today
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="w-full lg:w-1/2 relative min-h-[380px] lg:min-h-[580px] m-0 p-0">
            <img src={heroImg} alt="Child Therapy Session" className="absolute inset-0 w-full h-full object-cover object-center m-0 p-0" />
           
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#003B5C] via-[#003B5C]/20 to-transparent hidden lg:block pointer-events-none" />
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl shadow-slate-900/15 border border-white/50 hidden sm:flex items-center gap-3 text-xs font-bold text-[#003B5C] z-30">
              <span className="w-3 h-3 rounded-full bg-[#00A8CD] animate-pulse" />
              <span>Active Child Sessions</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT US SECTION ================= */}
      <section className="py-20 bg-gradient-to-b from-white via-[#F8F9FA] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-[#00A8CD]/10 border border-[#00A8CD]/30 text-[#00A8CD] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#00A8CD] animate-pulse" />
                  About Our Center
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#003B5C] leading-tight">
                Empowering Every Child’s <br className="hidden sm:block"/>
                <span className="text-[#FF5271] italic font-bold">Growth & Potential</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                <strong className="text-[#003B5C]">ABC Autism Behavioral Center</strong> is a multidisciplinary healthcare, rehabilitation, education, and child development centre dedicated to helping individuals achieve better health, development, learning, independence, and quality of life.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Our team of qualified professionals—including Nutrition & Dietetics, Physiotherapy, Speech & Language Therapy, Occupational Therapy & Sensory Integration, Special Education, ABA therapy and Early Childhood Education—works collaboratively to provide personalized, evidence-based care under one roof.
              </p>

              <div className="pt-3">
                <Link 
                  to="/about" 
                  className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md shadow-[#003B5C]/20 transition-all duration-300 text-center inline-block"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-5 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-900/15 border-4 border-white">
                <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000" alt="Therapy Session" className="w-full h-[450px] sm:h-[500px] object-cover object-center transform hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= OUR SERVICES ================= */}
      <section className="py-20 bg-[#FFFDF9] border-t border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="bg-[#FFF3CD] text-[#856404] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#FFEEBA]">
                OUR SERVICES
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B5C]"
            >
              Our Services & Expert Care in <span className="text-[#F5A623]">ABC Center</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-600 text-base sm:text-lg font-medium"
            >
              Transformative Care for Your Child's Recovery Journey
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col justify-between group"
              >
                <div>
                  <div className="p-4 pb-0">
                    <div className="relative h-56 rounded-2xl overflow-hidden shadow-sm">
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                    </div>
                  </div>

                  <div className="p-6 pb-3">
                    <h3 className="text-xl font-bold text-[#003B5C] group-hover:text-[#00A8CD] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <Link 
                    to={service.path}
                    className="text-center bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#003B5C] font-semibold py-3 px-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center"
                  >
                    Learn More
                  </Link>
                  
                  <Link 
                    to="/book-a-free-consult" 
                    className="bg-[#003B5C] hover:bg-[#FF5271] text-white text-xs sm:text-sm font-bold py-3 px-3 rounded-xl shadow-md transition-all duration-300 text-center block flex items-center justify-center"
                  >
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= DUAL CARE SHOWCASE SECTION ================= */}
      <DualCareShowcaseSection />

      {/* ================= OUR MISSION SECTION ================= */}
      <MissionSection />

      {/* ================= CONDITIONS WE SUPPORT SECTION ================= */}
      <ConditionsSection />

      {/* ================= WHY CHOOSE US SECTION ================= */}
      <WhyChooseSection />

      {/* ================= OUR TEAM SECTION ================= */}
      <OurTeamSection />

      {/* ================= FAQ SECTION ================= */}
      <FaqSection />

      {/* ================= WHAT PARENTS & CLIENTS SAY ================= */}
      <ReviewsCarouselSection />

      {/* ================= SPEECH THERAPY VIDEO RESOURCE SECTION ================= */}
      <SpeechTherapyVideoSection />

    </div>
  );
}

export default Home;