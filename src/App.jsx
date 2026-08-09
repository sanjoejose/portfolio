import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Terminal,
  Menu,
  X,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Database
} from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Defaulting to Light Mode (false) unless user previously toggled to Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideshowImages = ["/img1.jpeg", "/img2.jpeg"];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 3500);
    return () => clearInterval(slideTimer);
  }, [slideshowImages.length]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const skills = {
    "Languages & Logic": ["Java", "Python", "C", "C++", "JavaScript", "Data Structures & Algorithms"],
    "Cloud & Data Engineering": ["Microsoft Azure", "Azure Data Factory (ADF)", "Azure Synapse", "Microsoft Fabric", "MySQL"],
    "Web Development": ["React", "HTML5", "CSS3", "JavaScript", "Python Web Development Tools"],
    "Professional Strengths": ["Critical Thinking", "Team Player", "Positive Attitude", "Problem Solving"]
  };

  const experiences = [
    {
      role: "Full Stack Developer (Client Project: Optum)",
      company: "Cognizant",
      duration: "Feb 2026 – Jun 2026",
      description: [
        "Worked as a full-stack software contractor for Optum, developing web applications and internal tooling.",
        "Built an interactive visual library website to showcase internal AI tools maintained across GitHub repositories.",
        "Integrated Octokit API to dynamically fetch repository metadata, tool names, and README files directly from GitHub.",
        "Developed web interfaces using React, HTML, CSS, JavaScript, and Python backend components."
      ]
    },
    {
      role: "Programmer Analyst Trainee",
      company: "Cognizant",
      duration: "Nov 2025 – Feb 2026",
      description: [
        "Completed hands-on corporate training focused on cloud data platforms and pipeline management.",
        "Gained working proficiency in Azure Data Factory (ADF), Microsoft Fabric, and Azure Synapse Analytics."
      ]
    }
  ];

  const projects = [
    {
      id: "waywiz",
      title: "WAYWIZ - Indoor Navigation System",
      shortDescription: "A web application enabling real-time indoor navigation using dynamic QR code triggers and tracking real-time staff availability.",
      tech: ["Python", "HTML", "CSS", "JavaScript", "QR Code Engine"]
    },
    {
      id: "optum-library",
      title: "AI Tools Visual Library",
      shortDescription: "A dynamic web portal for Optum that aggregates and visually displays internal AI tools hosted on GitHub by programmatically fetching metadata via Octokit.",
      tech: ["React", "JavaScript", "Python", "Octokit API", "GitHub API"]
    },
    {
      id: "azure-analytics",
      title: "Sales Data Analytics Using Azure Tools",
      shortDescription: "Architected end-to-end data pipelines to ingest sales data into a Lakehouse architecture within Microsoft Fabric for structured cleaning, mapping, and analytics.",
      tech: ["Azure Data Factory", "Azure Synapse", "Microsoft Fabric"]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans relative overflow-hidden ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out 3s infinite; }
      `}</style>

      {/* Ambient Animated Background Orbs - Hidden on mobile screens (`hidden md:block`) */}
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-[100px] opacity-20 dark:opacity-20 animate-pulse pointer-events-none"></div>
      <div className="hidden md:block absolute top-40 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 dark:opacity-10 pointer-events-none" style={{ animation: 'pulse 8s infinite' }}></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/#home" className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Sanjoe Jose
          </a>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="/#about" className="hover:text-blue-500 transition-colors">About</a>
            <a href="/#experience" className="hover:text-blue-500 transition-colors">Experience</a>
            <a href="/#achievements" className="hover:text-blue-500 transition-colors">Achievements</a>
            <a href="/#projects" className="hover:text-blue-500 transition-colors">Projects</a>
            <a href="/#skills" className="hover:text-blue-500 transition-colors">Skills</a>
            <a href="/#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            
            <button 
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`p-2 rounded-lg border transition-all ${
                darkMode ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg border ${
                darkMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden border-b px-6 py-4 space-y-3 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <a href="/#about" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-500">About</a>
            <a href="/#experience" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-500">Experience</a>
            <a href="/#achievements" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-500">Achievements</a>
            <a href="/#projects" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-500">Projects</a>
            <a href="/#skills" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-500">Skills</a>
            <a href="/#contact" onClick={() => setIsMenuOpen(false)} className="block hover:text-blue-500">Contact</a>
          </div>
        )}
      </nav>

      {/* Hero Section with Floating Animations */}
      <section id="about" className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Text Block */}
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-full text-sm font-semibold">
            Programmer Analyst & Full Stack Developer
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Sanjoe Jose</span>
          </h1>
          <p className={`text-lg leading-relaxed max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Full-stack developer based in Kerala, India, specializing in Python, React, and cloud data pipelines. I love digging into complex logic and hunting down tricky system bugs. When I'm not writing Python, Java, or React, you can usually find me exploring photography and video editing.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/#contact" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-1">
              Contact Me
            </a>
            <a href="https://github.com/in/sanjoejose" target="_blank" rel="noreferrer" className={`border px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 hover:-translate-y-1 ${
              darkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
            }`}>
              <Github size={18} /> GitHub
            </a>
          </div>
        </div>

        {/* Right Animated Visual Block */}
        <div className="hidden lg:flex flex-1 justify-center relative h-96 w-full">
          <div className="relative w-[350px] h-80 mt-8">
            
            {/* Center glowing orb */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-20 dark:opacity-30 animate-pulse"></div>
            
            {/* Floating Glassmorphism Code Terminal */}
            <div className={`absolute inset-4 backdrop-blur-xl border rounded-2xl shadow-2xl z-10 animate-float flex flex-col overflow-hidden ${
              darkMode ? 'bg-slate-900/80 border-slate-700' : 'bg-white/70 border-white/50 shadow-blue-900/10'
            }`}>
              {/* Mac-style Window Header */}
              <div className={`px-4 py-3 flex gap-2 border-b ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100/80 border-slate-200'}`}>
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              
              {/* Developer Profile Code Content */}
              <div className="p-4 md:p-5 font-mono text-[11px] md:text-xs leading-relaxed flex flex-col gap-1 w-full whitespace-nowrap">
                <p className="text-slate-500 dark:text-slate-400"># engineer_profile.py</p>
                <p><span className="text-blue-500">class</span> <span className="text-amber-500 font-bold">SoftwareEngineer</span>:</p>
                <p className="pl-4"><span className="text-blue-500">def</span> <span className="text-indigo-400">__init__</span>(<span className="text-orange-400">self</span>):</p>
                <p className="pl-8"><span className="text-orange-400">self</span>.name = <span className="text-emerald-500">"Sanjoe Jose"</span></p>
                <p className="pl-8"><span className="text-orange-400">self</span>.stack = [<span className="text-emerald-500">"Java"</span>, <span className="text-emerald-500">"Python"</span>, <span className="text-emerald-500">"React"</span>, <span className="text-emerald-500">"Azure"</span>]</p>
                <p className="pl-8"><span className="text-orange-400">self</span>.award = <span className="text-emerald-500">"Coding Winner '25"</span></p>
                <br/>
                <p className="pl-4"><span className="text-blue-500">def</span> <span className="text-indigo-400">build_solution</span>(<span className="text-orange-400">self</span>, problem):</p>
                <p className="pl-8"><span className="text-indigo-500">return</span> <span className="text-blue-400">self</span>.optimize_and_scale(problem)</p>
                <p className="mt-3 text-emerald-500 flex items-center gap-2"><ChevronRight size={14}/> System Online_</p>
              </div>
            </div>

            {/* Orbiting Tech Icons */}
            <div className={`absolute -top-6 -left-6 p-3.5 rounded-2xl border shadow-xl animate-float-delayed z-20 ${
              darkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-white border-slate-100 text-blue-500 shadow-blue-500/10'
            }`}>
              <Database size={28} />
            </div>
            
            <div className={`absolute -bottom-6 -right-6 p-3.5 rounded-2xl border shadow-xl animate-float z-20 ${
              darkMode ? 'bg-slate-800 border-slate-700 text-indigo-400' : 'bg-white border-slate-100 text-indigo-500 shadow-indigo-500/10'
            }`}>
              <Terminal size={28} />
            </div>
            
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-6 max-w-6xl mx-auto border-t relative z-10 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="text-blue-500" size={28} />
          <h2 className="text-3xl font-bold">Professional Experience</h2>
        </div>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`border p-6 md:p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-blue-500/30' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <p className="text-blue-500 font-medium">{exp.company}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full w-fit ${
                  darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}>{exp.duration}</span>
              </div>
              <ul className={`list-disc list-inside space-y-2 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Achievement Section */}
      <section id="achievements" className={`py-20 px-6 max-w-6xl mx-auto border-t relative z-10 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-12">
          <Award className="text-blue-500" size={28} />
          <h2 className="text-3xl font-bold">Featured Achievement</h2>
        </div>

        <div className={`border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl grid md:grid-cols-12 gap-0 ${
          darkMode ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/30' : 'bg-white border-slate-200 hover:border-blue-300 shadow-md'
        }`}>
          <div className="md:col-span-5 relative min-h-[300px] md:min-h-[380px] bg-slate-900 overflow-hidden group">
            <img 
              src={slideshowImages[currentSlide]} 
              alt={`Future Coding Challenge Winner Photo ${currentSlide + 1}`} 
              className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.classList.add('flex', 'items-center', 'justify-center', 'text-slate-500');
                e.target.parentNode.innerHTML = '<span class="text-sm p-4 text-center">Place img1.jpeg and img2.jpeg in public folder</span>';
              }}
            />

            <div className="absolute top-4 left-4 bg-yellow-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              🏆 Challenge Winner
            </div>

            <button 
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-950/60 text-white p-2 rounded-full hover:bg-slate-950/90 transition-all opacity-80 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-950/60 text-white p-2 rounded-full hover:bg-slate-950/90 transition-all opacity-80 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slideshowImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === index ? 'w-6 bg-blue-500' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="md:col-span-7 p-8 flex flex-col justify-center space-y-4">
            <div className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-500">
              Brototype Kochi Competition
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Winner - Future Coding Challenge 2025</h3>
            <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Selected as a top winner among <strong>160+ competitive participants</strong> across the region. Evaluated on advanced algorithmic problem-solving, code efficiency, and software engineering logic in a high-stakes competition featuring a <strong>₹2.5 Lakh prize pool</strong>.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className={`text-xs px-3 py-1 rounded-md border font-mono ${
                darkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-slate-100 border-slate-300 text-blue-600'
              }`}>Algorithm Design</span>
              <span className={`text-xs px-3 py-1 rounded-md border font-mono ${
                darkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-slate-100 border-slate-300 text-blue-600'
              }`}>Competitive Coding</span>
              <span className={`text-xs px-3 py-1 rounded-md border font-mono ${
                darkMode ? 'bg-slate-800 border-slate-700 text-blue-400' : 'bg-slate-100 border-slate-300 text-blue-600'
              }`}>Problem Solving</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Links */}
      <section id="projects" className={`py-20 px-6 max-w-6xl mx-auto border-t relative z-10 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="text-blue-500" size={28} />
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <Link 
              key={proj.id} 
              to={`/project/${proj.id}`}
              className={`border rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl ${
                darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900' : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{proj.title}</h3>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
                <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {proj.shortDescription}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((t, i) => (
                    <span key={i} className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                      darkMode ? 'bg-slate-800 text-blue-400 border-slate-700' : 'bg-slate-100 text-blue-600 border-slate-200'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-blue-500 font-medium inline-flex items-center gap-1 group-hover:underline">
                  View Project Page →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-20 px-6 max-w-6xl mx-auto border-t relative z-10 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-12">
          <Code className="text-blue-500" size={28} />
          <h2 className="text-3xl font-bold">Technical Skills</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([category, items], idx) => (
            <div key={idx} className={`border rounded-xl p-6 transition-all hover:shadow-lg ${
              darkMode ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
            }`}>
              <h3 className="text-lg font-bold mb-4 text-blue-500">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span key={i} className={`border px-3 py-1.5 rounded-lg text-sm ${
                    darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More Achievements, Certs, & Education */}
      <section className={`py-20 px-6 max-w-6xl mx-auto border-t relative z-10 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className="grid md:grid-cols-2 gap-12">
          
          <div className="space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-blue-500" size={28} />
                <h2 className="text-2xl font-bold">More Achievements</h2>
              </div>
              <div className="space-y-4">
                <div className={`border p-6 rounded-xl hover:-translate-y-1 transition-transform ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <h3 className="font-bold mb-1">Workshop Facilitator</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Facilitated Beginner's Python Workshops for ACM Student Chapter and GDG AJCE.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="text-blue-500" size={28} />
                <h2 className="text-2xl font-bold">Certifications</h2>
              </div>
              <div className="space-y-4">
                <div className={`border p-5 rounded-xl flex justify-between items-center hover:-translate-y-1 transition-transform ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Oracle Database Foundation</h3>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Oracle Academy</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-blue-600'}`}>Oct 2023</span>
                </div>
                <div className={`border p-5 rounded-xl flex justify-between items-center hover:-translate-y-1 transition-transform ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">Advanced Python Workshop</h3>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>GDSC AJCE</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${darkMode ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-blue-600'}`}>Dec 2022</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-blue-500" size={28} />
              <h2 className="text-2xl font-bold">Education History</h2>
            </div>
            <div className="space-y-4">
              <div className={`border p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div>
                  <span className="text-xs font-semibold text-blue-500 uppercase">Graduation (2025)</span>
                  <h3 className="font-bold text-lg mt-1 mb-2">B.Tech in Computer Science and Engineering</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Amal Jyothi College of Engineering (Autonomous), Kanjirappally</p>
                  <p className="text-xs text-slate-500 mt-1">APJ Abdul Kalam Technological University</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                  <span className="text-slate-400">CGPA</span>
                  <span className="font-bold text-blue-500">7.76</span>
                </div>
              </div>

              <div className={`border p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div>
                  <span className="text-xs font-semibold text-blue-500 uppercase">Higher Secondary (2020)</span>
                  <h3 className="font-bold text-lg mt-1 mb-2">Higher Secondary Education</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>S.N.V.H.S.S, N.R City, Idukki</p>
                  <p className="text-xs text-slate-500 mt-1">Directorate of Higher Secondary Education</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                  <span className="text-slate-400">Score</span>
                  <span className="font-bold text-blue-500">89.83%</span>
                </div>
              </div>

              <div className={`border p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div>
                  <span className="text-xs font-semibold text-blue-500 uppercase">High School (2018)</span>
                  <h3 className="font-bold text-lg mt-1 mb-2">High School Education</h3>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>St. Sebastian's H.S, Kanthippara, Idukki</p>
                  <p className="text-xs text-slate-500 mt-1">Kerala Board Of Public Examinations</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                  <span className="text-slate-400">Score</span>
                  <span className="font-bold text-blue-500">90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 px-6 max-w-6xl mx-auto border-t relative z-10 ${darkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <div className={`border rounded-2xl p-8 md:p-12 text-center ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-950/40 to-indigo-950/40 border-blue-500/20' 
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
        }`}>
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className={`max-w-xl mx-auto mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Feel free to reach out for career opportunities, technical discussions, or collaboration!
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="mailto:sanjoej8@gmail.com" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <Mail size={18} /> sanjoej8@gmail.com
            </a>
            <a href="tel:+919188467396" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <Phone size={18} /> +91 91884 67396
            </a>
            <a href="https://linkedin.com/in/sanjoe-jose" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 border-t text-center text-xs relative z-10 ${
        darkMode ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-400'
      }`}>
        © {new Date().getFullYear()} Sanjoe Jose. Built with React & Tailwind CSS.
      </footer>
    </div>
  );
}