import React, { useState } from 'react';
import frameworkImage from '../assets/Framework_4Ebenen.png';

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
            
            langLabel: 'Sprache auswählen:',
            previewButton: 'Framework-Übersicht ansehen',
            closePreview: 'Schließen',
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
            
            langLabel: 'Select language:',
            previewButton: 'View Framework Overview',
            closePreview: 'Close',
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
                            marginBottom: '20px'
                        }}
                        onClick={() => setShowFramework(true)}
                        className="excalidraw-box"
                    >
                        {t.previewButton}
                    </button>
                )}

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
                                    zIndex: 1001
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