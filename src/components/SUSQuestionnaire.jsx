import React, { useState } from 'react';
import { submitStudyData } from '../services/dataService';
import { timingService } from '../services/timingService.js';

const formStyle = {
    minHeight: '100vh',
    width: '100vw',
    background: '#000',
    fontFamily: 'Permanent Marker, cursive',
    padding: 'clamp(10px, 4vw, 20px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
};

const containerStyle = {
    background: '#181818',
    borderRadius: 'clamp(12px, 3vw, 20px)',
    boxShadow: '0 6px 36px #000c',
    padding: 'clamp(20px, 5vw, 40px)',
    maxWidth: '800px',
    width: '100%',
    marginTop: 'clamp(20px, 5vw, 40px)',
    margin: 'clamp(20px, 5vw, 40px) auto 0'
};

const questionStyle = {
    margin: 'clamp(18px, 4vw, 24px) 0',
    padding: 'clamp(15px, 3.5vw, 20px)',
    background: '#222',
    borderRadius: 'clamp(8px, 2vw, 12px)',
    border: 'clamp(1px, 0.3vw, 2px) solid #333'
};

const questionTextStyle = {
    color: '#fff',
    fontSize: 'clamp(1rem, 2.3vw, 1.1rem)',
    marginBottom: 'clamp(12px, 3vw, 16px)',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.4'
};

const scaleContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'clamp(4px, 1.5vw, 8px)',
    flexWrap: 'wrap'
};

const scaleLabelStyle = {
    color: '#ccc',
    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    minWidth: 'clamp(60px, 12vw, 80px)',
    lineHeight: '1.2'
};

const radioContainerStyle = {
    display: 'flex',
    gap: 'clamp(12px, 3vw, 20px)',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
};

const radioInputStyle = {
    width: 'clamp(18px, 4vw, 22px)',
    height: 'clamp(18px, 4vw, 22px)',
    cursor: 'pointer',
    minWidth: '18px',
    minHeight: '18px'
};

const buttonStyle = {
    margin: 'clamp(20px, 4vw, 30px) 0',
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
    width: '100%',
    minHeight: '44px'
};

const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.9rem',
    marginTop: '10px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center'
};

