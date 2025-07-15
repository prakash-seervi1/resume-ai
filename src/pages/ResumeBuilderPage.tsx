import React, { useRef, useState } from 'react';
import { analyzeResumeText } from '../services/aiService';
import { useReactToPrint, UseReactToPrintOptions } from 'react-to-print';
import { Document, Packer, Paragraph, TextRun } from 'docx';
// @ts-expect-error: file-saver has no types
import { saveAs } from 'file-saver';
import copy from 'copy-to-clipboard';

const sampleResume = `John Smith
Software Engineer
Email: john.smith@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced Full-Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Proven track record of delivering scalable web applications and leading development teams.

TECHNICAL SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express, Python, Django, REST APIs
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, Jest, Webpack, Figma

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Led development of customer-facing web application serving 100K+ users
• Implemented microservices architecture reducing system latency by 40%
• Mentored junior developers and conducted code reviews
• Collaborated with product managers and designers on feature planning

Software Developer | StartupXYZ | 2019 - 2021
• Built responsive web applications using React and Node.js
• Developed RESTful APIs and integrated third-party services
• Optimized database queries improving performance by 30%
• Participated in agile development processes and sprint planning

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019

CERTIFICATIONS
• AWS Certified Solutions Architect
• Google Cloud Professional Developer`;

interface Skill {
  name: string;
  category: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  date: string;
  details: string[];
}

interface Education {
  degree: string;
  school: string;
  date: string;
}

interface Project {
  name: string;
  description: string;
}

interface BuildResult {
  name: string;
  title: string;
  contact: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];
  suggestions: string[];
  atsScore: number;
}

