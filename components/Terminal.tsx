import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import type { Page } from '../contexts/AppContext';

const PROMPT_BASE = `[<span class="text-dark-green">{user}@portfolio</span> <span class="text-dark-blue">~</span>]$`;

const Help: React.FC = () => (
    <div>
        <p className="text-dark-cyan font-bold mb-2">Available Commands:</p>
        <ul className="space-y-1">
            <li><span className="text-dark-yellow w-32 inline-block">help</span> Show this help message.</li>
            <li><span className="text-dark-yellow w-32 inline-block">whoami</span> Display my bio.</li>
            <li><span className="text-dark-yellow w-32 inline-block">experience</span> Show my work experience.</li>
            <li><span className="text-dark-yellow w-32 inline-block">projects</span> List all projects.</li>
            <li><span className="text-dark-yellow w-32 inline-block">project &lt;id&gt;</span> Show project details.</li>
            <li><span className="text-dark-yellow w-32 inline-block">contact</span> Display contact information.</li>
            <li><span className="text-dark-yellow w-32 inline-block">theme &lt;light|dark&gt;</span> Switch color theme.</li>
            <li><span className="text-dark-yellow w-32 inline-block">mode classic</span> Switch to classic UI. To return, click the terminal icon in the header.</li>
            <li><span className="text-dark-yellow w-32 inline-block">login</span> Access the admin dashboard.</li>
            <li><span className="text-dark-yellow w-32 inline-block">clear</span> Clear the terminal screen.</li>
            <li><span className="text-dark-yellow w-32 inline-block">date</span> Show the current date.</li>
        </ul>
    </div>
);

