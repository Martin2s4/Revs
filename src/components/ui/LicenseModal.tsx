import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCitizen: boolean;
}

export function LicenseModal({ isOpen, onClose, isCitizen }: LicenseModalProps) {
  const [type, setType] = useState('Single Business Permit');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitting application for ${type}...`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New License Application">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isCitizen && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applicant Name</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter name"
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">License Type</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>Single Business Permit</option>
            <option>Liquor License</option>
            <option>Health Certificate</option>
            <option>Fire Clearance</option>
            <option>Building Permit</option>
            <option>Market Stall Allocation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Documents</label>
          <input 
            type="file" 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Upload ID, KRA PIN, and other required documents.</p>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit Application</Button>
        </div>
      </form>
    </Modal>
  );
}