const ResumeTemplate = React.forwardRef<HTMLDivElement, { data: BuildResult }>(( { data }, ref ) => {
  // Group skills by category
  const skillsByCategory = data.skills.reduce((acc: Record<string, string[]>, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {});

  // Helper to join contact info in one line
  const contactLine = data.contact.replace(/\|/g, ' | ');

  return (
    <div ref={ref} className="bg-white rounded-xl shadow p-8 max-w-2xl mx-auto border mt-8 print:mt-0 print:shadow-none print:border-none">
      {/* Header Section */}
      <div className="mb-6">
        <div className="text-4xl font-extrabold uppercase text-center tracking-wide">{data.name}</div>
        <div className="text-lg font-semibold text-center mt-2">{data.title}</div>
        <div className="text-sm text-center text-gray-600 mt-2">{contactLine}</div>
      </div>
      {/* Profile Section */}
      <section className="mb-6">
        <div className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Professional Summary</div>
        <p className="text-gray-800 whitespace-pre-line text-base mt-2">{data.summary}</p>
      </section>
      {/* Experience Section */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <div className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Work Experience</div>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-base">{exp.title}</div>
                <div className="text-sm text-gray-500 whitespace-nowrap">{exp.date}</div>
              </div>
              <div className="font-medium text-gray-700 text-sm">{exp.company}{exp.location ? `, ${exp.location}` : ''}</div>
              <ul className="list-disc pl-6 text-sm mt-1">
                {exp.details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}
      {/* Education Section */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <div className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Education</div>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-base">{edu.degree}</div>
                <div className="text-sm text-gray-500 whitespace-nowrap">{edu.date}</div>
              </div>
              <div className="font-medium text-gray-700 text-sm">{edu.school}</div>
            </div>
          ))}
        </section>
      )}
      {/* Skills Section */}
      {Object.keys(skillsByCategory).length > 0 && (
        <section className="mb-6">
          <div className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Skills</div>
          <ul className="list-disc pl-6 text-sm">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <li key={category} className="mb-1">
                <span className="font-semibold capitalize">{category}:</span> {skills.join(', ')}
              </li>
            ))}
          </ul>
        </section>
      )}
      {/* Certifications Section */}
      {data.certifications.length > 0 && (
        <section className="mb-6">
          <div className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Certifications</div>
          <ul className="list-disc pl-6 text-sm">
            {data.certifications.map((cert, idx) => <li key={idx}>{cert}</li>)}
          </ul>
        </section>
      )}
      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <div className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Projects</div>
          {data.projects.map((proj, idx) => (
            <div key={idx} className="mb-2">
              <div className="font-medium text-gray-900">{proj.name}</div>
              <div className="text-sm text-gray-700">{proj.description}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
});

ResumeTemplate.displayName = 'ResumeTemplate';

const ResumeBuilderPage: React.FC = () => {
  const [buildResult, setBuildResult] = useState<BuildResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [resumeReady, setResumeReady] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleResumeTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeText(e.target.value);
  };

  const handleUseSample = () => {
    setResumeText(sampleResume);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBuildResult(null);
    setResumeReady(false);
    try {
      const result = await analyzeResumeText(resumeText, 'demo_user_001');
      setBuildResult(result);
      setTimeout(() => setResumeReady(true), 100); // allow DOM to update
    } catch {
      setError('Failed to generate resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // PDF Export
  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: buildResult?.name ? `${buildResult.name}-Resume` : 'Resume',
  } as UseReactToPrintOptions);

  // Word Export
  const handleWordExport = () => {
    if (!buildResult) return;
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: buildResult.name, bold: true, size: 32 }),
                new TextRun({ text: `\n${buildResult.title}`, bold: true, size: 24 }),
                new TextRun({ text: `\n${buildResult.contact}`, size: 20 }),
                new TextRun({ text: `\n\nProfile: ${buildResult.summary}`, size: 20 }),
              ],
            }),
            ...Object.entries(
              buildResult.skills.reduce((acc: Record<string, string[]>, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill.name);
                return acc;
              }, {})
            ).map(([category, skills]) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `\n${category} Skills: ${skills.join(', ')}`, bold: true, size: 20 }),
                ],
              })
            ),
            ...buildResult.experience.map(exp =>
              new Paragraph({
                children: [
                  new TextRun({ text: `\n${exp.title} | ${exp.company} | ${exp.location} | ${exp.date}`, bold: true, size: 20 }),
                  ...exp.details.map(d => new TextRun({ text: `\n- ${d}`, size: 20 })),
                ],
              })
            ),
            ...buildResult.education.map(edu =>
              new Paragraph({
                children: [
                  new TextRun({ text: `\n${edu.degree} | ${edu.school} | ${edu.date}`, bold: true, size: 20 }),
                ],
              })
            ),
            ...buildResult.projects.map(proj =>
              new Paragraph({
                children: [
                  new TextRun({ text: `\n${proj.name}: ${proj.description}`, size: 20 }),
                ],
              })
            ),
            ...buildResult.certifications.map(cert =>
              new Paragraph({
                children: [
                  new TextRun({ text: `\nCertification: ${cert}`, size: 20 }),
                ],
              })
            ),
          ],
        },
      ],
    });
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${buildResult.name || 'Resume'}.docx`);
    });
  };

  // Copy to Clipboard
  const handleCopy = () => {
    if (!buildResult) return;
    let text = `${buildResult.name}\n${buildResult.title}\n${buildResult.contact}\n\nProfile: ${buildResult.summary}\n`;
    Object.entries(
      buildResult.skills.reduce((acc: Record<string, string[]>, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
      }, {})
    ).forEach(([category, skills]) => {
      text += `\n${category} Skills: ${skills.join(', ')}`;
    });
    buildResult.experience.forEach(exp => {
      text += `\n${exp.title} | ${exp.company} | ${exp.location} | ${exp.date}`;
      exp.details.forEach(d => {
        text += `\n- ${d}`;
      });
    });
    buildResult.education.forEach(edu => {
      text += `\n${edu.degree} | ${edu.school} | ${edu.date}`;
    });
    buildResult.projects.forEach(proj => {
      text += `\n${proj.name}: ${proj.description}`;
    });
    buildResult.certifications.forEach(cert => {
      text += `\nCertification: ${cert}`;
    });
    copy(text);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Resume Builder</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block font-medium mb-1">Paste Resume Text</label>
          <textarea
            value={resumeText}
            onChange={handleResumeTextChange}
            placeholder="Paste your resume content here..."
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-2"
          />
          <button
            type="button"
            onClick={handleUseSample}
            className="mt-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
          >
            Use Sample Resume
          </button>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" disabled={loading || !resumeText.trim()}>
          {loading ? 'Generating...' : 'Generate Resume with AI'}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      {buildResult && (
        <>
          <div className="flex items-center justify-between mt-8 mb-4 gap-2 flex-wrap">
            <div className={`text-lg font-semibold px-4 py-2 rounded-full ${buildResult.atsScore >= 80 ? 'bg-green-100 text-green-700' : buildResult.atsScore >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
              ATS Score: {buildResult.atsScore}/100
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handlePrint}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                type="button"
                disabled={!resumeReady || !resumeRef.current}
              >
                Download PDF
              </button>
              <button onClick={handleWordExport} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" type="button">Download Word</button>
              <button onClick={handleCopy} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700" type="button">Copy to Clipboard</button>
            </div>
          </div>
          <ResumeTemplate ref={resumeRef} data={buildResult} />
          {buildResult.suggestions && buildResult.suggestions.length > 0 && (
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">Suggestions to Improve Your Resume:</h3>
              <ul className="list-disc pl-5 text-yellow-800">
                {buildResult.suggestions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResumeBuilderPage; 