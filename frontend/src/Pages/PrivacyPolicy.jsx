import React from 'react';
import PolicyLayout from '../Components/PolicyLayout';

/* ==========================================================================
   PRIVACY & CENTRE POLICIES - ABC Autism Behavioral Center
   Most of this page is your own Centre Policies text.
   The section "Information you send through our website" was added because
   your policies do not mention the website forms; delete it if you do not want it.
   Before publishing, have your Legal Advisor check it, and have clinical
   policies (psychology, dysphagia, NG tube feeding) approved by qualified professionals.
   ========================================================================== */

const UPDATED = '30 October 2026'; // change this date whenever you edit the text

const SECTIONS = [
  {
    id: 'commitment',
    icon: '💙',
    title: 'Our Policies & Commitment',
    body: [
      'At ABC Autism Behavioral Center, the safety, dignity, privacy, and well-being of every client are our priorities. We follow structured policies designed to support ethical clinical practice, individualized care, inclusive education, effective family collaboration, and a safe, welcoming environment.',
      'Our multidisciplinary team works within its professional qualifications and scope of practice, maintains appropriate records, respects client confidentiality, and collaborates with families to support meaningful progress.',
      'We encourage parents, caregivers, and clients to familiarize themselves with our policies regarding appointments, consent, fees, confidentiality, safeguarding, and service delivery.',
    ],
  },
  {
    id: 'child-protection',
    icon: '🛡️',
    title: 'Child Protection & Safeguarding Policy',
    body: [
      { list: [
        'Protect every child from abuse, neglect, exploitation, humiliation, and unsafe practices.',
        'Prohibit physical punishment, threats, and degrading treatment.',
        'Establish procedures for reporting and responding to safeguarding concerns.',
        'Require appropriate supervision and safe child handover procedures.',
      ] },
    ],
  },
  {
    id: 'clinical-assessment',
    icon: '🩺',
    title: 'Clinical Assessment & Treatment Policy',
    body: [
      { list: [
        'Conduct appropriate initial assessments before developing intervention plans.',
        'Set individualized, measurable goals and review progress regularly.',
        'Obtain informed consent from the appropriate person before treatment.',
        'Refer clients for specialist assessment when needs exceed the centre’s scope of practice.',
      ] },
    ],
  },
  {
    id: 'parent-involvement',
    icon: '👪',
    title: 'Parent & Caregiver Involvement Policy',
    body: [
      { list: [
        'Encourage parental participation in goal setting and progress reviews.',
        'Share home-practice recommendations and relevant progress updates.',
        'Communicate concerns respectfully and promptly.',
        'Obtain appropriate consent before sharing information with schools or external professionals.',
      ] },
    ],
  },
  {
    id: 'data-protection',
    icon: '🔒',
    title: 'Confidentiality & Data Protection Policy',
    body: [
      { list: [
        'Keep client files, assessments, medical information, and contact details secure.',
        'Limit access to authorized personnel.',
        'Obtain appropriate consent for photographs, recordings, testimonials, and promotional content.',
        'Follow applicable privacy and data-protection requirements.',
      ] },
    ],
  },
  {
    id: 'attendance',
    icon: '📅',
    title: 'Appointment & Attendance Policy',
    body: [
      { list: [
        'Require advance booking wherever applicable.',
        'Set clear rules for late arrivals, cancellations, missed sessions, and make-up sessions.',
        'Maintain accurate attendance records.',
        'Communicate schedule changes to families in a timely manner.',
      ] },
    ],
  },
  {
    id: 'fees-refunds',
    icon: '💳',
    title: 'Fees, Packages & Refund Policy',
    body: [
      { list: [
        'Publish service fees and package inclusions transparently.',
        'State package validity, payment deadlines, and applicable cancellation charges.',
        'Explain how refunds, unused sessions, and extensions are handled.',
        'Obtain agreement to charges before adding optional services or supplements.',
      ] },
    ],
  },
  {
    id: 'clinical-policies',
    icon: '🧠',
    title: 'Clinical and therapy-specific policies',
    body: [
      'Because ABC provides multidisciplinary services, each service follows its own standards.',
      { table: {
        head: ['Policy', 'Key requirements'],
        rows: [
          ['Speech & Language Therapy', 'Assessment, individualized goals, documentation, consent, and communication support'],
          ['ABA & Psychology', 'Ethical practice, dignity, positive behavior support, appropriate assessment, and avoidance of harmful interventions'],
          ['Occupational Therapy & Sensory Integration', 'Functional assessment, sensory and environmental safety, individualized goals, and progress reviews'],
          ['Physiotherapy', 'Physical assessment, contraindication screening, safe exercise practices, and clinical documentation'],
          ['Nutrition & Dietetics', 'Dietary assessment, allergy screening, individualized plans, appropriate supplement recommendations, and follow-up'],
          ['Dysphagia & NG Tube Feeding', 'Qualified personnel, swallowing and feeding risk assessment, safe feeding procedures, emergency escalation, and scope-of-practice compliance'],
          ['Special Education', 'Individualized educational plans, inclusive learning, progress monitoring, and respectful teaching'],
          ['Montessori & Early Childhood Education', 'Age-appropriate learning, safe classroom arrangements, positive discipline, and developmental observation'],
          ['Day Care', 'Supervision, attendance, authorized collection, hygiene, medication arrangements, and emergency procedures'],
        ],
      } },
    ],
  },
  {
    id: 'staff-operations',
    icon: '🏥',
    title: 'Staff and operational policies',
    body: [
      'These policies help standardize the centre’s daily operations.',
      { labels: true, list: [
        'Staff recruitment and credential verification: Verify qualifications, registrations where required, references, and suitability for the role.',
        'Professional code of conduct: Require respectful communication, appropriate boundaries, punctuality, confidentiality, and ethical practice.',
        'Infection prevention and hygiene: Set handwashing, cleaning, disinfection, food hygiene, and illness-management procedures.',
        'Emergency and incident management: Define responses to injuries, choking, medical emergencies, fire, missing children, and other incidents.',
        'Complaints and feedback: Provide a documented, fair process for receiving, investigating, and resolving complaints.',
        'Clinical documentation: Maintain assessment reports, consent forms, treatment plans, session notes, progress reviews, and referrals.',
        'Equipment and facility safety: Inspect therapy equipment, toys, sensory equipment, furniture, and accessible areas regularly.',
        'Interdisciplinary coordination: Establish appropriate case discussions, referrals, shared goals, and authorized information exchange between professionals.',
      ] },
    ],
  },
  {
    id: 'website-information',
    icon: '🌐',
    title: 'Information you send through our website',
    body: [
      { list: [
        'Our appointment, contact and career forms collect only what you type in, for example your name, phone number, email, your child’s name, the service you need, a message, or (for job applications) your degree, experience and CV.',
        'We use this information to reply to you, arrange appointments, send you a confirmation email and review job applications. We do not sell it or use it for third-party advertising.',
        'It is stored on secure servers and can be seen only by authorised staff through a login-protected area. CVs are accepted only as PDF or Word files.',
      ] },
      { note: 'Please do not include detailed medical records in the message boxes. Our team will ask for what is needed during your visit. To ask us to correct or delete your information, please use our Contact page.' },
    ],
  },
  {
    id: 'contact',
    icon: '📞',
    title: 'Contact us',
    body: [
      'For further information or clarification, please contact ABC Autism Behavioral Center.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      current="/privacy-policy"
      crumb="Privacy & Policies"
      eyebrow="Support • Learn • Grow"
      title="Privacy &"
      accent="Policies"
      intro="The safety, dignity, privacy, and well-being of every client are our priorities. Here is how we protect them."
      updated={UPDATED}
      sections={SECTIONS}
      metaTitle="Privacy & Centre Policies | ABC Autism Behavioral Center"
      metaDescription="How ABC Autism Behavioral Center protects children and families: safeguarding, confidentiality, clinical standards, attendance, fees and website privacy."
      ctaTitle="Questions about our policies?"
      ctaText="Our team is happy to explain how we keep your child and your information safe."
    />
  );
}