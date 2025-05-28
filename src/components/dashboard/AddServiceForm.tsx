
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
import { Loader2, PlusCircle } from "lucide-react";

interface AddServiceFormProps {
  onAddService: (data: AddServiceFormData) => void;
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
    // Simulate async operation if needed, or directly call onAddService
    await new Promise(resolve => setTimeout(resolve, 500)); 
    onAddService(data);
    setIsLoading(false);
    toast({
      title: "Service Added",
      description: `"${data.name}" has been added to your monitoring list.`,
    });
    form.reset();
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <PlusCircle className="h-6 w-6 text-primary" />
          Add New Service
        </CardTitle>
        <CardDescription>Enter the details of the service you want to monitor.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              placeholder="e.g., My Awesome API"
              {...form.register("name")}
              aria-invalid={form.formState.errors.name ? "true" : "false"}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Service URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/api/health"
              {...form.register("url")}
              aria-invalid={form.formState.errors.url ? "true" : "false"}
            />
            {form.formState.errors.url && (
              <p className="text-sm text-destructive">{form.formState.errors.url.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Service
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
