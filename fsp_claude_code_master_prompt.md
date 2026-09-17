# Claude Code Master Prompt --- FSP Website

## Role

You are a senior product designer, UX architect, motion designer and
frontend engineer.

Build a premium, modern, multi-page website for:

**FACILITATOR SUPPORT PROGRAM (FSP)**

Founder: **Karunai Prakash**

Primary website tagline:

# LEARN. LEAD. IMPACT.

------------------------------------------------------------------------

# 1. Project Files You Must Reference

The project folder will contain:

1.  `FSP-WEBSITE-CONTENT.md` --- the complete approved FSP content and
    messaging document.
2.  The supplied FSP logo asset.

Treat `FSP-WEBSITE-CONTENT.md` as the primary source of truth for all
FSP content.

Treat the supplied logo as the primary source of truth for visual
branding.

Do not invent unsupported claims.

------------------------------------------------------------------------

# 2. Approved External References

## Existing FSP Website

Inspect ONLY:

https://www.karunaiprakash.com/fsp

Important:

Do NOT inspect or use information from any other page on the
`karunaiprakash.com` website.

The existing FSP page is allowed only as a reference for the currently
published FSP positioning and presentation.

## Design Reference

Use:

https://www.sentientx.com/

Use it as a **design and interaction reference**, not as a technology
stack to copy.

Do not clone it.

Do not copy its text, assets, proprietary graphics or exact layouts.

Study its: - editorial typography - whitespace - visual hierarchy -
scroll storytelling - section transitions - large statements -
asymmetrical compositions - subtle motion - interactive content
presentation - premium visual rhythm

------------------------------------------------------------------------

# 3. The Design Goal

Create a website that feels like:

**Premium learning ecosystem + professional facilitator community +
modern digital experience**

It must NOT feel like:

-   a generic coaching website
-   a conventional training institute
-   a generic online-course landing page
-   a SaaS template
-   a WordPress-style corporate site
-   a page made entirely of repetitive cards

The experience should communicate:

> FSP is not just a course for trainers. It is a growth ecosystem for
> facilitators.

The website itself should feel like an experience.

------------------------------------------------------------------------

# 4. Design Inspiration vs Technology

The goal is:

> Replicate SentientX's **interaction and editorial design language**
> using a performant Next.js implementation.

Do NOT attempt to reproduce SentientX's underlying platform.

Use its visual thinking rather than its implementation.

------------------------------------------------------------------------

# 5. Recommended Technology Stack

Use:

-   Next.js
-   TypeScript
-   App Router
-   Tailwind CSS
-   CSS variables/design tokens
-   next/image
-   next/font
-   ESLint
-   strict TypeScript

Prefer Server Components.

Use Client Components only when interaction requires them.

------------------------------------------------------------------------

# 6. Motion / Animation Stack

The site SHOULD have sophisticated motion.

Do not avoid animation merely for performance.

Instead, use the right tool for the right job.

## Smooth scrolling

Use:

**Lenis**

Implement smooth scrolling globally.

Requirements: - smooth but not sluggish - natural interpolation -
preserve accessibility - work correctly with anchor navigation - work
correctly with sticky sections - work correctly with mobile browsers -
respect `prefers-reduced-motion`

Do not use Locomotive Scroll if Lenis is being used.

Lenis and Locomotive Scroll solve substantially overlapping
smooth-scroll/scroll-management problems. Choose Lenis as the primary
smooth-scroll system.

------------------------------------------------------------------------

# 7. GSAP

GSAP is allowed and recommended for complex scroll-driven interactions.

Use:

**GSAP + ScrollTrigger**

for interactions such as:

-   pinned storytelling sections
-   scroll-driven text transitions
-   horizontal scrolling narratives
-   progressive visual reveals
-   number animations
-   large typography transformations
-   section choreography

Do NOT animate everything with GSAP.

Use CSS for simple transitions.

Use GSAP only when it materially improves the experience.

------------------------------------------------------------------------

# 8. Framer Motion

Framer Motion may be used for:

-   component-level entrance animations
-   modal/menu transitions
-   micro-interactions
-   page transitions
-   small UI animations

However, do NOT use Framer Motion and GSAP for the same animation.

Choose the appropriate animation engine per component.

A reasonable architecture is:

**GSAP + ScrollTrigger** → scroll-driven / cinematic interactions

**Framer Motion** → component/UI transitions

**CSS** → simple hover/transition states

