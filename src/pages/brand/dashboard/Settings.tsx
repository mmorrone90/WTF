import React from 'react';
    import { motion } from 'framer-motion';

    export default function Settings() {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-container mx-auto px-6 py-12 space-y-8"
        >
          <h1 className="text-2xl font-bold mb-6">Settings</h1>

          {/* Account Settings */}
          <section className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Business Name</span>
                <span className="font-bold">Your Brand Name</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Email Address</span>
                <span className="font-bold">yourbrand@email.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Phone Number</span>
                <span className="font-bold">+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Website URL</span>
                <span className="font-bold">yourbrand.com</span>
              </div>
              <button className="neon-button !px-4">Edit Profile</button>
            </div>
          </section>

          {/* Security Settings */}
          <section className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Change Password</span>
                <button className="neon-button !px-4">Change</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Two-Factor Authentication</span>
                <button className="neon-button !px-4">Enable</button>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Notifications</span>
                <button className="neon-button !px-4">Manage</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-grey">Language</span>
                <span className="font-bold">English</span>
              </div>
            </div>
          </section>
        </motion.div>
      );
    }
