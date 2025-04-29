import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 mt-2">
          Find answers to common questions about our platform and services.
        </p>

        {/* Accordion FAQ */}
        <Accordion type="single" collapsible className="w-full mt-8 text-left">
          <AccordionItem value="q1">
            <AccordionTrigger>What courses do you offer?</AccordionTrigger>
            <AccordionContent>
              We offer a wide range of courses in programming, design, marketing, business, and more. 
              Our expert-led courses ensure quality learning.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger>Are the courses free or paid?</AccordionTrigger>
            <AccordionContent>
              We provide both free and premium courses. Free courses give you access to basic concepts, 
              while premium ones offer advanced learning, certifications, and mentorship.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger>How can I apply for jobs?</AccordionTrigger>
            <AccordionContent>
              Our platform connects learners with job opportunities. Visit the <strong>Jobs</strong> 
              section, create your profile, and apply for jobs that match your skills.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger>Can I get a certificate after completing a course?</AccordionTrigger>
            <AccordionContent>
              Yes! We provide industry-recognized certificates for our premium courses upon 
              successful completion of all requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5">
            <AccordionTrigger>Do you offer refunds for premium courses?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer a <strong>7-day money-back guarantee</strong> if you're not satisfied 
              with a premium course. Contact our support team for assistance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