------------------------------------------------------------------------

# 9. Three.js / WebGL

Three.js/WebGL is ALLOWED, but it must be justified.

Do not add Three.js simply because the reference site is visually
sophisticated.

Use WebGL only for a genuinely valuable visual element.

Possible use cases:

-   subtle interactive hero visual
-   abstract facilitator/network ecosystem
-   flowing particles/lines representing connection
-   interactive trajectory based on the FSP logo's movement language

If used:

-   lazy-load it
-   isolate it in a client component
-   keep it out of the initial critical rendering path where possible
-   provide a static fallback
-   disable/reduce it on low-power/mobile devices when appropriate
-   respect `prefers-reduced-motion`
-   do not make WebGL necessary to understand the website

If the same visual can be achieved with CSS/SVG at substantially lower
cost, use CSS/SVG.

------------------------------------------------------------------------

# 10. Lottie

Lottie is allowed for small, purposeful animations.

Use only when an appropriate animation asset exists.

Do not create a page filled with Lottie animations.

Do not autoplay multiple heavy animations simultaneously.

Lazy-load below-the-fold animation assets.

------------------------------------------------------------------------

# 11. Rive

Rive is allowed if a future branded interactive illustration is supplied
or created specifically for FSP.

Potential use:

-   interactive facilitator illustration
-   ecosystem animation
-   branded onboarding visual
-   interactive CTA illustration

Do not add Rive merely for the sake of technology.

------------------------------------------------------------------------

# 12. Technology Decision Summary

Use the following philosophy:

  Technology          Use
  ------------------- -------------------------------------------------
  Next.js             Core website architecture
  TypeScript          Application language
  Tailwind            Styling system
  Lenis               Global smooth scrolling
  GSAP                Complex scroll-driven storytelling
  ScrollTrigger       GSAP scroll orchestration
  Framer Motion       UI/component transitions where appropriate
  CSS                 Simple transitions and micro-interactions
  SVG                 Lightweight illustrations and diagrams
  Three.js/WebGL      Only for genuinely valuable interactive visuals
  Lottie              Selective lightweight animation assets
  Rive                Selective interactive branded graphics
  Locomotive Scroll   Do not use alongside Lenis

The priority is:

**Premium interaction without unnecessary technical weight.**

------------------------------------------------------------------------

# 13. Performance Philosophy

Do NOT interpret "premium motion" as permission to make the site heavy.

Target:

-   fast initial render
-   low JavaScript execution
-   optimized images
-   minimal blocking resources
-   lazy-loaded interactive experiences
-   minimal third-party scripts
-   excellent mobile performance

Use: - AVIF/WebP - responsive image sizes - lazy loading - code
splitting - dynamic imports - server rendering - static generation where
appropriate - route-level loading boundaries where useful

Avoid: - giant hero videos - autoplay background video - unnecessary
WebGL - multiple animation libraries doing the same job - enormous image
files - unoptimized fonts - excessive DOM nesting - excessive scroll
listeners - unnecessary hydration

------------------------------------------------------------------------

# 14. FSP Brand System

Use the supplied logo.

Approximate logo colors:

``` css
--fsp-navy: #263672;
--fsp-orange: #FBA81C;
--fsp-bg: #F7F7F7;
--fsp-white: #FFFFFF;
--fsp-ink: #10131C;
--fsp-muted: #687080;
--fsp-border: #E4E6EB;
```

Use navy as the primary brand color.

Use orange as an accent.

Do not make the entire website orange.

Maintain strong contrast for the logo.

Create a sophisticated neutral system around the brand colors.

------------------------------------------------------------------------

# 15. Visual Language

Use:

-   oversized typography
-   editorial layouts
-   12-column desktop grid
-   asymmetry
-   generous whitespace
-   thin divider lines
-   oversized numbers
-   dark/light section contrast
-   subtle orange accents
-   large visual statements
-   restrained borders
-   sophisticated cards
-   sticky/pinned storytelling
-   scroll-based narrative progression

Avoid: - excessive rounded cards - excessive gradients - glassmorphism
everywhere - colorful icon grids - stock-photo-heavy sections - generic
3-column feature grids

------------------------------------------------------------------------

# 16. Core Visual Narrative

Create a signature FSP journey:

**LEARN** ↓ **PRACTICE** ↓ **CREATE** ↓ **BUILD** ↓ **CONNECT** ↓
**GROW**

Then connect this ecosystem to the primary brand idea:

