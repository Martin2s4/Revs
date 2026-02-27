import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCitizen: boolean;
}

export function PaymentModal({ isOpen, onClose, isCitizen }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Land Rates');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Processing payment of Ksh ${amount} for ${type}...`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isCitizen ? "Make a Payment" : "New Payment"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isCitizen && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Citizen / Business Name</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter name"
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Type</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>Land Rates</option>
            <option>Market Fee</option>
            <option>Business Permit</option>
            <option>Parking Fee</option>
            <option>Property Tax</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (Ksh)</label>
          <input 
            type="number" 
            required
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="0.00"
          />
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Proceed to Pay</Button>
        </div>
      </form>
    </Modal>
  );
}
