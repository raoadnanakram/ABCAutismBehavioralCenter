import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Award,
  Heart,
  Users,
  ShieldCheck,
  Sparkles,
  X,
  User,
  CheckCircle2,
  Eye,
  ArrowRight
} from "lucide-react";
import { teamMembers } from "../data/teamData";

// Image Imports
import drBilal from "../assets/dr-Bilal.jpeg";
import drMonina from "../assets/dr-Monina.jpeg";

// Categories
const categories = [
  "ALL EXPERTS",
  "Speech Therapy",
  "Occupational Therapy & Physiotherapy",
  "ABA Therapy & Psychology",
  "Special Education",
  "Montessori & Early Childhood Education",
  "Receptionists",
  "Mentors",
  "Legal Advisor",
];

// Helper to identify legal members
const isLegalMember = (member) => {
  const cat = (member.category || "").toLowerCase();
  const des = (member.designation || "").toLowerCase();
  const spec = (member.specialization || "").toLowerCase();
  return (
    cat.includes("legal") ||
    des.includes("advocate") ||
    des.includes("legal advisor") ||
    spec.includes("legal services")
  );
};

// Map legal members category automatically
const allMembers = teamMembers.map((member) =>
  isLegalMember(member) ? { ...member, category: "Legal Advisor" } : member
);

// Leadership Data
const leadershipData = [
  {
    id: "lead-1",
    name: "Dr. Muhammad Bilal Bhatti",
    designation: "Chairman — ABC Autism Behavioral Center",
    category: "Executive Leadership",
    image: drBilal,
    qualification:
      "PhD Speech therapy from Tehran University of Medical sciences (Continue)",
    experience: "5+ Years",
    specialization: "Center Administration & Child Care Advocacy",
    areasOfExpertise: [
      "Healthcare Leadership",
      "Inclusive Center Development",
      "Family Advocacy",
      "Autism-Related Communication Support",
      "Adult Communication Disorders",
      "Dysphagia & Swallowing Management",
    ],
    bio: `It is my privilege to welcome you to the Autism Behavioral Center (ABC). As a Speech and Language Pathologist and educator, I have dedicated my professional journey to supporting children and families with communication, developmental, behavioral, and learning needs.

ABC was established with a vision to provide evidence-based, child-centered, and multidisciplinary services in a safe, nurturing, and supportive environment. Our goal is not only to address developmental challenges but also to help every child build confidence, independence, communication skills, and meaningful participation in everyday life.

At ABC, we believe that every child has unique strengths and potential. Through collaboration among professionals, parents, caregivers, and educators, we strive to create individualized pathways that support each child's development.

I look forward to building ABC into a trusted center where children receive quality care, families feel supported, and every child is given the opportunity to reach their fullest potential.

Dr. Muhammad Bilal Bhatti
Chairman, Autism Behavioral Center (ABC)`,
    availability: "Monday – Friday (9:00 AM – 5:00 PM)",
  },
  {
    id: "lead-2",
    name: "Dn. Momna",
    designation: "CEO — Consultant Nutritionist & Dietitian",
    category: "Executive Leadership",
    image: drMonina,
    qualification:
      "MPhil Food Science (FST, UET), Doctor of Nutrition & Dietetics (DND, UVAS)",
    experience: "2+ Years",
    specialization: "Consultant Nutritionist & Dietitian",
    areasOfExpertise: [
      "Disease-Specific & Therapeutic Nutrition",
      "Weight Management",
      "Pediatric Nutrition & Growth",
    ],
    bio: `When I envisioned ABC Centre, I wanted to create more than a place where people receive individual services. I wanted to build a centre where medical nutrition therapy, rehabilitation, education and child development come together to provide truly personalized care.

My journey as a Nutritionist & Dietitian, researcher, and healthcare professional has taught me that every individual is unique, and meaningful progress begins when we understand their needs as a whole. Through ABC Centre, my vision is to create a compassionate, multidisciplinary environment where every child, adult, and family feels supported, understood, and empowered to reach their fullest potential.

For me, ABC Centre is not just a centre—it is a commitment to better health, stronger development, greater independence, and brighter futures.`,
    availability: "Monday – Saturday (10:00 AM – 4:00 PM)",
  },
];

