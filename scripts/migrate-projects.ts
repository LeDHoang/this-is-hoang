#!/usr/bin/env ts-node

const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const { supabase } = require('../src/lib/supabase');
const projects = require('../src/lib/projects').default;

async function migrate() {
  for (const project of projects) {
    // derive slug
    const slug = project.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Upsert project record
    const { data: insertedProjects, error: projectError } = await supabase
      .from('projects')
      .upsert(
        {
          slug,
          title: project.title,
          summary: project.summary,
          date: project.date,
          category: project.category,
          link: project.link,
          presentation_link: project.presentationLink ?? null,
          tableau_link: project.tableauLink ?? null,
        },
        { onConflict: 'slug' }
      )
      .select('id');

    if (projectError) {
      console.error('❌ Error upserting project:', project.title, projectError);
      continue;
    }
    if (!insertedProjects || insertedProjects.length === 0) {
      console.error('❌ No project returned for:', project.title);
      continue;
    }

    const projectId = insertedProjects[0].id;
    console.log(`✅ Upserted project: ${project.title} (id=${projectId})`);

    // Insert logs
    for (const log of project.logs) {
      const { error: logError } = await supabase
        .from('project_logs')
        .insert([
          {
            project_id: projectId,
            log_date: log.date,
            note: log.note,
          },
        ]);
      if (logError) {
        console.error('❌ Error inserting log for', project.title, log, logError);
      }
    }
  }
  console.log('🎉 Migration complete');
}


migrate().catch((err) => console.error('Migration script failed:', err)); 