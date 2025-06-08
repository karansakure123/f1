
"use client";

import AddServiceForm from "@/components/dashboard/AddServiceForm";
import ServiceItem from "@/components/services/ServiceItem";
import type { MonitoredService, AddServiceFormData } from "@/lib/schemas";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListChecks, AlertTriangle } from "lucide-react";

// Key for local storage
const LOCAL_STORAGE_KEY = "monitoredServices";

export default function DashboardPage() {
  const { user } = useAuth();
  const [services, setServices] = useState<MonitoredService[]>([]);

  // Load services from local storage on component mount
  useEffect(() => {
    if (user) { // Only load/save if user is logged in, to somewhat simulate user-specific data
      const storedServices = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${user.uid}`);
      if (storedServices) {
        try {
          const parsedServices = JSON.parse(storedServices).map((s: MonitoredService) => ({
            ...s,
            lastChecked: s.lastChecked ? new Date(s.lastChecked) : null,
          }));
          setServices(parsedServices);
        } catch (error) {
          console.error("Failed to parse services from local storage:", error);
          localStorage.removeItem(`${LOCAL_STORAGE_KEY}_${user.uid}`); // Clear corrupted data
        }
      }
    }
  }, [user]);

  // Save services to local storage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.uid}`, JSON.stringify(services));
    }
  }, [services, user]);


  const handleAddService = (data: AddServiceFormData) => {
    const newService: MonitoredService = {
      ...data,
      id: Date.now().toString(), // Simple unique ID
      status: 'Checking',
      lastChecked: null,
    };
    setServices((prevServices) => [newService, ...prevServices]);
  };

  const handleRemoveService = (id: string) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id));
  };

  return (
    <div className="space-y-8">
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Dashboard
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                Welcome back, <span className="font-medium text-primary">{user?.email || "User"}</span>
              </p>
            </div>

          </div>

        </div>
      </section>

      <section>
        <AddServiceForm onAddService={handleAddService} />
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ListChecks className="h-6 w-6 text-primary" />
              Your Monitored Services
            </CardTitle>
            <CardDescription>
              {services.length > 0 
                ? `You are currently monitoring ${services.length} service(s).`
                : "You are not monitoring any services yet. Add one above!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {services.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceItem key={service.id} service={service} onRemove={handleRemoveService} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
                <AlertTriangle className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-xl font-semibold text-muted-foreground">No services found.</p>
                <p className="text-muted-foreground">Add a service using the form above to start monitoring.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