export function SUSQuestionnaire({ onComplete, lang = 'de', participantData }) {
    const [susResponses, setSusResponses] = useState({});
    const [likertResponses, setLikertResponses] = useState({});
    const [openResponses, setOpenResponses] = useState({
        helpful: '',
        unclear: '',
        missing: ''
    });
    const [currentSection, setCurrentSection] = useState('sus'); // sus, likert, open
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const texts = {
        de: {
            susTitle: 'System Usability Scale (SUS)',
            susSubtitle: 'Bitte bewerten Sie Ihre Erfahrung mit dem Framework',
            susInstruction: 'Bewerten Sie jede Aussage auf einer Skala von 1 (stimme überhaupt nicht zu) bis 5 (stimme völlig zu):',
            
            likertTitle: 'Zusätzliche Bewertung',
            likertSubtitle: 'Bitte bewerten Sie diese Aussagen zum Framework',
            likertInstruction: 'Bewerten Sie jede Aussage auf einer Skala von 1 (stimme überhaupt nicht zu) bis 5 (stimme völlig zu):',
            
            openTitle: 'Abschließende Fragen',
            openSubtitle: 'Bitte teilen Sie uns Ihre Meinung mit',
            openInstruction: 'Beantworten Sie die folgenden Fragen in eigenen Worten:',
            
            questions: [
                'Ich denke, dass ich dieses Framework gerne häufig nutzen würde.',
                'Ich fand das Framework unnötig komplex.',
                'Ich dachte, das Framework war einfach zu nutzen.',
                'Ich denke, dass ich die Unterstützung einer technischen Person benötigen würde, um dieses Framework nutzen zu können.',
                'Ich fand, dass die verschiedenen Funktionen in diesem Framework gut integriert waren.',
                'Ich dachte, es gab zu viele Inkonsistenzen in diesem Framework.',
                'Ich würde mir vorstellen, dass die meisten Menschen lernen würden, dieses Framework sehr schnell zu nutzen.',
                'Ich fand das Framework sehr umständlich zu nutzen.',
                'Ich fühlte mich sehr selbstsicher bei der Nutzung des Frameworks.',
                'Ich musste viele Dinge lernen, bevor ich mit diesem Framework arbeiten konnte.'
            ],
            
            likertQuestions: [
                'Das Framework berücksichtigt wichtige didaktische Kriterien für die Medienwahl.',
                'Die Empfehlungen passen zu meinem Unterrichtskontext.',
                'Das Framework hilft mir, schneller zu einer geeigneten Medienwahl zu kommen.',
                'Das Framework hat meine Entscheidungssicherheit bei der Medienwahl erhöht.',
                'Ich konnte meine Aufgabe mit dem Framework erfolgreich lösen.'
            ],
            
            openQuestions: {
                helpful: 'Was war am hilfreichsten?',
                unclear: 'Was war unklar/umständlich?',
                missing: 'Welche Funktion fehlt dir?'
            },
            
            scaleLabels: {
                1: 'Stimme überhaupt nicht zu',
                5: 'Stimme völlig zu'
            },
            
            nextButton: 'Weiter',
            submitButton: 'Bewertung abschließen',
            completeError: 'Bitte beantworten Sie alle Fragen.',
            thankYou: 'Vielen Dank für Ihre Teilnahme!',
            thankYouSubtitle: 'Ihre Bewertung wurde erfolgreich übermittelt.'
        },
        
        en: {
            susTitle: 'System Usability Scale (SUS)',
            susSubtitle: 'Please rate your experience with the framework',
            susInstruction: 'Rate each statement on a scale from 1 (strongly disagree) to 5 (strongly agree):',
            
            likertTitle: 'Additional Evaluation',
            likertSubtitle: 'Please rate these statements about the framework',
            likertInstruction: 'Rate each statement on a scale from 1 (strongly disagree) to 5 (strongly agree):',
            
            openTitle: 'Final Questions',
            openSubtitle: 'Please share your opinion with us',
            openInstruction: 'Answer the following questions in your own words:',
            
            questions: [
                'I think that I would like to use this framework frequently.',
                'I found the framework unnecessarily complex.',
                'I thought the framework was easy to use.',
                'I think that I would need the support of a technical person to be able to use this framework.',
                'I found the various functions in this framework were well integrated.',
                'I thought there was too much inconsistency in this framework.',
                'I would imagine that most people would learn to use this framework very quickly.',
                'I found the framework very cumbersome to use.',
                'I felt very confident using the framework.',
                'I needed to learn a lot of things before I could get going with this framework.'
            ],
            
            likertQuestions: [
                'The framework considers important didactic criteria for media selection.',
                'The recommendations fit my teaching context.',
                'The framework helps me make media choices faster.',
                'The framework has increased my decision confidence in media selection.',
                'I was able to successfully complete my task with the framework.'
            ],
            
            openQuestions: {
                helpful: 'What was most helpful?',
                unclear: 'What was unclear/cumbersome?',
                missing: 'What function is missing for you?'
            },
            
            scaleLabels: {
                1: 'Strongly disagree',
                5: 'Strongly agree'
            },
            
            nextButton: 'Next',
            submitButton: 'Complete Assessment',
            completeError: 'Please answer all questions.',
            thankYou: 'Thank you for your participation!',
            thankYouSubtitle: 'Your assessment has been successfully submitted.'
        }
    };

    const t = texts[lang];

    const handleSusResponseChange = (questionIndex, value) => {
        setSusResponses(prev => ({
            ...prev,
            [questionIndex]: parseInt(value)
        }));
        setError('');
    };

    const handleLikertResponseChange = (questionIndex, value) => {
        setLikertResponses(prev => ({
            ...prev,
            [questionIndex]: parseInt(value)
        }));
        setError('');
    };

    const handleOpenResponseChange = (field, value) => {
        setOpenResponses(prev => ({
            ...prev,
            [field]: value
        }));
        setError('');
    };

    const calculateSUSScore = () => {
        let score = 0;
        
        for (let i = 0; i < 10; i++) {
            const response = susResponses[i];
            if (i % 2 === 0) {
                // Odd-numbered questions (0, 2, 4, 6, 8) - positive statements
                score += (response - 1);
            } else {
                // Even-numbered questions (1, 3, 5, 7, 9) - negative statements
                score += (5 - response);
            }
        }
        
        return score * 2.5; // Convert to 0-100 scale
    };

    const handleSusNext = () => {
        const allAnswered = Object.keys(susResponses).length === 10;
        if (!allAnswered) {
            setError(t.completeError);
            return;
        }
        setCurrentSection('likert');
        setError('');
    };

    const handleLikertNext = () => {
        const allAnswered = Object.keys(likertResponses).length === 5;
        if (!allAnswered) {
            setError(t.completeError);
            return;
        }
        setCurrentSection('open');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prevent double submission
        if (submitting || submitted) {
            console.log('Submission already in progress or completed');
            return;
        }
        
        try {
            setSubmitting(true);
            
            // Get completion timing data
            const timingData = timingService.getCompletionTimes();
            const qualityCheck = timingService.getQualityIndicators(timingData);
            
            console.log('Completion timing:', timingData);
            console.log('Quality assessment:', qualityCheck);
            
            const completeData = {
                participantData,
                susResponses,
                susScore: calculateSUSScore(),
                likertResponses,
                openResponses,
                timingData: timingData,
                qualityIndicators: qualityCheck,
                completedAt: new Date().toISOString()
            };

            const result = await submitStudyData(completeData);
            console.log('Data submitted successfully:', result);
            
            // Mark as submitted to prevent duplicates
            setSubmitted(true);
            
            // Clear timing data after successful submission
            timingService.clearTiming();
            
            onComplete(completeData, result);
            
        } catch (error) {
            console.error('Submission failed:', error);
            // Show error to user but don't block completion
            alert(`Submission failed: ${error.message}. Your data has been saved locally.`);
            
            const completeData = {
                participantData,
                susResponses,
                susScore: calculateSUSScore(),
                likertResponses,
                openResponses,
                timingData: timingService.getCompletionTimes(),
                qualityIndicators: timingService.getQualityIndicators(timingService.getCompletionTimes()),
                completedAt: new Date().toISOString()
            };
            
            onComplete(completeData, { success: false, error: error.message });
        } finally {
            setSubmitting(false);
        }
    };

    const renderSusSection = () => (
        <form onSubmit={(e) => { e.preventDefault(); handleSusNext(); }}>
            <h1 style={{
                color: '#fff',
                fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
                textAlign: 'center',
                marginBottom: 'clamp(8px, 2vw, 10px)',
                fontFamily: 'Permanent Marker, cursive',
                lineHeight: '1.2'
            }}>
                {t.susTitle}
            </h1>
            <p style={{
                color: '#ccc',
                fontSize: '1.1rem',
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'Arial, sans-serif'
            }}>
                {t.susSubtitle}
            </p>
            <p style={{
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '30px',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center'
            }}>
                {t.susInstruction}
            </p>

            {t.questions.map((question, index) => (
                <div key={index} style={questionStyle}>
                    <div style={questionTextStyle}>
                        <strong>{index + 1}.</strong> {question}
                    </div>
                    
                    <div style={scaleContainerStyle}>
                        <div style={scaleLabelStyle}>
                            {t.scaleLabels[1]}
                        </div>
                        
                        <div style={radioContainerStyle}>
                            {[1, 2, 3, 4, 5].map(value => (
                                <label key={value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name={`sus_${index}`}
                                        value={value}
                                        checked={susResponses[index] === value}
                                        onChange={(e) => handleSusResponseChange(index, e.target.value)}
                                        style={radioInputStyle}
                                    />
                                    <span style={{ color: '#fff', fontSize: '0.9rem', marginTop: '4px', fontFamily: 'Arial, sans-serif' }}>
                                        {value}
                                    </span>
                                </label>
                            ))}
                        </div>
                        
                        <div style={scaleLabelStyle}>
                            {t.scaleLabels[5]}
                        </div>
                    </div>
                </div>
            ))}

            {error && <div style={errorStyle}>{error}</div>}

            <div style={{ textAlign: 'center' }}>
                <button
                    type="submit"
                    style={{
                        ...buttonStyle,
                        fontSize: '1.3rem',
                        backgroundColor: '#2196F3',
                        color: '#fff',
                        border: '3px solid #1976D2'
                    }}
                    className="excalidraw-box"
                >
                    {t.nextButton}
                </button>
            </div>
        </form>
    );

    const renderLikertSection = () => (
        <form onSubmit={(e) => { e.preventDefault(); handleLikertNext(); }}>
            <h1 style={{
                color: '#fff',
                fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
                textAlign: 'center',
                marginBottom: 'clamp(8px, 2vw, 10px)',
                fontFamily: 'Permanent Marker, cursive',
                lineHeight: '1.2'
            }}>
                {t.likertTitle}
            </h1>
            <p style={{
                color: '#ccc',
                fontSize: '1.1rem',
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'Arial, sans-serif'
            }}>
                {t.likertSubtitle}
            </p>
            <p style={{
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '30px',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center'
            }}>
                {t.likertInstruction}
            </p>

            {t.likertQuestions.map((question, index) => (
                <div key={index} style={questionStyle}>
                    <div style={questionTextStyle}>
                        <strong>{index + 1}.</strong> {question}
                    </div>
                    
                    <div style={scaleContainerStyle}>
                        <div style={scaleLabelStyle}>
                            {t.scaleLabels[1]}
                        </div>
                        
                        <div style={radioContainerStyle}>
                            {[1, 2, 3, 4, 5].map(value => (
                                <label key={value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name={`likert_${index}`}
                                        value={value}
                                        checked={likertResponses[index] === value}
                                        onChange={(e) => handleLikertResponseChange(index, e.target.value)}
                                        style={radioInputStyle}
                                    />
                                    <span style={{ color: '#fff', fontSize: '0.9rem', marginTop: '4px', fontFamily: 'Arial, sans-serif' }}>
                                        {value}
                                    </span>
                                </label>
                            ))}
                        </div>
                        
                        <div style={scaleLabelStyle}>
                            {t.scaleLabels[5]}
                        </div>
                    </div>
                </div>
            ))}

            {error && <div style={errorStyle}>{error}</div>}

            <div style={{ textAlign: 'center' }}>
                <button
                    type="submit"
                    style={{
                        ...buttonStyle,
                        fontSize: '1.3rem',
                        backgroundColor: '#FF9800',
                        color: '#fff',
                        border: '3px solid #F57C00'
                    }}
                    className="excalidraw-box"
                >
                    {t.nextButton}
                </button>
            </div>
        </form>
    );

    const renderOpenSection = () => (
        <form onSubmit={handleSubmit}>
            <h1 style={{
                color: '#fff',
                fontSize: 'clamp(1.6rem, 4.5vw, 2.2rem)',
                textAlign: 'center',
                marginBottom: 'clamp(8px, 2vw, 10px)',
                fontFamily: 'Permanent Marker, cursive',
                lineHeight: '1.2'
            }}>
                {t.openTitle}
            </h1>
            <p style={{
                color: '#ccc',
                fontSize: '1.1rem',
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'Arial, sans-serif'
            }}>
                {t.openSubtitle}
            </p>
            <p style={{
                color: '#fff',
                fontSize: '1rem',
                marginBottom: '30px',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center'
            }}>
                {t.openInstruction}
            </p>

            {Object.entries(t.openQuestions).map(([key, question], index) => (
                <div key={key} style={{...questionStyle, marginBottom: '30px'}}>
                    <div style={{...questionTextStyle, marginBottom: '15px'}}>
                        <strong>{index + 1}.</strong> {question}
                    </div>
                    <textarea
                        value={openResponses[key]}
                        onChange={(e) => handleOpenResponseChange(key, e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            minHeight: 'clamp(80px, 15vw, 100px)',
                            padding: 'clamp(10px, 2.5vw, 12px)',
                            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                            border: 'clamp(1px, 0.3vw, 2px) solid #333',
                            borderRadius: 'clamp(6px, 1.5vw, 8px)',
                            backgroundColor: '#222',
                            color: '#fff',
                            fontFamily: 'Arial, sans-serif',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                        }}
                        placeholder={lang === 'de' ? 'Ihre Antwort...' : 'Your answer...'}
                    />
                </div>
            ))}

            <div style={{ textAlign: 'center' }}>
                <button
                    type="submit"
                    style={{
                        ...buttonStyle,
                        fontSize: '1.3rem',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: '3px solid #2E7D32'
                    }}
                    className="excalidraw-box"
                    disabled={submitting || submitted}
                >
                    {submitting ? (lang === 'de' ? 'Wird übermittelt...' : 'Submitting...') : 
                     submitted ? (lang === 'de' ? 'Übermittelt ✓' : 'Submitted ✓') : 
                     t.submitButton}
                </button>
            </div>
        </form>
    );

    return (
        <div style={formStyle}>
            <div style={containerStyle}>
                {currentSection === 'sus' && renderSusSection()}
                {currentSection === 'likert' && renderLikertSection()}
                {currentSection === 'open' && renderOpenSection()}
            </div>
        </div>
    );
}

export function ThankYouScreen({ lang = 'de', susScore }) {
    const [showScore, setShowScore] = useState(false);
    
    const texts = {
        de: {
            thankYou: 'Vielen Dank für Ihre Teilnahme!',
            thankYouSubtitle: 'Ihre Bewertung wurde erfolgreich übermittelt.',
            showScoreButton: 'Persönlichen SUS-Wert anzeigen',
            hideScoreButton: 'SUS-Wert ausblenden',
            susScoreText: 'Ihr SUS-Score: {score}/100',
            scoreExplanation: 'Der SUS-Score misst die wahrgenommene Benutzerfreundlichkeit auf einer Skala von 0-100. Werte über 68 gelten als überdurchschnittlich.',
            interpretation: {
                title: 'Interpretation:',
                excellent: 'Ausgezeichnet (80-100)',
                good: 'Gut (68-79)',
                ok: 'OK (68)',
                poor: 'Schlecht (51-67)',
                awful: 'Sehr schlecht (0-50)'
            }
        },
        en: {
            thankYou: 'Thank you for your participation!',
            thankYouSubtitle: 'Your assessment has been successfully submitted.',
            showScoreButton: 'Show personal SUS score',
            hideScoreButton: 'Hide SUS score',
            susScoreText: 'Your SUS Score: {score}/100',
            scoreExplanation: 'The SUS score measures perceived usability on a scale of 0-100. Values above 68 are considered above average.',
            interpretation: {
                title: 'Interpretation:',
                excellent: 'Excellent (80-100)',
                good: 'Good (68-79)',
                ok: 'OK (68)',
                poor: 'Poor (51-67)',
                awful: 'Awful (0-50)'
            }
        }
    };

    const t = texts[lang];

    const getInterpretation = (score) => {
        if (score >= 80) return t.interpretation.excellent;
        if (score >= 68) return t.interpretation.good;
        if (score === 68) return t.interpretation.ok;
        if (score >= 51) return t.interpretation.poor;
        return t.interpretation.awful;
    };

    return (
        <div style={formStyle}>
            <div style={containerStyle}>
                <h1 style={{
                    color: '#fff',
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    textAlign: 'center',
                    marginBottom: 'clamp(15px, 3vw, 20px)',
                    fontFamily: 'Permanent Marker, cursive',
                    lineHeight: '1.2'
                }}>
                    {t.thankYou}
                </h1>
                <p style={{
                    color: '#ccc',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    marginBottom: '40px',
                    fontFamily: 'Arial, sans-serif'
                }}>
                    {t.thankYouSubtitle}
                </p>

                {susScore && (
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <button
                            style={{
                                padding: '12px 24px',
                                backgroundColor: showScore ? '#FF9800' : '#2196F3',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onClick={() => setShowScore(!showScore)}
                        >
                            {showScore ? t.hideScoreButton : t.showScoreButton}
                        </button>
                    </div>
                )}

                {susScore && showScore && (
                    <div style={{
                        background: '#222',
                        padding: '30px',
                        borderRadius: '12px',
                        textAlign: 'center',
                        border: '2px solid #333',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{
                            color: '#4CAF50',
                            fontSize: '2rem',
                            marginBottom: '10px',
                            fontFamily: 'Permanent Marker, cursive'
                        }}>
                            {t.susScoreText.replace('{score}', Math.round(susScore))}
                        </h2>
                        <p style={{
                            color: '#ccc',
                            fontSize: '0.9rem',
                            marginBottom: '15px',
                            fontFamily: 'Arial, sans-serif',
                            lineHeight: '1.4'
                        }}>
                            {t.scoreExplanation}
                        </p>
                        <p style={{
                            color: '#fff',
                            fontSize: '1.1rem',
                            fontFamily: 'Arial, sans-serif'
                        }}>
                            <strong>{t.interpretation.title}</strong> {getInterpretation(susScore)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}