# LEARN.

# LEAD.

# IMPACT.

This should be one of the site's major visual moments.

------------------------------------------------------------------------

# 17. Homepage

Create a high-impact editorial homepage.

## Hero

Headline:

**BECOME A\
BETTER\
FACILITATOR.**

Supporting message:

**Build your facilitation skills.\
Build your brand.\
Create more impact.**

Then:

**FACILITATOR SUPPORT PROGRAM**

**LEARN. LEAD. IMPACT.**

CTAs:

**JOIN FSP**

**EXPLORE THE PROGRAM**

Use an asymmetrical composition.

Do not create a conventional centered hero.

------------------------------------------------------------------------

## Problem Section

Headline:

**BEING A GOOD TRAINER\
IS NOT ENOUGH.**

Present the supplied FSP challenge points as a dynamic editorial list
rather than ordinary bullets.

------------------------------------------------------------------------

## Transformation

Create a visual progression:

**TRAINER** → **FACILITATOR** → **FACILITATOR WITH IMPACT**

This is a conceptual visual representation, not a promise that every
participant follows exactly those stages.

------------------------------------------------------------------------

## What Is FSP?

Headline:

**MORE THAN A COURSE.**

Explain FSP as a structured learning and growth ecosystem.

Show:

LEARN → PRACTICE → CREATE → BUILD → CONNECT → GROW

------------------------------------------------------------------------

## Who Is FSP For?

Show:

-   Aspiring Trainers
-   New Trainers
-   Experienced Trainers
-   Corporate Trainers
-   HR & L&D Professionals
-   Facilitators

Use editorial compositions.

------------------------------------------------------------------------

## Ecosystem

Headline:

**ONE ECOSYSTEM.\
MULTIPLE GROWTH EXPERIENCES.**

Show:

1.  FSP Core Program
2.  30 Days Challenge
3.  Good to Great Facilitator
4.  FSP Community
5.  Masterclasses & Mastermind
6.  Experiences & Connections

Make this an ecosystem visual rather than six generic cards.

------------------------------------------------------------------------

## Core Program

Show:

01 --- Foundation of Facilitation

02 --- Build Your Training

03 --- Build Your Brand & Opportunities

CTA:

**EXPLORE CORE PROGRAM**

------------------------------------------------------------------------

## 30 Days

Create a large visual:

**30\
DAYS**

**30\
TASKS**

**1\
BETTER FACILITATOR**

Show:

30 Minutes \| 1 Practical Task \| 1 Step Forward

CTA:

**EXPLORE 30 DAYS CHALLENGE**

------------------------------------------------------------------------

## Good to Great

Show:

LEARNING → PRACTICE → REFLECTION → FEEDBACK → IMPROVEMENT

Headline:

**FROM GOOD\
TO GREAT.**

Use the supplied certification content.

------------------------------------------------------------------------

## Community

Headline:

**YOU DON'T HAVE\
TO GROW ALONE.**

Show the supplied community benefits.

------------------------------------------------------------------------

## Numbers

Create a large typographic statistics section.

Use only:

1000+ --- Community Members

50+ --- Learning Resources & Game Videos

10+ --- Years of Training & Facilitation Experience

500+ --- Team Building & OBT Programs

1 Lakh+ --- People Trained

India + International --- Training Experiences

------------------------------------------------------------------------

## Founder

Show:

**Karunai Prakash**

**Team Building Strategist \| Facilitator \| Founder, Key Purpose
Training Solutions**

Use the approved founder content from `FSP-WEBSITE-CONTENT.md`.

Highlight:

**To create 1000 impactful facilitators.**

------------------------------------------------------------------------

## Organisations

Headline:

**TRUSTED BY\
ORGANISATIONS ACROSS INDUSTRIES**

Use names supplied in the content file.

Important:

Only use logos where permission/assets are available.

Otherwise show names typographically.

------------------------------------------------------------------------

## Success Stories

Use the supplied transformation examples.

Do not present them as named customer testimonials unless real approved
testimonials are later supplied.

------------------------------------------------------------------------

## Final CTA

Headline:

**READY TO BECOME\
A BETTER FACILITATOR?**

Then:

You don't need to know everything before you start.

You need the right environment to Learn. Practice. Create. Connect.
Grow.

Primary CTA:

**JOIN FSP**

Secondary:

**TALK TO US**

------------------------------------------------------------------------

# 18. Required Pages

Build a true multi-page website.

Routes:

