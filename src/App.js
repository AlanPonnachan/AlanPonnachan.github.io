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

const Navigation = ({ activeSection, onNavigate, theme, toggleTheme }) => { // 1. Accept new props
  const navItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'About', icon: '🧠' },
    { name: 'OSS', icon: '🧑‍💻' },
    { name: 'Projects', icon: '🤖' },
    { name: 'Blog', icon: '📊' },
    { name: 'Contact', icon: '📧' } 
  ];
  
  return (
    <nav className="navigation">
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${activeSection === item.name.toLowerCase() ? 'active' : ''}`}
            onClick={() => onNavigate(item.name.toLowerCase())}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </button>
        ))}
        {/* 2. Add the theme toggle button here */}
        <button className="nav-item theme-toggle" onClick={toggleTheme} title="Toggle theme">
          <span className="nav-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
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
                  'LLM Engineer',
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
      highlights: [
        "Led development of computer vision system improving accuracy by 23%",
        "Built recommendation engine serving 1M+ users daily",
        "Mentored junior ML engineers and established ML best practices"
      ]
    },
    {
      role: "Data Scientist",
      company: "DataWorks Inc",
      period: "2020 - 2022",
      highlights: [
        "Developed predictive models reducing customer churn by 35%",
        "Created automated ML pipeline processing 100GB+ daily",
        "Published research on ensemble methods in top-tier conference"
      ]
    },
    {
      role: "ML Research Intern",
      company: "AI Research Lab",
      period: "2019 - 2020",
      highlights: [
        "Researched novel architectures for time-series forecasting",
        "Contributed to open-source ML libraries with 1000+ stars",
        "Won best paper award at university ML symposium"
      ]
    }
  ];

  const skills = {
    "Programming": ["Python", "R", "SQL", "JavaScript", "C++"],
    "ML Frameworks": ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost"],
    "Data Tools": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
    "Cloud & MLOps": ["AWS SageMaker", "Docker", "Kubernetes", "MLflow"],
    "Specialties": ["Deep Learning", "Computer Vision", "NLP", "Time Series"]
  };

  return (
    <section className="about">
      <div className="about-header">
        <h2>About Me</h2>
        <div className="about-intro">
          <div className="about-text">
            <p>
              I’m an ML engineer driven by curiosity and a deep interest in how data, systems, and infrastructure come together to create real impact. 
              I stay actively engaged in open-source communities, contributing to the tools and frameworks I rely on, 
              and consistently pushing myself to learn, refine, and improve the way I build ML workflows.
            </p>
            <p>
              In industry, I’ve worked across the full lifecycle of machine learning systems — 
              from early experimentation to designing production-grade pipelines and the infrastructure that supports them. 
              I focus on building reliable, well-architected systems that teams can trust, 
              and I enjoy turning complex ideas into solutions that scale smoothly in the real world.
            </p>
          </div>
          <div className="about-image">
            <img src="/profile.png" alt="profile pic" />
      
          </div>
        </div>
      </div>

      <div className="experience-section">
        <h3>Professional Journey</h3>
        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="exp-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>
              <div className="exp-content">
                <div className="exp-header">
                  <h4>{exp.role}</h4>
                  <span className="exp-company">{exp.company}</span>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul className="exp-highlights">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-section">
        <h3>Technical Arsenal</h3>
        <div className="skills-grid">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="skill-category">
              <h4>{category}</h4>
              <div className="skill-tags">
                {skillList.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const OSS = () => {
  // IMPORTANT: Replace this placeholder data with your actual contributions!
  const contributions = [
    {
      project: "TensorFlow",
      description: "Fixed a critical bug in the `tf.data` API that prevented proper dataset shuffling with large buffer sizes, improving data pipeline reliability for distributed training.",
      prLink: "https://github.com/tensorflow/tensorflow/pull/your-pr-number",
      releaseLink: "https://github.com/tensorflow/tensorflow/releases/tag/v2.10.0",
      tags: ["Python", "Bug Fix", "Data Pipelines"]
    },
    {
      project: "Hugging Face Transformers",
      description: "Contributed a new optimization layer for the T5 model, reducing inference latency by 15% on CPU-based systems.",
      prLink: "https://github.com/huggingface/transformers/pull/your-pr-number",
      releaseLink: "https://github.com/huggingface/transformers/commit/your-commit-hash",
      tags: ["PyTorch", "Optimization", "NLP"]
    },
    {
      project: "Scikit-learn",
      description: "Added a new evaluation metric, Mean Absolute Percentage Error (MAPE), to the regression metrics module, along with comprehensive documentation and unit tests.",
      prLink: "https://github.com/scikit-learn/scikit-learn/pull/your-pr-number",
      releaseLink: "https://github.com/scikit-learn/scikit-learn/releases/tag/v1.2.0",
      tags: ["Python", "New Feature", "Documentation"]
    }
  ];

  return (
    <section className="oss">
      <div className="oss-header">
        <h2>Open Source Contributions</h2>
        <p>Proud to be a part of the open-source community. Here are some of my contributions.</p>
      </div>
      <div className="oss-grid">
        {contributions.map((item, index) => (
          <div key={index} className="oss-card">
            <h3>{item.project}</h3>
            <p>{item.description}</p>
            <div className="oss-tags">
              {item.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="oss-tag">{tag}</span>
              ))}
            </div>
            <div className="oss-links">
              <a href={item.prLink} target="_blank" rel="noopener noreferrer" className="oss-link">
                <span>🔗</span> Pull Request
              </a>
              <a href={item.releaseLink} target="_blank" rel="noopener noreferrer" className="oss-link">
                <span>🎉</span> Official Release
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
      category: "Natural Language Processing",
      description: "Multi-language sentiment analysis tool using transformer models for social media monitoring.",
      image: "/api/placeholder/400/250",
      technologies: ["Transformers", "BERT", "React", "PostgreSQL"],
      metrics: { accuracy: "89%", languages: "12", users: "50K+" },
      links: { github: "#", demo: "#" }
    },
    {
      title: "PredictFlow",
      category: "Time Series Forecasting",
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
        <p>Showcasing machine learning solutions that bridge the gap between research and real-world applications</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-category">{project.category}</div>
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="project-metrics">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="metric-item">
                    <span className="metric-label">{key}</span>
                    <span className="metric-value">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-badge">{tech}</span>
                ))}
              </div>
              
              <div className="project-links">
                {project.links.github && (
                  <a href={project.links.github} className="project-link">
                    <span>📂</span> Code
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} className="project-link">
                    <span>🚀</span> Demo
                  </a>
                )}
                {project.links.paper && (
                  <a href={project.links.paper} className="project-link">
                    <span>📄</span> Paper
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