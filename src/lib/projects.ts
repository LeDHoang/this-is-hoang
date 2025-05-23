export interface Project {
  title: string;
  date: string;
  category: string;
  summary: string;
  techStack: string[];
  logs: { date: string; note: string }[];
  achievements: string[];
  link: string;
  presentationLink?: string;
  tableauLink?: string;
}

export const categories = [
  "Machine Learning",
  "Data Science",
  "Web Design",
  "Photography"
];

export const projects: Project[] = [
  {
    title: "HER - Local Emotional AI Voice Assistant",
    date: "Current Project",
    category: "Machine Learning",
    summary: "Developing an emotionally intelligent conversational AI assistant inspired by the movie 'Her', with dual processing options: fully local execution for maximum privacy or integration with ChatGPT Realtime API for enhanced performance and lower latency. Features natural emotion detection and expression in conversations.",
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI Realtime API", "Whisper", "XTTS", "Emotion Recognition", "WebRTC"],
    logs: [
      { date: "2024-09-15", note: "Established project architecture with dual processing paths (local and API-based)" },
      { date: "2024-10-01", note: "Implemented local speech-to-text using Whisper with emotion detection capabilities" },
      { date: "2024-10-20", note: "Integrated OpenAI Realtime API for enhanced conversation fluidity and response quality" },
      { date: "2024-11-05", note: "Developed emotional text-to-speech synthesis with voice modulation based on context" },
      { date: "2024-11-25", note: "Currently optimizing latency and implementing memory for personalized emotional responses" }
    ],
    achievements: [
      "Created hybrid AI system with <0.5 second response time using API mode",
      "Implemented emotion recognition and appropriate vocal responses in conversations",
      "Designed memory system that adapts conversation style based on emotional history"
    ],
    link: "https://github.com/LeDHoang/HER--Local-AI-Voice-Assitant"
  },
  {
    title: "RAG-based PDF Query System for Healthcare Insurance",
    date: "Dec 2024",
    category: "Machine Learning",
    summary: "Developed a Streamlit-based RAG application that ingests healthcare insurance PDFs, chunks and embeds text with FAISS + AWS S3, and delivers context-aware GenAI answers via Claude/Amazon Titan.",
    techStack: ["Python", "Streamlit", "Docker", "LangChain", "FAISS", "AWS S3", "Claude", "Amazon Titan"],
    logs: [
      { date: "2024-10-01", note: "Defined architecture & data flow; established PDF ingestion pipeline" },
      { date: "2024-11-15", note: "Implemented text chunking & FAISS embedding generation" },
      { date: "2024-12-01", note: "Built admin UI for PDF uploads; integrated AWS S3 index storage" },
      { date: "2024-12-10", note: "Launched user Streamlit interface; validated answer accuracy > 95%" }
    ],
    achievements: [
      "95%+ accurate context-aware PDF Q&A",
      "Dockerized for one-click deployment"
    ],
    link: "https://github.com/LeDHoang/RAG-LLM-Healthcare-Insurance"
  },
  {
    title: "DeepSeekResearch: Multi-Agent Research Assistant",
    date: "Jan 2025",
    category: "Machine Learning",
    summary: "Built a multi-agent AI research assistant using CrewAI and LangChain, with dynamic model switching between local Deepseek R1 via Ollama and OpenAI model o1 through their API, guiding users through automated search, analysis, and structured report generation via a Streamlit interface.",
    techStack: ["Python", "Streamlit", "CrewAI", "LangChain", "OpenAI API", "Docker"],
    logs: [
      { date: "2024-11-20", note: "Scaffolded multi-agent architecture; defined agent roles" },
      { date: "2024-12-05", note: "Integrated advanced search tools; implemented prompt chaining" },
      { date: "2024-12-20", note: "Designed Streamlit UI for prompt refinement & report output" },
      { date: "2025-01-10", note: "Conducted user testing; iterated on UI & agent workflows" },
      { date: "2025-01-20", note: "Implemented dynamic switching between local Deepseek R1 (via Ollama) and OpenAI o1 model through API for flexible deployment" }
    ],
    achievements: [
      "Reduced research synthesis time by 50% in pilot tests",
      "User-configurable prompt refinement interface"
    ],
    link: "https://github.com/LeDHoang/DeepseekR1-Deep-Research-Agent"
  },
  {
    title: "Tetouan City Machine Learning Project to Predict Power Consumption",
    date: "Jun 2024",
    category: "Machine Learning",
    summary: "Produced a predictive model for power consumption in Tetouan City using Machine Learning in Python, leveraging weather and time-related variables such as diffuse flow from UCIML Repo.",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "AdaBoost Regression"],
    logs: [
      { date: "2024-04-15", note: "Collected and preprocessed Tetouan City power consumption dataset from UCIML" },
      { date: "2024-05-01", note: "Performed exploratory data analysis; identified key weather and time variables" },
      { date: "2024-05-20", note: "Implemented and compared multiple regression models (Linear, Random Forest, AdaBoost)" },
      { date: "2024-06-10", note: "Optimized AdaBoost model hyperparameters; achieved 94.5% prediction accuracy" }
    ],
    achievements: [
      "Achieved 94.5% accuracy with AdaBoost Regression",
      "Identified key climate features impacting power consumption patterns"
    ],
    link: "https://github.com/raynardflores/powerhouse-squad-project",
    presentationLink: "https://docs.google.com/presentation/d/1y_sWiRhllMJiLuo207LJPSRLDRtRdl9Ik0Hi7H3-k4Q/edit?usp=sharing"
  },
  {
    title: "Vanguard A/B Testing for New User Interface",
    date: "Jun 2024",
    category: "Data Science",
    summary: "Conducted a comprehensive analysis of client behavior and demographics in response to a new online process introduced by Vanguard Investing, using hypothesis testing to evaluate the effectiveness of UI changes.",
    techStack: ["Python", "Pandas", "NumPy", "Jupyter Notebook", "Tableau", "Statistical Analysis"],
    logs: [
      { date: "2024-04-05", note: "Cleaned and prepared client data from multiple sources for analysis" },
      { date: "2024-04-20", note: "Performed demographics analysis to identify primary client segments" },
      { date: "2024-05-10", note: "Conducted behavioral analysis examining completion rates, time spent, and error rates" },
      { date: "2024-05-25", note: "Applied hypothesis testing to evaluate significance of UI changes across user segments" },
      { date: "2024-06-15", note: "Created Tableau visualizations to present actionable insights to stakeholders" }
    ],
    achievements: [
      "Identified key demographic factors affecting UI interaction patterns",
      "Developed statistical framework comparing control vs test group performance",
      "Created comprehensive Tableau story visualizing test results and recommendations"
    ],
    link: "https://github.com/LeDHoang/Vanguard-AB-Testing",
    presentationLink: "https://docs.google.com/presentation/d/1IPHWxKpB7MLiGPrA37Z9vrTbxNYbdTQoBFnrYyi0Ybo/edit?usp=sharing",
    tableauLink: "https://public.tableau.com/app/profile/hoang.le.duc/viz/Book1_17176249007780/Dashboard5"
  },
  {
    title: "Professional Soccer Analytics and Team Optimization",
    date: "May 2024",
    category: "Data Science",
    summary: "Analyzed professional soccer database with 17k players and 2024 salary data scraped from Capology to find correlations between player statistics and compensation, then used linear programming to assemble optimal teams within budget constraints.",
    techStack: ["Python", "Pandas", "NumPy", "Jupyter Notebook", "Web Scraping", "Linear Programming"],
    logs: [
      { date: "2024-03-10", note: "Collected and integrated player statistics from Kaggle dataset" },
      { date: "2024-03-25", note: "Implemented web scraping solution to gather salary data from Capology" },
      { date: "2024-04-08", note: "Performed statistical analysis on player performance vs. compensation" },
      { date: "2024-04-20", note: "Developed linear programming model to optimize team selection within budget" },
      { date: "2024-05-05", note: "Generated optimal team compositions for both value and rating optimization" }
    ],
    achievements: [
      "Created algorithm to assemble best overall value team within budget constraints",
      "Developed separate model to maximize team rating while respecting position requirements",
      "Identified key performance metrics most correlated with player compensation"
    ],
    link: "https://github.com/LeDHoang/SportBetting-DataAnalytics",
    presentationLink: "https://docs.google.com/presentation/d/1E6k73X7N5hKuSZwvaJ0WUkMo4LVOeAdtlrb1h8VqSOw/edit?usp=sharing"
  },
  {
    title: "Harry Potter Universe Character Analysis",
    date: "Apr 2024",
    category: "Data Science",
    summary: "Conducted comprehensive data analysis on Harry Potter universe characters, combining Kaggle datasets with Potter:DB API data to explore relationships between character attributes, loyalty, and demographics.",
    techStack: ["Python", "Pandas", "NumPy", "Jupyter Notebook", "SQL", "Matplotlib", "Seaborn", "API Integration"],
    logs: [
      { date: "2024-02-15", note: "Designed and implemented SQL database schema for Harry Potter character data" },
      { date: "2024-03-01", note: "Integrated data from Kaggle dataset and Potter:DB API for comprehensive analysis" },
      { date: "2024-03-15", note: "Performed exploratory data analysis on character attributes and relationships" },
      { date: "2024-03-30", note: "Created character categorization model based on loyalty and moral alignment" },
      { date: "2024-04-10", note: "Generated visualizations showcasing demographic patterns and character profiles" }
    ],
    achievements: [
      "Developed SQL database schema to efficiently store and query character information",
      "Created categorization system for moral alignment based on character loyalties",
      "Discovered meaningful patterns in character attributes across different Hogwarts houses"
    ],
    link: "https://github.com/LeDHoang/HPWorld-DataAnalysis",
    presentationLink: "https://docs.google.com/presentation/d/19Ki-JT1panTx1nDKzkvIWd_HcwEqQLb6E1cy636BSvE/edit?usp=sharing"
  },
  {
    title: "Unquire - Extreme Fashion Ecommerce project",
    date: "Jan 2023",
    category: "Web Design",
    summary: "Full-stack self-created fashion brand ecommerce site built with Strapi API, MySQL database, and hosted on Hostinger VPS and domain.",
    techStack: ["Strapi API", "MySQL", "Hostinger VPS & Domain"],
    logs: [
      { date: "2023-01-16", note: "Initialized repository and created README.md (First commit)" },
      { date: "2023-01-17", note: "Configured Strapi backend with MySQL for customer and product management" },
      { date: "2023-01-18", note: "Implemented Strapi payment processing and dynamic price handling" },
      { date: "2023-01-19", note: "Developed website UI components and navigation" }
    ],
    achievements: [
      "Deployed full-stack ecommerce site to Hostinger VPS with custom domain",
      "Integrated secure payment handling via Strapi",
      "Designed responsive UI for seamless user experience"
    ],
    link: "https://github.com/LeDHoang/Ecommerce_Uniqure"
  },
  {
    title: "Instagram Clone Web Application",
    date: "Mar 2023",
    category: "Web Design",
    summary: "Full-stack Instagram web application using MERN stack (MongoDB, Express.js, React.js, Node.js) and deployed on Heroku with user accounts and timeline features.",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Heroku"],
    logs: [
      { date: "2023-03-01", note: "Initialized MERN project structure and created base README.md" },
      { date: "2023-03-05", note: "Configured Express.js server and MongoDB connection" },
      { date: "2023-03-10", note: "Implemented user authentication and JWT-based session handling" },
      { date: "2023-03-15", note: "Developed React components for user feeds and post creation" },
      { date: "2023-03-20", note: "Configured image upload handling and integrated with frontend" },
      { date: "2023-03-25", note: "Deployed application to Heroku and configured environment variables" }
    ],
    achievements: [
      "Built Instagram-like timeline with real-time post updates",
      "Secured user authentication with JWT",
      "Deployed full-stack application to Heroku"
    ],
    link: "https://github.com/LeDHoang/Insta-MERN"
  },
  {
    title: "This-is-Hoang",
    date: "May 2025",
    category: "Web Design",
    summary: "A modern, responsive personal portfolio website built with Next.js, React, shadcn/ui, Tailwind CSS, and Supabase, featuring dark/light mode, dynamic project showcases, and an AI chatbot.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Framer Motion"],
    logs: [
      { date: "2025-05-01", note: "Scaffolded Next.js application with Tailwind CSS and shadcn/ui" },
      { date: "2025-05-03", note: "Implemented dynamic project showcase and photography galleries" },
      { date: "2025-05-05", note: "Integrated Supabase backend and AI chatbot feature" },
      { date: "2025-05-07", note: "Deployed site to Vercel and optimized for SEO" }
    ],
    achievements: [
      "Built modern responsive UI with Next.js and Tailwind CSS",
      "Implemented AI-powered chat feature using Supabase vector embeddings",
      "Deployed site to Vercel with CI/CD and environment variable management"
    ],
    link: "https://github.com/LeDHoang/this-is-hoang"
  }
];

export default projects; 