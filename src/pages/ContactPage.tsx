/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Message sent successfully!");
  };

  return (
    <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      {/* Left Side */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">
          Need help with your parcel delivery? Our support team is here for you 24/7.
          Reach out anytime.
        </p>

        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <MapPin />
              <p>House #12, Road #5, Dhanmondi, Dhaka, Bangladesh</p>
            </div>

            <div className="flex items-center gap-4">
              <Phone />
              <p>+880 1780-000000</p>
            </div>

            <div className="flex items-center gap-4">
              <Mail />
              <p>support@fastparcel.com</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Side - Contact Form */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Send Us a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Your Name</label>
              <Input
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-medium">Email</label>
              <Input
                name="email"
                placeholder="example@mail.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-medium">Subject</label>
              <Input
                name="subject"
                placeholder="Message subject"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="font-medium">Message</label>
              <Textarea
                name="message"
                placeholder="Write your message..."
                rows={5}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full py-3 text-lg rounded-xl">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
