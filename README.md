# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, React, shadcn/ui, and Tailwind CSS.

## Features

- 🌓 Dark/Light mode with system preference detection
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 📝 Project showcase with horizontal scrolling
- 💼 Experience timeline
- 🛠️ Skills visualization
- 📬 Contact form with validation
- 🔍 SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Zod](https://zod.dev/) - Form validation
- [React Hook Form](https://react-hook-form.com/) - Form handling

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

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
   - Implement form submission in `src/components/sections/contact.tsx`
   - Add your email service provider

## Deployment

The site can be easily deployed to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
