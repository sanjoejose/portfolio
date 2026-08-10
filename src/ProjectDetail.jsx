import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ShieldAlert, Cpu, QrCode, KeyRound, 
  Map, ExternalLink, CheckCircle2, AlertOctagon, Waypoints,
  Navigation, UserCheck, Activity, X, Copy, Check, Blocks,
  Sun, Moon, Menu
} from 'lucide-react';

const projectsData = {
  "waywiz": {
    title: "WAYWIZ - Indoor Navigation System",
    tagline: "Custom Algorithmic Routing & QR-Based Spatial Tracking",
    shortDescription: "A web application enabling real-time indoor navigation using dynamic QR code triggers and tracking real-time staff availability.",
    tech: ["Python", "HTML", "CSS", "JavaScript", "AutoCAD (SVG Mapping)", "Data Structures"],
    isConfidential: false,
    liveLink: "https://waywiz.pythonanywhere.com/", // <--- UPDATE THIS LINK BEFORE DEPLOYING
    demo: {
      active: true,
      qrAnchor: "/demo-qr-anchor.png", 
      qrLocation: "/demo-qr-location.png", 
      credentials: {
        role: "HODCSE Profile",
        username: "E1001", 
        password: "p1001" 
      },
      note: "Note: The credentials provided above belong to the HODCSE profile. You can log in, change the location using the Employee Location QR code, and immediately verify your real-time updates in the Availability Status tile!",
      howToUse: [
        { 
          icon: <Navigation size={22} />, 
          title: "1. Path Finder (Navigation)", 
          desc: "Click the 'Path Finder' tile. Scan the Anchor QR Code to set your exact starting node. Select your destination from the dropdown and click 'Next' to route step-by-step." 
        },
        { 
          icon: <UserCheck size={22} />, 
          title: "2. Staff Login (Employee Portal)", 
          desc: "Click the 'Staff Login' tile. Log in using the HODCSE credentials. Toggle your availability ON/OFF, and scan the Employee Location QR Code to dynamically update your room." 
        },
        { 
          icon: <Activity size={22} />, 
          title: "3. Availability Status", 
          desc: "Click the 'Availability Status' tile. Search the dropdown and select 'HODCSE' to view the updated status (Green = Available with location, Red = Unavailable)." 
        }
      ]
    },
    atAGlance: {
      problem: "Indoor GPS is highly unreliable, and campus WiFi positioning was restricted. Students frequently struggled to locate faculty members or navigate complex building layouts.",
      solution: "Engineered a spatial mapping system as an academic project with 3 peers, using strategically placed QR codes as absolute location anchors and AutoCAD floor plans converted into interactive SVGs."
    },
    keyFeatures: [
      "Path Finder (Navigation Module): Users scan a physical QR code to establish their exact Node ID, select a destination, and follow step-by-step visual routing by clicking 'Next'.",
      "Staff Login (Employee Portal): Faculty log in and scan location QRs upon entering a room to broadcast their location, featuring privacy controls to toggle their visibility.",
      "Availability Status (Dashboard): A live directory showing real-time faculty status (Green = Available with live location, Red = Unavailable)."
    ],
    architecture: "The spatial graph utilizes a precise 7-digit Node ID schema (XX-YY-ZZZ): The first two digits [XX] represent the Building, the next two [YY] represent the Floor, and the final three [ZZZ] represent the specific Room Number.",
    algorithmHighlight: {
      title: "Core Innovation: Floor-Optimized Modified Dijkstra's Algorithm",
      challenge: "Standard Dijkstra's algorithm wastes compute cycles mapping all nodes on intermediate floors when routing a user vertically (e.g., Ground Floor to Top Floor).",
      logic: "Designed a custom optimization logic: Staircase entry nodes logically connect directly to all other stair nodes in the building. When the algorithm hits a stair node, it scans the destination's 3rd and 4th digits (the target floor number). It instantly prunes the search graph, bypassing intermediate floors completely, and routes directly to the target floor's stair exit.",
      impact: "Drastically reduced graph traversal time and improved mobile browser rendering performance by calculating direct vertical routes."
    }
  },
  "optum-library": {
    title: "AI Tools Visual Library",
    tagline: "Internal AI Tooling Portal (Optum Client Project)",
    shortDescription: "A dynamic web portal for Optum that aggregates and visually displays internal AI tools hosted on GitHub by programmatically fetching metadata via Octokit.",
    tech: ["React", "JavaScript", "Python", "Octokit API", "GitHub API"],
    isConfidential: true,
    atAGlance: {
      problem: "Enterprise AI tools and documentations were scattered across various internal GitHub organizations, making discovery difficult for engineering teams.",
      solution: "Designed and implemented a unified visual library web application to automatically consolidate, index, and display these internal developer tools."
    },
    confidentialNotice: "Notice: Source code, detailed infrastructure architecture, and operational repository links for this project are confidential under client non-disclosure agreements (NDA) with Optum & Cognizant.",
    keyFeatures: [
      "Automated Indexing: Executed automated repository fetching and metadata extraction via Octokit API integration.",
      "Real-time Parsing: Integrated live Markdown parsing to render README files and technical documentation directly in the browser.",
      "Dynamic Filtering: Built a categorized search and tag system for rapid tool discovery across distributed engineering teams."
    ]
  },
  "azure-analytics": {
    title: "Sales Data Analytics Using Azure Tools",
    tagline: "Cloud Data Engineering Pipeline & Analytics",
    shortDescription: "Architected end-to-end data pipelines to ingest sales data into a Lakehouse architecture within Microsoft Fabric for structured cleaning, mapping, and analytics.",
    tech: ["Azure Data Factory", "Azure Synapse", "Microsoft Fabric"],
    isConfidential: false,
    atAGlance: {
      problem: "Raw sales records were heterogeneous and multi-sourced, requiring automated normalization before business intelligence teams could query them.",
      solution: "Built an end-to-end cloud data pipeline to ingest, transform, and load analytical datasets into a unified lakehouse platform."
    },
    keyFeatures: [
      "Automated ETL: Configured robust pipeline activities using Azure Data Factory (ADF) to ingest raw sales records.",
      "Data Transformation: Cleansed and mapped raw datasets into dimensional models utilizing Azure Synapse.",
      "Lakehouse Integration: Stored curated, analytics-ready data in Microsoft Fabric for downstream business intelligence operations."
    ]
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsData[id];
  // Automatically scroll to top whenever the component mounts or the project ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

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

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'user') {
      setCopiedUser(true);
      setTimeout(() => setCopiedUser(false), 2000);
    } else {
      setCopiedPass(true);
      setTimeout(() => setCopiedPass(false), 2000);
    }
  };

  if (!project) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col items-center justify-center p-6 text-center font-sans`}>
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <Link to="/" className="text-blue-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans pb-12 relative overflow-hidden ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Ambient Background Orbs */}
      <div className="absolute -top-40 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-10 dark:opacity-10 pointer-events-none"></div>
      
      {/* Global Navigation Bar */}
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

      {/* Main Project Content */}
      <div className="max-w-4xl mx-auto space-y-8 pt-32 px-6 relative z-10">
        
        <Link 
          to="/#projects" 
          className={`inline-flex items-center gap-2 text-sm transition-colors border px-4 py-2 rounded-lg w-fit hover:-translate-x-1 ${
            darkMode 
              ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-blue-400' 
              : 'bg-white border-slate-200 text-slate-600 hover:text-blue-600 shadow-sm'
          }`}
        >
          <ArrowLeft size={18} /> Back to Projects
        </Link>

        <div className={`border-b pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">Project Overview</span>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-2">{project.title}</h1>
            <p className="text-lg text-blue-500 font-medium mt-2">{project.tagline}</p>
          </div>
          
          {project.liveLink && (
            <button 
              onClick={() => project.demo ? setShowLaunchModal(true) : window.open(project.liveLink, '_blank')}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:-translate-y-1 whitespace-nowrap cursor-pointer"
            >
              Open Live Project <ExternalLink size={18} />
            </button>
          )}
        </div>

        {project.isConfidential && (
          <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-500 text-sm leading-relaxed">
            <ShieldAlert size={22} className="shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Confidentiality Notice</strong>
              {project.confidentialNotice}
            </div>
          </div>
        )}

        {project.atAGlance && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`border p-6 rounded-xl border-t-4 border-t-rose-500/50 hover:shadow-lg transition-shadow ${
              darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-500 mb-3 flex items-center gap-2">
                <AlertOctagon size={16} /> The Problem
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{project.atAGlance.problem}</p>
            </div>
            <div className={`border p-6 rounded-xl border-t-4 border-t-emerald-500/50 hover:shadow-lg transition-shadow ${
              darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-500 mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} /> The Solution
              </h3>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{project.atAGlance.solution}</p>
            </div>
          </div>
        )}

        <div className={`border p-6 md:p-8 rounded-xl space-y-6 ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Blocks size={20} className="text-blue-500" /> Core Application Modules
          </h2>
          <div className="grid md:grid-cols-1 gap-4">
            {project.keyFeatures.map((feat, i) => {
              const [title, ...descArr] = feat.split(':');
              const description = descArr.join(':').trim();
              
              if (description) {
                return (
                  <div key={i} className={`p-5 rounded-xl border transition-colors ${
                    darkMode ? 'bg-slate-950/60 border-slate-800/80 hover:border-blue-500/30' : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                  }`}>
                    <h4 className="font-bold text-blue-500 mb-1.5 text-lg">{title}</h4>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
                  </div>
                );
              }
              return (
                <div key={i} className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{feat}</p>
                </div>
              );
            })}
          </div>
        </div>

        {project.algorithmHighlight && (
          <div className={`border border-indigo-500/30 p-6 md:p-8 rounded-xl relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl ${darkMode ? 'bg-slate-900' : 'bg-indigo-50/50 shadow-md'}`}>
            <div className={`absolute top-0 right-0 p-4 pointer-events-none ${darkMode ? 'opacity-5 text-white' : 'opacity-10 text-indigo-900'}`}>
              <Cpu size={150} />
            </div>
            <h2 className={`text-xl font-bold flex items-center gap-2 relative z-10 mb-6 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              <Cpu size={24} /> {project.algorithmHighlight.title}
            </h2>
            
            <div className="space-y-4 relative z-10">
              <div>
                <span className={`inline-block text-xs font-bold px-2 py-1 rounded border mb-2 ${
                  darkMode ? 'bg-slate-950 text-indigo-300 border-indigo-500/20' : 'bg-white text-indigo-600 border-indigo-200 shadow-sm'
                }`}>The Challenge</span>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{project.algorithmHighlight.challenge}</p>
              </div>
              <div>
                <span className={`inline-block text-xs font-bold px-2 py-1 rounded border mb-2 ${
                  darkMode ? 'bg-slate-950 text-blue-300 border-blue-500/20' : 'bg-white text-blue-600 border-blue-200 shadow-sm'
                }`}>The Logic</span>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{project.algorithmHighlight.logic}</p>
              </div>
              <div>
                <span className={`inline-block text-xs font-bold px-2 py-1 rounded border mb-2 ${
                  darkMode ? 'bg-slate-950 text-emerald-300 border-emerald-500/20' : 'bg-white text-emerald-600 border-emerald-200 shadow-sm'
                }`}>The Impact</span>
                <p className={`text-sm leading-relaxed font-medium ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>{project.algorithmHighlight.impact}</p>
              </div>
            </div>
          </div>
        )}

        {project.architecture && (
          <div className={`border p-6 md:p-8 rounded-xl space-y-3 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Map size={20} className="text-blue-500" /> Data & Spatial Architecture
            </h2>
            <p className={`leading-relaxed text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{project.architecture}</p>
          </div>
        )}

        <div className={`border p-6 md:p-8 rounded-xl space-y-4 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h2 className="text-xl font-bold">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className={`border px-3.5 py-1.5 rounded-lg text-sm font-semibold shadow-sm ${
                darkMode ? 'bg-slate-800 text-blue-400 border-slate-700' : 'bg-slate-100 text-blue-600 border-slate-200'
              }`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showLaunchModal && project.demo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-blue-500/40 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 text-slate-100">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Quick Testing Guide</span>
                <h3 className="text-2xl font-bold text-white mt-1">Setup Before Launching WAYWIZ</h3>
              </div>
              <button 
                onClick={() => setShowLaunchModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {project.demo.howToUse.map((step, idx) => (
                <div key={idx} className="flex gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-blue-400 mt-0.5 shrink-0">{step.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-200 text-sm">{step.title}</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-slate-300 mb-2">1. Path Finder QR</span>
                <div className="w-36 h-36 bg-white rounded p-1 flex items-center justify-center">
                  <img 
                    src={project.demo.qrAnchor} 
                    alt="Path Finder QR" 
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-xs text-slate-500">demo-qr-anchor.png missing</span>'; }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Scan in Navigation module</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
                <span className="text-xs font-bold text-slate-300 mb-2">2. Employee Location QR</span>
                <div className="w-36 h-36 bg-white rounded p-1 flex items-center justify-center">
                  <img 
                    src={project.demo.qrLocation} 
                    alt="Location Update QR" 
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span class="text-xs text-slate-500">demo-qr-location.png missing</span>'; }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2">Scan via Staff Login</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-3">
                    <KeyRound size={14} className="text-blue-400" /> HODCSE Credentials
                  </span>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded p-2">
                      <div className="text-[11px] text-slate-400">
                        <span className="block text-slate-500 text-[10px]">Username</span>
                        <code className="text-blue-400 font-mono font-bold">{project.demo.credentials.username}</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(project.demo.credentials.username, 'user')}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        {copiedUser ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded p-2">
                      <div className="text-[11px] text-slate-400">
                        <span className="block text-slate-500 text-[10px]">Password</span>
                        <code className="text-blue-400 font-mono font-bold">{project.demo.credentials.password}</code>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(project.demo.credentials.password, 'pass')}
                        className="p-1 text-slate-400 hover:text-white"
                      >
                        {copiedPass ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-950/50 border-l-2 border-blue-500 p-2 text-[10px] text-blue-200 mt-3">
                  {project.demo.note}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                Keep this tab open or scan the QR codes using your phone while navigating the site!
              </p>
              
              <a 
                href={project.liveLink}
                target="_blank" 
                rel="noreferrer"
                onClick={() => setShowLaunchModal(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 w-full sm:w-auto shrink-0 hover:-translate-y-1"
              >
                Proceed to Live Site <ExternalLink size={16} />
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}