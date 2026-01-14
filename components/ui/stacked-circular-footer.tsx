"use client"

import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <Icons.logo className="w-16 h-16 text-foreground" />
          </div>

          {/* Navigation */}
          <nav className="mb-8 flex flex-wrap justify-center gap-8">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Work</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>

          {/* Social Icons */}
          <div className="mb-8 flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-muted">
              <Facebook className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-muted">
              <Twitter className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-muted">
              <Instagram className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-border bg-transparent hover:bg-muted">
              <Linkedin className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>

          {/* Email Subscribe */}
          <div className="mb-8 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-full"
                />
              </div>
              <Button type="submit" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2026 Haestus. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { StackedCircularFooter }
