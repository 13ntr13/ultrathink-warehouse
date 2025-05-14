import React, { useState, useRef } from 'react';
import { UserIcon, UploadCloudIcon } from 'lucide-react';
import { Button } from './Button';
interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (file: File) => void;
}
export function AvatarUpload({
  currentAvatar,
  onAvatarChange
}: AvatarUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentAvatar);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return <div className="flex items-center space-x-6">
      <div className="shrink-0">
        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          {previewUrl ? <img src={previewUrl} alt="Avatar preview" className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center">
              <UserIcon className="h-8 w-8 text-gray-400" />
            </div>}
        </div>
      </div>
      <div>
        <Button variant="outline" size="sm" icon={<UploadCloudIcon size={16} />} onClick={() => fileInputRef.current?.click()}>
          Change avatar
        </Button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          PNG, JPG or GIF (max. 2MB)
        </p>
      </div>
    </div>;
}