``` text
/
 /about-fsp
 /core-program
 /30-days-challenge
 /certification
 /community
 /events
 /resources
 /faq
 /contact
```

Optionally:

``` text
/ecosystem
```

if it improves information architecture.

Do not collapse everything into one page.

------------------------------------------------------------------------

# 19. About FSP

Create an editorial story around:

-   The Need
-   The Philosophy
-   The Ecosystem
-   The Journey
-   The Vision

Large visual statement:

**TO CREATE\
1000\
IMPACTFUL\
FACILITATORS.**

------------------------------------------------------------------------

# 20. Core Program

Dedicated page containing all three modules and their supplied topics.

End with:

**THE CORE PROGRAM IS WHERE\
YOUR JOURNEY BEGINS.**

CTA:

**JOIN FSP**

------------------------------------------------------------------------

# 21. 30 Days Challenge

Dedicated page.

Hero:

**30 DAYS.\
30 TASKS.\
ONE BETTER FACILITATOR.**

Use a visual 30-day journey/calendar structure.

Do not invent individual daily tasks.

------------------------------------------------------------------------

# 22. Certification

Dedicated page.

Hero:

**FROM GOOD\
TO GREAT.**

Visual:

Learning → Practice → Reflection → Feedback → Improvement

Use all supplied certification focus areas.

End with:

**THE CERTIFICATE IS A MILESTONE.\
THE GROWTH IS THE JOURNEY.**

------------------------------------------------------------------------

# 23. Community

Dedicated page.

Hero:

**YOU DON'T HAVE TO\
GROW ALONE.**

Include:

-   Knowledge Sharing
-   Peer Learning
-   Masterclasses
-   Mastermind
-   Challenges
-   Resources
-   Networking
-   Collaboration
-   Professional Opportunities

Create sections for:

-   Wednesday Masterclass
-   FSP Mastermind
-   Catalyst Connect
-   FSP TTX

------------------------------------------------------------------------

# 24. Events

Create an event hub.

Categories:

-   FSP Core Program
-   30 Days Challenge
-   Wednesday Masterclass
-   FSP Mastermind
-   FSP Catalyst Connect
-   FSP TTX
-   Community Meetups
-   Special Learning Experiences

Do not invent dates.

If there are no real upcoming events:

**Upcoming experiences will appear here.**

Create a scalable event data structure for future updates.

------------------------------------------------------------------------

# 25. Resources

Create a resource library.

Categories:

-   Activity Ideas
-   Game Videos
-   Training Templates
-   Session Formats
-   Worksheets
-   Workbooks
-   Proposal Templates
-   Branding Resources
-   Learning Resources
-   Facilitation Tools

Create filtering/search architecture.

Do not invent actual downloadable resources.

------------------------------------------------------------------------

# 26. FAQ

Create an elegant accessible accordion using all supplied FAQ content.

------------------------------------------------------------------------

# 27. Contact / Join FSP

Create a dedicated conversion page.

Headline:

**START YOUR\
FSP JOURNEY.**

Fields:

-   Name
-   Email
-   Phone
-   Current Role
-   Experience Level
-   What are you looking for?
-   Message

Experience options:

-   Aspiring Trainer
-   New Trainer
-   Experienced Trainer
-   Corporate Trainer
-   HR / L&D Professional
-   Facilitator
-   Other

Primary CTA:

**JOIN FSP**

Secondary:

**TALK TO US**

Do not invent backend infrastructure.

Make the form integration-ready.

------------------------------------------------------------------------

# 28. Navigation

Desktop:

``` text
FSP LOGO

About FSP
Programs
Community
Events
Resources
FAQ

JOIN FSP
```

Programs dropdown:

-   Core Program
-   30 Days Challenge
-   Good to Great Certification

Community dropdown:

-   FSP Community
-   Wednesday Masterclass
-   FSP Mastermind
-   Catalyst Connect
-   FSP TTX

Mobile:

Use a polished full-screen overlay menu.

Keep JOIN FSP prominent.

------------------------------------------------------------------------

# 29. Component Architecture

Use reusable components.

Suggested:

``` text
components/
  layout/
    Navbar
    Footer
    MobileMenu

  ui/
    Button
    SectionHeading
    Eyebrow
    Accordion
    Reveal
    Divider
    Stat
    Marquee

  motion/
    ScrollReveal
    TextReveal
    Parallax
    PinnedSection
    HorizontalScroll

  fsp/
    Hero
    Ecosystem
    Journey
    AudienceCards
    ProgramCard
    Module
    ChallengeCounter
    CertificationJourney
    CommunityGrid
    EventCard
    ResourceCard
    FounderSection
    OrganisationGrid
    TransformationStory
    FinalCTA
```

