/**
 * Delta Labs Create Section Modal Component
 * Modal for creating custom sections in the roadmap
 */

import React from 'react';
import { DeltaModal, DeltaInput, DeltaTextarea, DeltaButton } from '../../../../../../components/theme';

export interface CreateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName: string;
  sectionDescription: string;
  sectionTags: string;
  onSectionNameChange: (value: string) => void;
  onSectionDescriptionChange: (value: string) => void;
  onSectionTagsChange: (value: string) => void;
  onCreate: () => void;
}

const CreateSectionModal: React.FC<CreateSectionModalProps> = ({
  isOpen,
  onClose,
  sectionName,
  sectionDescription,
  sectionTags,
  onSectionNameChange,
  onSectionDescriptionChange,
  onSectionTagsChange,
  onCreate,
}) => {
  return (
    <DeltaModal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      showCloseButton={true}
      title="Create New Section"
    >
      <div className="space-y-4 font-primary">
        {/* Section Name */}
        <DeltaInput
          type="text"
          label="Section Name *"
          value={sectionName}
          onChange={(e) => onSectionNameChange(e.target.value)}
          placeholder="Enter section name"
        />

        {/* Section Description */}
        <DeltaTextarea
          label="Description"
          value={sectionDescription}
          onChange={(e) => onSectionDescriptionChange(e.target.value)}
          placeholder="Enter section description"
          rows={4}
        />

        {/* Tags */}
        <DeltaInput
          type="text"
          label="Hashtags"
          value={sectionTags}
          onChange={(e) => onSectionTagsChange(e.target.value)}
          placeholder="Enter tags separated by commas (e.g., Physics, Chapter 1, Advanced)"
          helperText="Separate tags with commas. Hashtags (#) will be added automatically."
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <DeltaButton
            variant="outline"
            size="md"
            onClick={onClose}
            className="!bg-white !text-text-secondary hover:!bg-surface-secondary hover:!border-border-primary !border-border-primary hover:!text-text-primary focus:!ring-primary-500"
          >
            Cancel
          </DeltaButton>
          <DeltaButton
            variant="primary"
            size="md"
            onClick={onCreate}
          >
            Create Section
          </DeltaButton>
        </div>
      </div>
    </DeltaModal>
  );
};

export default CreateSectionModal;

