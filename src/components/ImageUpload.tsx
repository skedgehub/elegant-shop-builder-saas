
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, ImageIcon, X } from "lucide-react";
import { uploadService } from "@/services/uploadService";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  bucket?: string;
}

const ImageUpload = ({ value, onChange, onRemove, label = "Imagem", bucket = "images" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const uploadId = `image-upload-${Math.random().toString(36).substr(2, 9)}`;

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadService.uploadImage(file, bucket);
      onChange(url);
      toast({
        title: "Upload realizado!",
        description: "A imagem foi enviada com sucesso.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar a imagem.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleRemove = async () => {
    if (value && onRemove) {
      try {
        await uploadService.deleteImage(value, bucket);
        onRemove();
        toast({
          title: "Imagem removida!",
          description: "A imagem foi removida com sucesso.",
        });
      } catch (error) {
        console.error('Delete error:', error);
        toast({
          title: "Erro ao remover",
          description: "Não foi possível remover a imagem.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {value ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={value}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id={uploadId}
          />
          <Label 
            htmlFor={uploadId} 
            className="cursor-pointer"
          >
            <Card className="hover:bg-gray-50 transition-colors">
              <CardContent className="p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  {uploading ? (
                    <>
                      <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                      <span className="text-sm text-gray-600">Enviando imagem...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="font-medium text-gray-900 mb-2">Clique para enviar uma imagem</h3>
                      <p className="text-sm text-gray-600">PNG, JPG até 10MB</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </Label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
