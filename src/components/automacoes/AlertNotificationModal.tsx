
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle } from "lucide-react";

export type AlertType = 'gasto_excessivo' | 'cpl_alto' | 'ctr_baixo' | 'roas_baixo' | 'success';

interface AlertNotificationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: AlertType;
  campaignName?: string;
  metric?: string;
  value?: number;
  threshold?: number;
}

const AlertNotificationModal: React.FC<AlertNotificationModalProps> = ({
  open,
  onClose,
  title,
  message,
  type,
  campaignName,
  metric,
  value,
  threshold
}) => {
  const getIcon = () => {
    if (type === 'success') {
      return <CheckCircle className="h-12 w-12 text-green-500" />;
    }
    
    return <AlertTriangle className="h-12 w-12 text-amber-500" />;
  };
  
  const getColor = () => {
    switch(type) {
      case 'gasto_excessivo': return 'text-red-600';
      case 'cpl_alto': return 'text-amber-600';
      case 'ctr_baixo': return 'text-blue-600';
      case 'roas_baixo': return 'text-purple-600';
      case 'success': return 'text-green-600';
      default: return 'text-amber-600';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {getIcon()}
            <div>
              <DialogTitle className={`text-lg ${getColor()}`}>{title}</DialogTitle>
              <DialogDescription className="mt-1">{message}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        {campaignName && (
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium mb-2">Campanha: {campaignName}</p>
            
            {metric && value !== undefined && threshold !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{metric}:</span>
                <div className="flex gap-2 items-center">
                  <span className={`font-medium ${getColor()}`}>{value}</span>
                  <span className="text-xs text-muted-foreground">Limite: {threshold}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        <DialogFooter className="flex justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={onClose}>
            Visualizar Campanha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertNotificationModal;
