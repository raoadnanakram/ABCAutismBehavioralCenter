import React from 'react';
import PolicyLayout from '../Components/PolicyLayout';

/* ==========================================================================
   TERMS OF SERVICE - ABC Autism Behavioral Center
   This is a clear starting draft. Please have your Legal Advisor read it
   (especially the "Governing law" and "Appointments" sections) before relying on it.
   ========================================================================== */

const UPDATED = '30 October 2026'; // change this date whenever you edit the text

const SECTIONS = [
  {
    id: 'acceptance',
    icon: '🤝',
    title: 'Accepting these terms',
    body: [
      'Welcome to the website of ABC Autism Behavioral Center ("ABC", "we", "us"). By visiting or using this website you agree to these Terms of Service. If you do not agree, please do not use the website.',
    ],
  },
  {
    id: 'our-website',
    icon: '🌐',
    title: 'About our website',
    body: [
      'This website tells families about our centre, our team and our services, and lets you send us appointment requests, messages and job applications.',
      { note: 'The information on this website is general and is not medical advice. It does not replace a proper assessment by a qualified professional, and using the website does not create a therapist–client relationship.' },
      'In a medical emergency, please contact your nearest emergency service or hospital straight away. Do not use our website forms for urgent matters.',
    ],
  },
  {
    id: 'appointments',
    icon: '📅',
    title: 'Appointments and enquiries',
    body: [
      'Sending an appointment form is a request, not a confirmed booking. An appointment is confirmed only when our team contacts you and agrees a time with you.',
      'The automatic email you receive after submitting a form only shows that we received your request.',
      'Please contact us as early as you can if you need to change or cancel a visit.',
    ],
  },
  {
    id: 'your-information',
    icon: '📝',
    title: 'Information you give us',
    body: [
      { list: [
        'Please give true, complete and up-to-date information in every form.',
        'Use your own email address and phone number, or those of the person you are acting for.',
        'If you fill a form for a child, you confirm that you are the parent, guardian or authorised adult.',
      ] },
    ],
  },
  {
    id: 'acceptable-use',
    icon: '🚫',
    title: 'Using the website properly',
    body: [
      'You agree not to misuse the website. In particular, you must not:',
      { list: [
        'Send spam, false enquiries or harmful files.',
        'Try to break into, overload or damage the website or its protected admin area.',
        'Use automated tools to submit forms or to copy the website\'s content.',
        'Use the website in a way that is unlawful or that harms others.',
      ] },
      'We may block access, or remove submissions, if we believe the website is being misused.',
    ],
  },
  {
    id: 'job-applications',
    icon: '💼',
    title: 'Job applications',
    body: [
      'When you apply for a job through our Careers page, you confirm that your details and CV are true. Sending an application does not guarantee an interview or a job.',
      'We contact shortlisted candidates only. By applying, you agree that we may keep and review your application as described in our Privacy Policy.',
    ],
  },
  {
    id: 'ownership',
    icon: '©️',
    title: 'Ownership of content',
    body: [
      'The text, design, logo, images and other material on this website belong to ABC Autism Behavioral Center or are used with permission. You may view the website for your own personal use. Please do not copy, sell or republish our material without our written permission.',
    ],
  },
  {
    id: 'privacy',
    icon: '🔒',
    title: 'Privacy',
    body: [
      'How we handle your personal information is explained in our Privacy Policy, which forms part of these terms.',
    ],
  },
  {
    id: 'third-party-links',
    icon: '🔗',
    title: 'Links to other websites',
    body: [
      'Our website may link to other websites. We do not control them and are not responsible for their content or practices.',
    ],
  },
  {
    id: 'disclaimer',
    icon: '⚖️',
    title: 'Disclaimer and liability',
    body: [
      'We work to keep the website accurate and available, but we provide it "as is". We do not promise that it will always be free of errors or interruptions.',
      'To the extent the law allows, ABC is not responsible for losses that come from using the website or from relying on its general information. Nothing in these terms limits any right you have under the law that cannot be limited.',
    ],
  },
  {
    id: 'changes',
    icon: '🔄',
    title: 'Changes to these terms',
    body: [
      'We may update these terms from time to time. The "Last updated" date at the top of this page shows when they last changed. Continuing to use the website after a change means you accept the new terms.',
    ],
  },
  {
    id: 'governing-law',
    icon: '🏛️',
    title: 'Governing law',
    body: [
      'These terms are governed by the laws of Pakistan. Any dispute will be handled by the courts that have authority under those laws.',
    ],
  },
  {
    id: 'contact',
    icon: '📞',
    title: 'Contact us',
    body: [
      'If you have any question about these terms, please use our Contact page and our team will be glad to help.',
    ],
  },
];

export default function TermsOfService() {
  return (
    <PolicyLayout
      current="/terms"
      crumb="Terms of Service"
      eyebrow="Please read"
      title="Terms of"
      accent="Service"
      intro="The simple rules for using our website, booking with us and applying to work with us."
      updated={UPDATED}
      sections={SECTIONS}
      metaTitle="Terms of Service | ABC Autism Behavioral Center"
      metaDescription="The terms for using the ABC Autism Behavioral Center website, including appointment requests, enquiries and job applications."
      ctaTitle="Need help understanding something?"
      ctaText="Reach out and our team will explain anything in these terms."
    />
  );
}
