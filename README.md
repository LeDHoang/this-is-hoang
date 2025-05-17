# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js, React, shadcn/ui, Tailwind CSS, and Supabase.

## Features

- 🌓 Dark/Light mode with system preference detection
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations (using Framer Motion)
- 📝 Dynamic Project showcase with horizontal scrolling, expandable details, and links to:
    - Individual project changelog pages
    - GitHub repositories
    - Presentations/External links
- 🖼️ Photography showcase with interactive Bento Gallery and 3D Photo Carousel
- ⏳ Project Changelog pages displaying a timeline of updates and attachments (images/files)
- 💬 Expandable AI Chatbot (`mini-Hoang`):
    - Answers questions about your profile/projects based on embedded knowledge
    - Supports text, image, and audio input
    - Streams responses
- 💼 Experience timeline (assumed)
- 🛠️ Skills visualization (assumed)
- 📬 Contact form with validation and toast notifications (using React Hook Form, Zod, Sonner)
- ☁️ Data managed via Supabase (Projects, Logs, Attachments, Chat Embeddings)
- 🔍 SEO optimized

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database & Backend**: [Supabase](https://supabase.com/) (Postgres, Auth, Storage, Vector Embeddings)
- **Icons**: [Lucide React](https://lucide.dev/), [Mynaui Icons](https://mynaui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Date Handling**: [date-fns](https://date-fns.org/) (likely used by Supabase or UI components)
- **AI Chat**: Potentially [OpenAI API](https://openai.com/)

## Getting Started

1.  Clone the repository:
    ```bash
    git clone https://github.com/LeDHoang/this-is-hoang.git
    cd this-is-hoang
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Supabase:
    - Create a Supabase project at [database.new](https://database.new).
    - In the SQL Editor, run the DDL scripts provided (or use the migration script) to create the `projects`, `project_logs`, and `project_log_attachments` tables.
    - Set up Supabase Storage for chat attachments if needed.
    - Set up vector embeddings for the AI chat feature (refer to Supabase documentation).

4.  Configure environment variables:
    - Create a `.env.local` file in the root directory (copy from `.env.local.example` if provided).
    - Add your Supabase Project URL and Anon Key:
      ```
      NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
      ```
    - Add any other necessary keys (e.g., `OPENAI_API_KEY` if using OpenAI for chat).

5.  Run the project data migration script (optional, only if you have existing static data in `src/lib/projects.ts`):
    ```bash
    node scripts/migrate-projects.js
    ```

6.  Start the development server:
    ```bash
    npm run dev
    ```

7.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

1.  Update personal information:
    - Edit the content in `src/components/sections/bio.tsx`
    - Modify experience in `src/components/sections/experience.tsx`
    - Adjust skills in `src/components/sections/skills.tsx`
    - Add/Edit project data directly in your Supabase dashboard.

2.  Customize theme:
    - Modify colors in `tailwind.config.js` and `src/app/globals.css`
    - Adjust component styles in `src/components/ui/*`

3.  Configure contact form:
    - Update the API endpoint or email service logic in `src/components/sections/contact.tsx`.

4.  Configure AI Chat:
    - Modify the system prompt and behavior in the relevant API route (`src/app/api/chat/route.ts` assumed).
    - Update Supabase vector embedding logic as needed.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/             # API routes (e.g., /api/chat)
│   ├── projects/[slug]/changelog/page.tsx # Dynamic changelog page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── sections/      # Page sections (Bio, Projects, Experience, etc.)
│   └── ui/            # Reusable UI components (Button, Card, etc.)
├── lib/               # Utility functions (Supabase client, utils)
scripts/
├── migrate-projects.js # Script to migrate static project data to Supabase
public/
├── profile.jpg        # Your profile picture
├── ...                # Other static assets (images, fonts)
.env.local             # Environment variables (Supabase keys, etc.)
# ... other config files (tailwind.config.js, tsconfig.json, etc.)
```

## Deployment

The site can be easily deployed to Vercel:

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Configure the necessary environment variables in the Vercel project settings (matching your `.env.local`).
4.  Deploy!

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Supabase](https://supabase.com/) for the powerful backend services
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
