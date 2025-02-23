import * as React from "react"

interface RegistryItem {
  name: string
  title: string
  slug: string
  description: string
  category: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
}

export interface Mail {
  name: string
  title: string
  slug: string
  description: string
  category: string
  component: React.LazyExoticComponent<React.ComponentType<any>>
}

export const registryData: Record<string, Record<string, RegistryItem>> = {
  "emails": {
    "aws-verify-email": {
      "name": "aws-verify-email",
      "title": "Aws Verify Email",
      "slug": "aws-verify-email",
      "description": "Magic Links emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/magic-links/aws-verify-email'))
    },
    "linear-login-code": {
      "name": "linear-login-code",
      "title": "Linear Login Code",
      "slug": "linear-login-code",
      "description": "Magic Links emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/magic-links/linear-login-code'))
    },
    "notion-magic-link": {
      "name": "notion-magic-link",
      "title": "Notion Magic Link",
      "slug": "notion-magic-link",
      "description": "Magic Links emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/magic-links/notion-magic-link'))
    },
    "plaid-verify-identity": {
      "name": "plaid-verify-identity",
      "title": "Plaid Verify Identity",
      "slug": "plaid-verify-identity",
      "description": "Magic Links emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/magic-links/plaid-verify-identity'))
    },
    "raycast-magic-link": {
      "name": "raycast-magic-link",
      "title": "Raycast Magic Link",
      "slug": "raycast-magic-link",
      "description": "Magic Links emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/magic-links/raycast-magic-link'))
    },
    "slack-confirm": {
      "name": "slack-confirm",
      "title": "Slack Confirm",
      "slug": "slack-confirm",
      "description": "Magic Links emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/magic-links/slack-confirm'))
    },
    "codepen-challengers": {
      "name": "codepen-challengers",
      "title": "Codepen Challengers",
      "slug": "codepen-challengers",
      "description": "Newsletters emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/newsletters/codepen-challengers'))
    },
    "google-play-policy-update": {
      "name": "google-play-policy-update",
      "title": "Google Play Policy Update",
      "slug": "google-play-policy-update",
      "description": "Newsletters emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/newsletters/google-play-policy-update'))
    },
    "stack-overflow-tips": {
      "name": "stack-overflow-tips",
      "title": "Stack Overflow Tips",
      "slug": "stack-overflow-tips",
      "description": "Newsletters emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/newsletters/stack-overflow-tips'))
    },
    "github-access-token": {
      "name": "github-access-token",
      "title": "Github Access Token",
      "slug": "github-access-token",
      "description": "Notifications emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/notifications/github-access-token'))
    },
    "papermark-year-in-review": {
      "name": "papermark-year-in-review",
      "title": "Papermark Year In Review",
      "slug": "papermark-year-in-review",
      "description": "Notifications emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/notifications/papermark-year-in-review'))
    },
    "vercel-invite-user": {
      "name": "vercel-invite-user",
      "title": "Vercel Invite User",
      "slug": "vercel-invite-user",
      "description": "Notifications emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/notifications/vercel-invite-user'))
    },
    "yelp-recent-login": {
      "name": "yelp-recent-login",
      "title": "Yelp Recent Login",
      "slug": "yelp-recent-login",
      "description": "Notifications emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/notifications/yelp-recent-login'))
    },
    "apple-receipt": {
      "name": "apple-receipt",
      "title": "Apple Receipt",
      "slug": "apple-receipt",
      "description": "Receipts emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/receipts/apple-receipt'))
    },
    "nike-receipt": {
      "name": "nike-receipt",
      "title": "Nike Receipt",
      "slug": "nike-receipt",
      "description": "Receipts emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/receipts/nike-receipt'))
    },
    "dropbox-reset-password": {
      "name": "dropbox-reset-password",
      "title": "Dropbox Reset Password",
      "slug": "dropbox-reset-password",
      "description": "Reset Password emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/reset-password/dropbox-reset-password'))
    },
    "twitch-reset-password": {
      "name": "twitch-reset-password",
      "title": "Twitch Reset Password",
      "slug": "twitch-reset-password",
      "description": "Reset Password emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/reset-password/twitch-reset-password'))
    },
    "airbnb-review": {
      "name": "airbnb-review",
      "title": "Airbnb Review",
      "slug": "airbnb-review",
      "description": "Reviews emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/reviews/airbnb-review'))
    },
    "amazon-review": {
      "name": "amazon-review",
      "title": "Amazon Review",
      "slug": "amazon-review",
      "description": "Reviews emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/reviews/amazon-review'))
    },
    "koala-welcome": {
      "name": "koala-welcome",
      "title": "Koala Welcome",
      "slug": "koala-welcome",
      "description": "Welcome emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/welcome/koala-welcome'))
    },
    "netlify-welcome": {
      "name": "netlify-welcome",
      "title": "Netlify Welcome",
      "slug": "netlify-welcome",
      "description": "Welcome emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/welcome/netlify-welcome'))
    },
    "stripe-welcome": {
      "name": "stripe-welcome",
      "title": "Stripe Welcome",
      "slug": "stripe-welcome",
      "description": "Welcome emails template",
      "category": "emails",
      "component": React.lazy(() => import('./emails/welcome/stripe-welcome'))
    }
  },
  "home": {
    "innovate": {
      "name": "innovate",
      "title": "Innovate",
      "slug": "innovate",
      "description": "The future of software development is here",
      "category": "home",
      "component": React.lazy(() => import('./home/innovate'))
    },
    "neon-next": {
      "name": "neon-next",
      "title": "Neon Next",
      "slug": "neon-next",
      "description": "The future of software development is here",
      "category": "home",
      "component": React.lazy(() => import('./home/neon-next'))
    },
    "tech-pulse": {
      "name": "tech-pulse",
      "title": "Tech Pulse",
      "slug": "tech-pulse",
      "description": "The future of software development is here",
      "category": "home",
      "component": React.lazy(() => import('./home/tech-pulse'))
    }
  }
}
