import React, { useState, useEffect } from 'react';
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

const AnimatedMetrics = () => {
  const [metrics, setMetrics] = useState({
    accuracy: 0,
    models: 0,
    datasets: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        accuracy: Math.min(prev.accuracy + 1, 95),
        models: Math.min(prev.models + 1, 24),
        datasets: Math.min(prev.datasets + 1, 47)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animated-metrics">
      <div className="metric">
        <div className="metric-value">{metrics.accuracy}%</div>
        <div className="metric-label">Avg Model Accuracy</div>
      </div>
      <div className="metric">
        <div className="metric-value">{metrics.models}+</div>
        <div className="metric-label">ML Models Built</div>
      </div>
      <div className="metric">
        <div className="metric-value">{metrics.datasets}</div>
        <div className="metric-label">Datasets Analyzed</div>
      </div>
    </div>
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

const Hero = () => {
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
                  1500, // wait 1.5s
                  'OSS Contributor',
                  1500, // wait 1.5s
                  'Applied AI Engineer',
                  1500, // wait 1.5s
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
            <button className="cta-primary">
              <span>🤖</span> View My Work
            </button>
            <button className="cta-secondary">
              <span>📧</span> Get In Touch
            </button>
          </div>
          <AnimatedMetrics />
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
      role: "Senior ML Engineer",
      company: "TechCorp AI",
      period: "2022 - Present",
      tech: ["PyTorch", "AWS SageMaker", "Kubernetes", "Redis"], // Added Tech
      highlights: [
        "Architected a real-time computer vision pipeline increasing defect detection accuracy by 23% in manufacturing lines.",
        "Scaled recommendation inference engine to serve 1M+ daily active users with <50ms latency.",
        "Established MLOps best practices, introducing automated model retraining and drift monitoring."
      ]
    },
    {
      role: "Data Scientist",
      company: "DataWorks Inc",
      period: "2020 - 2022",
      tech: ["Python", "Scikit-learn", "Airflow", "PostgreSQL"], // Added Tech
      highlights: [
        "Developed churn prediction models that identified high-risk customers, leading to a 35% reduction in churn.",
        "Built an automated ETL pipeline processing 100GB+ of daily structured data for downstream analytics.",
        "Published research on ensemble methods for time-series forecasting in a top-tier internal conference."
      ]
    },
    {
      role: "ML Research Intern",
      company: "AI Research Lab",
      period: "2019 - 2020",
      tech: ["TensorFlow", "Keras", "NumPy", "Pandas"], // Added Tech
      highlights: [
        "Investigated novel transformer architectures for multivariate time-series forecasting.",
        "Optimized data preprocessing workflows, reducing experiment turnaround time by 40%.",
        "Contributed to the lab's open-source utility library, receiving 1000+ stars on GitHub."
      ]
    }
  ];

  return (
    <section className="about">
      <div className="experience-section">
        <h2>Professional Journey</h2>
        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="timeline-connector">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>
              <div className="exp-content">
                <div className="exp-header">
                  <div className="exp-role-wrapper">
                    <h4>{exp.role}</h4>
                    <span className="exp-company">{exp.company}</span>
                  </div>
                  <div className="exp-period-badge">
                    <span>🗓️</span> {exp.period}
                  </div>
                </div>
                
                <ul className="exp-highlights">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
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
  const contributions = [
    {
      project: "TensorFlow",
      repo: "tensorflow/tensorflow",
      type: "Bug Fix",
      status: "Merged",
      prNumber: "#58291",
      description: "Fixed a critical bug in the `tf.data` API preventing proper dataset shuffling with large buffer sizes. Improved pipeline reliability for distributed training.",
      prLink: "https://github.com/tensorflow/tensorflow/pull/your-pr-number",
      tags: ["Python", "C++", "Distributed Systems"]
    },
    {
      project: "Hugging Face",
      repo: "huggingface/transformers",
      type: "Optimization",
      status: "Merged",
      prNumber: "#21093",
      description: "Contributed a custom kernel for T5 model inference, reducing latency by 15% on CPU-based environments via vectorized operations.",
      prLink: "https://github.com/huggingface/transformers/pull/your-pr-number",
      tags: ["PyTorch", "Performance", "NLP"]
    },
    {
      project: "Scikit-learn",
      repo: "scikit-learn/scikit-learn",
      type: "Feature",
      status: "Released v1.2",
      prNumber: "#24501",
      description: "Implemented Mean Absolute Percentage Error (MAPE) in the regression metrics module, including mathematical documentation and comprehensive unit tests.",
      prLink: "https://github.com/scikit-learn/scikit-learn/pull/your-pr-number",
      tags: ["Python", "Statistics", "Documentation"]
    }
  ];

  return (
    <section className="oss">
      <div className="oss-header">
        <h2>Open Source Contributions</h2>
        <p>Building in public and giving back to the community.</p>
      </div>
      
      <div className="oss-grid">
        {contributions.map((item, index) => (
          <div key={index} className="oss-card">
            {/* Header: Status & Repo Info */}
            <div className="oss-card-header">
              <div className="oss-repo-info">
                <span className="oss-icon">📦</span>
                <div className="oss-titles">
                  <h3>{item.project}</h3>
                  <span className="oss-repo-slug">{item.repo}</span>
                </div>
              </div>
              <div className={`oss-status ${item.status.includes('Merged') ? 'status-merged' : 'status-released'}`}>
                {item.status.includes('Merged') ? 
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h-.5a1 1 0 0 0-1 1v2h-3A1.5 1.5 0 0 0 0 8.5v6A1.5 1.5 0 0 0 1.5 16h6a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5h.5a1 1 0 0 0 1-1V4h.5a2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z"/></svg>
                  : 
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2.5 1.75a.25.25 0 0 1 .25.25v2.5a.75.75 0 0 0 1.5 0V2a1.75 1.75 0 0 0-3.5 0v2.5a.75.75 0 0 0 1.5 0V2a.25.25 0 0 1 .25-.25Z"/><path d="m9.22 3.72 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.38l-2.97-2.97a.75.75 0 0 1 1.06-1.06Z"/></svg>
                }
                {item.status}
              </div>
            </div>

            {/* Content: Description */}
            <div className="oss-content">
              <div className="oss-pr-meta">
                <span className="pr-type">{item.type}</span>
                <span className="pr-number">{item.prNumber}</span>
              </div>
              <p>{item.description}</p>
            </div>

            {/* Footer: Tags & Action */}
            <div className="oss-footer">
              <div className="oss-tags">
                {item.tags.map((tag, tIndex) => (
                  <span key={tIndex} className="oss-tag">{tag}</span>
                ))}
              </div>
              <a href={item.prLink} target="_blank" rel="noopener noreferrer" className="oss-btn">
                View PR <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


const Projects = () => {
  const projects = [
    {
      title: "SmartVision AI",
      category: "Computer Vision",
      description: "Real-time object detection system for manufacturing quality control using custom YOLO architecture.",
      image: "/api/placeholder/400/250",
      technologies: ["PyTorch", "OpenCV", "FastAPI", "Docker"],
      metrics: { accuracy: "94%", speed: "30 FPS", deployment: "Production" },
      links: { github: "#", demo: "#", paper: "#" }
    },
    {
      title: "NLP Sentiment Analyzer",
      category: "NLP",
      description: "Multi-language sentiment analysis tool using transformer models for social media monitoring.",
      image: "/api/placeholder/400/250",
      technologies: ["Transformers", "BERT", "React", "PostgreSQL"],
      metrics: { accuracy: "89%", languages: "12", users: "50K+" },
      links: { github: "#", demo: "#" }
    },
    {
      title: "PredictFlow",
      category: "Forecasting",
      description: "Automated forecasting pipeline for financial markets using ensemble deep learning methods.",
      image: "/api/placeholder/400/250",
      technologies: ["TensorFlow", "Prophet", "Airflow", "Redis"],
      metrics: { accuracy: "87%", latency: "< 100ms", data: "1TB+" },
      links: { github: "#", paper: "#" }
    }
  ];

  return (
    <section className="projects">
      <div className="projects-header">
        <h2>Featured ML Projects</h2>
        <p>Bridging the gap between research and real-world impact.</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            {/* Header Image Area */}
            <div className="project-media">
              <img src={project.image} alt={project.title} />
              <div className="media-overlay"></div>
              <span className="project-category-badge">{project.category}</span>
            </div>
            
            <div className="project-body">
              {/* Title & Desc */}
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>

              {/* Data Dashboard */}
              <div className="project-metrics-dashboard">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="dashboard-item">
                    <span className="dashboard-value">{value}</span>
                    <span className="dashboard-label">{key}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="project-tech-stack">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-chip">{tech}</span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="project-footer">
                <div className="action-group">
                  {project.links.github && (
                    <a href={project.links.github} className="icon-link" aria-label="Code">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      <span>Code</span>
                    </a>
                  )}
                  {project.links.paper && (
                    <a href={project.links.paper} className="icon-link" aria-label="Paper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      <span>Paper</span>
                    </a>
                  )}
                </div>
                
                {project.links.demo && (
                  <a href={project.links.demo} className="demo-btn">
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
      title: "Understanding Transformer Architecture: A Deep Dive",
      excerpt: "Exploring the mechanics behind attention mechanisms and how transformers revolutionized NLP.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Deep Learning",
      tags: ["Transformers", "Attention", "NLP"]
    },
    {
      title: "MLOps Best Practices: From Model to Production",
      excerpt: "A comprehensive guide to deploying ML models at scale with proper monitoring and versioning.",
      date: "2024-01-02",
      readTime: "12 min read",
      category: "MLOps",
      tags: ["Deployment", "Monitoring", "CI/CD"]
    },
    {
      title: "Computer Vision Trends in 2024",
      excerpt: "Latest developments in vision transformers, self-supervised learning, and edge deployment.",
      date: "2023-12-20",
      readTime: "6 min read",
      category: "Computer Vision",
      tags: ["Vision Transformers", "Edge AI", "Trends"]
    }
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
            <div className="blog-category">{post.category}</div>
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
            
            <button className="read-more">
              Read Article <span>→</span>
            </button>
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
      icon: '💼', 
      link: 'https://linkedin.com/in/your-username', 
      username: 'your-username' 
    },
    { 
      name: 'GitHub', 
      icon: '📂', 
      link: 'https://github.com/your-username', 
      username: 'your-username' 
    },
    { 
      name: 'Twitter', 
      icon: '🐦', 
      link: 'https://twitter.com/your-username', 
      username: '@your-username' 
    },
    { 
      name: 'Email', 
      icon: '✉️', 
      link: 'mailto:your.email@example.com', 
      username: 'your.email@example.com' 
    }
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
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const [theme, setTheme] = useState(() => {
    // Read theme from localStorage or default to 'dark'
    return localStorage.getItem('theme') || 'dark';
  });
  

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  // Effect to apply theme and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  // 1. Update the initial load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Changed to 1 second

    return () => clearTimeout(timer);
  }, []);

  // 2. Create the new navigation handler function
  const handleNavigation = (newSection) => {
    // Don't do anything if clicking on the same section
    if (newSection === activeSection) {
      return;
    }

    setLoading(true); // Show the preloader

    setTimeout(() => {
      setActiveSection(newSection); // Change the content
      setLoading(false); // Hide the preloader
    }, 1000); // Wait for 1 second before showing the new section
  };


   

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero />
            
          </>
        );
      case 'about':
        return <About />;
      case 'oss': 
        return <OSS />;
      case 'projects':
        return <Projects />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            
          </>
        );
    }
  };


   useEffect(() => {
    const handleScroll = () => {
      // Hide indicator if user has scrolled down a bit
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        // Otherwise, check if it should be visible
        // (i.e., if there's content to scroll to)
        const isScrollable = document.documentElement.scrollHeight > window.innerHeight;
        setShowScrollIndicator(isScrollable);
      }
    };

    // Run the check once after the new section has rendered
    // A small timeout ensures the DOM has updated its scrollHeight
    const checkScrollable = () => setTimeout(handleScroll, 100);
    
    checkScrollable(); // Check on initial load/navigation
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkScrollable); // Re-check on window resize

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollable);
    };
  }, [activeSection, loading]); // Re-run this logic when the section changes or loading finishes

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
            {renderSection()}
          </main>
          <div className="ai-assistant">
            <div className="assistant-icon">🤖</div>
            <div className="assistant-pulse"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;