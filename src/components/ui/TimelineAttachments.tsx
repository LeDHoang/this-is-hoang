'use client';
import React, { useState } from 'react';

interface Attachment {
  id: string;
  url: string;
  type: string;
  caption: string;
}

interface TimelineAttachmentsProps {
  attachments: Attachment[];
}

export function TimelineAttachments({ attachments }: TimelineAttachmentsProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {attachments.map((att) => (
          <div key={att.id} className="p-2">
            {['image', 'png', 'jpg', 'jpeg', 'gif'].includes(att.type.toLowerCase()) ? (
              <img
                src={att.url}
                alt={att.caption}
                className="max-w-full h-auto rounded transform scale-[1.2] origin-center cursor-pointer"
                onClick={() => setSelected(att.url)}
              />
            ) : (
              <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                {att.caption}
              </a>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selected}
            alt="Full view"
            className="max-h-[80vh] max-w-[80vw] object-contain"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.75); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
} 