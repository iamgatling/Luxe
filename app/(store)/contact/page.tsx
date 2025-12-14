'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-muted-foreground mb-6">
            Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is this regarding?" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." className="min-h-[150px]" required />
            </div>

            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Our Office</h3>
            <p className="text-muted-foreground">
              123 Commerce St.<br />
              Business City, BC 12345<br />
              United States
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-muted-foreground">
              support@example.com
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-muted-foreground">
              +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
