import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from '../ui/Button';
import { FileText, Download } from 'lucide-react';

interface License {
  id: string;
  type: string;
  applicant: string;
  status: string;
  date: string;
  feedback?: string;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  license: License | null;
  onUpdate: (id: string, newStatus: string, feedback: string) => void;
}

export function ReviewModal({ isOpen, onClose, license, onUpdate }: ReviewModalProps) {
  const [status, setStatus] = useState('Pending');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (license) {
      setStatus(license.status);
      setFeedback(license.feedback || '');
    }
  }, [license]);

  if (!license) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(license.id, status, feedback);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Review Application: ${license.id}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Applicant:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{license.applicant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Type:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{license.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Date Applied:</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{license.date}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attached Documents</label>
          <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">application_docs.pdf</p>
                <p className="text-xs text-gray-500">2.4 MB</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" className="gap-2" onClick={() => alert('Downloading document...')}>
              <Download className="h-4 w-4" />
              View
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Update Status</label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feedback / Comments</label>
          <textarea 
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Add notes or reasons for rejection..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
}
