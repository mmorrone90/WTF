import React from 'react';

export default function ContactMap() {
  return (
    <div className="mt-20">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280999342!2d-74.11976389828038!3d40.697403441901946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564756246!5m2!1sen!2s"
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: '1rem' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="filter grayscale"
      />
    </div>
  );
}
