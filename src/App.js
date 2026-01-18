import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { TypeAnimation } from 'react-type-animation';



const ScrollIndicator = ({ isVisible }) => {
  return (
    <div className={`scroll-indicator ${isVisible ? 'visible' : ''}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};


const Preloader = ({ loading }) => {
  return (
    <div className={`preloader ${loading ? '' : 'preloader-hidden'}`}>
      <div className="nn-preloader">
        <div className="nn-layer">
          <div className="nn-node"></div>
          <div className="nn-node"></div>
          <div className="nn-node"></div>
        </div>
        <div className="nn-layer">
          <div className="nn-node"></div>
          <div className="nn-node"></div>
        </div>
        <div className="nn-layer">
          <div className="nn-node"></div>
        </div>
      </div>
    </div>
  );
};

const Navigation = ({ activeSection, onNavigate, theme, toggleTheme }) => {
  const navItems = [
    { 
      name: 'Home', 
      id: 'home',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> 
    },
    { 
      name: 'About', 
      id: 'about',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> 
    },
    { 
      name: 'OSS', 
      id: 'oss',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> 
    },
    { 
      name: 'Projects', 
      id: 'projects',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> 
    },
    { 
      name: 'Blog', 
      id: 'blog',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> 
    },
    { 
      name: 'Contact', 
      id: 'contact',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> 
    }
  ];
  
  return (
    <nav className="navigation">
      <div className="nav-dock">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.name}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.name}</span>
            {activeSection === item.id && <span className="active-indicator" />}
          </button>
        ))}
        
        <div className="nav-divider"></div>
        
        <button className="nav-item theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="nav-icon">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </span>
        </button>
      </div>
    </nav>
  );
};


const CodeAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    "import torch",
    "import torch.nn as nn",
    "",
    "model = nn.Sequential(",
    "    nn.Linear(784, 128),",
    "    nn.ReLU(),",
    "    nn.Dropout(0.2),",
    "    nn.Linear(128, 10)",
    ")"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % codeLines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [codeLines.length]);

  return (
    <div className="code-animation">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn-close"></span>
          <span className="btn-minimize"></span>
          <span className="btn-maximize"></span>
        </div>
        <span className="terminal-title">ml_model.py</span>
      </div>
      <div className="code-content">
        {codeLines.map((line, index) => (
          <div 
            key={index} 
            className={`code-line ${index === currentLine ? 'active' : ''} ${index < currentLine ? 'completed' : ''}`}
          >
            <span className="line-number">{index + 1}</span>
            <span className="line-content">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>
            Hi, I'm Alan Ponnachan
            <br />
            <span className="gradient-text">
              <TypeAnimation
                sequence={[
                  'ML Engineer',
                  1600, 
                  'OSS Contributor',
                  1600, 
                  'Applied AI Engineer',
                  1600, 
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="hero-description">
            Architecting end-to-end machine learning solutions, from open-source foundations to production-scale deployment. Focused on building scalable, reliable systems that drive real-world results.
          </p>
          <div className="hero-cta">
            <button className="cta-primary" onClick={() => onNavigate('oss')}>
              View My Work
            </button>
            <button className="cta-secondary" onClick={() => onNavigate('contact')}>
              Get In Touch
            </button>
          </div>
          {/* <AnimatedMetrics /> */}
        </div>
        <div className="hero-visual">
          <CodeAnimation />
          <div className="floating-elements">
            <div className="neural-network">
              <div className="node"></div>
              <div className="node"></div>
              <div className="node"></div>
              <div className="connection"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



const About = () => {
  const experience = [
    {
      role: "Software Developer",
      company: "Bosch",
      period: "Oct 2024 - Present",
      tech: ["PyTorch", "PostgreSQL", "FastAPI", "QLoRA", "RAG", "vLLM", "Transformers", "Docker"], 
      highlights: [
        "Fine-tuned <b>Llama 3.2 Vision</b> via <b>QLoRA</b> on 1,000+ schematic tiles, achieving <b>91%</b> accuracy in structured pin-name extraction and outperforming traditional OCR baselines by <b>35%</b>.",
        "Engineered a high-throughput inference pipeline using <b>vLLM</b> and sliding-window tiling, resolving high-resolution input constraints and reducing latency by <b>4x</b> for concurrent production workloads.",
        "Architected a <b>Multi-Modal RAG</b> system combining <b>semantic search</b> for unstructured documents with Programmatic Tool Calling for Excel files, ensuring deterministic data aggregation and reducing extraction time by <b>65%</b>.",
        "Engineered a <b>Stacking Regression pipeline</b> to predict dynamic signal guard bands, increasing testing yield by <b>15%</b> and automating calibration for over 200 ECU part numbers."
      ]
    },
    {
      role: "AI/ML Intern",
      company: "Bosch",
      period: "Jan 2024 - Jun 2024",
      tech: ["PyTorch" , "pandas", "scikit-learn", "ResNet", "OpenCV"], 
      highlights: [
        "Implemented a <b>ResNet-50</b>–based schematic comparison system with <b>90%</b> accuracy, reducing manual review time by 80% through automated difference detection in PDFs.",
        "Leveraged <b>descriptive statistics</b> with pandas for analyzing voltage readings across diverse ECU datasets, leading to the accurate prediction of optimal minimum and maximum value of voltage readings.",

      ]
    },
    
  ];

  // Helper to safely parse bold tags
  const renderHighlight = (text) => {
    const parts = text.split(/(<b>.*?<\/b>)/g);
    return parts.map((part, index) => {
      if (part.startsWith('<b>') && part.endsWith('</b>')) {
        return <strong key={index} className="highlight-text">{part.slice(3, -4)}</strong>;
      }
      return part;
    });
  };


  return (
    <section className="about">
      <div className="experience-section">
        <h2>Professional Journey</h2>
        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="exp-content">
                <div className="exp-header">
                  <div>
                    <h4>{exp.role}</h4>
                    <span className="exp-company">{exp.company}</span>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                
                <ul className="exp-highlights">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>
                      {renderHighlight(highlight)}
                    </li>
                  ))}
                </ul>

                <div className="exp-tech-stack">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="exp-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OSS = () => {
  // Helper to extract logo from repo URL
  const getGitHubLogo = (repoUrl) => {
    // Splits "https://github.com/owner/repo" -> gets "owner"
    const owner = repoUrl.split('github.com/')[1]?.split('/')[0];
    return owner ? `https://github.com/${owner}.png` : null;
  };

  const contributions = [
    {
      project: "Litellm",
      repo: "BerriAI/litellm",
      description: "Implemented end-to-end support for Anthropic’s beta Memory tool by extending tool schemas, transformation logic, and header propagation.",
      tags: ["Agent Memory", "Applied AI", "API Integration"],
      prLink: "https://github.com/BerriAI/litellm/pull/16115", 
      extraLinks: [
        { label: "Feature Deep Dive", url: "https://docs.litellm.ai/docs/providers/anthropic" },
        { label: "Anthropic Guide", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool" },
      ]
    },
    {
      project: "Pydantic",
      repo: "pydantic/pydantic-ai",
      description: "Designed and shipped runtime, context-aware configuration for built-in agent tools, enabling per-request parameterization and conditional tool availability.",
      tags: ["LLM Agents", "Context-Aware Systems", "Tool Calling"],
      prLink: "https://github.com/pydantic/pydantic-ai/pull/3600",
      extraLinks: [
        { label: "Feature Deep Dive", url: "https://ai.pydantic.dev/builtin-tools/#dynamic-configuration" },
        { label: "View Issue", url: "https://github.com/pydantic/pydantic-ai/issues/3555" }
      ]
    },
    {
      project: "Huggingface",
      repo: "huggingface/diffusers",
      description: "Enabled up to ~3× faster diffusion inference in Diffusers by integrating MagCache, a magnitude-aware adaptive caching mechanism for transformer-based diffusion models.",
      tags: ["Diffusion Models", "Inference Acceleration", "Adaptive Caching"],
      prLink: "https://github.com/huggingface/diffusers/pull/12744",
      extraLinks: [
        { label: "Paper", url: "https://openreview.net/pdf?id=KZn7TDOL4J" },
        { label: "Feature Deep Dive", url: "https://zehong-ma.github.io/MagCache/" }
      ]
    },

    
    {
      project: "Chonkie",
      repo: "chonkie-inc/chonkie",
      description: "Implemented an Elasticsearch-backed vector store for Chonkie, including automatic index creation, dense_vector mappings, bulk ingestion, and kNN search.",
      tags: ["Vector Databases", "Semantic Search", "Retrieval Systems"],
      prLink: "https://github.com/chonkie-inc/chonkie/pull/314", 
      extraLinks: [
        { label: "Feature Deep Dive", url: "https://docs.chonkie.ai/oss/handshakes/elastic-handshake" },
        { label: "Elasticsearch", url: "https://www.elastic.co/elasticsearch/vector-database" },
        
      ]
    },
    {
      project: "Huggingface",
      repo: "huggingface/cookbook",
      description: "Added a hands-on notebook to the Hugging Face Cookbook demonstrating how to build a documentation QA chatbot using synthetic data and efficient fine-tuning.",
      tags: ["LLM Fine-Tuning", "Synthetic Data", "ML Pipelines"],
      prLink: "https://github.com/huggingface/cookbook/pull/294",
      extraLinks: [
        { label: "Cookbook", url: "https://huggingface.co/learn/cookbook/en/fine_tune_chatbot_docs_synthetic" },
        { label: "Meta Synthetic Data Kit", url: "https://github.com/meta-llama/synthetic-data-kit" }
      ]
    },
    {
      project: "Pydantic",
      repo: "pydantic/pydantic-ai",  //TODO: Update pr details
      description: "Designed and shipped runtime, context-aware configuration for built-in agent tools, enabling per-request parameterization and conditional tool availability.",
      tags: ["LLM Agents", "Context-Aware Systems", "Tool Calling"],
      prLink: "https://github.com/pydantic/pydantic-ai/pull/3634",
      extraLinks: [
        { label: "Feature Deep Dive", url: "https://ai.pydantic.dev/builtin-tools/#dynamic-configuration" },
        { label: "View Issue", url: "https://github.com/pydantic/pydantic-ai/issues/3555" }
      ]
    },
    {
      project: "Litellm",
      repo: "BerriAI/litellm",
      description: "Contributed a robust implementation of graduated tiered pricing to LiteLLM, fixing incorrect cost calculations and stabilizing fallback behavior.",
      tags: ["Usage-Based Billing", "Backend Systems", "Applied AI"],
      prLink: "https://github.com/BerriAI/litellm/pull/16150", 
      extraLinks: [
        { label: "Release Notes", url: "https://docs.litellm.ai/release_notes" },
        { label: "Issue", url: "https://github.com/BerriAI/litellm/issues/15423" },
      ]
    },
  ];

  return (
    <section className="oss">
      <div className="oss-header">
        <h2>Open Source Contributions</h2>
        <p>Building in public and giving back to the community.</p>
      </div>
      
      <div className="oss-grid">
        {contributions.map((item, index) => {
          // Generate logo URL dynamically
          const logoUrl = getGitHubLogo(item.prLink) || getGitHubLogo(`https://github.com/${item.repo}`);
          
          return (
            <div key={index} className="oss-card">
              <div className="oss-card-header">
                <div className="oss-logo-container">
                  {/* Use the dynamic logoUrl */}
                  <img src={logoUrl} alt={item.project} className="oss-logo" onError={(e) => e.target.style.display = 'none'} />
                </div>
                <div className="oss-titles">
                  <h3>{item.project}</h3>
                  <span className="oss-repo-slug">{item.repo}</span>
                </div>
              </div>

              <div className="oss-content">
                <p>{item.description}</p>
              </div>

              <div className="oss-footer">
                <div className="oss-tags">
                  {item.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="oss-tag">{tag}</span>
                  ))}
                </div>

                <div className="oss-action-area">
                  <a href={item.prLink} target="_blank" rel="noopener noreferrer" className="oss-btn primary-action">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    View Pull Request
                  </a>

                  {item.extraLinks && item.extraLinks.length > 0 && (
                    <div className="oss-secondary-actions">
                      {item.extraLinks.map((link, lIndex) => (
                        <a key={lIndex} href={link.url} target="_blank" rel="noopener noreferrer" className="oss-btn secondary-action">
                          <span>{link.label}</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Applied ML Systems",
      category: "Machine Learning",
      description: "An illustrated guide to the principles of building, deploying, and maintaining machine learning systems in production.",
      image: "/api/placeholder/400/250",
      technologies: ["MLOps", "ML Engineering", "Model Monitoring"],
      links: { github: "https://github.com/AlanPonnachan/applied-ml-systems", demo: "https://alanponnachan.github.io/applied-ml-systems/"}
    },
    {
      title: "ML Algorithm Playground",
      category: "NLP",
      description: "Interactive Machine Learning Visualizations",
      image: "/api/placeholder/400/250",
      technologies: ["Interactive Data Visualization", "ML Algorithms", "Explainable AI"],
      links: { github: "https://github.com/AlanPonnachan/ml-algorithm-visualizations", demo: "https://alanponnachan.github.io/ml-algorithm-visualizations" }
    },
    {
      title: "Smart Office Booking AI",
      category: "AI",
      description: "The Adaptive Office Seat Booking System: Intelligent Seat Reservations Powered by LLMs",
      image: "/api/placeholder/400/250",
      technologies: ["LLM Integration", "Flask", "Data Modeling"],
      links: { github: "https://github.com/AlanPonnachan/smart-office-booking-ai" }
    },
    {
      title: "Transformers Timeline",
      category: "AI",
      description: "The Adaptive Office Seat Booking System: Intelligent Seat Reservations Powered by LLMs",
      image: "/api/placeholder/400/250",
      technologies: ["Transformers", "NLP Model Catalog", "Hugging Face"],
      links: { github: "https://github.com/AlanPonnachan/transformers-timeline/", demo: "https://alanponnachan.github.io/transformers-timeline/"  }
    }
  ];

  return (
    <section className="projects">
      <div className="projects-header">
        <h2>Featured  Projects</h2>
        {/* <p>Bridging the gap between research and real-world impact.</p> */}
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Header Image Area */}
            {/* <div className="project-media">
              <img src={project.image} alt={project.title} />
              <div className="media-overlay"></div>
              <span className="project-category-badge">{project.category}</span>
            </div>
             */}
            <div className="project-body">
              {/* Title & Desc */}
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              {/* Tech Stack - Moved up since metrics are gone */}
              <div className="project-tech-stack">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-chip">{tech}</span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="project-footer">
                <div className="action-group">
                  {project.links.github && (
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="icon-link" 
                      aria-label="Code"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span>Code</span>
                    </a>
                  )}
                  {project.links.paper && (
                    <a 
                      href={project.links.paper} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="icon-link" 
                      aria-label="Paper"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      <span>Paper</span>
                    </a>
                  )}
                </div>
                
                {project.links.demo && (
                  <a 
                    href={project.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="demo-btn"
                  >
                    Live Demo
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: "LLM Evolution in Enterprise",
      excerpt: "A Brief history of LLMs in Production",
      date: "2025-10-04",
      readTime: "120 min read",
      category: "Deep Learning",
      tags: ["Transformers", "Attention", "NLP", "History"],
      link: "https://alanponnachan.github.io/llm-enterprise-evolution/"
    },
    
  ];

  return (
    <section className="blog">
      <div className="blog-header">
        <h2>ML Insights & Research</h2>
        <p>Sharing knowledge about machine learning, AI research, and industry trends</p>
      </div>
      
      <div className="blog-grid">
        {posts.map((post, index) => (
          <article key={index} className="blog-card">
            {/* <div className="blog-category">{post.category}</div> */}
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            
            <div className="blog-tags">
              {post.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="blog-tag">{tag}</span>
              ))}
            </div>
            
            <div className="blog-meta">
              <span className="blog-date">{post.date}</span>
              <span className="blog-read-time">{post.readTime}</span>
            </div>
            
            <a 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more"
            >
              Read Article <span>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};


const Contact = () => {
  const socials = [
    { 
      name: 'LinkedIn', 
      // Official LinkedIn Logo
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      link: 'https://www.linkedin.com/in/alan-ponnachan-92731a214/', 
      // username: 'your-username' 
    },
    { 
      name: 'GitHub', 
      // Official GitHub Logo
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      link: 'https://github.com/AlanPonnachan', 
      // username: 'your-username' 
    },
    { 
      name: 'X (Twitter)', 
      // Official X Logo
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      link: 'https://x.com/alan_ponnachan', 
      // username: '@your-username' 
    },
    // Uncomment for  email
    /*
    { 
      name: 'Email', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      link: 'mailto:your.email@example.com', 
      username: 'your.email@example.com' 
    }
    */
  ];

  return (
    <section className="contact">
      <div className="contact-header">
        <h2>Get In Touch</h2>
        <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
      </div>
      <div className="contact-grid">
        {socials.map((social, index) => (
          <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="contact-card">
            <div className="contact-icon">{social.icon}</div>
            <h3>{social.name}</h3>
            <p>{social.username}</p>
          </a>
        ))}
      </div>
    </section>
  );
};


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active section based on current URL path
  // If path is '/', active section is 'home', otherwise remove the leading '/'
  const activeSection = location.pathname === '/' ? 'home' : location.pathname.substring(1);

  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Initial Load Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []); // Only runs on first website visit

  // Theme Effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll Indicator Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
        setShowScrollIndicator(isScrollable);
      }
    };
    const checkScrollable = () => setTimeout(handleScroll, 100);
    checkScrollable();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScrollable);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);
    };
  }, [location.pathname, loading]); // Check when URL changes or loading stops

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Updated Navigation Handler
  const handleNavigation = (sectionId) => {
    if (sectionId === activeSection) return;

    setLoading(true); // Show preloader
    
    setTimeout(() => {
      // Navigate to the new URL
      const path = sectionId === 'home' ? '/' : `/${sectionId}`;
      navigate(path);
      setLoading(false); // Hide preloader
      window.scrollTo(0, 0); // Reset scroll to top
    }, 1000);
  };

  return (
    <div className="App">
      <Preloader loading={loading} />
      <ScrollIndicator isVisible={showScrollIndicator} />

      {!loading && (
        <>
          <Navigation 
            activeSection={activeSection} 
            onNavigate={handleNavigation} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Hero onNavigate={handleNavigation} />} />
              <Route path="/about" element={<About />} />
              <Route path="/oss" element={<OSS />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Hero onNavigate={handleNavigation} />} />
            </Routes>
          </main>
          {/* <div className="ai-assistant">
            <div className="assistant-icon">🤖</div>
            <div className="assistant-pulse"></div>
          </div> */}
        </>
      )}
    </div>
  );
}

export default App;