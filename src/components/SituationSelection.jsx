import React, { useState } from 'react';
import { teachingSituations } from '../data/teachingSituations.js';

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
    maxWidth: '900px',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box'
};

const situationCardStyle = {
    background: '#222',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    border: '2px solid #333',
    padding: 'clamp(20px, 4vw, 25px)',
    margin: 'clamp(15px, 3vw, 20px) 0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left'
};

const selectedCardStyle = {
    ...situationCardStyle,
    border: '3px solid #4CAF50',
    background: '#1a2e1a',
    transform: 'scale(1.02)'
};

const buttonStyle = {
    margin: 'clamp(6px, 2vw, 10px)',
    padding: 'clamp(15px, 3vw, 18px) clamp(24px, 5vw, 32px)',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'clamp(2px, 0.5vw, 3px) solid #2E7D32',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    fontFamily: 'Permanent Marker, cursive',
    boxShadow: 'clamp(2px, 0.8vw, 4px) clamp(2px, 0.8vw, 4px) #111',
    cursor: 'pointer',
    fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
    transition: 'filter 0.2s, transform 0.2s',
    minHeight: '44px',
    width: '100%',
    marginTop: 'clamp(25px, 5vw, 30px)'
};

const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#666',
    border: 'clamp(2px, 0.5vw, 3px) solid #444',
    cursor: 'not-allowed',
    opacity: 0.6
};

export function SituationSelection({ onSituationSelected, lang = 'de' }) {
    const [selectedSituation, setSelectedSituation] = useState(null);
    
    const t = teachingSituations[lang];
    
    const handleSituationClick = (situation) => {
        setSelectedSituation(situation);
    };
    
    const handleContinue = () => {
        if (selectedSituation) {
            onSituationSelected(selectedSituation);
        }
    };
    
    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
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
                
                {/* Subtitle */}
                <p style={{
                    color: '#ccc',
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    textAlign: 'center',
                    marginBottom: 'clamp(15px, 3vw, 20px)',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: '1.4'
                }}>
                    {t.subtitle}
                </p>
                
                {/* Instruction */}
                <div style={{
                    background: '#2A2A2A',
                    border: '2px solid #4CAF50',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    padding: 'clamp(15px, 3vw, 20px)',
                    marginBottom: 'clamp(25px, 5vw, 30px)',
                    textAlign: 'center'
                }}>
                    <p style={{
                        color: '#4CAF50',
                        fontSize: 'clamp(0.95rem, 2.2vw, 1rem)',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        margin: 0
                    }}>
                        💡 {t.instruction}
                    </p>
                </div>
                
                {/* Situations */}
                <div style={{ margin: 'clamp(25px, 5vw, 30px) 0' }}>
                    {t.situations.map((situation, index) => (
                        <div
                            key={situation.id}
                            style={selectedSituation?.id === situation.id ? selectedCardStyle : situationCardStyle}
                            onClick={() => handleSituationClick(situation)}
                            onMouseEnter={(e) => {
                                if (selectedSituation?.id !== situation.id) {
                                    e.target.style.borderColor = '#4CAF50';
                                    e.target.style.transform = 'scale(1.01)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedSituation?.id !== situation.id) {
                                    e.target.style.borderColor = '#333';
                                    e.target.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            {/* Situation Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 'clamp(12px, 2.5vw, 15px)'
                            }}>
                                <div style={{
                                    width: 'clamp(20px, 4vw, 24px)',
                                    height: 'clamp(20px, 4vw, 24px)',
                                    borderRadius: '50%',
                                    border: `2px solid ${selectedSituation?.id === situation.id ? '#4CAF50' : '#666'}`,
                                    backgroundColor: selectedSituation?.id === situation.id ? '#4CAF50' : 'transparent',
                                    marginRight: 'clamp(12px, 2.5vw, 15px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.3s ease'
                                }}>
                                    {selectedSituation?.id === situation.id && (
                                        <span style={{ 
                                            color: '#fff', 
                                            fontSize: 'clamp(12px, 2.5vw, 14px)', 
                                            fontWeight: 'bold' 
                                        }}>
                                            ✓
                                        </span>
                                    )}
                                </div>
                                
                                <h3 style={{
                                    color: selectedSituation?.id === situation.id ? '#4CAF50' : '#fff',
                                    fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                                    margin: 0,
                                    fontFamily: 'Permanent Marker, cursive',
                                    lineHeight: '1.2'
                                }}>
                                    {situation.title}
                                </h3>
                            </div>
                            
                            {/* Situation Details */}
                            <div style={{
                                marginLeft: 'clamp(35px, 7vw, 40px)'
                            }}>
                                {/* Grade and Subject Tags */}
                                <div style={{
                                    display: 'flex',
                                    gap: 'clamp(8px, 2vw, 10px)',
                                    marginBottom: 'clamp(10px, 2vw, 12px)',
                                    flexWrap: 'wrap'
                                }}>
                                    <span style={{
                                        background: '#4CAF50',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
                                        fontFamily: 'Arial, sans-serif',
                                        fontWeight: 'bold'
                                    }}>
                                        {situation.grade}
                                    </span>
                                    <span style={{
                                        background: '#2196F3',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
                                        fontFamily: 'Arial, sans-serif',
                                        fontWeight: 'bold'
                                    }}>
                                        {situation.subject}
                                    </span>
                                    <span style={{
                                        background: '#FF9800',
                                        color: '#fff',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
                                        fontFamily: 'Arial, sans-serif',
                                        fontWeight: 'bold'
                                    }}>
                                        {situation.topic}
                                    </span>
                                </div>
                                
                                {/* Description */}
                                <div>
                                    {situation.description.map((line, idx) => (
                                        <p key={idx} style={{
                                            color: '#ccc',
                                            fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
                                            margin: 'clamp(6px, 1.5vw, 8px) 0',
                                            fontFamily: 'Arial, sans-serif',
                                            lineHeight: '1.4'
                                        }}>
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Continue Button */}
                <button
                    style={selectedSituation ? buttonStyle : disabledButtonStyle}
                    onClick={handleContinue}
                    disabled={!selectedSituation}
                    className="excalidraw-box"
                >
                    {lang === 'de' ? 'Weiter zum Framework' : 'Continue to Framework'} 
                    {selectedSituation && ` → ${selectedSituation.grade} ${selectedSituation.subject}`}
                </button>
                
                {!selectedSituation && (
                    <p style={{
                        color: '#999',
                        fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                        fontFamily: 'Arial, sans-serif',
                        fontStyle: 'italic',
                        marginTop: 'clamp(10px, 2vw, 15px)'
                    }}>
                        {lang === 'de' ? 'Bitte wählen Sie eine Situation aus' : 'Please select a situation'}
                    </p>
                )}
            </div>
        </div>
    );
}