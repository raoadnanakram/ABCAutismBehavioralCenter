import React from 'react';
import PolicyLayout from '../Components/PolicyLayout';

/* ==========================================================================
   PRIVACY POLICY - ABC Autism Behavioral Center
   This is a clear starting draft written around what this website really does.
   Please have your Legal Advisor read it once before you rely on it,
   and edit anything that does not match how your center works.
   ========================================================================== */

const UPDATED = '30 October 2026'; // change this date whenever you edit the text

const SECTIONS = [
  {
    id: 'introduction',
    icon: '👋',
    title: 'Introduction',
    body: [
      'ABC Autism Behavioral Center ("ABC", "we", "us") respects the privacy of every family and every job applicant who visits our website. This policy explains what information we collect, why we collect it, and the choices you have.',
      'By using our website and submitting any of our forms, you agree to the practices described here. If you do not agree, please do not submit your information through the website.',
    ],
  },
  {
    id: 'information-we-collect',
    icon: '📋',
    title: 'Information we collect',
    body: [
      'We only collect what you choose to type into our forms, plus a few technical details needed to keep the website safe.',
      {
        list: [
          'Appointment form: parent or guardian name, phone number, email address, child\'s name, service needed, preferred date and time, and any message you write.',
          'Contact form: your name, phone number, email address, service of interest, preferred way to be contacted, and your message.',
          'Career form: your name, email, phone number, degree, age, gender, the job you apply for, your experience, and the CV file you upload.',
          'Technical details: your IP address, which we use to prevent spam and misuse of our forms.',
        ],
      },
      { note: 'Please do not include detailed medical records or other very sensitive details in the message boxes. Our team will ask for what is needed during your appointment.' },
    ],
  },
  {
    id: 'how-we-use-it',
    icon: '🎯',
    title: 'How we use your information',
    body: [
      { list: [
        'To reply to your enquiry and to arrange appointments.',
        'To send you an automatic confirmation email after you submit a form.',
        'To notify our team that a new appointment, message or job application has arrived.',
        'To review job applications and contact shortlisted candidates.',
        'To keep our website secure and to stop spam or abuse.',
        'To improve our services and our website.',
      ] },
      'We do not sell your personal information, and we do not use it for third-party advertising.',
    ],
  },
  {
    id: 'childrens-information',
    icon: '🧒',
    title: 'Children\'s information',
    body: [
      'Our services are for children, but our website forms are meant to be filled in by a parent, guardian or another adult. We do not knowingly collect information directly from children.',
      'The details you give about your child are used only to understand your request and to prepare for your visit.',
    ],
  },
  {
    id: 'who-can-see-it',
    icon: '👥',
    title: 'Who can see your information',
    body: [
      'Your information can be seen by authorised ABC staff through our protected admin area. It is not shown publicly on the website.',
      'To run the website we use trusted service providers, for example our hosting provider and the email service that delivers our confirmation and notification emails. They handle information only to provide these services to us.',
      'We may also share information if the law requires it, or to protect the safety of a child or another person.',
    ],
  },
  {
    id: 'emails',
    icon: '✉️',
    title: 'Emails we send',
    body: [
      'After you submit a form, we send you a confirmation email, and our team receives a notification. These emails are about your own request. If you do not see our email, please check your spam folder.',
    ],
  },
  {
    id: 'security',
    icon: '🔐',
    title: 'Storage and security',
    body: [
      'Submitted information is stored on secure servers and is accessible only through a login-protected admin area. We use measures such as account lockout after repeated wrong passwords, automatic logout when the screen is left idle, and spam protection on our forms.',
      'Uploaded CVs are accepted only as PDF or Word files and are available only to authorised staff.',
      { note: 'No website or internet service can be made 100% secure. We work to protect your information, but we cannot guarantee absolute security.' },
    ],
  },
  {
    id: 'retention',
    icon: '🗂️',
    title: 'How long we keep it',
    body: [
      'We keep your information only as long as it is needed for the purpose you gave it: for example, to handle your enquiry or to consider your job application. After that we may delete it or remove details that identify you, unless the law requires us to keep it longer.',
    ],
  },
  {
    id: 'your-choices',
    icon: '✅',
    title: 'Your choices and rights',
    body: [
      { list: [
        'You can ask what information we hold about you.',
        'You can ask us to correct information that is wrong.',
        'You can ask us to delete your information.',
        'You can tell us to stop contacting you.',
      ] },
      'To make a request, please use the Contact page and tell us which form you submitted and the email address you used. We may need to confirm who you are before we act on a request.',
    ],
  },
  {
    id: 'cookies',
    icon: '🍪',
    title: 'Cookies and browser storage',
    body: [
      'Our website may use basic browser storage that is needed for it to work, for example to keep staff signed in during a session. If we add analytics or advertising tools in the future, we will update this policy and tell you here.',
    ],
  },
  {
    id: 'other-websites',
    icon: '🔗',
    title: 'Links to other websites',
    body: [
      'Our website may link to other websites, such as social media pages or file-sharing services. We do not control them and are not responsible for how they handle your information. Please read their own policies.',
    ],
  },
  {
    id: 'changes',
    icon: '🔄',
    title: 'Changes to this policy',
    body: [
      'We may update this policy from time to time. When we do, we will change the "Last updated" date at the top of this page. Please check back now and then.',
    ],
  },
  {
    id: 'contact',
    icon: '📞',
    title: 'Contact us',
    body: [
      'If you have a question about this policy or about your information, please reach out through our Contact page and our team will be happy to help.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      current="/privacy-policy"
      crumb="Privacy Policy"
      eyebrow="Your privacy matters"
      title="Privacy"
      accent="Policy"
      intro="We keep this simple: what we collect, why we collect it, and how we look after it."
      updated={UPDATED}
      sections={SECTIONS}
      metaTitle="Privacy Policy | ABC Autism Behavioral Center"
      metaDescription="Read how ABC Autism Behavioral Center collects, uses and protects the information you share through our appointment, contact and career forms."
      ctaTitle="Questions about your privacy?"
      ctaText="Our team is happy to explain how your information is handled."
    />
  );
}
