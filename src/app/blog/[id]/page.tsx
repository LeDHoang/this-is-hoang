"use client"

import * as React from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CalendarIcon, Clock } from "lucide-react"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = params

  const posts: Record<string, { title: string; date: string; readingTime: string; content: string }> = {
    "future-of-ai": {
      title: "The Future of AI Development",
      date: "2023-05-15",
      readingTime: "5 min read",
      content: `
        <p>Artificial Intelligence has come a long way since its inception. From rule-based systems to machine learning algorithms that can learn from data, the field has seen tremendous growth and innovation.</p>
        
        <p>Today, we stand at the precipice of a new era in AI development. Large language models like GPT-4 have demonstrated capabilities that were once thought to be uniquely human, such as creative writing, problem-solving, and even coding.</p>
        
        <h2>Ethical Considerations</h2>
        
        <p>As AI systems become more powerful and integrated into our daily lives, ethical considerations become increasingly important. Questions about bias, fairness, transparency, and accountability need to be addressed.</p>
        
        <p>Developers have a responsibility to ensure that AI systems are designed with ethical principles in mind. This includes being aware of potential biases in training data, ensuring transparency in how AI systems make decisions, and establishing mechanisms for accountability when things go wrong.</p>
        
        <h2>Technological Advancements</h2>
        
        <p>On the technological front, we're seeing advancements in several areas:</p>
        
        <ul>
          <li>Multimodal AI systems that can process and generate different types of data (text, images, audio)</li>
          <li>Reinforcement learning from human feedback (RLHF) to align AI systems with human values</li>
          <li>Federated learning to train models across multiple devices while preserving privacy</li>
          <li>Neuromorphic computing to create more efficient AI hardware</li>
        </ul>
        
        <h2>The Road Ahead</h2>
        
        <p>The future of AI development is both exciting and challenging. As we continue to push the boundaries of what's possible, we must also be mindful of the potential risks and ensure that AI systems are developed and deployed responsibly.</p>
        
        <p>By fostering collaboration between researchers, developers, policymakers, and the public, we can work towards a future where AI benefits humanity while minimizing potential harms.</p>
      `},
    "web3-revolution": {
      title: "The Web3 Revolution",
      date: "2023-04-22",
      readingTime: "7 min read",
      content: `
        <p>Web3 represents a paradigm shift in how we interact with the internet. Unlike Web2, which is dominated by centralized platforms that control user data and monetization, Web3 aims to create a more decentralized and user-centric internet.</p>
        
        <h2>Key Components of Web3</h2>
        
        <p>At its core, Web3 is built on several key technologies and concepts:</p>
        
        <ul>
          <li>Blockchain: Distributed ledgers that enable trustless transactions and record-keeping</li>
          <li>Cryptocurrencies: Digital assets that facilitate value exchange without intermediaries</li>
          <li>Smart Contracts: Self-executing code that automates agreements and transactions</li>
          <li>Decentralized Applications (dApps): Applications that run on peer-to-peer networks</li>
          <li>Non-Fungible Tokens (NFTs): Unique digital assets that represent ownership of specific items</li>
        </ul>
        
        <h2>Changing Ownership Models</h2>
        
        <p>One of the most significant aspects of Web3 is how it's changing our understanding of digital ownership. In the Web2 era, users rarely truly owned their digital assets or data. Platforms could change terms of service, restrict access, or even delete content at will.</p>
        
        <p>With Web3, ownership is cryptographically secured on the blockchain. NFTs, for example, allow creators to sell unique digital assets directly to collectors, with provable scarcity and authenticity.</p>
        
        <h2>Challenges and Opportunities</h2>
        
        <p>Despite its promise, Web3 faces several challenges:</p>
        
        <ul>
          <li>Scalability: Current blockchain networks often struggle with high transaction volumes</li>
          <li>User Experience: Web3 applications can be complex and intimidating for average users</li>
          <li>Regulatory Uncertainty: Governments worldwide are still figuring out how to approach this new paradigm</li>
          <li>Environmental Concerns: Some blockchain networks consume significant energy</li>
        </ul>
        
        <p>However, these challenges also present opportunities for innovation. Layer 2 solutions are addressing scalability, while improved interfaces are making Web3 more accessible. As the ecosystem matures, we can expect to see more user-friendly and efficient solutions emerge.</p>
      `},
    "cybersecurity-tips": {
      title: "Essential Cybersecurity Tips for Developers",
      date: "2023-03-10",
      readingTime: "6 min read",
      content: `
        <p>In today's interconnected world, cybersecurity is more important than ever. As developers, we have a responsibility to ensure that the applications we build are secure and protect user data. Here are some essential cybersecurity tips that every developer should follow.</p>
        
        <h2>1. Keep Dependencies Updated</h2>
        
        <p>Outdated dependencies can contain known vulnerabilities that attackers can exploit. Regularly update your dependencies and use tools like npm audit, Dependabot, or Snyk to automatically identify and fix vulnerable dependencies.</p>
        
        <h2>2. Implement Proper Authentication</h2>
        
        <p>Authentication is the first line of defense for your application. Implement strong password policies, multi-factor authentication, and consider using OAuth or OpenID Connect for federated authentication.</p>
        
        <h2>3. Validate and Sanitize Input</h2>
        
        <p>Never trust user input. Always validate and sanitize input on both the client and server sides to prevent injection attacks like SQL injection, XSS, and CSRF.</p>
        
        <h2>4. Use HTTPS Everywhere</h2>
        
        <p>HTTPS encrypts data in transit, protecting it from eavesdropping and man-in-the-middle attacks. Always use HTTPS for your applications, even during development.</p>
        
        <h2>5. Implement Proper Error Handling</h2>
        
        <p>Detailed error messages can reveal sensitive information about your application's architecture. Implement proper error handling that provides useful information to users without exposing internal details.</p>
        
        <h2>6. Follow the Principle of Least Privilege</h2>
        
        <p>Only grant the minimum permissions necessary for a user or system to perform its function. This limits the potential damage if an account is compromised.</p>
        
        <h2>7. Secure Your API</h2>
        
        <p>Implement rate limiting, use API keys or tokens for authentication, and validate all API requests to prevent abuse and unauthorized access.</p>
        
        <h2>8. Keep Security in Mind from the Start</h2>
        
        <p>Security should not be an afterthought. Incorporate security considerations into your design and development process from the beginning.</p>
        
        <p>By following these tips, you can significantly improve the security of your applications and protect your users' data. Remember, security is an ongoing process, not a one-time task.</p>
      `},
    "react-performance": {
      title: "Optimizing React Performance",
      date: "2023-02-18",
      readingTime: "8 min read",
      content: `
        <p>React is known for its virtual DOM and efficient rendering, but as applications grow in complexity, performance can become an issue. Here are some advanced techniques to optimize the performance of your React applications.</p>
        
        <h2>1. Use React.memo for Component Memoization</h2>
        
        <p>React.memo is a higher-order component that memoizes the result of a component render. It performs a shallow comparison of props and only re-renders if the props have changed.</p>
        
        <pre><code>
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
        </code></pre>
        
        <h2>2. Optimize useEffect Dependencies</h2>
        
        <p>Be careful with the dependency array in useEffect. Including unnecessary dependencies can cause the effect to run more often than needed.</p>
        
        <pre><code>
useEffect(() => {
  // This effect will only run when count changes
}, [count]);
        </code></pre>
        
        <h2>3. Use useMemo and useCallback</h2>
        
        <p>useMemo memoizes the result of a computation, while useCallback memoizes a function. Both can prevent unnecessary recalculations or function recreations.</p>
        
        <pre><code>
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
        </code></pre>
      `},
  }

  const post = posts[id as keyof typeof posts]

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8 max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft size={16} /> Back to blog
          </Link>

          <article>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4 glitch" data-text={post.title}>
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarIcon size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>

            <div
              className="prose prose-invert max-w-none prose-headings:text-primary prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </div>
    </main>
  )
} 