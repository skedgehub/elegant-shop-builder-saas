
import { useState } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  uploadedImages: string[];
  imagePreviews: string[];
  onImageUpload: (files: FileList | null) => void;
  onRemoveImage: (index: number) => void;
}

export const ImageUpload = ({ 
  uploadedImages, 
  imagePreviews, 
  onImageUpload, 
  onRemoveImage 
}: ImageUploadProps) => {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onImageUpload(e.target.files)}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center gap-3"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Clique para enviar
            </span>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG até 10MB</p>
          </div>
        </label>
      </div>

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {imagePreviews.slice(0, 8).map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
