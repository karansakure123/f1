
import ServiceItem from "@/components/services/ServiceItem";
import type { MonitoredService } from "@/lib/schemas";

const exampleServices: MonitoredService[] = [
  { id: "1", name: "Main Website", url: "https://example.com", status: 'Checking', lastChecked: null },
  { id: "2", name: "API Endpoint", url: "https://api.example.com/health", status: 'Checking', lastChecked: null },
  { id: "3", name: "Blog Service", url: "https://blog.example.com", status: 'Checking', lastChecked: null },
  { id: "4", name: "Google Search", url: "https://www.google.com", status: 'Checking', lastChecked: null },
  { id: "5", name: "NonExistent Service", url: "https://thisservicedoesnotexist.example.com", status: 'Checking', lastChecked: null },
];

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Monitored Services
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Overview of publicly monitored services and their current status. Check back for real-time updates.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exampleServices.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </section>
       <section className="mt-12 p-6 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-primary mb-4">Understanding Statuses</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><span className="font-semibold text-green-500">Online:</span> The service is responsive and operating as expected.</li>
          <li><span className="font-semibold text-red-500">Offline:</span> The service is currently unavailable or not responding.</li>
          <li><span className="font-semibold text-yellow-500">Checking:</span> We are currently attempting to verify the service status.</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Note: Status checks are performed periodically. The displayed status reflects the latest check result.
        </p>
      </section>
    </div>
  );
}
