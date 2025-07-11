
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PropertyFormData } from '@/types/property';
import { Upload, Image, Video, FileText } from 'lucide-react';

interface MediaStepProps {
  formData: PropertyFormData;
  setFormData: (data: PropertyFormData) => void;
  isBulkMode?: boolean;
  isDevelopmentMode?: boolean;
  setIsDevelopmentMode?: (value: boolean) => void;
  userRole?: string;
}

const MediaStep: React.FC<MediaStepProps> = ({ formData, setFormData, isBulkMode }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5 text-blue-600" />
            <span>Fotos do Imóvel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
            <Upload size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Clique para enviar fotos</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG até 5MB cada</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Plantas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
            <Upload size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Clique para enviar plantas</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF até 5MB cada</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-blue-600" />
            <span>Vídeos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Link do YouTube/Vimeo</label>
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50">
            <Upload size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Ou envie arquivos de vídeo</p>
            <p className="text-xs text-gray-500 mt-1">MP4, MOV até 50MB cada</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaStep;
