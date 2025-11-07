/**
 * Delta Labs Setup Modal Component
 * Modal for setting up a new super course with title and visibility
 */

import React from 'react';
import { DeltaModal, DeltaInput, DeltaDropdown, DeltaButton } from '../../../../../components/theme';

export interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onTitleChange: (title: string) => void;
  visibility: string;
  onVisibilityChange: (visibility: string) => void;
  onBack: () => void;
  onDone: () => void;
}

const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  title,
  onTitleChange,
  visibility,
  onVisibilityChange,
  onBack,
  onDone,
}) => {
  return (
    <DeltaModal
      isOpen={isOpen}
      onClose={onClose}
      title="Setup your super course"
      size="md"
    >
      <div className="space-y-6 px-3 pt-4 pb-4 font-primary">
        {/* Super Course Title Input */}
        <div>
          <DeltaInput
            label="Super Course Title"
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
            placeholder="Enter super course title"
          />
        </div>

        {/* Visibility Dropdown */}
        <DeltaDropdown
          label="Visibility"
          value={visibility}
          placeholder="Selected Option"
          options={[
            { value: 'private', label: 'Private' },
            { value: 'public', label: 'Public' },
          ]}
          onChange={(value: string) => onVisibilityChange(value)}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <DeltaButton
            variant="outline"
            size="md"
            onClick={onBack}
          >
            Back
          </DeltaButton>
          <DeltaButton
            variant="primary"
            size="md"
            onClick={onDone}
          >
            Done
          </DeltaButton>
        </div>
      </div>
    </DeltaModal>
  );
};

export default SetupModal;

