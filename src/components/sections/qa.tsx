"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "What makes Hoang different? - Why should you hire me?",
    content:
      "I am talented individual with a passion for learning and growing. I have been throughout the world and gained a unique perspective on the world, from the costal Florida to the bustling city of Hanoi and Hong Kong. I am a hardworking, dedicated, and passionate individual. I am always looking for new challenges and a chance to leave a <b>mark</b> on the world. I am a quick learner and I am always looking for new ways to improve my skills. I am a team player and I am always looking for new ways to improve my skills. ",
  },
  {
    id: "2",
    title: "What was your favourite experience?",
    content:
      "That would be working with my <b>INSIGHT</b> team developing a fraud-detection system. We were able to develop a system that was able to detect fraud in real-time. Our team was one of the <b>top 4</b> teams in the engineering program and the only Software team to deliver a presentation to a group of local Gainesville companies. It was a great experience and I learned a lot from it, both in terms of technical skills and soft skills.",  },
  {
    id: "3",
    title: "What is your endgoal?",
    content:
      "I believe life is fleeting, and I want to seize every moment. When I look back on my life, I want to know I did something truly meaningful—that I left a lasting <b>mark</b> on the world. I aim to prove the worth of my ideas in the <b>\"marketplace of ideas\"</b>, so that someday, when I reflect on the impact I've had on my community and my people, I can feel genuine gratitude for the opportunities and choices that brought me to this moment."
    },
  {
    id: "4",
    title: "What are you currently working on?",
    content:
      "Personal Website - Reel-based social media network app for VR/XR device - 3D Video AI Generation? [05/13/2025]",
  },
  {
    id: "5",
    title: "What is your favourite quote?",
    content:
      "<blockquote style='border-left: 4px solid #ccc; padding-left: 1rem; font-style: italic; margin: 1rem 0;'>\"You know you're in love when you can't fall asleep because reality is finally better than your dreams.\"<br/><span style='display: block; text-align: left; font-weight: bold; margin-top: 0.5rem;'>― Dr. Seuss</span></blockquote>",
  },
  { 
    id: "6",
    title: "How can I contact you?",
    content:
      "You can find my contact information right below. You can send me an email or connect with me on LinkedIn, GitHub.",  }
];

export function QA() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="w-full space-y-4">
        <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="3">
          {items.map((item) => (
            <AccordionItem
              value={item.id}
              key={item.id}
              className="rounded border-2 border-[rgba(0,255,140,0.5)] bg-background px-4 py-1"
            >
              <AccordionTrigger className="justify-start gap-3 py-2 text-[18px] leading-6 hover:no-underline [&>svg]:-order-1">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-2 ps-7 text-muted-foreground text-[15px]">
                <div dangerouslySetInnerHTML={{ __html: item.content.replace(/"([^"]+)"/g, '<i>"$1"</i>') }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 