"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddServiceSchema, type AddServiceFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, PlusCircle, Radar } from "lucide-react";

interface AddServiceFormProps {
  onAddService: (data: AddServiceFormData) => Promise<void>;
}

export default function AddServiceForm({ onAddService }: AddServiceFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddServiceFormData>({
    resolver: zodResolver(AddServiceSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const onSubmit = async (data: AddServiceFormData) => {
    setIsLoading(true);
    try {
      await onAddService(data);
      toast({
        title: "Success",
        description: `${data.name} added successfully`,
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-primary to-blue-600">
          <CardHeader className="px-6 pt-6 pb-4 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-white/20">
                <Radar className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold">Add New Service</CardTitle>
                <CardDescription className="text-white/90">
                  Monitor your API endpoints
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </div>

        {/* Form Content */}
        <CardContent className="p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Service Name */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="name">Service Name</Label>
                <span className="text-xs text-muted-foreground">Required</span>
              </div>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="e.g., Payment API"
                  className="pl-9"
                  disabled={isLoading}
                  {...form.register("name")}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
              </div>
              {form.formState.errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="inline">
                    <path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.08511C6.81221 4.10439 6.79805 4.12424 6.78443 4.14463C6.67092 4.31402 6.61032 4.51754 6.61032 4.72299C6.61032 5.13891 6.92938 5.47026 7.33532 5.47026C7.74126 5.47026 8.06032 5.13891 8.06032 4.72299C8.06032 4.51754 7.99971 4.31402 7.8862 4.14463C7.87258 4.12424 7.85842 4.10439 7.84373 4.08511C7.82962 4.06673 7.81496 4.04893 7.7998 4.03176L7.7998 4.03176C7.783 4.01294 7.76542 3.99447 7.74713 3.97639C7.71769 3.94683 7.68483 3.91938 7.64864 3.89462C7.58115 3.8466 7.49474 3.81026 7.3999 3.80324C7.30506 3.81026 7.21865 3.8466 7.15116 3.89462C7.11497 3.91938 7.08211 3.94683 7.05267 3.97639C7.03438 3.99447 7.0168 4.01294 7 4.03176L7 4.03176C6.98484 4.04893 6.97018 4.06673 6.95607 4.08511Z" fill="currentColor"></path>
                    <path d="M7.5 9C7.77614 9 8 8.77614 8 8.5C8 8.22386 7.77614 8 7.5 8C7.22386 8 7 8.22386 7 8.5C7 8.77614 7.22386 9 7.5 9Z" fill="currentColor"></path>
                    <path d="M8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5V10C7 9.72386 7.22386 9.5 7.5 9.5C7.77614 9.5 8 9.72386 8 10V10.5Z" fill="currentColor"></path>
                  </svg>
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Service URL */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="url">Service URL</Label>
                <span className="text-xs text-muted-foreground">Required</span>
              </div>
              <div className="relative">
                <Input
                  id="url"
                  type="url"
                  placeholder="https://api.example.com/health"
                  className="pl-9"
                  disabled={isLoading}
                  {...form.register("url")}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
              </div>
              {form.formState.errors.url && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="inline">
                    <path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.08511C6.81221 4.10439 6.79805 4.12424 6.78443 4.14463C6.67092 4.31402 6.61032 4.51754 6.61032 4.72299C6.61032 5.13891 6.92938 5.47026 7.33532 5.47026C7.74126 5.47026 8.06032 5.13891 8.06032 4.72299C8.06032 4.51754 7.99971 4.31402 7.8862 4.14463C7.87258 4.12424 7.85842 4.10439 7.84373 4.08511C7.82962 4.06673 7.81496 4.04893 7.7998 4.03176L7.7998 4.03176C7.783 4.01294 7.76542 3.99447 7.74713 3.97639C7.71769 3.94683 7.68483 3.91938 7.64864 3.89462C7.58115 3.8466 7.49474 3.81026 7.3999 3.80324C7.30506 3.81026 7.21865 3.8466 7.15116 3.89462C7.11497 3.91938 7.08211 3.94683 7.05267 3.97639C7.03438 3.99447 7.0168 4.01294 7 4.03176L7 4.03176C6.98484 4.04893 6.97018 4.06673 6.95607 4.08511Z" fill="currentColor"></path>
                    <path d="M7.5 9C7.77614 9 8 8.77614 8 8.5C8 8.22386 7.77614 8 7.5 8C7.22386 8 7 8.22386 7 8.5C7 8.77614 7.22386 9 7.5 9Z" fill="currentColor"></path>
                    <path d="M8 10.5C8 10.7761 7.77614 11 7.5 11C7.22386 11 7 10.7761 7 10.5V10C7 9.72386 7.22386 9.5 7.5 9.5C7.77614 9.5 8 9.72386 8 10V10.5Z" fill="currentColor"></path>
                  </svg>
                  {form.formState.errors.url.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-2 gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding Service...
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  Add Service
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}