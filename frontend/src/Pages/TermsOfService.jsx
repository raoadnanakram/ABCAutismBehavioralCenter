import React from 'react';
import PolicyLayout from '../Components/PolicyLayout';

/* ==========================================================================
   TERMS & CONDITIONS - ABC Autism Behavioral Center
   Sections 1 to 18 are your own text. Section 19 (website and online forms)
   was added because this page lives on the website; delete it if you do not want it.
   Before publishing, have your Legal Advisor check it against your centre's
   registration, fees, cancellation and clinical consent procedures.
   ========================================================================== */

const UPDATED = '30 October 2026'; // change this date whenever you edit the text

const SECTIONS = [
  {
    id: 'registration',
    icon: '🧾',
    title: 'Registration and Initial Assessment',
    body: [
      'By registering for or using our services, parents, guardians, clients, and caregivers agree to the following terms and conditions.',
      { list: [
        'A completed registration form and accurate client information must be provided before services begin.',
        'Parents or legal guardians must provide relevant medical, developmental, educational, dietary, and therapy history.',
        'Initial assessments may be required to identify individual needs, establish goals, and recommend suitable services.',
        'The centre reserves the right to recommend an alternative service or referral when a client’s needs fall outside its available expertise or facilities.',
      ] },
    ],
  },
  {
    id: 'treatment-plans',
    icon: '🎯',
    title: 'Individualized Treatment and Development Plans',
    body: [
      { list: [
        'Therapy and developmental plans will be designed according to the client’s individual needs, abilities, and goals.',
        'Progress may vary from person to person, and specific outcomes or timelines cannot be guaranteed.',
        'Plans may be reviewed and modified according to assessment findings and progress.',
        'Parents and caregivers are encouraged to participate in reviews and follow recommended home activities.',
      ] },
    ],
  },
  {
    id: 'appointments',
    icon: '📅',
    title: 'Appointments and Punctuality',
    body: [
      { list: [
        'Appointments should be booked in advance.',
        'Clients are requested to arrive on time for scheduled sessions.',
        'Late arrival may result in a shortened session if the next appointment is scheduled.',
        'Missed appointments may be considered utilized sessions unless a cancellation or rescheduling exception is approved by the centre.',
      ] },
    ],
  },
  {
    id: 'cancellation',
    icon: '🔁',
    title: 'Cancellation and Rescheduling Policy',
    body: [
      { list: [
        'At least 24 hours’ notice should be provided for cancellations or rescheduling.',
        'Repeated last-minute cancellations or unexplained absences may affect session continuity and scheduling.',
        'Make-up sessions are subject to availability and centre approval.',
        'The centre may reschedule appointments due to staff availability, emergencies, or unforeseen circumstances.',
      ] },
    ],
  },
  {
    id: 'fees',
    icon: '💳',
    title: 'Fees, Packages, and Payments',
    body: [
      { list: [
        'Fees must be paid according to the agreed service plan or package.',
        'Package inclusions, session frequency, validity, and any applicable additional charges will be communicated before purchase.',
        'Packages are intended for the specified services and cannot be transferred to another client without written approval.',
        'Refunds, unused sessions, package extensions, and exceptional circumstances will be handled according to the centre’s disclosed payment policy and applicable law.',
        'Any fee revisions will be communicated to clients in advance.',
      ] },
    ],
  },
  {
    id: 'parent-responsibilities',
    icon: '👪',
    title: 'Parent and Caregiver Responsibilities',
    body: [
      { list: [
        'Parents or guardians must provide complete and accurate information relevant to the client’s care.',
        'Any changes in medical condition, medication, behavior, allergies, dietary restrictions, or emergency contact details must be reported promptly.',
        'Caregivers should follow appropriate home-practice recommendations when advised by the relevant professional.',
        'Parents and caregivers must treat staff, other families, and clients respectfully.',
      ] },
    ],
  },
  {
    id: 'child-safety',
    icon: '🛡️',
    title: 'Child Safety and Supervision',
    body: [
      { list: [
        'Children must be accompanied by an authorized adult during arrival and departure unless a separate arrangement has been agreed upon in writing.',
        'The centre’s drop-off and pick-up procedures must be followed.',
        'Parents or guardians must provide details of authorized persons collecting a child.',
        'Day care and supervised-program arrangements will be governed by the specific supervision, attendance, and handover policies communicated by the centre.',
        'Any immediate safety concern must be reported to the centre’s management.',
      ] },
    ],
  },
  {
    id: 'confidentiality',
    icon: '🔒',
    title: 'Confidentiality and Privacy',
    body: [
      { list: [
        'Client records, assessments, therapy plans, and personal information will be handled confidentially and accessed only as authorized or otherwise permitted by applicable law.',
        'Information may be shared with relevant professionals involved in a client’s care when appropriately authorized or legally permitted.',
        'Photographs, videos, testimonials, or case studies will not be used for promotional purposes without the required informed consent.',
        'Clients and families are requested to respect the privacy of other individuals at the centre.',
      ] },
    ],
  },
  {
    id: 'medical-limits',
    icon: '🩺',
    title: 'Medical and Professional Limitations',
    body: [
      { list: [
        'Services are provided within the scope of practice and qualifications of the relevant professionals.',
        'Therapy, nutrition counselling, and developmental support do not replace emergency medical care or other specialist services when required.',
        'Medication changes, medical diagnoses, and medical treatment decisions must be handled by appropriately qualified healthcare professionals.',
        'Clients may be referred to another healthcare provider when clinically appropriate.',
      ] },
    ],
  },
  {
    id: 'nutrition',
    icon: '🥗',
    title: 'Nutrition and Supplementation',
    body: [
      { list: [
        'Nutrition plans are developed according to individual needs, available assessment information, and relevant clinical considerations.',
        'Supplements are recommended only when appropriate and should be used according to professional advice and product instructions.',
        'Supplement costs are included only when explicitly stated in the selected package.',
        'Parents and caregivers must disclose allergies, intolerances, current supplements, medications, and relevant medical conditions.',
        'No nutritional supplement or diet plan guarantees a specific medical or developmental outcome.',
      ] },
    ],
  },
  {
    id: 'clinical-services',
    icon: '🗣️',
    title: 'Physiotherapy, Speech Therapy, and Other Clinical Services',
    body: [
      { list: [
        'Clients must participate in assessments and activities to the extent appropriate for their abilities and safety.',
        'Relevant medical history, precautions, and changes in condition must be disclosed before treatment.',
        'Home exercises and practice activities should be performed according to professional instructions.',
        'Progress depends on individual circumstances, attendance, and other relevant factors; results cannot be guaranteed.',
      ] },
    ],
  },
  {
    id: 'dysphagia',
    icon: '🍼',
    title: 'Dysphagia Management and Feeding Support',
    body: [
      { list: [
        'Swallowing and feeding interventions require appropriate clinical assessment.',
        'Recommendations for oral feeding, modified food textures, or feeding equipment will be made according to the professional’s scope and assessment.',
        'Enteral feeding and nasogastric (NG) tube-related support must be provided only by appropriately qualified personnel within their scope of practice and applicable regulations.',
        'Any signs of choking, breathing difficulty, or other medical emergency require immediate appropriate medical assistance.',
      ] },
    ],
  },
  {
    id: 'behavior-education',
    icon: '🧩',
    title: 'Behavior, Education, and Developmental Support',
    body: [
      { list: [
        'Behavioral interventions and educational activities will be individualized and designed to respect each client’s dignity, safety, and developmental needs.',
        'Parents and caregivers will be informed about relevant goals and progress as appropriate.',
        'The centre does not guarantee a particular academic, behavioral, communication, or developmental outcome.',
        'Concerns about a client’s treatment, learning plan, or well-being may be raised with the relevant professional or centre management.',
      ] },
    ],
  },
  {
    id: 'conduct',
    icon: '🤝',
    title: 'Respectful Conduct',
    body: [
      { list: [
        'Abusive language, harassment, threats, discrimination, or unsafe behavior toward clients, families, or staff will not be tolerated.',
        'The centre may take reasonable steps to protect the safety and well-being of everyone on its premises.',
        'Where services cannot safely or appropriately continue, the centre may review or discontinue services with suitable communication, transition planning, and referrals where appropriate.',
      ] },
    ],
  },
  {
    id: 'complaints',
    icon: '💬',
    title: 'Complaints and Feedback',
    body: [
      { list: [
        'Parents, guardians, and clients may submit concerns or complaints to centre management.',
        'The centre will review concerns fairly and seek an appropriate resolution.',
        'Raising a concern in good faith will not, by itself, be grounds for penalizing a client or family.',
      ] },
    ],
  },
  {
    id: 'emergencies',
    icon: '🚑',
    title: 'Emergencies and Unexpected Events',
    body: [
      { list: [
        'Emergency contact information must be kept up to date.',
        'In an urgent situation, the centre may contact the parent, guardian, emergency services, or an appropriate healthcare provider as necessary.',
        'Parents or guardians remain responsible for communicating relevant emergency instructions and medical precautions.',
      ] },
    ],
  },
  {
    id: 'amendments',
    icon: '🔄',
    title: 'Amendments to These Terms',
    body: [
      { list: [
        'The centre may update its policies when necessary to improve service delivery, safety, or compliance with applicable requirements.',
        'Material changes will be communicated to clients where appropriate.',
        'These terms will be interpreted in accordance with applicable laws and regulations in Pakistan.',
      ] },
    ],
  },
  {
    id: 'acknowledgment',
    icon: '✍️',
    title: 'Acknowledgment and Consent',
    body: [
      'By signing the registration or service agreement, the undersigned confirms that they have read and understood these terms and conditions, had the opportunity to ask questions, and agree to comply with the applicable policies of ABC Autism Behavioral Center.',
      { note: 'The registration or service agreement is signed at the centre. Please ask our team if you would like a copy.' },
    ],
  },
  {
    id: 'website',
    icon: '🌐',
    title: 'Using our website and online forms',
    body: [
      { list: [
        'Information on this website is general and does not replace an assessment by a qualified professional.',
        'Sending an appointment or contact form is a request, not a confirmed booking. A visit is confirmed when our team contacts you.',
        'Job applications sent through the Careers page must contain true details, and sending one does not guarantee an interview or a job.',
        'Please do not send spam, false enquiries or harmful files, and do not try to misuse or break into the website.',
      ] },
    ],
  },
];

export default function TermsOfService() {
  return (
    <PolicyLayout
      current="/terms"
      crumb="Terms & Conditions"
      eyebrow="Support • Learn • Grow"
      title="Terms &"
      accent="Conditions"
      intro="We are committed to providing individualized, respectful, and evidence-based healthcare, therapy, rehabilitation, education, and developmental support to children, adults, and families."
      updated={UPDATED}
      sections={SECTIONS}
      metaTitle="Terms & Conditions | ABC Autism Behavioral Center"
      metaDescription="Terms and conditions for services at ABC Autism Behavioral Center: registration, appointments, cancellations, fees, child safety, confidentiality and more."
      ctaTitle="Need help understanding something?"
      ctaText="Reach out and our team will explain anything in these terms."
    />
  );
}