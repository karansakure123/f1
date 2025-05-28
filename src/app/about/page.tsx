
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Lightbulb } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          About Info Central
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          We are dedicated to providing top-notch service monitoring solutions that empower businesses to maintain high availability and performance for their critical applications.
        </p>
      </section>

      <section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450.png"
              alt="Team working together"
              width={600}
              height={450}
              className="w-full h-auto object-cover"
              data-ai-hint="team collaboration"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-6">Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-4">
              Our mission is to simplify service monitoring, making it accessible and insightful for everyone. We strive to deliver a platform that is not only powerful but also intuitive and user-friendly.
            </p>
            <p className="text-muted-foreground text-lg">
              We believe in proactive monitoring to prevent downtime and ensure seamless user experiences. Our tools are designed to give you the visibility and control you need.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-primary text-center mb-10">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <Users className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
            <p className="text-muted-foreground">
              We prioritize our customers&apos; needs, ensuring our solutions solve real-world problems effectively.
            </p>
          </div>
          <div className="text-center p-6">
            <Lightbulb className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We continuously innovate to provide cutting-edge monitoring technology and features.
            </p>
          </div>
          <div className="text-center p-6">
            <Target className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reliability</h3>
            <p className="text-muted-foreground">
              Our platform is built for stability and accuracy, so you can trust the insights we provide.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
