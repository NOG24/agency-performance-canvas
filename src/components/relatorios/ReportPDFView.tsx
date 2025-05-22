
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useThemeContext } from '@/providers/ThemeProvider';

interface ReportPDFViewProps {
  pdfUrl?: string;
  clientName: string;
  agencyName: string;
  agencyLogo?: string;
  period: {
    start: Date;
    end: Date;
  };
  onDownload: () => void;
  onShare: () => void;
}

const ReportPDFView: React.FC<ReportPDFViewProps> = ({
  pdfUrl,
  clientName,
  agencyName,
  agencyLogo,
  period,
  onDownload,
  onShare
}) => {
  const { primaryColor } = useThemeContext();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-background sticky top-0 z-10 p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Visualizar Relatório</h2>
            <p className="text-muted-foreground text-sm">
              {clientName} • {formatDate(period.start)} até {formatDate(period.end)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onShare}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
            <Button
              onClick={onDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto bg-muted p-4">
        <div className="bg-background mx-auto max-w-4xl shadow-lg rounded-lg border">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full min-h-[800px]"
              title="Preview do Relatório"
            />
          ) : (
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                {agencyLogo ? (
                  <img 
                    src={agencyLogo} 
                    alt={agencyName} 
                    className="h-12" 
                  />
                ) : (
                  <div 
                    className="h-12 w-32 flex items-center justify-center text-lg font-bold"
                    style={{ color: primaryColor }}
                  >
                    {agencyName}
                  </div>
                )}
                
                <div className="text-right">
                  <h3 className="text-lg font-semibold">Relatório de Performance</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(period.start)} - {formatDate(period.end)}
                  </p>
                  <p className="text-sm mt-1">{clientName}</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              {/* Mockup of PDF Content */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Resumo Executivo</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-muted h-24 rounded-md animate-pulse" />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Performance por Canal</h2>
                  <div className="h-64 bg-muted rounded-md animate-pulse" />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Análise de Campanhas</h2>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-12 bg-muted rounded-md animate-pulse" />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Insights e Recomendações</h2>
                  <div className="space-y-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-20 bg-muted rounded-md animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Relatório gerado automaticamente por {agencyName}</p>
                <p className="mt-1">© {new Date().getFullYear()} NOG Performance</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPDFView;
