# PlaceReady — Campus Placement Intelligence

AI-powered campus placement readiness tracker to help students prepare for their dream companies.

![PlaceReady](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## About

**PlaceReady** is a comprehensive placement preparation platform designed for students preparing for campus placements. It helps you:

- **Assess your skills** and identify gaps
- **Compare against company requirements** from top tech companies
- **Build a personalized study roadmap** with AI-powered recommendations
- **Track your progress** over time
- **Prepare with tools** like resume builder, ATS checker, and interview Q&A

Built with love for students by students. No account required - everything works locally in your browser.

## Features

- **Skill Assessment** — Track your technical skills with proficiency levels
- **Company Matching** — Compare your skills against top company requirements
- **AI Gap Analysis** — Get personalized study recommendations
- **Progress Tracking** — Save and share your readiness reports
- **PWA Support** — Installable as a native app

## Getting Started

### Live Demo

Visit: https://nishantjlu.github.io/placement-tracker/placement_readiness_tracker.html

### Local Development

```bash
# Clone the repo
git clone https://github.com/NishantJLU/placement-tracker.git
cd placement-tracker

# Serve with any static server
npx serve .
# or
python -m http.server 8000
```

## Deployment

### GitHub Pages

1. Go to Settings > Pages
2. Select `main` branch as source
3. Visit `https://nishantjlu.github.io/placement-tracker/`

### Vercel

```bash
npm i -g vercel
vercel
```

## Cloud Sync (Optional)

To enable cloud sync and real AI analysis:

1. Create a [Supabase](https://supabase.com) project
2. Get your URL and anon key
3. Update `js/cloud-sync.js` with credentials
4. Optionally add your [OpenAI API key](https://platform.openai.com/api-keys)

## Technologies

- Pure HTML/CSS/JS — No framework dependencies
- Google Fonts (Fraunces, DM Sans, DM Mono)
- Supabase (optional cloud sync)
- OpenAI API (optional AI analysis)

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a PR

## License

MIT — See LICENSE file for details.

## Acknowledgments

- [Google Fonts](https://fonts.google.com)
- [Striver's SDE Sheet](https://takeuforward.org/strivers-a2z-dsa-course/)
- [NPTEL](https://nptel.ac.in)