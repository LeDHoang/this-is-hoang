#!/usr/bin/env node

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Create Supabase client directly instead of importing from application
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the projects data directly in this script
// Copy from src/lib/projects.ts manually to avoid ESM import issues
const projects = [
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
      { date: "2024-11-25", note: "Currently optimizing latency and implementing memory for personalized emotional responses" },
      { date: "2024-12-01", note: "Implemented memory system that adapts conversation style based on emotional history" }
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
    summary: "Built a multi-agent AI research assistant using CrewAI and LangChain, guiding users through automated search, analysis, and structured report generation via a Streamlit interface.",
    techStack: ["Python", "Streamlit", "CrewAI", "LangChain", "OpenAI API", "Docker"],
    logs: [
      { date: "2024-11-20", note: "Scaffolded multi-agent architecture; defined agent roles" },
      { date: "2024-12-05", note: "Integrated advanced search tools; implemented prompt chaining" },
      { date: "2024-12-20", note: "Designed Streamlit UI for prompt refinement & report output" },
      { date: "2025-01-10", note: "Conducted user testing; iterated on UI & agent workflows" }
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
  }
];

async function migrate() {
  console.log('🔄 Starting migration of projects to Supabase...');
  console.log(`📋 Found ${projects.length} projects to migrate`);

  // Helper to convert date strings to ISO format or null
  const formatDate = (dateStr) => {
    // Skip conversion for 'Current Project' and use null instead
    if (dateStr === 'Current Project') return null;
    
    // Handle month names in format "MMM YYYY"
    const monthMap = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    
    // Match patterns like "Dec 2024" or "Jan 2025"
    const monthYearMatch = dateStr.match(/^([A-Za-z]{3}) (\d{4})$/);
    if (monthYearMatch) {
      const month = monthMap[monthYearMatch[1]];
      const year = monthYearMatch[2];
      return `${year}-${month}-01`; // Use first day of month
    }
    
    return null; // Default to null for dates we can't parse
  };

  for (const project of projects) {
    // derive slug
    let slug = project.title.toLowerCase();
    // normalize slug: replace spaces, remove invalid chars, collapse dashes, trim
    slug = slug.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    slug = slug.replace(/-+/g, '-').replace(/^-+|-+$/g, '');

    console.log(`🔄 Processing project: ${project.title} (slug: ${slug})`);
    
    // Format the date or set to null if can't be formatted
    const formattedDate = formatDate(project.date);
    console.log(`   Date: ${project.date} → ${formattedDate || 'NULL'}`);

    // Try to get the project by slug to see if it exists
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('slug', slug)
      .single();

    // If project already exists, update it
    let projectId;
    if (existingProject) {
      projectId = existingProject.id;
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          title: project.title,
          summary: project.summary,
          date: formattedDate,
          category: project.category,
          link: project.link,
          presentation_link: project.presentationLink || null,
          tableau_link: project.tableauLink || null,
        })
        .eq('id', projectId);

      if (updateError) {
        console.error('❌ Error updating project:', project.title, updateError);
        continue;
      }
      console.log(`✅ Updated project: ${project.title} (id=${projectId})`);
    } else {
      // Insert new project
      const { data: insertedProjects, error: insertError } = await supabase
        .from('projects')
        .insert({
          slug,
          title: project.title,
          summary: project.summary,
          date: formattedDate,
          category: project.category,
          link: project.link,
          presentation_link: project.presentationLink || null,
          tableau_link: project.tableauLink || null,
        })
        .select('id');

      if (insertError) {
        console.error('❌ Error inserting project:', project.title, insertError);
        continue;
      }

      if (!insertedProjects || insertedProjects.length === 0) {
        console.error('❌ No project returned for:', project.title);
        continue;
      }

      projectId = insertedProjects[0].id;
      console.log(`✅ Inserted project: ${project.title} (id=${projectId})`);
    }

    // Idempotently upsert logs and map their IDs
    const logsMap = {};
    console.log(`📝 Upserting ${project.logs.length} logs for project: ${project.title}`);
    for (const log of project.logs) {
      const { data: upsertedLogs, error: logError } = await supabase
        .from('project_logs')
        .upsert(
          [{ project_id: projectId, log_date: log.date, note: log.note }],
          { onConflict: ['project_id', 'log_date'] }
        )
        .select('id,log_date');
      if (logError) {
        console.error('❌ Error upserting log:', log.date, logError);
      } else {
        const entry = Array.isArray(upsertedLogs) ? upsertedLogs[0] : upsertedLogs;
        logsMap[entry.log_date] = entry.id;
        console.log(`✅ Upserted log: ${entry.log_date}`);
      }
    }

    // Handle attachments.csv for project photos
    const attachmentsCsvPath = path.join(__dirname, '..', 'public', 'project-photos', slug, 'attachments.csv');
    if (fs.existsSync(attachmentsCsvPath)) {
      console.log(`📎 Found attachments CSV for project: ${project.title}`);
      const csvContent = fs.readFileSync(attachmentsCsvPath, 'utf8');
      const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
      lines.shift(); // remove header row
      for (const line of lines) {
        const [filename, logDate, type, ...captionParts] = line.split(',');
        const caption = captionParts.join(',').trim();
        const projectLogId = logsMap[logDate];
        if (!projectLogId) {
          console.warn(`⚠️ No log entry found for date ${logDate}. Skipping attachment ${filename}.`);
          continue;
        }
        const localFilePath = path.join(__dirname, '..', 'public', 'project-photos', slug, filename);
        if (!fs.existsSync(localFilePath)) {
          console.warn(`⚠️ Attachment file not found: ${localFilePath}. Skipping.`);
          continue;
        }
        const storagePath = `${slug}/${filename}`;
        const fileBuffer = fs.readFileSync(localFilePath);
        const { error: uploadError } = await supabase.storage.from('project-photos').upload(storagePath, fileBuffer, { upsert: false });
        if (uploadError && uploadError.statusCode !== 409) {
          console.error('❌ Error uploading attachment:', storagePath, uploadError);
          continue;
        }
        const { data: { publicUrl } } = supabase.storage.from('project-photos').getPublicUrl(storagePath);
        const { data: existingAttachment } = await supabase
          .from('project_log_attachments')
          .select('id')
          .eq('project_log_id', projectLogId)
          .eq('url', publicUrl)
          .single();
        if (existingAttachment) {
          console.log(`ℹ️ Attachment already exists in DB for ${storagePath}. Skipping insertion.`);
          continue;
        }
        const { error: attachmentError } = await supabase.from('project_log_attachments').insert({
          project_log_id: projectLogId,
          url: publicUrl,
          type,
          caption,
        });
        if (attachmentError) {
          console.error('❌ Error inserting attachment record for:', publicUrl, attachmentError);
        } else {
          console.log(`✅ Inserted attachment record for log ${logDate}: ${filename}`);
        }
      }
    } else {
      console.log(`ℹ️ No attachments.csv found for project: ${project.title}`);
    }
  }
  
  console.log('🎉 Migration complete!');
}

migrate().catch((err) => {
  console.error('❌ Migration script failed:', err);
  process.exit(1);
}); 