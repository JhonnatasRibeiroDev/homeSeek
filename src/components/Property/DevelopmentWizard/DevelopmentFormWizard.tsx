
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ArrowLeft, ArrowRight, Building2 } from 'lucide-react';
import { PropertyDevelopment } from '@/types/property';
import BasicInfoStep from './Steps/BasicInfoStep';
import StructureStep from './Steps/StructureStep';
import UnitsStep from './Steps/UnitsStep';
import SalesTableStep from './Steps/SalesTableStep';

interface DevelopmentFormWizardProps {
  onClose: () => void;
  developmentId?: string;
}

const DevelopmentFormWizard: React.FC<DevelopmentFormWizardProps> = ({ 
  onClose, 
  developmentId 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PropertyDevelopment>>({
    name: '',
    type: 'torre',
    location: {
      address: '',
      neighborhood: '',
      city: '',
      state: 'SC',
      reference: ''
    },
    description: '',
    generalImages: [],
    units: [],
    company: '',
    agent: '',
    isActive: true,
    visibility: 'publica',
    category: 'novos',
    allowBrokerLink: true,
    isHighlighted: false
  });

  const steps = [
    { id: 1, title: 'Informações Básicas', component: BasicInfoStep },
    { id: 2, title: 'Estrutura e Disponibilidade', component: StructureStep },
    { id: 3, title: 'Cadastro das Unidades', component: UnitsStep },
    { id: 4, title: 'Gestão de Tabela de Vendas', component: SalesTableStep }
  ];

  const currentStepData = steps.find(step => step.id === currentStep);
  const StepComponent = currentStepData?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log('Salvando empreendimento:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Cadastrar Empreendimento
              </h2>
              <p className="text-sm text-gray-600">
                Etapa {currentStep} de {steps.length}: {currentStepData?.title}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <span className={`ml-2 text-sm ${
                  step.id <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ml-4 ${
                    step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 250px)' }}>
          {StepComponent && (
            <StepComponent 
              formData={formData} 
              setFormData={setFormData}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {currentStep === steps.length ? (
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                Salvar Empreendimento
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentFormWizard;
