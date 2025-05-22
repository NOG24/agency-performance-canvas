
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type IntegrationStatus = 'connected' | 'disconnected' | 'pending' | 'error';

interface IntegrationCardProps {
  title: string;
  description: string;
  status: IntegrationStatus;
  icon: React.ReactNode;
  onConnect: () => void;
  onDisconnect?: () => void;
  errorMessage?: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  title,
  description,
  status,
  icon,
  onConnect,
  onDisconnect,
  errorMessage
}) => {
  const isConnected = status === 'connected';
  const isPending = status === 'pending';
  const isError = status === 'error';

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-600">Conectado</Badge>;
      case 'disconnected':
        return <Badge variant="outline">Desconectado</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <div>{getStatusBadge()}</div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {isError && errorMessage && (
          <div className="flex items-start gap-2 p-3 bg-red-50 text-red-800 rounded-md mb-4">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <div className="flex w-full justify-between gap-2">
            <Button 
              variant="outline"
              size="sm"
              className="w-full"
              onClick={onDisconnect}
            >
              Desconectar
            </Button>
            <Button 
              size="sm"
              className="w-full"
              onClick={onConnect}
            >
              Configurar
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full"
            disabled={isPending}
            onClick={onConnect}
          >
            {isPending ? "Conectando..." : isError ? "Tentar novamente" : "Conectar"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default IntegrationCard;
