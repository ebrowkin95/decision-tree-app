import React, { useState } from 'react';
import { DecisionTree } from './components/DecisionTree';
import { PreStudyForm } from './components/PreStudyForm';
import { SUSQuestionnaire, ThankYouScreen } from './components/SUSQuestionnaire';
import { IntroScreen } from './components/IntroScreen';
import { submitStudyData, saveDataLocally } from './services/dataService';

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

    const handleSUSComplete = async (data) => {
        setCompleteData(data);
        
        try {
            // Try to submit to server first
            const result = await submitStudyData(data);
            console.log('Data submitted successfully:', result);
        } catch (error) {
            console.warn('Server submission failed, saving locally:', error);
            // Fallback to local storage
            try {
                const localResult = saveDataLocally(data);
                console.log('Data saved locally:', localResult);
            } catch (localError) {
                console.error('Failed to save data locally:', localError);
                // Could show error message to user here
            }
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