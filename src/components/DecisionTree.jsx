import React, { useState, useEffect } from 'react';
import { treeData } from '../treeData';
import { timingService } from '../services/timingService.js';
import { getSituationContext } from '../data/teachingSituations.js';
import '../styles/excalidraw.css';  // Excalidraw-Style und Font

const buttonStyle = {
    margin: 'clamp(12px, 2.5vw, 16px) 0',
    padding: 'clamp(15px, 3vw, 18px) clamp(24px, 5vw, 32px)',
    minWidth: 'clamp(280px, 50vw, 320px)',
    maxWidth: '100%',
    backgroundColor: '#fff',
    color: '#000',
    border: 'clamp(2px, 0.5vw, 3px) solid #000',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    fontFamily: 'Permanent Marker, cursive',
    boxShadow: 'clamp(2px, 0.8vw, 4px) clamp(2px, 0.8vw, 4px) #111',
    cursor: 'pointer',
    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
    position: 'relative',
    transition: 'filter 0.2s, transform 0.2s',
    minHeight: '44px',
    boxSizing: 'border-box'
};

const switchStyle = {
    position: 'fixed',
    top: 'clamp(12px, 3vw, 16px)',
    right: 'clamp(16px, 5vw, 32px)',
    fontFamily: 'Permanent Marker, cursive',
    fontSize: 'clamp(16px, 3.5vw, 18px)',
    cursor: 'pointer',
    zIndex: 1000,
    color: '#fff'
};


function SpeechBubble({ children }) {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    if (isMobile) return null; // Hide speech bubbles on mobile to prevent overflow
    
    return (
        <div style={{
            position: 'absolute',
            left: 'calc(100% + clamp(15px, 4vw, 24px))',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            pointerEvents: 'none'
        }}>
            <div style={{
                position: 'relative',
                background: '#fff',
                color: '#1a1a1a',
                border: 'clamp(2px, 0.5vw, 3px) solid #222',
                borderRadius: 'clamp(12px, 3vw, 16px)',
                fontFamily: 'Permanent Marker, cursive',
                fontSize: 'clamp(1rem, 2.2vw, 1.1em)',
                boxShadow: '3px 3px 12px #0002',
                padding: 'clamp(12px, 3vw, 16px) clamp(15px, 3.5vw, 20px)',
                minWidth: 'clamp(200px, 30vw, 230px)',
                maxWidth: '250px',
                textAlign: 'left',
                pointerEvents: 'auto'
            }}>
                {children}
                {/* Sprechblasen-Dreieck nach links ausgerichtet */}
                <div style={{
                    position: 'absolute',
                    right: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 0, height: 0,
                    borderTop: '15px solid transparent',
                    borderBottom: '15px solid transparent',
                    borderRight: '18px solid #fff',
                    filter: 'drop-shadow(-2px 1px 0 #222)'
                }} />
            </div>
        </div>
    );
}