Do not make page files monolithic.

------------------------------------------------------------------------

# 30. Data Architecture

Do not hardcode all content directly inside JSX.

Create:

``` text
data/
  fsp.ts
  programs.ts
  community.ts
  events.ts
  resources.ts
  faq.ts
  organisations.ts
```

The website should be easy to maintain.

Events and resources should be especially easy to update.

------------------------------------------------------------------------

# 31. Imagery

Do not make the site dependent on stock photography.

Use:

-   supplied logo
-   approved photographs if provided
-   editorial typography
-   SVG
-   CSS visuals
-   subtle abstract motion
-   lightweight illustrations

The logo's movement/rising/impact motif can inspire the visual language.

Potential motifs:

-   trajectory
-   forward movement
-   rising path
-   spark
-   connection

Do not repeatedly reproduce the logo symbol.

------------------------------------------------------------------------

# 32. Typography

Use a premium modern sans-serif.

Prefer one primary font family if possible.

Use:

-   oversized display type
-   strong weight contrast
-   compact headlines
-   readable body copy
-   generous line-height

Typography should act as a visual element.

------------------------------------------------------------------------

# 33. Responsive Design

Design mobile-first.

Support:

320px 375px 390px 430px 768px 1024px 1280px 1440px+

Do not simply stack desktop layouts.

Mobile must be intentionally designed.

For mobile:

-   control display typography
-   remove unnecessary decorative effects
-   simplify complex animations
-   preserve hierarchy
-   avoid horizontal overflow
-   use touch-friendly controls
-   keep CTAs accessible
-   optimize image payloads
-   reduce WebGL/animation complexity where appropriate

Consider a sticky mobile JOIN FSP CTA only if it does not obstruct
content.

------------------------------------------------------------------------

# 34. Accessibility

Target WCAG 2.2 AA.

Implement:

-   semantic HTML
-   proper heading hierarchy
-   keyboard navigation
-   visible focus states
-   accessible accordions
-   accessible mobile navigation
-   accessible forms
-   meaningful alt text
-   sufficient contrast
-   reduced-motion support

For `prefers-reduced-motion`:

-   disable smooth scrolling or reduce it substantially
-   disable non-essential scroll choreography
-   reduce parallax
-   provide static WebGL/SVG fallbacks
-   keep content fully usable

------------------------------------------------------------------------

# 35. SEO

Implement per-route:

-   title
-   meta description
-   canonical URL
-   Open Graph metadata
-   social metadata
-   sitemap
-   robots.txt

Use structured data where appropriate.

Suggested titles:

Home: **Facilitator Support Program \| Learn. Lead. Impact.**

Core: **FSP Core Program \| Build Your Facilitation Skills**

30 Days: **FSP 30 Days Challenge \| 30 Days. 30 Tasks. One Better
Facilitator.**

Certification: **Good to Great Facilitator \| FSP Certification**

Community: **FSP Community \| Learn, Connect & Grow**

Events: **FSP Events \| Masterclasses, Mastermind & Experiences**

Resources: **FSP Resources \| Facilitator Toolkit**

FAQ: **FSP FAQ**

Contact: **Join Facilitator Support Program**

------------------------------------------------------------------------

# 36. Performance Budget / Rules

Performance is a first-class requirement.

Do not sacrifice loading speed for visual effects.

Use dynamic imports for:

-   Three.js
-   WebGL components
-   heavy GSAP sections
-   Rive
-   Lottie
-   other optional interactive modules

Keep the initial route lightweight.

Avoid unnecessary third-party scripts.

Prefer server-rendered/static content.

Optimize all media.

Test the production build.

------------------------------------------------------------------------

# 37. Smooth Scrolling Architecture

Implement Lenis correctly.

Requirements:

-   global smooth scrolling
-   anchor-link support
-   compatible with GSAP ScrollTrigger
-   no competing scroll libraries
-   no scroll-jank
-   no broken browser back/forward behavior
-   no accessibility regression
-   reduced-motion fallback

If using GSAP ScrollTrigger:

Synchronize Lenis and ScrollTrigger correctly.

Do not create independent scroll loops for every component.

Use one central scroll orchestration layer.

