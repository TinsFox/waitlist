"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Introduction</h2>
            <p>
              We respect your privacy and are committed to protecting your
              personal data. This privacy policy will inform you about how we
              handle your personal information when you use our iOS application
              and tell you about your privacy rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Information We Collect</h2>
            <p>
              When you use our application, we may collect the following types
              of information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email address (when you sign up or log in)</li>
              <li>Usage data (how you interact with our app)</li>
              <li>
                Device information (device type, operating system version)
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our service</li>
              <li>Notify you about changes to our service</li>
              <li>Provide customer support</li>
              <li>Monitor the usage of our service</li>
              <li>Detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Data Security</h2>
            <p>
              The security of your data is important to us. We implement
              appropriate security measures to protect your personal
              information. However, please be aware that no method of
              transmission over the Internet or method of electronic storage is
              100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Your Data Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to our processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Children&apos;s Privacy</h2>
            <p>
              Our service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from
              children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>By email: support@example.com</li>
              <li>By visiting our website: https://example.com/contact</li>
            </ul>
          </section>

          <div className="pt-8">
            <Button asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