const WhoAmI: React.FC = () => {
    const { siteData } = useAppContext();
    return (
        <div>
            <h2 className="text-xl font-bold text-dark-magenta">{siteData.name}</h2>
            <h3 className="text-dark-cyan">{siteData.title}</h3>
            <div className="mt-2 space-y-2">
                {siteData.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
        </div>
    );
}

const renderPage = (page: Page, contextData: any) => {
    const { siteData, experienceData, projectsData } = contextData;
    switch (page) {
        case 'home': return <WhoAmI />;
        case 'experience': return (
            <div>
                {experienceData.map((exp: any, i: number) => (
                    <div key={i} className="mb-4">
                        <p className="font-bold text-dark-yellow">{exp.role} <span className="text-dark-cyan">@ {exp.company}</span></p>
                        <p className="text-dark-comment">{exp.period}</p>
                        <ul className="list-disc list-inside mt-1 text-dark-fg">
                            {exp.description.map((d: string, j: number) => <li key={j}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        );
        case 'projects': return (
            <div>
                 <p className="text-dark-comment mb-2">Use 'project &lt;id&gt;' for more details.</p>
                {projectsData.map((p: any, i: number) => (
                    <div key={i} className="flex">
                        <span className="text-dark-blue w-20">{p.id}</span>
                        <span className="text-dark-fg">{p.name}</span>
                    </div>
                ))}
            </div>
        );
        case 'contact': return (
            <div>
                {siteData.socials.map((s: any, i: number) => (
                     <div key={i} className="flex items-center gap-4">
                        <span className="text-dark-yellow w-20">{s.name}</span>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-dark-cyan hover:underline">{s.url}</a>
                    </div>
                ))}
            </div>
        );
    }
};

const Terminal: React.FC = () => {
    const { setMode, setTheme, setDashboardVisible, siteData, experienceData, projectsData } = useAppContext();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [output, setOutput] = useState<React.ReactNode[]>([
        <div key="welcome">
            <p>Welcome to my portfolio! Type <span className="text-dark-yellow">'help'</span> to see a list of commands.</p>
        </div>
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const endOfTerminalRef = useRef<HTMLDivElement>(null);

    const PROMPT = PROMPT_BASE.replace('{user}', siteData.name.toLowerCase().replace(/\s/g, '-'));

    const executeCommand = useCallback((cmd: string) => {
        const [command, ...args] = cmd.trim().split(' ');
        let newOutput: React.ReactNode = null;
        const contextData = { siteData, experienceData, projectsData };

        switch (command) {
            case 'help':
                newOutput = <Help />;
                break;
            case 'whoami':
            case 'home':
                newOutput = renderPage('home', contextData);
                break;
            case 'experience':
                newOutput = renderPage('experience', contextData);
                break;
            case 'projects':
                newOutput = renderPage('projects', contextData);
                break;
            case 'project':
                const project = projectsData.find(p => p.id === args[0]);
                if (project) {
                    newOutput = (
                        <div>
                            <p className="font-bold text-dark-yellow">{project.name} <span className="text-dark-comment">({project.year})</span></p>
                            <p className="mt-1">{project.description}</p>
                            <p className="mt-2 text-dark-cyan">{project.tech.join(', ')}</p>
                        </div>
                    );
                } else {
                    newOutput = <p className="text-dark-red">Project not found: {args[0]}</p>;
                }
                break;
            case 'contact':
                newOutput = renderPage('contact', contextData);
                break;
            case 'theme':
                if (args[0] === 'light' || args[0] === 'dark') {
                    setTheme(args[0] as 'light' | 'dark');
                    newOutput = <p>Theme set to {args[0]}</p>;
                } else {
                    newOutput = <p className="text-dark-red">Invalid theme. Use 'light' or 'dark'.</p>;
                }
                break;
            case 'mode':
                if (args[0] === 'classic') {
                    setMode('classic');
                } else {
                    newOutput = <p className="text-dark-red">Invalid mode. Use 'classic'.</p>;
                }
                break;
            case 'login':
                setDashboardVisible(true);
                return;
            case 'clear':
                setOutput([]);
                return;
            case 'date':
                newOutput = <p>{new Date().toString()}</p>;
                break;
            case '':
                break; // Do nothing for empty command
            default:
                newOutput = <p>Command not found: {command}. Type 'help' for a list of commands.</p>;
        }

        setOutput(prev => [
            ...prev,
            <div key={prev.length}>
                <span dangerouslySetInnerHTML={{ __html: PROMPT }} />
                <span> {cmd}</span>
            </div>,
            ...(newOutput ? [<div key={prev.length + 0.5}>{newOutput}</div>] : [])
        ]);
    }, [setMode, setTheme, setDashboardVisible, siteData, experienceData, projectsData, PROMPT]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() !== '') {
            executeCommand(input);
            setHistory(prev => [input, ...prev]);
        } else {
             setOutput(prev => [
                ...prev,
                <div key={prev.length}>
                    <span dangerouslySetInnerHTML={{ __html: PROMPT }} />
                </div>
            ]);
        }
        setInput('');
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = Math.min(history.length - 1, historyIndex + 1);
            if(newIndex >= 0){
                setInput(history[newIndex]);
                setHistoryIndex(newIndex);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = Math.max(-1, historyIndex - 1);
            setInput(newIndex >= 0 ? history[newIndex] : '');
            setHistoryIndex(newIndex);
        }
    };
    
    useEffect(() => {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [output]);

    return (
        <div className="font-mono p-4 h-screen w-full bg-dark-bg text-dark-fg text-base" onClick={() => inputRef.current?.focus()}>
            <div className="overflow-y-auto h-full pb-10">
                {output}
                <form onSubmit={handleSubmit} className="flex items-center">
                    <label htmlFor="terminal-input" className="shrink-0" dangerouslySetInnerHTML={{ __html: PROMPT }}/>
                    <input
                        id="terminal-input"
                        ref={inputRef}
                        type="text"
                        className="flex-grow bg-transparent border-none outline-none pl-2"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        autoComplete="off"
                    />
                </form>
                <div ref={endOfTerminalRef} />
            </div>
        </div>
    );
};

export default Terminal;
