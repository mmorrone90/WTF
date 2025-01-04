import React from 'react';
import SupportHero from '../components/support/SupportHero';
import FAQSection from '../components/support/FAQSection';
import SupportCategories from '../components/support/SupportCategories';
import TicketForm from '../components/support/TicketForm';

export default function Support() {
  return (
    <div className="min-h-screen py-20">
      <SupportHero />
      
      <div className="max-w-container mx-auto px-6">
        <SupportCategories />
        <FAQSection />
        <TicketForm />
      </div>
    </div>
  );
}