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
                    title: 'Schritt 1: Wissensdimension auswählen',
                    content: [
                        'Zunächst wählen Sie die Art des Wissens, das vermittelt werden soll:',
                        '',
                        '• **Faktisches Wissen**: Grundlegende Fakten, Begriffe, Definitionen',
                        '  → Beispiel: Hauptstädte von Ländern, mathematische Formeln',
                        '',
                        '• **Konzeptionelles Wissen**: Zusammenhänge zwischen Konzepten, Theorien',
                        '  → Beispiel: Funktionsweise des Klimawandels, literarische Epochen',
                        '',
                        '• **Prozedurales Wissen**: Schrittweise Abläufe, Fertigkeiten',
                        '  → Beispiel: Lösen von Gleichungen, Laborexperimente durchführen',
                        '',
                        '• **Strategisches/Metakognitives Wissen**: Lernstrategien, Selbstreflexion',
                        '  → Beispiel: Wie lerne ich effektiv? Wie plane ich Projekte?'
                    ]
                },
                {
                    title: 'Schritt 2: Kognitiven Prozess bestimmen',
                    content: [
                        'Basierend auf der gewählten Wissensdimension wählen Sie den kognitiven Prozess nach Blooms Taxonomie:',
                        '',
                        '• **Wissen/Erinnern**: Fakten aus dem Gedächtnis abrufen',
                        '  → "Nennen Sie die Hauptstadt von..."',
                        '',
                        '• **Verstehen**: Bedeutung konstruieren, erklären können',
                        '  → "Erklären Sie, warum..."',
                        '',
                        '• **Anwenden**: Erlerntes in neuen Situationen nutzen',
                        '  → "Berechnen Sie mit der gelernten Formel..."',
                        '',
                        '• **Analysieren**: Zerlegung in Teile, Beziehungen erkennen',
                        '  → "Vergleichen Sie die Ansätze..."',
                        '',
                        '• **Synthese**: Neue Strukturen schaffen, kombinieren',
                        '  → "Entwickeln Sie ein Konzept für..."',
                        '',
                        '• **Evaluieren**: Beurteilen, bewerten nach Kriterien',
                        '  → "Bewerten Sie die Wirksamkeit von..."'
                    ]
                },
                {
                    title: 'Schritt 3: Medientyp auswählen',
                    content: [
                        'Je nach Wissensdimension und kognitivem Prozess werden passende Medientypen vorgeschlagen:',
                        '',
                        '⚠️ **Wichtiger Hinweis**: Je nach gewählter Kombination stehen nur bestimmte Medientypen zur Verfügung, da nicht für jede Kombination digitale Medien geeignet sind.',
                        '',
                        '• **Textbasiert**: Bücher, PDFs, Artikel, Online-Texte',
                        '  → Gut für faktisches Wissen und Verstehen',
                        '',
                        '• **Visuell**: Bilder, Grafiken, Diagramme, Infografiken',
                        '  → Ideal für konzeptionelles Verstehen',
                        '',
                        '• **Auditiv**: Podcasts, Hörbücher, Audioaufnahmen',
                        '  → Effektiv für Wissensvermittlung',
                        '',
                        '• **Audiovisuell**: Videos, Animationen, Screencasts',
                        '  → Optimal für prozedurales Wissen',
                        '',
                        '• **Interaktiv/Multimedial**: Simulationen, Spiele, VR',
                        '  → Perfekt für Anwendung und höhere Denkprozesse',
                        '',
                        '• **Datenbasiert**: Tabellen, Statistiken, Analytics',
                        '  → Speziell für Analyse-Aufgaben'
                    ]
                },
                {
                    title: 'Schritt 4: Konkrete Medienempfehlungen',
                    content: [
                        'Am Ende erhalten Sie konkrete, praxisnahe Empfehlungen:',
                        '',
                        'Das Framework berücksichtigt dabei:',
                        '• Pädagogische Eignung für Ihr Lernziel',
                        '• Verfügbarkeit der Tools und Plattformen', 
                        '• Praktische Umsetzbarkeit im Unterricht',
                        '• Interaktivitätsgrad passend zum Lernprozess',
                        '',
                        'Beispiele für Empfehlungen:',
                        '• PDFs, Glossar, E-Book (faktisches Wissen)',
                        '• Checklisten, Schrittfolgen (prozedurales Wissen)',
                        '• Simulationen, Planspiele (konzeptionelles Wissen)',
                        '• Digitale Karteikarten, Quiz-Tools (interaktive Medien)'
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
                    title: 'Step 1: Select Knowledge Dimension',
                    content: [
                        'First, choose the type of knowledge to be taught:',
                        '',
                        '• **Factual Knowledge**: Basic facts, terms, definitions',
                        '  → Example: Country capitals, mathematical formulas',
                        '',
                        '• **Conceptual Knowledge**: Relationships between concepts, theories',
                        '  → Example: How climate change works, literary periods',
                        '',
                        '• **Procedural Knowledge**: Step-by-step processes, skills',
                        '  → Example: Solving equations, conducting lab experiments',
                        '',
                        '• **Strategic/Metacognitive Knowledge**: Learning strategies, self-reflection',
                        '  → Example: How do I learn effectively? How do I plan projects?'
                    ]
                },
                {
                    title: 'Step 2: Determine Cognitive Process',
                    content: [
                        'Based on the chosen knowledge dimension, select the cognitive process according to Blooms Taxonomy:',
                        '',
                        '• **Knowledge/Remember**: Retrieve facts from memory',
                        '  → "Name the capital of..."',
                        '',
                        '• **Understand**: Construct meaning, be able to explain',
                        '  → "Explain why..."',
                        '',
                        '• **Apply**: Use learned material in new situations',
                        '  → "Calculate using the learned formula..."',
                        '',
                        '• **Analyze**: Break down into parts, recognize relationships',
                        '  → "Compare the approaches..."',
                        '',
                        '• **Synthesize**: Create new structures, combine',
                        '  → "Develop a concept for..."',
                        '',
                        '• **Evaluate**: Judge, assess according to criteria',
                        '  → "Evaluate the effectiveness of..."'
                    ]
                },
                {
                    title: 'Step 3: Select Media Type',
                    content: [
                        'Depending on knowledge dimension and cognitive process, suitable media types are suggested:',
                        '',
                        '⚠️ **Important Note**: Depending on the chosen combination, only certain media types are available, as digital media are not suitable for every combination.',
                        '',
                        '• **Text-based**: Books, PDFs, articles, online texts',
                        '  → Good for factual knowledge and understanding',
                        '',
                        '• **Visual**: Images, graphics, diagrams, infographics',
                        '  → Ideal for conceptual understanding',
                        '',
                        '• **Auditory**: Podcasts, audiobooks, audio recordings',
                        '  → Effective for knowledge transmission',
                        '',
                        '• **Audiovisual**: Videos, animations, screencasts',
                        '  → Optimal for procedural knowledge',
                        '',
                        '• **Interactive/Multimedia**: Simulations, games, VR',
                        '  → Perfect for application and higher-order thinking',
                        '',
                        '• **Data-driven**: Tables, statistics, analytics',
                        '  → Specifically for analysis tasks'
                    ]
                },
                {
                    title: 'Step 4: Concrete Media Recommendations',
                    content: [
                        'Finally, you receive concrete, practical recommendations:',
                        '',
                        'The framework considers:',
                        '• Pedagogical suitability for your learning objective',
                        '• Availability of tools and platforms',
                        '• Practical feasibility in the classroom',
                        '• Level of interactivity matching the learning process',
                        '',
                        'Examples of recommendations:',
                        '• PDFs, Glossary, E-Book (factual knowledge)',
                        '• Checklists, Step-by-Step Instructions (procedural knowledge)',
                        '• Simulations, Role-Playing Games (conceptual knowledge)',
                        '• Digital Flashcards, Quiz Tools (interactive media)'
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
                        fontSize: '2.2rem',
                        marginBottom: '10px',
                        fontFamily: 'Permanent Marker, cursive'
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
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const contentStyle = {
    background: '#181818',
    borderRadius: '20px',
    boxShadow: '0 6px 36px #000c',
    padding: '50px',
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center'
};

const buttonStyle = {
    margin: '10px',
    padding: '18px 32px',
    backgroundColor: '#fff',
    color: '#000',
    border: '3px solid #000',
    borderRadius: '12px',
    fontFamily: 'Permanent Marker, cursive',
    boxShadow: '4px 4px #111',
    cursor: 'pointer',
    fontSize: '1.15rem',
    transition: 'filter 0.2s, transform 0.2s'
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
                    description: 'Zum Abschluss bewerten Sie das Framework mit dem SUS-Fragebogen, 5 zusätzlichen Likert-Fragen und 3 offenen Fragen zu Ihrer Erfahrung.'
                }
            ],
            
            timeEstimate: 'Geschätzte Dauer: 5-10 Minuten',
            anonymity: 'Ihre Daten werden vollständig anonymisiert verarbeitet.',
            evaluationNote: '⚠️ Wichtiger Hinweis: Bei der abschließenden Bewertung geht es um den Entscheidungsprozess des Frameworks (die Auswahl zwischen den verschiedenen Optionen bis zur Empfehlung), nicht um die technische Bedienbarkeit der Web-App.',
            
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
                    description: 'Finally, you will evaluate the framework using the SUS questionnaire, 5 additional Likert questions, and 3 open questions about your experience.'
                }
            ],
            
            timeEstimate: 'Estimated duration: 5-10 minutes',
            anonymity: 'Your data will be processed completely anonymously.',
            evaluationNote: '⚠️ Important Note: The final evaluation focuses on the framework\'s decision-making process (choosing between different options until receiving a recommendation), not on the technical usability of the web app.',
            
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
                    fontSize: '2.5rem',
                    marginBottom: '10px',
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
                            padding: '20px',
                            margin: '15px 0',
                            borderRadius: '12px',
                            border: '2px solid #333',
                            textAlign: 'left'
                        }}>
                            <h3 style={{
                                color: '#4CAF50',
                                fontSize: '1.3rem',
                                marginBottom: '10px',
                                fontFamily: 'Permanent Marker, cursive'
                            }}>
                                {step.title}
                            </h3>
                            <p style={{
                                color: '#fff',
                                fontSize: '1rem',
                                fontFamily: 'Arial, sans-serif',
                                lineHeight: '1.4',
                                margin: 0
                            }}>
                                {step.description}
                            </p>
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

                {/* Evaluation Note */}
                <div style={{
                    background: '#2A2A2A',
                    border: '2px solid #FF9800',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: '#FFB74D',
                        fontSize: '1rem',
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: '1.4',
                        margin: 0
                    }}>
                        {t.evaluationNote}
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