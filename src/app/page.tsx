
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BarChart3, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-16 rounded-lg shadow-lg bg-card">
        <h1 className="text-5xl font-bold tracking-tight text-primary">
          Welcome to Info Central
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
          Your reliable partner for monitoring critical services and applications.
          Stay informed, stay ahead.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">View Services</Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <BarChart3 className="h-12 w-12 text-accent mb-2" />
            <CardTitle>Real-time Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Keep track of your services with up-to-the-minute status updates and performance insights.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <CheckCircle className="h-12 w-12 text-accent mb-2" />
            <CardTitle>Instant Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Receive immediate alerts for service disruptions, ensuring quick response times.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <ShieldCheck className="h-12 w-12 text-accent mb-2" />
            <CardTitle>Secure & Reliable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Built with security in mind, your data and monitoring activities are always protected.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-4">Why Choose Info Central?</h2>
            <p className="text-muted-foreground mb-4 text-lg">
              Info Central provides a seamless and intuitive platform for all your service monitoring needs. We focus on simplicity, reliability, and actionable insights.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-2" /> Easy-to-use dashboard</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-2" /> Customizable alerts</li>
              <li className="flex items-center"><CheckCircle className="h-5 w-5 text-accent mr-2" /> Comprehensive reporting</li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Dashboard Preview" 
              width={600} 
              height={400} 
              className="w-full h-auto"
              data-ai-hint="dashboard analytics"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