------------------------------------------------------------------------

# 38. Animation Architecture

Use animation deliberately.

### CSS

Simple: - hover - opacity - transform - underline - button transitions

### Framer Motion

UI: - menus - dialogs - component transitions - small layout transitions

### GSAP + ScrollTrigger

Editorial: - pinned sections - scroll storytelling - text
transformations - horizontal narratives - complex section choreography

### Three.js/WebGL

Only: - hero or signature visual if it materially improves the
experience

### Lottie

Only: - supplied/approved animation assets

### Rive

Only: - supplied/approved interactive graphics

Do not mix multiple animation engines unnecessarily.

------------------------------------------------------------------------

# 39. Signature Interaction Concepts

Explore these interactions:

## A. FSP Journey

LEARN → PRACTICE → CREATE → BUILD → CONNECT → GROW

As the user scrolls, the active stage changes.

Use pinned/scroll-driven storytelling if it remains performant.

## B. Trainer → Facilitator

Use large typography and subtle transformation.

## C. 30 Days

Animate the large number and progress through the journey.

## D. Numbers

Use count-up only when it adds value.

## E. Ecosystem

Allow users to visually explore the relationship between the FSP
ecosystem components.

Do not turn every section into an animation.

------------------------------------------------------------------------

# 40. Content Integrity

Use the content in `FSP-WEBSITE-CONTENT.md`.

Do not invent:

-   testimonials
-   dates
-   prices
-   duration
-   delivery format
-   credentials
-   statistics
-   client relationships
-   certifications
-   guarantees

When information is unavailable, build a CMS/data placeholder
architecture instead.

------------------------------------------------------------------------

# 41. Organisation Logos

The source content lists organisations including:

Hyundai, Royal Enfield, Apollo Tyres, Michelin India, L&T Construction,
Bosch, Danfoss, Wipro, TCS, Cognizant, Tech Mahindra, Apollo Hospitals,
Rela Hospital, HDFC Bank, Indian Bank, UCO Bank, Tata Consumer Products,
Murugappa Group and Gulf Oil.

IMPORTANT:

Display logos only where permission/assets are available.

If actual approved logo assets are not present:

Use clean text names.

Do not download random unofficial logos from the internet.

------------------------------------------------------------------------

# 42. Success Stories

The source contains transformation examples.

Use them as supplied.

Until actual member names/testimonials are provided, label them as:

**Transformation Examples**

not fake testimonials.

------------------------------------------------------------------------

# 43. Founder Content

Use only the supplied founder information.

Founder:

**Karunai Prakash**

Role:

**Team Building Strategist \| Facilitator \| Founder, Key Purpose
Training Solutions**

Vision:

**To create 1000 impactful facilitators.**

Do not add unsupported biography.

------------------------------------------------------------------------

# 44. Build Process

Before writing large amounts of code:

1.  Inspect the logo.
2.  Read `FSP-WEBSITE-CONTENT.md`.
3.  Inspect only `https://www.karunaiprakash.com/fsp`.
4.  Inspect `https://www.sentientx.com/`.
5.  Establish the FSP design system.
6.  Establish information architecture.
7.  Establish motion architecture.
8.  Establish responsive behavior.
9.  Build reusable components.
10. Build homepage.
11. Build supporting pages.
12. Add motion.
13. Add smooth scrolling.
14. Optimize media.
15. Test mobile.
16. Test accessibility.
17. Test SEO.
18. Run production build.
19. Fix all errors.
20. Review visual consistency.

------------------------------------------------------------------------

# 45. Final Quality Bar

The finished website should look like a premium digital experience
designed by a specialist digital product studio.

It should feel:

-   editorial
-   sophisticated
-   modern
-   confident
-   human
-   professional
-   experiential

It should not feel like:

-   a template
-   a course marketplace
-   a coaching landing page
-   a generic corporate website

The visual story should repeatedly reinforce:

# LEARN.

# LEAD.

# IMPACT.

The technology should support the experience rather than become the
experience.

Use advanced technologies where they create meaningful visual value, but
keep the initial page fast and mobile performance strong.

------------------------------------------------------------------------

# Final Instruction

Build the website completely.

Do not stop after creating a homepage mockup.

Implement the full multi-page architecture, responsive design system,
motion system, smooth scrolling, reusable components, structured content
data, accessibility, SEO and production-ready code.

Prioritize:

**Design quality + interaction quality + performance +
maintainability.**
