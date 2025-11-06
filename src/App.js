import React, { useState, useEffect } from 'react';
import './App.css';
import { TypeAnimation } from 'react-type-animation';


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

const Navigation = ({ activeSection, onNavigate }) => { // 1. Use onNavigate prop
  const navItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'About', icon: '🧠' },
    { name: 'Projects', icon: '🤖' },
    { name: 'Blog', icon: '📊' }
  ];
  
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <div className="brand-icon">🔬</div>
        <span className="brand-name">ML Explorer</span>
      </div>
      <div className="nav-items">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${activeSection === item.name.toLowerCase() ? 'active' : ''}`}
            onClick={() => onNavigate(item.name.toLowerCase())} // 2. Call onNavigate
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </div>
      <button className="download-cv">
        <span>📄</span> Resume
      </button>
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
           a <span className="gradient-text">
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
              I'm a passionate Machine Learning Engineer with a deep fascination for artificial intelligence 
              and its potential to revolutionize how we solve complex problems. My journey in ML started during 
              my computer science studies, where I fell in love with the mathematical beauty of neural networks.
            </p>
            <p>
              Over the years, I've worked on diverse ML projects spanning computer vision, NLP, and predictive 
              analytics. I believe in the power of data-driven decision making and enjoy translating business 
              problems into ML solutions that create real impact.
            </p>
          </div>
          <div className="about-image">
            <img src="/api/placeholder/300/300" alt="ML Engineer at work" />
            <div className="image-overlay">
              <span>💡 Always Learning</span>
            </div>
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

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

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
      case 'projects':
        return <Projects />;
      case 'blog':
        return <Blog />;
      default:
        return (
          <>
            <Hero />
            
          </>
        );
    }
  };

  return (
  <div className="App">
    <Preloader loading={loading} />

    {/* Only render the rest of the app when not loading */}
    {!loading && (
      <>
        <Navigation activeSection={activeSection} onNavigate={handleNavigation} />
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