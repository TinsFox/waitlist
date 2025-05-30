import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-xl">
      <div className="container px-4 py-6 md:py-8 lg:py-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="space-y-3 lg:w-1/4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">afjs</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Waitlist templates for products.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:flex-1 lg:justify-end">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">PRODUCT</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">TEAM</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/innocces"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                  >
                    <span>innocces</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/akazwz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                  >
                    <span>akazwz</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/TinsFox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                  >
                    <span>TinsFox</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">COMMUNITY</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@example.com"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">LEGAL</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t mt-8 pt-6 md:pt-8">
          <div className="flex gap-4">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Copyright © {new Date().getFullYear()} afjs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
