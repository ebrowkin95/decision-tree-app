import React, { useState } from 'react';
import { DecisionTree } from './components/DecisionTree';
import { PreStudyForm } from './components/PreStudyForm';
import { SUSQuestionnaire, ThankYouScreen } from './components/SUSQuestionnaire';
import { IntroScreen } from './components/IntroScreen';
// Data submission is now handled in SUSQuestionnaire component

export default function App() {
    const [currentStep, setCurrentStep] = useState('intro'); // intro -> preStudy -> framework -> sus -> complete
    const [participantData, setParticipantData] = useState(null);
    const [completeData, setCompleteData] = useState(null);
    const [lang, setLang] = useState('de');

    const handleIntroComplete = () => {
        setCurrentStep('preStudy');
    };

    const handleLanguageChange = (newLang) => {
        setLang(newLang);
    };

    const handlePreStudyComplete = (formData) => {
        setParticipantData(formData);
        setCurrentStep('framework');
    };

    const handleFrameworkComplete = () => {
        setCurrentStep('sus');
    };

    const handleSUSComplete = async (data, submissionResult) => {
        setCompleteData(data);
        
        // Data is already submitted in SUSQuestionnaire, just handle the result
        if (submissionResult && !submissionResult.success) {
            console.warn('Server submission failed, data saved locally');
            // Could show error message to user here if needed
        } else {
            console.log('Data submitted successfully via SUSQuestionnaire');
        }
        
        setCurrentStep('complete');
    };

    if (currentStep === 'intro') {
        return (
            <IntroScreen 
                onContinue={handleIntroComplete} 
                lang={lang} 
                onLanguageChange={handleLanguageChange}
            />
        );
    }

    if (currentStep === 'preStudy') {
        return <PreStudyForm onComplete={handlePreStudyComplete} lang={lang} />;
    }

    if (currentStep === 'framework') {
        return <DecisionTree onComplete={handleFrameworkComplete} lang={lang} />;
    }

    if (currentStep === 'sus') {
        return (
            <SUSQuestionnaire 
                onComplete={handleSUSComplete} 
                lang={lang} 
                participantData={participantData}
            />
        );
    }

    if (currentStep === 'complete') {
        return (
            <ThankYouScreen 
                lang={lang} 
                susScore={completeData?.susScore}
            />
        );
    }

    return null;
}