export default function OurTeam() {
  const [selectedCategory, setSelectedCategory] = useState("ALL EXPERTS");
  const [activeProfileModal, setActiveProfileModal] = useState(null);
  const navigate = useNavigate();

  // Filter team members based on category selection
  const filteredMembers = allMembers.filter((member) => {
    if (selectedCategory === "ALL EXPERTS") return true;

    const catLower = selectedCategory.toLowerCase();
    const memCatLower = (member.category || "").toLowerCase();
    const memSpecLower = (member.specialization || "").toLowerCase();

    if (catLower.includes("legal")) return isLegalMember(member);
    if (isLegalMember(member)) return false;

    if (
      catLower.includes("speech") &&
      (memCatLower.includes("speech") ||
        memSpecLower.includes("speech") ||
        memSpecLower.includes("language"))
    )
      return true;

    if (
      catLower.includes("occupational") &&
      (memCatLower.includes("occupational") ||
        memSpecLower.includes("sensory") ||
        memSpecLower.includes("motor"))
    )
      return true;

    if (
      catLower.includes("physiotherapy") &&
      (memCatLower.includes("physio") || memSpecLower.includes("physio"))
    )
      return true;

    if (
      catLower.includes("aba") &&
      (memCatLower.includes("aba") ||
        memSpecLower.includes("behavior") ||
        memSpecLower.includes("behaviour"))
    )
      return true;

    if (
      catLower.includes("psychology") &&
      (memCatLower.includes("psychology") ||
        memSpecLower.includes("psychology"))
    )
      return true;

    if (
      catLower.includes("special education") &&
      (memCatLower.includes("special education") ||
        memSpecLower.includes("special"))
    )
      return true;

    if (
      catLower.includes("montessori") &&
      (memCatLower.includes("montessori") ||
        memSpecLower.includes("montessori"))
    )
      return true;

    if (
      catLower.includes("receptionist") &&
      (memCatLower.includes("receptionist") ||
        memSpecLower.includes("receptionist"))
    )
      return true;

    if (
      catLower.includes("mentor") &&
      (memCatLower.includes("mentor") || memSpecLower.includes("mentor"))
    )
      return true;

    return memCatLower === catLower;
  });

  // Booking navigation
  const handleBooking = (name, category) => {
    const expertSlug = (name || "").replace(/\s+/g, "-");
    const serviceSlug = (category || "").replace(/\s+/g, "-");
    navigate(
      `/book-a-free-consult?expert=${expertSlug}&service=${serviceSlug}`
    );
  };

  return (
    <div className="w-full font-sans text-[#334155] bg-[#F8F9FA] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#003B5C] text-white py-24 lg:py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#003B5C]/95 via-[#003B5C]/90 to-[#00A8CD]/75 z-0" />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-[#00A8CD]/20 rounded-full blur-3xl pointer-events-none z-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto space-y-4"
        >
          <span className="bg-[#00A8CD]/20 text-[#00A8CD] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#00A8CD]/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            ABC AUTISM & BEHAVIORAL CENTER
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            OUR <span className="text-[#00A8CD]">TEAM</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Meet the leadership and professionals dedicated to supporting
            every child's development, growth, and well-being with specialized
            care.
          </p>
        </motion.div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-3"
        >
          <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-widest bg-[#00A8CD]/10 px-3 py-1 rounded-full">
            MEET OUR PROFESSIONALS
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003B5C]">
            Dedicated to Your Child's Growth
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            “At ABC Autism & Behavioral Center, our team brings together
            leaders and specialists from different areas of expertise to
            provide personalized and compassionate support for every child.”
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 max-w-3xl mx-auto">
          {[
            {
              title: "Experienced Professionals",
              icon: <Award className="w-5 h-5 text-[#00A8CD]" />,
            },
            {
              title: "Personalized Support",
              icon: <Heart className="w-5 h-5 text-[#FF5271]" />,
            },
            {
              title: "Family-Centered Care",
              icon: <ShieldCheck className="w-5 h-5 text-[#003B5C]" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-3 hover:border-[#00A8CD] transition-colors"
            >
              {item.icon}
              <span className="font-bold text-xs text-[#003B5C]">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EXECUTIVE LEADERSHIP */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-widest bg-[#00A8CD]/10 px-3 py-1 rounded-full">
            EXECUTIVE LEADERSHIP
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#003B5C]">
            Visionary Guidance & Leadership
          </h2>
        </div>

        <div className="space-y-8">
          {leadershipData.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div
                className={`lg:col-span-7 space-y-4 ${
                  index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <span className="bg-[#E2E8F0] text-[#003B5C] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  LEADERSHIP SPOTLIGHT
                </span>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#003B5C]">
                    {leader.name}
                  </h3>

                  <p className="text-[#00A8CD] font-bold text-xs sm:text-sm mt-1">
                    {leader.designation}
                  </p>
                </div>

                <blockquote className="text-slate-600 text-xs sm:text-sm italic border-l-4 border-[#FF5271] pl-4 py-1 leading-relaxed whitespace-pre-line line-clamp-4">
                  {leader.bio}
                </blockquote>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveProfileModal(leader)}
                    className="bg-[#003B5C] hover:bg-[#00A8CD] text-white font-bold px-6 py-3 rounded-full text-xs transition shadow-md shadow-[#003B5C]/20 cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    VIEW PROFILE
                  </button>

                  <button
                    onClick={() =>
                      handleBooking(leader.name, "Leadership")
                    }
                    className="bg-[#FF5271] hover:bg-[#e04360] text-white font-bold px-6 py-3 rounded-full text-xs transition shadow-md shadow-[#FF5271]/20 cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book Appointment with {leader.name.split(" ")[0]}
                  </button>
                </div>
              </div>

              <div
                className={`lg:col-span-5 relative flex justify-center ${
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative w-full max-w-sm h-80 rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-[#003B5C] via-[#00A8CD] to-[#FF5271] shadow-lg group">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CATEGORY TABS */}
      <section className="py-12 bg-[#F1F5F9] border-y border-slate-200 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center space-y-3 mb-8">
          <span className="text-[#00A8CD] font-bold text-xs uppercase tracking-widest bg-[#00A8CD]/10 px-3 py-1 rounded-full">
            OUR SPECIALISTS
          </span>

          <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-[#003B5C]">
            Explore Our Multidisciplinary Experts
          </h3>

          <p className="text-slate-600 text-xs sm:text-sm">
            Explore our team members by their area of expertise.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                  px-5 py-3
                  rounded-full
                  text-xs sm:text-sm
                  font-bold
                  whitespace-normal
                  text-center
                  transition-all duration-300
                  cursor-pointer
                  border-2
                  ${
                    isActive
                      ? "bg-[#003B5C] text-white border-[#003B5C] shadow-lg shadow-[#003B5C]/20 scale-[1.02]"
                      : "bg-white text-[#003B5C] border-slate-200 hover:border-[#00A8CD] hover:text-[#00A8CD] hover:bg-[#00A8CD]/5"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. TEAM MEMBERS GRID */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Active Filter:
            <span className="font-bold text-[#003B5C] ml-1.5 bg-slate-200/70 px-3 py-1 rounded-full text-xs">
              {selectedCategory}
            </span>
          </p>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => {
              const memCat = (member.category || "").toLowerCase();
              const memDes = (member.designation || "").toLowerCase();
              const isNonBookingMember =
                memCat.includes("receptionist") ||
                memCat.includes("mentor") ||
                memCat.includes("legal") ||
                memDes.includes("receptionist") ||
                memDes.includes("mentor") ||
                memDes.includes("advocate");

              return (
                <motion.div
                  key={member.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#00A8CD]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area with Badge */}
                    <div className="relative h-72 w-full bg-slate-100 overflow-hidden">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200">
                          <Users className="w-14 h-14 opacity-40" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-white/90 backdrop-blur-md text-[#003B5C] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 shadow-md">
                          {member.category || "Specialist"}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-2.5">
                      <h4 className="font-serif font-bold text-[#003B5C] text-xl group-hover:text-[#00A8CD] transition-colors leading-snug">
                        {member.name}
                      </h4>

                      <p className="text-[#00A8CD] font-bold text-xs uppercase tracking-wider">
                        {member.designation}
                      </p>

                      <p className="text-slate-500 text-xs font-light line-clamp-2 pt-2 border-t border-slate-100">
                        {member.specialization ||
                          member.qualification ||
                          "Professional Pediatric Care Specialist"}
                      </p>
                    </div>
                  </div>

                  {/* Dual Action Buttons: Visit Profile & Book Appointment */}
                  <div className="p-6 pt-0 space-y-2">
                    <button
                      onClick={() => setActiveProfileModal(member)}
                      className="w-full bg-[#003B5C]/10 hover:bg-[#003B5C] text-[#003B5C] hover:text-white font-bold py-2.5 px-4 rounded-full text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-[#003B5C]/20"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Visit Profile
                    </button>

                    {!isNonBookingMember && (
                      <button
                        onClick={() =>
                          handleBooking(
                            member.name,
                            member.category || "Specialist"
                          )
                        }
                        className="w-full bg-[#FF5271] hover:bg-[#e04360] text-white font-bold py-2.5 px-4 rounded-full text-xs transition-all duration-300 shadow-md shadow-[#FF5271]/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Book Appointment
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00A8CD]/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-[#00A8CD]" />
            </div>

            <h3 className="font-serif text-xl font-bold text-[#003B5C] mb-2">
              No Experts Found
            </h3>

            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              No team member is currently listed under this category. Please check
              other categories or view all experts.
            </p>

            <button
              onClick={() => setSelectedCategory("ALL EXPERTS")}
              className="bg-[#003B5C] hover:bg-[#00A8CD] text-white font-bold px-6 py-3.5 rounded-full text-xs transition shadow-md shadow-[#003B5C]/20 cursor-pointer"
            >
              VIEW ALL EXPERTS
            </button>
          </div>
        )}
      </section>

      {/* 6. WHY CHOOSE OUR TEAM */}
      <section className="py-20 bg-[#F1F5F9] border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12 space-y-2"
          >
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#003B5C]">
              WHY CHOOSE OUR TEAM
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Experienced Professionals",
                desc: "Qualified professionals committed to specialized care.",
                icon: <Award className="w-6 h-6 text-[#00A8CD]" />,
              },
              {
                title: "Personalized Care",
                desc: "Support designed around each child's needs.",
                icon: <Heart className="w-6 h-6 text-[#FF5271]" />,
              },
              {
                title: "Collaborative Approach",
                desc: "Professionals work together to support development.",
                icon: <Users className="w-6 h-6 text-[#F5A623]" />,
              },
              {
                title: "Family Support",
                desc: "Families remain an important part of the care journey.",
                icon: <ShieldCheck className="w-6 h-6 text-[#003B5C]" />,
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#00A8CD] shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 text-left group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#00A8CD]/10 flex items-center justify-center transition-colors duration-300"
                >
                  {card.icon}
                </motion.div>

                <h3 className="font-serif font-bold text-[#003B5C] text-sm group-hover:text-[#00A8CD] transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROFILE MODAL */}
      <AnimatePresence>
        {activeProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B2545]/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 30,
              }}
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-auto max-h-[92vh] flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProfileModal(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT SIDE EDITORIAL CARD */}
              <div className="lg:w-5/12 relative min-h-[320px] lg:min-h-full bg-slate-900 flex flex-col justify-end p-8 text-white overflow-hidden">
                <div className="absolute inset-0">
                  {activeProfileModal.image ? (
                    <img
                      src={activeProfileModal.image}
                      alt={activeProfileModal.name}
                      className="w-full h-full object-cover object-top opacity-90 scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                      <Users className="w-20 h-20 opacity-30" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/50 to-transparent" />
                </div>

                <div className="relative z-10 space-y-2">
                  <span className="bg-[#00A8CD] text-white text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest inline-block shadow-md">
                    {activeProfileModal.category || "Specialist"}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {activeProfileModal.name}
                  </h3>

                  <p className="text-[#DFF4F4] text-xs font-medium tracking-wide">
                    {activeProfileModal.designation}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE DETAILS */}
              <div className="lg:w-7/12 p-6 sm:p-10 overflow-y-auto space-y-6 flex flex-col justify-between bg-white text-[#334155]">
                <div className="space-y-6">
                  {/* Qualification & Experience */}
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-xs">
                    <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-slate-200/60">
                      <span className="text-slate-400 block uppercase tracking-wider font-semibold text-[10px]">
                        Qualification
                      </span>
                      <strong className="text-[#003B5C] font-bold text-xs sm:text-sm block mt-0.5">
                        {activeProfileModal.qualification ||
                          "Professional Degree"}
                      </strong>
                    </div>

                    <div className="bg-[#F8F9FA] p-3.5 rounded-2xl border border-slate-200/60">
                      <span className="text-slate-400 block uppercase tracking-wider font-semibold text-[10px]">
                        Experience
                      </span>
                      <strong className="text-[#003B5C] font-bold text-xs sm:text-sm block mt-0.5">
                        {activeProfileModal.experience || "3+ Years"}
                      </strong>
                    </div>
                  </div>

                  {/* Areas of Expertise */}
                  {activeProfileModal.areasOfExpertise &&
                    activeProfileModal.areasOfExpertise.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="font-bold text-[#003B5C] text-xs uppercase tracking-widest">
                          Areas of Expertise
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {activeProfileModal.areasOfExpertise.map(
                            (exp, i) => (
                              <span
                                key={i}
                                className="bg-[#F1F5F9] text-[#003B5C] text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200/80 flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A8CD]" />
                                {exp}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Biography */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#003B5C] text-xs uppercase tracking-widest">
                      Professional Biography
                    </h4>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-light">
                      {activeProfileModal.bio ||
                        `${activeProfileModal.name} is a dedicated professional at ABC Autism & Behavioral Center, bringing evidence-based practices to assist children and families in achieving developmental growth and independence.`}
                    </p>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100 mt-6">
                  {!isLegalMember(activeProfileModal) &&
                    !(
                      (activeProfileModal.category || "")
                        .toLowerCase()
                        .includes("receptionist") ||
                      (activeProfileModal.category || "")
                        .toLowerCase()
                        .includes("mentor")
                    ) && (
                      <button
                        onClick={() => {
                          const mem = activeProfileModal;
                          setActiveProfileModal(null);
                          handleBooking(
                            mem.name,
                            mem.category || "Specialist"
                          );
                        }}
                        className="flex-1 bg-[#FF5271] hover:bg-[#e04360] text-white font-bold py-3.5 px-6 rounded-xl text-xs shadow-lg shadow-[#FF5271]/25 transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        BOOK AN APPOINTMENT
                      </button>
                    )}

                  <button
                    onClick={() => setActiveProfileModal(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-xl text-xs transition cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}