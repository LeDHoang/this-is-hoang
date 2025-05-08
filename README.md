# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, React, shadcn/ui, and Tailwind CSS.

## Features

- 🌓 Dark/Light mode with system preference detection
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 📝 Project showcase with horizontal scrolling
- 💼 Experience timeline
- 🛠️ Skills visualization
- 📬 Contact form with validation and toast notifications
- 🔍 SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zod](https://zod.dev/) - Form validation
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your profile image:
   - Place your profile image in the `public` directory as `profile.jpg`

4. Configure environment variables:
   - Create a `.env.local` file in the root directory
   - Add any necessary API keys or configuration values

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

1. Update personal information:
   - Edit the content in `src/components/sections/bio.tsx`
   - Modify project details in `src/components/sections/projects.tsx`
   - Update experience in `src/components/sections/experience.tsx`
   - Adjust skills in `src/components/sections/skills.tsx`

2. Customize theme:
   - Modify colors in `src/app/globals.css`
   - Adjust component styles in `src/components/ui/*`

3. Configure contact form:
   - The contact form is set up with validation and toast notifications
   - To enable actual form submission, uncomment and update the fetch code in `src/components/sections/contact.tsx`
   - Add your email service provider or API endpoint

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── sections/      # Page sections
│   └── ui/            # UI components
├── lib/               # Utility functions
└── styles/            # Global styles
```

## Deployment

The site can be easily deployed to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
