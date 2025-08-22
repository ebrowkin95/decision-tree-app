import React, { useState } from 'react';
import frameworkImage from '../assets/Framework_4Ebenen.png';

const TutorialModal = ({ onClose, lang }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const tutorialData = {
        de: {
            title: 'Framework Tutorial',
            subtitle: 'Schritt-für-Schritt Anleitung',
            steps: [
                {
                    title: 'Schritt 1: Unterrichtssituation wählen',
                    content: [
                        'Sie wählen eine konkrete Unterrichtssituation aus drei Optionen:',
                        '',
                        '🧮 **3. Klasse Mathematik - Einmaleins**',
                        '  → Grundschüler lernen das kleine 1x1',
                        '  → Unterschiedliche Lerngeschwindigkeiten',
                        '',
                        '🔬 **8. Klasse Biologie - Photosynthese**', 
                        '  → Komplexe biologische Prozesse verstehen',
                        '  → Abstrakte Vorgänge veranschaulichen',
                        '',
                        '📚 **11. Klasse Geschichte - Weimarer Republik**',
                        '  → Historische Quellen kritisch analysieren',
                        '  → Politische Zusammenhänge bewerten',
                        '',
                        'Diese Situation begleitet Sie durch das gesamte Framework und hilft bei konkreten Entscheidungen.'
                    ]
                },
                {
                    title: 'Schritt 2: Wissensdimension nach Anderson & Krathwohl',
                    content: [
                        'Basierend auf Ihrer Situation wählen Sie die **Wissensdimension** (revidierte Bloom\'sche Taxonomie):',
                        '',
                        '📋 **Faktisches Wissen** (Fakten, Begriffe, Details)',
                        '  → Grundbausteine einer Disziplin',
                        '  → Beispiel: Vokabeln, Formeln, historische Daten',
                        '',
                        '🧩 **Konzeptionelles Wissen** (Kategorien, Theorien, Modelle)',
                        '  → Zusammenhänge zwischen Grundelementen',
                        '  → Beispiel: Funktionsweise von Systemen, Klassifikationen',
                        '',
                        '⚙️ **Prozedurales Wissen** (Methoden, Algorithmen, Techniken)',
                        '  → "Wie macht man das?" - Schritt-für-Schritt',
                        '  → Beispiel: Mathematische Verfahren, Laborprotokolle',
                        '',
                        '🎯 **Metakognitives Wissen** (Strategien, Selbstreflexion)',
                        '  → Wissen über das eigene Lernen',
                        '  → Beispiel: Wann welche Lernstrategie anwenden?'
                    ]
                },
                {
                    title: 'Schritt 3: Kognitive Prozessdimension nach Bloom',
                    content: [
                        'Je nach Wissensdimension stehen verschiedene **kognitive Prozesse** zur Verfügung:',
                        '',
                        '🧠 **Erinnern** (niedrigste Stufe)',
                        '  → Aus dem Langzeitgedächtnis abrufen',
                        '  → "Nennen Sie...", "Wer war...?"',
                        '',
                        '💡 **Verstehen** (Bedeutung konstruieren)',
                        '  → Interpretieren, klassifizieren, zusammenfassen',
                        '  → "Erklären Sie...", "Was bedeutet...?"',
                        '',
                        '🔧 **Anwenden** (Prozeduren in neuen Situationen)',
                        '  → Ausführen, implementieren, lösen',
                        '  → "Berechnen Sie...", "Wenden Sie an..."',
                        '',
                        '🔍 **Analysieren** (in Bestandteile zerlegen)',
                        '  → Differenzieren, organisieren, zuordnen',
                        '  → "Vergleichen Sie...", "Unterscheiden Sie..."',
                        '',
                        '⚡ **Bewerten** (höchste verfügbare Stufe)',
                        '  → Prüfen, kritisieren, urteilen',
                        '  → "Bewerten Sie...", "Welcher Ansatz ist besser?"'
                    ]
                },
                {
                    title: 'Schritt 4: Medientyp auswählen',
                    content: [
                        'Je nach Wissensdimension und kognitivem Prozess werden **passende Medientypen** vorgeschlagen:',
                        '',
                        '⚠️ **Wichtig**: Nicht alle Medientypen sind für jede Kombination verfügbar - das Framework filtert pädagogisch sinnvolle Optionen.',
                        '',
                        '📝 **Textbasiert** (Bücher, PDFs, Artikel)',
                        '  → Ideal für faktisches Wissen, Definitionen',
                        '',
                        '🖼️ **Visuell** (Grafiken, Diagramme, Bilder)',  
                        '  → Perfekt für konzeptionelles Verstehen',
                        '',
                        '🎧 **Auditiv** (Podcasts, Audioaufnahmen)',
                        '  → Effektiv für Wissensvermittlung beim Hören',
                        '',
                        '📺 **Audiovisuell** (Videos, Animationen)',
                        '  → Optimal für prozedurales Lernen',
                        '',
                        '🎮 **Interaktiv** (Simulationen, Spiele, VR)',
                        '  → Hervorragend für Anwendung und komplexe Prozesse',
                        '',
                        '📊 **Datenbasiert** (Tabellen, Statistiken)', 
                        '  → Speziell für Analyse und Bewertungsaufgaben'
                    ]
                },
                {
                    title: 'Schritt 5: Konkrete Medienempfehlungen',
                    content: [
                        'Am Ende erhalten Sie **konkrete, praxisnahe Medienempfehlungen** für Ihre Unterrichtssituation:',
                        '',
                        '🎯 **Das Framework berücksichtigt:**',
                        '• Pädagogische Eignung für Ihr Lernziel',
                        '• Praktische Umsetzbarkeit im Unterricht', 
                        '• Verfügbarkeit der Tools und Ressourcen',
                        '• Passenden Interaktivitätsgrad',
                        '',
                        '💡 **Beispiel-Empfehlungen:**',
                        '• **Einmaleins**: Interaktive Übungsapps, Lernspiele',
                        '• **Photosynthese**: Animationsvideos, 3D-Modelle',
                        '• **Weimarer Republik**: Digitale Quellensammlungen, Timeline-Tools',
                        '',
                        '✅ **Ihr Vorteil**: Evidenzbasierte Auswahl statt trial-and-error!'
                    ]
                }
            ],
            nextButton: 'Weiter',
            prevButton: 'Zurück',
            finishButton: 'Tutorial beenden'
        },
        en: {
            title: 'Framework Tutorial',
            subtitle: 'Step-by-Step Guide',
            steps: [
                {
                    title: 'Step 1: Choose Teaching Situation',
                    content: [
                        'Select a concrete teaching situation from three options:',
                        '',
                        '🧮 **Grade 3 Mathematics - Times Tables**',
                        '  → Elementary students learning multiplication',
                        '  → Different learning speeds and levels',
                        '',
                        '🔬 **Grade 8 Biology - Photosynthesis**',
                        '  → Understanding complex biological processes',
                        '  → Visualizing abstract mechanisms',
                        '',
                        '📚 **Grade 11 History - Weimar Republic**',
                        '  → Critically analyzing historical sources',
                        '  → Evaluating political contexts',
                        '',
                        'This situation guides you through the entire framework and helps with concrete decisions.'
                    ]
                },
                {
                    title: 'Step 2: Knowledge Dimension by Anderson & Krathwohl',
                    content: [
                        'Based on your situation, choose the **Knowledge Dimension** (Revised Bloom\'s Taxonomy):',
                        '',
                        '📋 **Factual Knowledge** (facts, terms, details)',
                        '  → Basic building blocks of a discipline',
                        '  → Example: Vocabulary, formulas, historical dates',
                        '',
                        '🧩 **Conceptual Knowledge** (categories, theories, models)',
                        '  → Relationships between basic elements',
                        '  → Example: How systems work, classifications',
                        '',
                        '⚙️ **Procedural Knowledge** (methods, algorithms, techniques)',
                        '  → "How to do it?" - Step-by-step processes',
                        '  → Example: Mathematical procedures, lab protocols',
                        '',
                        '🎯 **Metacognitive Knowledge** (strategies, self-reflection)',
                        '  → Knowledge about one\'s own learning',
                        '  → Example: When to apply which learning strategy?'
                    ]
                },
                {
                    title: 'Step 3: Cognitive Process Dimension by Bloom',
                    content: [
                        'Depending on your knowledge dimension, different **cognitive processes** are available:',
                        '',
                        '🧠 **Remember** (lowest level)',
                        '  → Retrieve from long-term memory',
                        '  → "Name...", "Who was...?"',
                        '',
                        '💡 **Understand** (construct meaning)',
                        '  → Interpret, classify, summarize',
                        '  → "Explain...", "What does... mean?"',
                        '',
                        '🔧 **Apply** (procedures in new situations)',
                        '  → Execute, implement, solve',
                        '  → "Calculate...", "Apply the method..."',
                        '',
                        '🔍 **Analyze** (break into constituent parts)',
                        '  → Differentiate, organize, attribute',
                        '  → "Compare...", "Distinguish between..."',
                        '',
                        '⚡ **Evaluate** (highest available level)',
                        '  → Check, critique, judge',
                        '  → "Evaluate...", "Which approach is better?"'
                    ]
                },
                {
                    title: 'Step 4: Select Media Type',
                    content: [
                        'Based on knowledge dimension and cognitive process, **suitable media types** are suggested:',
                        '',
                        '⚠️ **Important**: Not all media types are available for every combination - the framework filters pedagogically sensible options.',
                        '',
                        '📝 **Text-based** (books, PDFs, articles)',
                        '  → Ideal for factual knowledge, definitions',
                        '',
                        '🖼️ **Visual** (graphics, diagrams, images)',
                        '  → Perfect for conceptual understanding',
                        '',
                        '🎧 **Auditory** (podcasts, audio recordings)',
                        '  → Effective for knowledge transmission through listening',
                        '',
                        '📺 **Audiovisual** (videos, animations)',
                        '  → Optimal for procedural learning',
                        '',
                        '🎮 **Interactive** (simulations, games, VR)',
                        '  → Excellent for application and complex processes',
                        '',
                        '📊 **Data-driven** (tables, statistics)',
                        '  → Specifically for analysis and evaluation tasks'
                    ]
                },
                {
                    title: 'Step 5: Concrete Media Recommendations',
                    content: [
                        'Finally, you receive **concrete, practical media recommendations** for your teaching situation:',
                        '',
                        '🎯 **The framework considers:**',
                        '• Pedagogical suitability for your learning objective',
                        '• Practical feasibility in the classroom',
                        '• Availability of tools and resources',
                        '• Appropriate level of interactivity',
                        '',
                        '💡 **Example recommendations:**',
                        '• **Times Tables**: Interactive practice apps, learning games',
                        '• **Photosynthesis**: Animation videos, 3D models',
                        '• **Weimar Republic**: Digital source collections, timeline tools',
                        '',
                        '✅ **Your advantage**: Evidence-based selection instead of trial-and-error!'
                    ]
                }
            ],
            nextButton: 'Next',
            prevButton: 'Back',
            finishButton: 'Finish Tutorial'
        }
    };

    const t = tutorialData[lang];
    const currentStepData = t.steps[currentStep];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: '#181818',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '80vw',
                maxHeight: '90vh',
                width: '800px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Close Button */}
                <button
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '20px',
                        background: '#f44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        zIndex: 1001,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: 1
                    }}
                    onClick={onClose}
                >
                    ×
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{
                        color: '#fff',
                        fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
                        marginBottom: 'clamp(8px, 2vw, 10px)',
                        fontFamily: 'Permanent Marker, cursive',
                        lineHeight: '1.2'
                    }}>
                        {t.title}
                    </h1>
                    <p style={{
                        color: '#4CAF50',
                        fontSize: '1.2rem',
                        fontFamily: 'Arial, sans-serif',
                        fontStyle: 'italic',
                        margin: 0
                    }}>
                        {t.subtitle}
                    </p>
                </div>

                {/* Progress Indicators */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '30px',
                    gap: '10px'
                }}>
                    {t.steps.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: index === currentStep ? '#4CAF50' : '#666',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                            onClick={() => setCurrentStep(index)}
                        />
                    ))}
                </div>

                {/* Content */}
                <div style={{
                    background: '#222',
                    borderRadius: '15px',
                    padding: '30px',
                    marginBottom: '30px',
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    border: '2px solid #333'
                }}>
                    <h2 style={{
                        color: '#4CAF50',
                        fontSize: '1.5rem',
                        marginBottom: '20px',
                        fontFamily: 'Permanent Marker, cursive'
                    }}>
                        {currentStepData.title}
                    </h2>
                    
                    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
                        {currentStepData.content.map((line, index) => {
                            if (line === '') {
                                return <br key={index} />;
                            }
                            if (line.startsWith('• **') && line.includes('**:')) {
                                const [boldPart, normalPart] = line.split('**:');
                                return (
                                    <p key={index} style={{
                                        color: '#fff',
                                        fontSize: '1rem',
                                        margin: '10px 0',
                                        paddingLeft: '10px'
                                    }}>
                                        <strong style={{ color: '#4CAF50' }}>
                                            {boldPart.replace('• **', '• ')}:
                                        </strong>
                                        {normalPart}
                                    </p>
                                );
                            }
                            if (line.startsWith('⚠️ **') && line.includes('**:')) {
                                const [boldPart, normalPart] = line.split('**:');
                                return (
                                    <p key={index} style={{
                                        color: '#FFB74D',
                                        fontSize: '1rem',
                                        margin: '15px 0',
                                        padding: '12px',
                                        backgroundColor: '#2A2A2A',
                                        borderRadius: '8px',
                                        border: '2px solid #FF9800'
                                    }}>
                                        <strong style={{ color: '#FF9800' }}>
                                            {boldPart.replace('**', '')}:
                                        </strong>
                                        {normalPart}
                                    </p>
                                );
                            }
                            if (line.startsWith('• ') && !line.includes('**')) {
                                return (
                                    <p key={index} style={{
                                        color: '#fff',
                                        fontSize: '1rem',
                                        margin: '8px 0',
                                        paddingLeft: '10px'
                                    }}>
                                        <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>•</span>
                                        {line.substring(1)}
                                    </p>
                                );
                            }
                            if (line.startsWith('  → ')) {
                                return (
                                    <p key={index} style={{
                                        color: '#ccc',
                                        fontSize: '0.95rem',
                                        margin: '5px 0',
                                        paddingLeft: '30px',
                                        fontStyle: 'italic'
                                    }}>
                                        {line}
                                    </p>
                                );
                            }
                            return (
                                <p key={index} style={{
                                    color: '#fff',
                                    fontSize: '1rem',
                                    margin: '10px 0'
                                }}>
                                    {line}
                                </p>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <button
                        style={{
                            padding: '12px 24px',
                            backgroundColor: currentStep === 0 ? '#666' : '#2196F3',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '1rem',
                            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                            opacity: currentStep === 0 ? 0.5 : 1
                        }}
                        onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                        disabled={currentStep === 0}
                    >
                        {t.prevButton}
                    </button>

                    <span style={{
                        color: '#ccc',
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '1rem'
                    }}>
                        {currentStep + 1} / {t.steps.length}
                    </span>

                    <button
                        style={{
                            padding: '12px 24px',
                            backgroundColor: currentStep === t.steps.length - 1 ? '#4CAF50' : '#2196F3',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            if (currentStep === t.steps.length - 1) {
                                onClose();
                            } else {
                                setCurrentStep(currentStep + 1);
                            }
                        }}
                    >
                        {currentStep === t.steps.length - 1 ? t.finishButton : t.nextButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

const containerStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: '#000',
    fontFamily: 'Permanent Marker, cursive',
    padding: 'clamp(10px, 4vw, 20px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box'
};

const contentStyle = {
    background: '#181818',
    borderRadius: 'clamp(12px, 3vw, 20px)',
    boxShadow: '0 6px 36px #000c',
    padding: 'clamp(25px, 6vw, 50px)',
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box'
};

const buttonStyle = {
    margin: 'clamp(6px, 2vw, 10px)',
    padding: 'clamp(15px, 3vw, 18px) clamp(24px, 5vw, 32px)',
    backgroundColor: '#fff',
    color: '#000',
    border: 'clamp(2px, 0.5vw, 3px) solid #000',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    fontFamily: 'Permanent Marker, cursive',
    boxShadow: 'clamp(2px, 0.8vw, 4px) clamp(2px, 0.8vw, 4px) #111',
    cursor: 'pointer',
    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
    transition: 'filter 0.2s, transform 0.2s',
    minHeight: '44px'
};

const langButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: '3px solid #2E7D32',
    fontSize: '0.9rem',
    padding: '10px 20px',
    margin: '5px'
};

const activeLangButtonStyle = {
    ...langButtonStyle,
    backgroundColor: '#2E7D32',
    transform: 'scale(0.95)'
};

export function IntroScreen({ onContinue, lang, onLanguageChange }) {
    const [showFramework, setShowFramework] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [dragStart, setDragStart] = useState(null);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        setZoomLevel(prev => Math.max(0.25, Math.min(8, prev + delta)));
    };

    const handleMouseDown = (e) => {
        setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    };

    const handleMouseMove = (e) => {
        if (dragStart) {
            setImagePosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setDragStart(null);
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setImagePosition({ x: 0, y: 0 });
    };

    const texts = {
        de: {
            title: 'Framework zur Auswahl digitaler Medien',
            subtitle: 'Evaluation im Rahmen einer Bachelorarbeit',
            
            description: [
                'Willkommen zur Evaluation eines Frameworks, das Lehrkräfte bei der Auswahl digitaler Medien für den Unterricht unterstützen soll.',
                
                'Dieses Framework wurde im Rahmen einer Masterarbeit entwickelt und wird nun in dieser Bachelorarbeit evaluiert.',
                
                'Die Studie besteht aus drei Schritten:'
            ],
            
            steps: [
                {
                    title: '1. Fragebogen ausfüllen',
                    description: 'Zunächst bitten wir Sie, einen kurzen Fragebogen zu Ihrer Person und Ihren Erfahrungen auszufüllen.'
                },
                {
                    title: '2. Framework nutzen',
                    description: 'Anschließend durchlaufen Sie das interaktive Framework zur Medienauswahl. Hier werden Sie durch verschiedene Entscheidungen geführt.'
                },
                {
                    title: '3. Bewertung abgeben',
                    description: 'Zum Abschluss bewerten Sie das Framework mit dem SUS-Fragebogen, 5 zusätzlichen Likert-Fragen und 3 offenen Fragen zu Ihrer Erfahrung.',
                    warning: '⚠️ Wichtig: Bewerten Sie den Entscheidungsprozess des Frameworks (Auswahl zwischen Optionen bis zur Empfehlung), nicht die technische Bedienbarkeit der Web-App.'
                }
            ],
            
            timeEstimate: 'Geschätzte Dauer: 5-10 Minuten',
            anonymity: 'Ihre Daten werden vollständig anonymisiert verarbeitet.',
            
            langLabel: 'Sprache auswählen:',
            previewButton: 'Framework-Übersicht ansehen',
            tutorialButton: 'Tutorial ansehen',
            closePreview: 'Schließen',
            closeTutorial: 'Tutorial schließen',
            zoomIn: 'Vergrößern',
            zoomOut: 'Verkleinern',
            resetZoom: 'Zoom zurücksetzen',
            zoomHint: 'Mausrad zum Zoomen, Klicken & Ziehen zum Verschieben',
            startButton: 'Studie beginnen'
        },
        
        en: {
            title: 'Framework for Digital Media Selection',
            subtitle: 'Evaluation as part of a Bachelor\'s thesis',
            
            description: [
                'Welcome to the evaluation of a framework designed to support teachers in selecting digital media for their classes.',
                
                'This framework was developed as part of a Master\'s thesis and is now being evaluated in this Bachelor\'s thesis.',
                
                'The study consists of three steps:'
            ],
            
            steps: [
                {
                    title: '1. Fill out questionnaire',
                    description: 'First, we ask you to complete a brief questionnaire about yourself and your experiences.'
                },
                {
                    title: '2. Use the framework',
                    description: 'Next, you will go through the interactive media selection framework. You will be guided through various decisions.'
                },
                {
                    title: '3. Provide evaluation',
                    description: 'Finally, you will evaluate the framework using the SUS questionnaire, 5 additional Likert questions, and 3 open questions about your experience.',
                    warning: '⚠️ Important: Evaluate the framework\'s decision-making process (choosing between options until receiving a recommendation), not the technical usability of the web app.'
                }
            ],
            
            timeEstimate: 'Estimated duration: 5-10 minutes',
            anonymity: 'Your data will be processed completely anonymously.',
            
            langLabel: 'Select language:',
            previewButton: 'View Framework Overview',
            tutorialButton: 'View Tutorial',
            closePreview: 'Close',
            closeTutorial: 'Close Tutorial',
            zoomIn: 'Zoom In',
            zoomOut: 'Zoom Out',
            resetZoom: 'Reset Zoom',
            zoomHint: 'Mouse wheel to zoom, click & drag to move',
            startButton: 'Start Study'
        }
    };

    const t = texts[lang];

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                {/* Language Switcher */}
                <div style={{ marginBottom: '30px' }}>
                    <p style={{
                        color: '#fff',
                        fontSize: '1rem',
                        marginBottom: '10px',
                        fontFamily: 'Arial, sans-serif'
                    }}>
                        {t.langLabel}
                    </p>
                    <button
                        style={lang === 'de' ? activeLangButtonStyle : langButtonStyle}
                        onClick={() => onLanguageChange('de')}
                    >
                        Deutsch
                    </button>
                    <button
                        style={lang === 'en' ? activeLangButtonStyle : langButtonStyle}
                        onClick={() => onLanguageChange('en')}
                    >
                        English
                    </button>
                </div>

                {/* Title */}
                <h1 style={{
                    color: '#fff',
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    marginBottom: 'clamp(8px, 2vw, 10px)',
                    fontFamily: 'Permanent Marker, cursive',
                    lineHeight: '1.2'
                }}>
                    {t.title}
                </h1>
                
                <p style={{
                    color: '#4CAF50',
                    fontSize: '1.3rem',
                    marginBottom: '40px',
                    fontFamily: 'Arial, sans-serif',
                    fontStyle: 'italic'
                }}>
                    {t.subtitle}
                </p>

                {/* Description */}
                {t.description.map((paragraph, index) => (
                    <p key={index} style={{
                        color: '#ccc',
                        fontSize: '1.1rem',
                        marginBottom: '20px',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: '1.5',
                        textAlign: 'left'
                    }}>
                        {paragraph}
                    </p>
                ))}

                {/* Steps */}
                <div style={{ margin: '30px 0' }}>
                    {t.steps.map((step, index) => (
                        <div key={index} style={{
                            background: '#222',
                            padding: 'clamp(15px, 3.5vw, 20px)',
                            margin: 'clamp(10px, 2.5vw, 15px) 0',
                            borderRadius: 'clamp(8px, 2vw, 12px)',
                            border: 'clamp(1px, 0.3vw, 2px) solid #333',
                            textAlign: 'left'
                        }}>
                            <h3 style={{
                                color: '#4CAF50',
                                fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                                marginBottom: 'clamp(8px, 2vw, 10px)',
                                fontFamily: 'Permanent Marker, cursive',
                                lineHeight: '1.2'
                            }}>
                                {step.title}
                            </h3>
                            <p style={{
                                color: '#fff',
                                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: '1.4',
                                margin: step.warning ? '0 0 clamp(12px, 2.5vw, 15px) 0' : 0
                            }}>
                                {step.description}
                            </p>
                            {step.warning && (
                                <div style={{
                                    background: '#2A2A2A',
                                    border: 'clamp(1px, 0.3vw, 2px) solid #FF9800',
                                    borderRadius: 'clamp(6px, 1.5vw, 8px)',
                                    padding: 'clamp(10px, 2.5vw, 12px)',
                                    marginTop: 'clamp(12px, 2.5vw, 15px)'
                                }}>
                                    <p style={{
                                        color: '#FFB74D',
                                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                        fontFamily: 'Arial, sans-serif',
                                        lineHeight: '1.3',
                                        margin: 0
                                    }}>
                                        {step.warning}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div style={{
                    background: '#2d2d2d',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '30px'
                }}>
                    <p style={{
                        color: '#4CAF50',
                        fontSize: '1.1rem',
                        fontFamily: 'Arial, sans-serif',
                        margin: '0 0 10px 0',
                        fontWeight: 'bold'
                    }}>
                        {t.timeEstimate}
                    </p>
                    <p style={{
                        color: '#ccc',
                        fontSize: '1rem',
                        fontFamily: 'Arial, sans-serif',
                        margin: 0
                    }}>
                        {t.anonymity}
                    </p>
                </div>


                {/* Framework Preview and Tutorial Buttons */}
                <div style={{ marginBottom: '20px' }}>
                    {/* Framework Preview Button - nur Deutsch */}
                    {lang === 'de' && (
                        <button
                            style={{
                                ...buttonStyle,
                                fontSize: '1.2rem',
                                backgroundColor: '#2196F3',
                                color: '#fff',
                                border: '3px solid #1976D2',
                                padding: '15px 30px',
                                marginRight: '15px'
                            }}
                            onClick={() => setShowFramework(true)}
                            className="excalidraw-box"
                        >
                            {t.previewButton}
                        </button>
                    )}
                    {/* Tutorial Button - beide Sprachen */}
                    <button
                        style={{
                            ...buttonStyle,
                            fontSize: '1.2rem',
                            backgroundColor: '#FF9800',
                            color: '#fff',
                            border: '3px solid #F57C00',
                            padding: '15px 30px'
                        }}
                        onClick={() => setShowTutorial(true)}
                        className="excalidraw-box"
                    >
                        {t.tutorialButton}
                    </button>
                </div>

                {/* Start Button */}
                <button
                    style={{
                        ...buttonStyle,
                        fontSize: '1.4rem',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: '3px solid #2E7D32',
                        padding: '20px 40px'
                    }}
                    onClick={onContinue}
                    className="excalidraw-box"
                >
                    {t.startButton}
                </button>

                {/* Tutorial Modal */}
                {showTutorial && (
                    <TutorialModal 
                        onClose={() => setShowTutorial(false)}
                        lang={lang}
                    />
                )}

                {/* Framework Preview Modal */}
                {showFramework && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    >
                        <div style={{
                            background: '#fff',
                            borderRadius: '20px',
                            padding: '20px',
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}>
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '15px',
                                    background: '#f44336',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    zIndex: 1001,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    lineHeight: 1
                                }}
                                onClick={() => {
                                    setShowFramework(false);
                                    resetZoom();
                                }}
                            >
                                ×
                            </button>
                            
                            <h2 style={{
                                color: '#000',
                                fontSize: '1.5rem',
                                marginBottom: '10px',
                                fontFamily: 'Permanent Marker, cursive',
                                textAlign: 'center'
                            }}>
                                {lang === 'de' ? 'Framework-Übersicht' : 'Framework Overview'}
                            </h2>

                            <p style={{
                                color: '#666',
                                fontSize: '0.9rem',
                                margin: '0 0 15px 0',
                                fontFamily: 'Arial, sans-serif',
                                textAlign: 'center'
                            }}>
                                {t.zoomHint}
                            </p>

                            {/* Zoom Controls */}
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                marginBottom: '15px'
                            }}>
                                <button
                                    style={{
                                        ...buttonStyle,
                                        padding: '8px 16px',
                                        fontSize: '0.9rem',
                                        backgroundColor: '#2196F3',
                                        color: '#fff',
                                        border: '2px solid #1976D2'
                                    }}
                                    onClick={() => setZoomLevel(prev => Math.min(8, prev + 0.5))}
                                >
                                    {t.zoomIn}
                                </button>
                                <button
                                    style={{
                                        ...buttonStyle,
                                        padding: '8px 16px',
                                        fontSize: '0.9rem',
                                        backgroundColor: '#FF9800',
                                        color: '#fff',
                                        border: '2px solid #F57C00'
                                    }}
                                    onClick={() => setZoomLevel(prev => Math.max(0.25, prev - 0.5))}
                                >
                                    {t.zoomOut}
                                </button>
                                <button
                                    style={{
                                        ...buttonStyle,
                                        padding: '8px 16px',
                                        fontSize: '0.9rem',
                                        backgroundColor: '#9C27B0',
                                        color: '#fff',
                                        border: '2px solid #7B1FA2'
                                    }}
                                    onClick={resetZoom}
                                >
                                    {t.resetZoom}
                                </button>
                            </div>

                            {/* Image Container */}
                            <div style={{
                                width: '100%',
                                height: '60vh',
                                overflow: 'hidden',
                                border: '2px solid #ccc',
                                borderRadius: '10px',
                                position: 'relative',
                                cursor: dragStart ? 'grabbing' : 'grab'
                            }}
                            onWheel={handleWheel}
                            >
                                <img
                                    src={frameworkImage}
                                    alt="Framework Decision Tree"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                                        transition: dragStart ? 'none' : 'transform 0.1s ease',
                                        userSelect: 'none'
                                    }}
                                    onMouseDown={handleMouseDown}
                                    draggable={false}
                                />
                            </div>

                            <button
                                style={{
                                    ...buttonStyle,
                                    marginTop: '15px',
                                    backgroundColor: '#f44336',
                                    color: '#fff',
                                    border: '3px solid #d32f2f'
                                }}
                                onClick={() => {
                                    setShowFramework(false);
                                    resetZoom();
                                }}
                            >
                                {t.closePreview}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}