
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Grid, Table } from 'lucide-react';
import { PropertyDevelopment } from '@/types/property';
import UnitGrid from '../Components/UnitGrid';
import UnitTable from '../Components/UnitTable';

interface UnitsStepProps {
  formData: Partial<PropertyDevelopment>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<PropertyDevelopment>>>;
}

const UnitsStep: React.FC<UnitsStepProps> = ({ formData, setFormData }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const handleDownloadTemplate = () => {
    // Create CSV template
    const headers = [
      'TORRE',
      'ANDAR', 
      'UNIDADE',
      'POSIÇÃO DA UNIDADE',
      'SITUAÇÃO',
      'TIPOLOGIA',
      'METRAGEM',
      'GARAGEM',
      'OBSERVAÇÃO',
      'VALOR'
    ];
    
    const csvContent = headers.join(',') + '\n' +
                      'A,1,101,1,Disponível,2 Quartos,65,1,Unidade padrão,450000\n' +
                      'A,1,102,2,Disponível,2 Quartos,65,1,Unidade padrão,450000';
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modelo_unidades.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImportSpreadsheet = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx,.xls';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importando arquivo:', file.name);
        // Implementar lógica de importação
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Cadastro das Unidades</span>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4 mr-2" />
                Espelho
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                <Table className="w-4 h-4 mr-2" />
                Tabela
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual">Cadastro Manual</TabsTrigger>
              <TabsTrigger value="import">Importar Planilha</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual" className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                Clique em cada unidade para editar suas informações
              </div>
              
              {viewMode === 'grid' ? (
                <UnitGrid formData={formData} setFormData={setFormData} />
              ) : (
                <UnitTable formData={formData} setFormData={setFormData} />
              )}
            </TabsContent>
            
            <TabsContent value="import" className="space-y-4">
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Importar Unidades via Planilha
                </h3>
                <p className="text-gray-600 mb-4">
                  Baixe o modelo, preencha com suas unidades e importe de volta
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={handleDownloadTemplate}>
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Modelo
                  </Button>
                  <Button onClick={handleImportSpreadsheet}>
                    <Upload className="w-4 h-4 mr-2" />
                    Importar Planilha
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitsStep;
