
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2, ExternalLink, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { MonitoredService as ServiceType } from "@/lib/schemas";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface ServiceItemProps {
  service: ServiceType;
  onRemove?: (id: string) => void; // Optional: for dashboard usage
}

export default function ServiceItem({ service, onRemove }: ServiceItemProps) {
  const [status, setStatus] = useState<ServiceType['status']>(service.status || 'Checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(service.lastChecked || null);

  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      if (!isMounted) return;
      setStatus('Checking');
      // Simulate API call for status check
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
      if (!isMounted) return;
      
      // Simulate success or failure
      // In a real app, this would be a fetch request to the service.url
      // For demo purposes, let's make it random but with a higher chance of success for common sites
      let isOnline = Math.random() > 0.2; // 80% chance online
      if (service.url.includes('example.com') || service.url.includes('google.com')) {
        isOnline = Math.random() > 0.05; // Higher chance for known good sites
      }


      setStatus(isOnline ? 'Online' : 'Offline');
      setLastChecked(new Date());
    };

    // Initial check only if status is not pre-set or is 'Checking'
    if (service.status === 'Checking' || !service.status) {
       checkStatus();
    }
   
    const intervalId = setInterval(checkStatus, 30000 + Math.random() * 5000); // Check every 30-35 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [service.url, service.status]); // Rerun if URL or initial status changes

  const getStatusColor = () => {
    if (status === 'Online') return 'bg-green-500';
    if (status === 'Offline') return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const getStatusIcon = () => {
    if (status === 'Online') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (status === 'Offline') return <XCircle className="h-5 w-5 text-red-500" />;
    return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-primary">{service.name}</CardTitle>
          {onRemove && (
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the service "{service.name}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onRemove(service.id)} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        <CardDescription className="truncate text-sm text-muted-foreground">
          <a href={service.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
            {service.url} <ExternalLink className="h-3 w-3" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <Badge variant={status === 'Online' ? 'default' : (status === 'Offline' ? 'destructive' : 'secondary')} 
                 className={`${getStatusColor()} text-white`}>
            {status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Last checked: {lastChecked ? lastChecked.toLocaleString() : 'N/A'}
        </p>
      </CardFooter>
    </Card>
  );
}
