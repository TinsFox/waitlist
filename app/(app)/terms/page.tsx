import { Metadata } from 'next'

const termsData = {
  lastUpdated: '2024-03-20',
  sections: [
    {
      title: 'Terms of Service',
      content: `These Terms of Service ("Terms") govern your access to and use of our services. By using our services, you agree to be bound by these Terms.`
    },
    {
      title: '1. Acceptance of Terms',
      content: `By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.`
    },
    {
      title: '2. Changes to Terms',
      content: `We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page.`
    },
  ]
}

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service and legal information',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {termsData.lastUpdated}
          </p>
        </div>

        <div className="space-y-12">
          {termsData.sections.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-xl font-medium text-foreground">
                {section.title}
              </h2>
              <div className="prose dark:prose-invert prose-neutral">
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