// Hilfs-Komponente: Button mit Info-Bubble
function InfoButton({ label, info, onClick }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            className="excalidraw-box"
            style={{
                ...buttonStyle,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingRight: 'clamp(40px, 8vw, 45px)' // Platz für Icon
            }}
            onClick={onClick}
        >
            <span style={{ flex: 1 }}>{label}</span>
            {info && (
                <span
                    style={{
                        position: 'absolute',
                        right: 16,
                        top: 13,
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                    onClick={e => e.stopPropagation()}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
          <svg width="15" height="15" viewBox="0 0 20 20" style={{ display: 'block' }}>
            <circle cx="10" cy="10" r="10" fill="#2c2c2c" />
            <text x="10" y="15" textAnchor="middle" fontSize="13" fontFamily="Arial" fill="#fff">i</text>
          </svg>
                    {hover && <SpeechBubble>{info}</SpeechBubble>}
        </span>
            )}
        </div>
    );
}


export function DecisionTree({ onComplete, lang: propLang, selectedSituation }) {
    const [step, setStep] = useState('dimension');
    const [selection, setSelection] = useState({});
    const [lang, setLang] = useState(propLang || 'de');
    const data = treeData[lang];

    // Start framework timing when component mounts
    useEffect(() => {
        timingService.startFramework();
    }, []);

    // Nur Optionen, die im Kontext Sinn machen
    const getProcessOptions = () => data.processes[selection.dimension] || [];
    const getMedientypOptions = () =>
        data.medientypen?.[selection.dimension]?.[selection.process] || [];
    const getRecommendations = () =>
        data.recommendations?.[selection.dimension]?.[selection.process]?.[selection.medientyp] || [];

    const handleSelect = key => {
        if (step === 'dimension') {
            setSelection({ dimension: key });
            setStep('process');
        } else if (step === 'process') {
            setSelection(s => ({ ...s, process: key }));
            setStep('medientyp');
        } else if (step === 'medientyp') {
            setSelection(s => ({ ...s, medientyp: key }));
            setStep('result');
        }
    };

    const handleRestart = () => {
        setSelection({});
        setStep('dimension');
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: '#000',
            fontFamily: 'Permanent Marker, cursive',
            padding: 'clamp(10px, 4vw, 20px)',
            boxSizing: 'border-box'
        }}>
            <div style={switchStyle} onClick={() => setLang(l => l === 'de' ? 'en' : 'de')}>
                {lang === 'de' ? 'EN' : 'DE'}
            </div>
            <h1 style={{
                color: '#fff',
                fontFamily: 'Permanent Marker, cursive',
                fontSize: 'clamp(1.8rem, 5.5vw, 2.8rem)',
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                margin: 'clamp(20px, 5vw, 40px) 0 clamp(30px, 7vw, 60px) 0',
                position: 'relative',
                top: '0',
                lineHeight: '1.1'
            }}>
                {lang === 'de' ? 'Digitales Medienauswahl-Framework' : 'Digital Media Selection Framework'}
            </h1>
            
            {/* Situation Context Display */}
            {selectedSituation && (
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto clamp(20px, 4vw, 30px) auto',
                    background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
                    border: '3px solid #1565C0',
                    borderRadius: 'clamp(12px, 3vw, 16px)',
                    padding: 'clamp(15px, 3vw, 20px)',
                    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#FFD700',
                        color: '#000',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                        fontWeight: 'bold',
                        border: '2px solid #FFA000',
                        fontFamily: 'Permanent Marker, cursive'
                    }}>
                        💡 {lang === 'de' ? 'DENKEN SIE DARAN' : 'REMEMBER'}
                    </div>
                    
                    <div style={{
                        textAlign: 'center',
                        marginTop: '8px'
                    }}>
                        <p style={{
                            color: '#fff',
                            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                            fontFamily: 'Permanent Marker, cursive',
                            margin: '0 0 8px 0',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}>
                            {getSituationContext(selectedSituation.id, lang)}
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 'clamp(8px, 2vw, 12px)',
                            flexWrap: 'wrap',
                            marginTop: '12px'
                        }}>
                            <span style={{
                                background: '#4CAF50',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: 'bold'
                            }}>
                                {selectedSituation.grade}
                            </span>
                            <span style={{
                                background: '#FF9800',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: 'bold'
                            }}>
                                {selectedSituation.subject}
                            </span>
                            <span style={{
                                background: '#9C27B0',
                                color: '#fff',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: 'bold'
                            }}>
                                {selectedSituation.topic}
                            </span>
                        </div>
                    </div>
                </div>
            )}
            
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                minHeight: 'calc(100vh - clamp(150px, 25vw, 200px))'
            }}>
            <div style={{
                background: '#181818',
                borderRadius: 'clamp(12px, 3vw, 20px)',
                boxShadow: '0 6px 36px #000c',
                padding: 'clamp(40px, 8vw, 60px) clamp(20px, 5vw, 42px) clamp(30px, 6vw, 44px) clamp(20px, 5vw, 42px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 'clamp(300px, 60vw, 400px)',
                maxWidth: '100%',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {step === 'dimension' && (
                    <>
                        <h2 style={{
                            color: '#fff',
                            fontFamily: 'Permanent Marker, cursive',
                            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                            marginBottom: 'clamp(20px, 5vw, 32px)',
                            textAlign: 'center',
                            lineHeight: '1.2'
                        }}>{data.title}</h2>
                        {data.dimensions.map(opt => (
                            <InfoButton
                                key={opt.key}
                                label={opt.label}
                                info={opt.info}
                                onClick={() => handleSelect(opt.key)}
                            />
                        ))}
                    </>
                )}
                {step === 'process' && (
                    <>
                        <h2 style={{
                            color: '#fff',
                            fontFamily: 'Permanent Marker, cursive',
                            fontSize: 'clamp(1.2rem, 3vw, 1.4rem)',
                            marginBottom: 'clamp(18px, 4vw, 24px)',
                            textAlign: 'center',
                            lineHeight: '1.2'
                        }}>
                            {lang === 'de' ? 'Kognitive Anforderung wählen' : 'Select Cognitive Level'}
                        </h2>
                        {getProcessOptions().map(opt => (
                            <InfoButton
                                key={opt.key}
                                label={opt.label}
                                info={opt.info}
                                onClick={() => handleSelect(opt.key)}
                            />
                        ))}
                    </>
                )}
                {step === 'medientyp' && (
                    <>
                        <h2 style={{
                            color: '#fff',
                            fontFamily: 'Permanent Marker, cursive',
                            fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                            marginBottom: 'clamp(18px, 4vw, 24px)',
                            textAlign: 'center',
                            lineHeight: '1.2'
                        }}>
                            {lang === 'de' ? 'Medientyp wählen' : 'Select Media Type'}
                        </h2>
                        {getMedientypOptions().map(opt => (
                            <InfoButton
                                key={opt.key}
                                label={opt.label}
                                info={opt.info}
                                onClick={() => handleSelect(opt.key)}
                            />
                        ))}
                    </>
                )}
                {step === 'result' && (
                    <div>
                        <h2 style={{
                            color: '#4CAF50',
                            fontFamily: 'Permanent Marker, cursive',
                            fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
                            textAlign: 'center',
                            marginBottom: 'clamp(18px, 4vw, 24px)',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            lineHeight: '1.2'
                        }}>
                            ✨ {lang === 'de' ? 'Empfehlungen' : 'Recommendations'} ✨
                        </h2>
                        <div style={{
                            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                            borderRadius: 'clamp(12px, 3vw, 16px)',
                            padding: 'clamp(18px, 4vw, 24px)',
                            marginBottom: '24px',
                            border: '3px solid #2E7D32',
                            boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#FFD700',
                                color: '#000',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '0.9em',
                                fontWeight: 'bold',
                                border: '2px solid #FFA000',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                            }}>
                                {lang === 'de' ? 'IHRE ERGEBNISSE' : 'YOUR RESULTS'}
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
                                {getRecommendations().map((r, i) => (
                                    <li key={i} style={{
                                        margin: '12px 0',
                                        background: '#fff',
                                        color: '#1a1a1a',
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        fontSize: '1.15em',
                                        fontFamily: 'Permanent Marker, cursive',
                                        border: '2px solid #2E7D32',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        position: 'relative',
                                        paddingLeft: '50px',
                                        fontWeight: 'bold'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: '#4CAF50',
                                            color: '#fff',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.8em',
                                            fontWeight: 'bold'
                                        }}>
                                            {i + 1}
                                        </span>
                                        {r}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                            <button style={buttonStyle} onClick={handleRestart}>
                                {lang === 'de' ? 'Neu starten' : 'Restart'}
                            </button>
                            {onComplete && (
                                <button 
                                    style={{
                                        ...buttonStyle,
                                        backgroundColor: '#4CAF50',
                                        color: '#fff',
                                        border: '3px solid #2E7D32'
                                    }} 
                                    onClick={() => {
                                        timingService.startSurvey();
                                        onComplete(selection);
                                    }}
                                >
                                    {lang === 'de' ? 'Framework abschließen' : 'Complete Framework'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
}
