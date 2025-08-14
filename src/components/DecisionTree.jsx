import React, { useState } from 'react';
import { treeData } from '../treeData';
import '../styles/excalidraw.css';  // Excalidraw-Style und Font

const buttonStyle = {
    margin: '16px 0',
    padding: '18px 32px',
    minWidth: 320,
    backgroundColor: '#fff',
    color: '#000',
    border: '3px solid #000',
    borderRadius: '12px',
    fontFamily: 'Permanent Marker, cursive',
    boxShadow: '4px 4px #111',
    cursor: 'pointer',
    fontSize: '1.15rem',
    position: 'relative',
    transition: 'filter 0.2s, transform 0.2s',
};

const switchStyle = {
    position: 'fixed',
    top: '16px',
    right: '32px',
    fontFamily: 'Permanent Marker, cursive',
    fontSize: '18px',
    cursor: 'pointer',
    zIndex: 1000,
    color: '#fff'
};


function SpeechBubble({ children }) {
    return (
        <div style={{
            position: 'absolute',
            left: 'calc(100% + 24px)',   // <- Jetzt erscheint die Blase rechts außerhalb vom Button
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            pointerEvents: 'none'
        }}>
            <div style={{
                position: 'relative',
                background: '#fff',
                color: '#1a1a1a',
                border: '3px solid #222',
                borderRadius: '16px',
                fontFamily: 'Permanent Marker, cursive',
                fontSize: '1.1em',
                boxShadow: '3px 3px 12px #0002',
                padding: '16px 20px',
                minWidth: 230,
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
                paddingRight: 45 // Platz für Icon
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


export function DecisionTree() {
    const [step, setStep] = useState('dimension');
    const [selection, setSelection] = useState({});
    const [lang, setLang] = useState('de');
    const data = treeData[lang];

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Permanent Marker, cursive'
        }}>
            <div style={switchStyle} onClick={() => setLang(l => l === 'de' ? 'en' : 'de')}>
                {lang === 'de' ? 'EN' : 'DE'}
            </div>
            <div style={{
                background: '#181818',
                borderRadius: '20px',
                boxShadow: '0 6px 36px #000c',
                padding: '60px 42px 44px 42px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 400
            }}>
                {step === 'dimension' && (
                    <>
                        <h2 style={{
                            color: '#fff',
                            fontFamily: 'Permanent Marker, cursive',
                            fontSize: '2.2rem',
                            marginBottom: '32px'
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
                            fontSize: '1.4rem',
                            marginBottom: '24px'
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
                            fontSize: '1.3rem',
                            marginBottom: '24px'
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
                            color: '#fff',
                            fontFamily: 'Permanent Marker, cursive',
                            fontSize: '1.3rem'
                        }}>
                            {lang === 'de' ? 'Empfehlungen' : 'Recommendations'}
                        </h2>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {getRecommendations().map((r, i) => (
                                <li key={i} style={{
                                    margin: '8px 0',
                                    background: '#fff',
                                    color: '#222',
                                    borderRadius: '7px',
                                    padding: '10px 18px',
                                    fontSize: '1.1em',
                                    fontFamily: 'Permanent Marker, cursive',
                                    border: '1.5px solid #222'
                                }}>{r}</li>
                            ))}
                        </ul>
                        <button style={buttonStyle} onClick={handleRestart}>
                            {lang === 'de' ? 'Neu starten' : 'Restart'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
