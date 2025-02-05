"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicy() {
  return (
    <main className="relative mt-16">
      <div className="container max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-base text-muted-foreground">
              <strong>Effective date:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-base leading-7">
              At Waitlist Templates, we take your privacy seriously. Please read
              this Privacy Policy to learn how we treat your personal data.
              <strong>
                {" "}
                By using or accessing our Services in any manner, you
                acknowledge that you accept the practices and policies outlined
                below, and you hereby consent that we will collect, use and
                share your information as described in this Privacy Policy.
              </strong>
            </p>
          </div>

          {/* Table of Contents */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Privacy Policy Table of Contents
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#what-this-covers"
                  className="text-primary hover:underline"
                >
                  What this Privacy Policy Covers
                </Link>
              </li>
              <li>
                <Link
                  href="#personal-data"
                  className="text-primary hover:underline"
                >
                  Personal Data
                </Link>
              </li>
              {/* Add more table of contents items */}
            </ul>
          </div>

          {/* Main Content Sections */}
          <section id="what-this-covers" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              What this Privacy Policy Covers
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-base leading-7">
                This Privacy Policy covers how we treat Personal Data that we
                gather when you access or use our Services. "Personal Data"
                means any information that identifies or relates to a particular
                individual and also includes information referred to as
                "personally identifiable information" or "personal information"
                under applicable data privacy laws, rules or regulations.
              </p>
            </div>
          </section>

          <section id="personal-data" className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Personal Data
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">
                Categories of Personal Data We Collect
              </h3>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <h4 className="font-medium">Profile or Contact Data</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>First and last name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Unique identifiers such as passwords</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Contact Information
            </h2>
            <p className="text-base leading-7">
              If you have any questions or comments about this Privacy Policy,
              please do not hesitate to contact us at:
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
