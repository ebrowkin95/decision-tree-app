import React, { useState, useEffect } from 'react';
import { timingService } from '../services/timingService.js';
import { getTrafficSource, storeTrafficSource, getStoredTrafficSource } from '../utils/urlUtils.js';

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
    maxWidth: '600px',
    width: '100%',
    marginTop: 'clamp(20px, 5vw, 40px)',
    margin: 'clamp(20px, 5vw, 40px) auto 0'
};

const fieldStyle = {
    margin: 'clamp(15px, 3vw, 20px) 0',
    display: 'flex',
    flexDirection: 'column'
};

const labelStyle = {
    color: '#fff',
    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
    marginBottom: 'clamp(6px, 1.5vw, 8px)',
    fontFamily: 'Permanent Marker, cursive'
};

const inputStyle = {
    padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px)',
    fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
    border: 'clamp(2px, 0.5vw, 3px) solid #000',
    borderRadius: 'clamp(6px, 1.5vw, 8px)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    minHeight: '44px', // Touch-friendly minimum height
    boxSizing: 'border-box',
    width: '100%'
};

const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
};

const buttonStyle = {
    margin: 'clamp(15px, 3vw, 20px) 0',
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
    minHeight: '44px', // Touch-friendly
    width: '100%'
};

const checkboxStyle = {
    margin: 'clamp(8px, 2vw, 10px) 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'clamp(10px, 2.5vw, 12px)'
};

const checkboxInputStyle = {
    width: 'clamp(18px, 4vw, 20px)',
    height: 'clamp(18px, 4vw, 20px)',
    marginTop: 'clamp(1px, 0.5vw, 2px)',
    minWidth: 'clamp(18px, 4vw, 20px)',
    minHeight: 'clamp(18px, 4vw, 20px)',
    cursor: 'pointer'
};

const textStyle = {
    color: '#fff',
    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
    lineHeight: '1.4',
    fontFamily: 'Arial, sans-serif'
};

const errorStyle = {
    color: '#ff6b6b',
    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
    marginTop: 'clamp(4px, 1vw, 5px)',
    fontFamily: 'Arial, sans-serif'
};

export function PreStudyForm({ onComplete, lang = 'de' }) {
    const [formData, setFormData] = useState({
        // Eligibility
        ageConfirmation: false,
        country: '',
        role: '',
        
        // Profile
        gender: '',
        schoolType: '',
        teachingExperience: '',
        subjects: '',
        digitalExperience: '',
        planningFrequency: '',
        
        // Traffic source tracking
        trafficSource: '',
        
        // Email (only for results contact)
        email: '',
        
        // Consent
        consentParticipation: false,
        consentDataProcessing: false,
        consentResultsContact: false
    });

    const [errors, setErrors] = useState({});

    const texts = {
        de: {
            title: 'Vorab-Fragebogen',
            subtitle: 'Bevor Sie das Framework nutzen können',
            
            eligibilitySection: 'Teilnahmeberechtigung',
            ageConfirmation: 'Ich bin mindestens 18 Jahre alt',
            ageConfirmationRequired: 'Bestätigung des Mindestalters von 18 Jahren erforderlich',
            
            country: 'Land',
            countryRequired: 'Bitte wählen Sie Ihr Land',
            
            role: 'Rolle',
            roleRequired: 'Bitte wählen Sie Ihre Rolle',
            
            profileSection: 'Profildaten',
            gender: 'Geschlecht',
            genderRequired: 'Bitte wählen Sie Ihr Geschlecht',
            
            schoolType: 'Schulform',
            schoolTypeRequired: 'Bitte wählen Sie Ihre Schulform',
            
            teachingExperience: 'Unterrichtserfahrung',
            teachingExperienceRequired: 'Bitte wählen Sie Ihre Unterrichtserfahrung',
            
            subjects: 'Hauptunterrichtsfächer (durch Komma getrennt)',
            subjectsRequired: 'Bitte geben Sie Ihre Unterrichtsfächer an',
            
            digitalExperience: 'Erfahrung mit digitalen Medien im Unterricht',
            digitalExperienceRequired: 'Bitte bewerten Sie Ihre digitale Erfahrung',
            
            planningFrequency: 'Wie oft planen Sie Unterricht mit digitalen Medien?',
            planningFrequencyRequired: 'Bitte wählen Sie Ihre Planungsfrequenz',
            
            
            
            privacyTitle: 'Datenschutzhinweise zur Studienteilnahme',
            studyInfo: 'Studieninformation',
            studyInfoText: 'Diese Erhebung erfolgt im Rahmen einer Bachelorarbeit an der Georg-August-Universität Göttingen zur Evaluation eines Frameworks für die Auswahl digitaler Unterrichtsmedien.',
            responsible: 'Verantwortlich',
            responsibleText: 'Georg-August-Universität Göttingen\nWilhelmsplatz 1, 37073 Göttingen\nStudienkontakt: eduard.browkin@stud.uni-goettingen.de',
            dataProcessing: 'Datenerhebung und -verarbeitung',
            dataProcessingItems: [
                '**Art der Daten**: Ausschließlich Umfragedaten (Antworten, Zeitstempel)',
                '**Anonymität**: Vollständig anonym, keine IP-Speicherung',
                '**Zweck**: Wissenschaftliche Auswertung für Bachelorarbeit',
                '**Rechtsgrundlage**: Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)',
                '**Speicherdauer**: 6 Monate nach Benotung, dann Löschung',
                '**Speicherort**: Supabase (EU/USA), Netlify (USA) - EU-Standardvertragsklauseln'
            ],
            rightsTitle: 'Ihre Rechte',
            rightsText: 'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch. Da die Daten anonym erhoben werden, ist eine nachträgliche Zuordnung jedoch nicht möglich.',
            voluntaryTitle: 'Freiwilligkeit',
            voluntaryText: 'Die Teilnahme ist freiwillig und kann jederzeit abgebrochen werden.',
            consentParticipation: 'Ich wurde über Zweck und Ablauf der Studie informiert und nehme freiwillig teil.',
            consentDataProcessing: 'Ich habe die Datenschutzhinweise gelesen und willige in die anonyme Datenverarbeitung ein. [PFLICHT]',
            consentResultsContact: 'Ich möchte über die Studienergebnisse informiert werden:',
            email: 'E-Mail (optional):',
            emailNote: '(wird getrennt von Umfragedaten gespeichert)',
            consentRequired: 'Zustimmung zur Teilnahme und Datenschutz erforderlich',
            
            countries: {
                // Europa
                de: 'Deutschland', at: 'Österreich', ch: 'Schweiz', al: 'Albanien', ad: 'Andorra', by: 'Belarus', be: 'Belgien', ba: 'Bosnien und Herzegowina', bg: 'Bulgarien', hr: 'Kroatien', cy: 'Zypern', cz: 'Tschechien', dk: 'Dänemark', ee: 'Estland', fi: 'Finnland', fr: 'Frankreich', ge: 'Georgien', gr: 'Griechenland', hu: 'Ungarn', is: 'Island', ie: 'Irland', it: 'Italien', xk: 'Kosovo', lv: 'Lettland', li: 'Liechtenstein', lt: 'Litauen', lu: 'Luxemburg', mt: 'Malta', md: 'Moldau', mc: 'Monaco', me: 'Montenegro', nl: 'Niederlande', mk: 'Nordmazedonien', no: 'Norwegen', pl: 'Polen', pt: 'Portugal', ro: 'Rumänien', ru: 'Russland', sm: 'San Marino', rs: 'Serbien', sk: 'Slowakei', si: 'Slowenien', es: 'Spanien', se: 'Schweden', tr: 'Türkei', ua: 'Ukraine', gb: 'Vereinigtes Königreich', va: 'Vatikanstadt',
                // Nordamerika
                us: 'Vereinigte Staaten', ca: 'Kanada', mx: 'Mexiko', gt: 'Guatemala', bz: 'Belize', sv: 'El Salvador', hn: 'Honduras', ni: 'Nicaragua', cr: 'Costa Rica', pa: 'Panama',
                // Südamerika
                ar: 'Argentinien', bo: 'Bolivien', br: 'Brasilien', cl: 'Chile', co: 'Kolumbien', ec: 'Ecuador', gy: 'Guyana', py: 'Paraguay', pe: 'Peru', sr: 'Suriname', uy: 'Uruguay', ve: 'Venezuela',
                // Andere
                other: 'Anderes Land'
            },
            
            roles: {
                teacher_active: 'Lehrkraft (aktiv im Schuldienst)',
                teacher_trainee: 'Referendar:in/Lehramtsanwärter:in',
                teacher_leave: 'Lehrkraft in Elternzeit/Sabbatical',
                student: 'Lehramtsstudent:in',
                other: 'Sonstiges'
            },
            
            genders: {
                male: 'Männlich',
                female: 'Weiblich',
                diverse: 'Divers',
                noAnswer: 'Keine Angabe'
            },
            
            schoolTypes: {
                grundschule: 'Grundschule',
                hauptschule: 'Hauptschule',
                realschule: 'Realschule',
                gymnasium: 'Gymnasium',
                gesamtschule: 'Gesamtschule',
                berufsschule: 'Berufsschule',
                universitaet: 'Universität',
                other: 'Andere'
            },
            
            experienceLevels: {
                none: 'Keine Erfahrung',
                little: 'Wenig Erfahrung (0-2 Jahre)',
                some: 'Einige Erfahrung (3-5 Jahre)',
                much: 'Viel Erfahrung (6-10 Jahre)',
                expert: 'Sehr viel Erfahrung (>10 Jahre)'
            },
            
            digitalLevels: {
                beginner: 'Anfänger',
                basic: 'Grundkenntnisse',
                intermediate: 'Fortgeschritten',
                advanced: 'Sehr fortgeschritten',
                expert: 'Experte'
            },
            
            planningFrequencies: {
                weekly: 'Wöchentlich',
                monthly: 'Monatlich',
                rarely: 'Seltener',
                never: 'Nie'
            },
            
            submit: 'Framework starten',
            submitting: 'Wird verarbeitet...'
        },
        
        en: {
            title: 'Pre-Study Questionnaire',
            subtitle: 'Before you can use the framework',
            
            eligibilitySection: 'Eligibility',
            ageConfirmation: 'I am at least 18 years old',
            ageConfirmationRequired: 'Confirmation of minimum age of 18 years required',
            
            country: 'Country',
            countryRequired: 'Please select your country',
            
            role: 'Role',
            roleRequired: 'Please select your role',
            
            profileSection: 'Profile Data',
            gender: 'Gender',
            genderRequired: 'Please select your gender',
            
            schoolType: 'School Type',
            schoolTypeRequired: 'Please select your school type',
            
            teachingExperience: 'Teaching Experience',
            teachingExperienceRequired: 'Please select your teaching experience',
            
            subjects: 'Main Teaching Subjects (comma separated)',
            subjectsRequired: 'Please enter your teaching subjects',
            
            digitalExperience: 'Experience with Digital Media in Teaching',
            digitalExperienceRequired: 'Please rate your digital experience',
            
            planningFrequency: 'How often do you plan lessons with digital media?',
            planningFrequencyRequired: 'Please select your planning frequency',
            
            
            privacyTitle: 'Privacy Notice for Study Participation',
            studyInfo: 'Study Information',
            studyInfoText: 'This survey is conducted as part of a Bachelor\'s thesis at Georg-August-Universität Göttingen to evaluate a framework for selecting digital educational media.',
            responsible: 'Responsible',
            responsibleText: 'Georg-August-Universität Göttingen\nWilhelmsplatz 1, 37073 Göttingen, Germany\nStudy contact: eduard.browkin@stud.uni-goettingen.de',
            dataProcessing: 'Data Collection and Processing',
            dataProcessingItems: [
                '**Type of data**: Survey data only (responses, timestamps)',
                '**Anonymity**: Completely anonymous, no IP storage',
                '**Purpose**: Scientific evaluation for Bachelor\'s thesis',
                '**Legal basis**: Consent (Art. 6(1)(a) GDPR)',
                '**Storage duration**: 6 months after grading, then deletion',
                '**Storage location**: Supabase (EU/USA), Netlify (USA) - EU Standard Contractual Clauses'
            ],
            rightsTitle: 'Your Rights',
            rightsText: 'You have the right to access, rectify, delete, restrict, and object. Since data is collected anonymously, subsequent identification is not possible.',
            voluntaryTitle: 'Voluntary Participation',
            voluntaryText: 'Participation is voluntary and can be discontinued at any time.',
            consentParticipation: 'I have been informed about the purpose and procedure of the study and participate voluntarily.',
            consentDataProcessing: 'I have read the privacy notice and consent to anonymous data processing. [REQUIRED]',
            consentResultsContact: 'I would like to be informed about the study results:',
            email: 'Email (optional):',
            emailNote: '(stored separately from survey data)',
            consentRequired: 'Consent for participation and privacy required',
            
            countries: {
                // Europe
                de: 'Germany', at: 'Austria', ch: 'Switzerland', al: 'Albania', ad: 'Andorra', by: 'Belarus', be: 'Belgium', ba: 'Bosnia and Herzegovina', bg: 'Bulgaria', hr: 'Croatia', cy: 'Cyprus', cz: 'Czech Republic', dk: 'Denmark', ee: 'Estonia', fi: 'Finland', fr: 'France', ge: 'Georgia', gr: 'Greece', hu: 'Hungary', is: 'Iceland', ie: 'Ireland', it: 'Italy', xk: 'Kosovo', lv: 'Latvia', li: 'Liechtenstein', lt: 'Lithuania', lu: 'Luxembourg', mt: 'Malta', md: 'Moldova', mc: 'Monaco', me: 'Montenegro', nl: 'Netherlands', mk: 'North Macedonia', no: 'Norway', pl: 'Poland', pt: 'Portugal', ro: 'Romania', ru: 'Russia', sm: 'San Marino', rs: 'Serbia', sk: 'Slovakia', si: 'Slovenia', es: 'Spain', se: 'Sweden', tr: 'Turkey', ua: 'Ukraine', gb: 'United Kingdom', va: 'Vatican City',
                // North America
                us: 'United States', ca: 'Canada', mx: 'Mexico', gt: 'Guatemala', bz: 'Belize', sv: 'El Salvador', hn: 'Honduras', ni: 'Nicaragua', cr: 'Costa Rica', pa: 'Panama',
                // South America
                ar: 'Argentina', bo: 'Bolivia', br: 'Brazil', cl: 'Chile', co: 'Colombia', ec: 'Ecuador', gy: 'Guyana', py: 'Paraguay', pe: 'Peru', sr: 'Suriname', uy: 'Uruguay', ve: 'Venezuela',
                // Other
                other: 'Other Country'
            },
            
            roles: {
                teacher_active: 'Teacher (actively teaching)',
                teacher_trainee: 'Teacher trainee/Student teacher',
                teacher_leave: 'Teacher on parental leave/sabbatical',
                student: 'Teaching student',
                other: 'Other'
            },
            
            genders: {
                male: 'Male',
                female: 'Female',
                diverse: 'Diverse',
                noAnswer: 'Prefer not to say'
            },
            
            schoolTypes: {
                elementary: 'Elementary School',
                middle: 'Middle School',
                junior_high: 'Junior High School',
                high_school: 'High School',
                preparatory: 'College Preparatory School',
                vocational: 'Vocational School',
                technical: 'Technical School',
                charter: 'Charter School',
                private: 'Private School',
                magnet: 'Magnet School',
                international: 'International School',
                community_college: 'Community College',
                university: 'University',
                other: 'Other'
            },
            
            experienceLevels: {
                none: 'No Experience',
                little: 'Little Experience (0-2 years)',
                some: 'Some Experience (3-5 years)',
                much: 'Much Experience (6-10 years)',
                expert: 'Very Much Experience (>10 years)'
            },
            
            digitalLevels: {
                beginner: 'Beginner',
                basic: 'Basic',
                intermediate: 'Intermediate',
                advanced: 'Advanced',
                expert: 'Expert'
            },
            
            planningFrequencies: {
                weekly: 'Weekly',
                monthly: 'Monthly',
                rarely: 'Rarely',
                never: 'Never'
            },
            
            submit: 'Start Framework',
            submitting: 'Processing...'
        }
    };

    const t = texts[lang];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.ageConfirmation) {
            newErrors.ageConfirmation = t.ageConfirmationRequired;
        }

        if (!formData.country) newErrors.country = t.countryRequired;
        if (!formData.role) newErrors.role = t.roleRequired;
        if (!formData.gender) newErrors.gender = t.genderRequired;
        if (!formData.schoolType) newErrors.schoolType = t.schoolTypeRequired;
        if (!formData.teachingExperience) newErrors.teachingExperience = t.teachingExperienceRequired;
        if (!formData.subjects.trim()) newErrors.subjects = t.subjectsRequired;
        if (!formData.digitalExperience) newErrors.digitalExperience = t.digitalExperienceRequired;

        if (!formData.consentParticipation || !formData.consentDataProcessing) {
            newErrors.consent = t.consentRequired;
        }
        
        // Email validation only if results contact is checked
        if (formData.consentResultsContact && (!formData.email || !formData.email.includes('@'))) {
            newErrors.email = lang === 'de' ? 'Gültige E-Mail-Adresse erforderlich' : 'Valid email address required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Start timing and capture traffic source when component mounts
    useEffect(() => {
        timingService.startStudy();
        timingService.restoreTiming();
        
        // Capture traffic source on first load
        let trafficData = getStoredTrafficSource();
        
        if (!trafficData) {
            // First visit - capture traffic source
            trafficData = getTrafficSource();
            storeTrafficSource(trafficData);
        }
        
        // Set traffic source in form data
        setFormData(prev => ({
            ...prev,
            trafficSource: trafficData.source
        }));
        
        // Log for debugging (remove in production)
        console.log('Traffic source captured:', trafficData.source);
        
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Proceed with the form completion
        onComplete(formData);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div style={formStyle}>
            <div style={containerStyle}>
                <h1 style={{
                    color: '#fff',
                    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
                    textAlign: 'center',
                    marginBottom: 'clamp(8px, 2vw, 10px)',
                    fontFamily: 'Permanent Marker, cursive',
                    lineHeight: '1.2'
                }}>
                    {t.title}
                </h1>
                <p style={{
                    color: '#ccc',
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    textAlign: 'center',
                    marginBottom: 'clamp(25px, 5vw, 40px)',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: '1.4'
                }}>
                    {t.subtitle}
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Eligibility Section */}
                    <h2 style={{ ...labelStyle, fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginTop: 'clamp(20px, 4vw, 30px)', marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                        {t.eligibilitySection}
                    </h2>

                    <div style={checkboxStyle}>
                        <input
                            type="checkbox"
                            style={checkboxInputStyle}
                            checked={formData.ageConfirmation}
                            onChange={(e) => handleInputChange('ageConfirmation', e.target.checked)}
                        />
                        <span style={textStyle}>{t.ageConfirmation}</span>
                    </div>
                    {errors.ageConfirmation && <div style={errorStyle}>{errors.ageConfirmation}</div>}

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.country}</label>
                        <select
                            style={selectStyle}
                            value={formData.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                        >
                            <option value="">{lang === 'de' ? '-- Bitte wählen --' : '-- Please select --'}</option>
                            {Object.entries(t.countries).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        {errors.country && <div style={errorStyle}>{errors.country}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.role}</label>
                        <select
                            style={selectStyle}
                            value={formData.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                        >
                            <option value="">{lang === 'de' ? '-- Bitte wählen --' : '-- Please select --'}</option>
                            {Object.entries(t.roles).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        {errors.role && <div style={errorStyle}>{errors.role}</div>}
                    </div>

                    {/* Profile Section */}
                    <h2 style={{ ...labelStyle, fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginTop: 'clamp(25px, 5vw, 40px)', marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                        {t.profileSection}
                    </h2>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.gender}</label>
                        <select
                            style={selectStyle}
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                        >
                            <option value="">{lang === 'de' ? '-- Bitte wählen --' : '-- Please select --'}</option>
                            {Object.entries(t.genders).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.schoolType}</label>
                        <select
                            style={selectStyle}
                            value={formData.schoolType}
                            onChange={(e) => handleInputChange('schoolType', e.target.value)}
                        >
                            <option value="">{lang === 'de' ? '-- Bitte wählen --' : '-- Please select --'}</option>
                            {Object.entries(t.schoolTypes).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        {errors.schoolType && <div style={errorStyle}>{errors.schoolType}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.teachingExperience}</label>
                        <select
                            style={selectStyle}
                            value={formData.teachingExperience}
                            onChange={(e) => handleInputChange('teachingExperience', e.target.value)}
                        >
                            <option value="">{lang === 'de' ? '-- Bitte wählen --' : '-- Please select --'}</option>
                            {Object.entries(t.experienceLevels).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        {errors.teachingExperience && <div style={errorStyle}>{errors.teachingExperience}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.subjects}</label>
                        <input
                            type="text"
                            style={inputStyle}
                            value={formData.subjects}
                            onChange={(e) => handleInputChange('subjects', e.target.value)}
                            placeholder={lang === 'de' ? 'z.B. Mathematik, Physik, Informatik' : 'e.g. Mathematics, Physics, Computer Science'}
                        />
                        {errors.subjects && <div style={errorStyle}>{errors.subjects}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.digitalExperience}</label>
                        <select
                            style={selectStyle}
                            value={formData.digitalExperience}
                            onChange={(e) => handleInputChange('digitalExperience', e.target.value)}
                        >
                            <option value="">{lang === 'de' ? '-- Bitte wählen --' : '-- Please select --'}</option>
                            {Object.entries(t.digitalLevels).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        {errors.digitalExperience && <div style={errorStyle}>{errors.digitalExperience}</div>}
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>{t.planningFrequency}</label>
                        <select
                            style={selectStyle}
                            value={formData.planningFrequency}
                            onChange={(e) => handleInputChange('planningFrequency', e.target.value)}
                        >
                            <option value="">{lang === 'de' ? '-- Bitte wählen --' : '-- Please select --'}</option>
                            {Object.entries(t.planningFrequencies).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                        {errors.planningFrequency && <div style={errorStyle}>{errors.planningFrequency}</div>}
                    </div>



                    {/* Privacy Notice Section */}
                    <div style={{
                        background: '#2A2A2A',
                        border: '2px solid #4CAF50',
                        borderRadius: 'clamp(12px, 3vw, 16px)',
                        padding: 'clamp(20px, 4vw, 30px)',
                        marginTop: 'clamp(25px, 5vw, 40px)',
                        marginBottom: 'clamp(20px, 4vw, 30px)'
                    }}>
                        <h2 style={{
                            color: '#4CAF50',
                            fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                            marginBottom: 'clamp(15px, 3vw, 20px)',
                            fontFamily: 'Permanent Marker, cursive',
                            textAlign: 'center'
                        }}>
                            {t.privacyTitle}
                        </h2>

                        {/* Study Information */}
                        <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                            <h3 style={{
                                color: '#fff',
                                fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                                marginBottom: 'clamp(8px, 2vw, 10px)',
                                fontFamily: 'Permanent Marker, cursive'
                            }}>
                                {t.studyInfo}
                            </h3>
                            <p style={{
                                color: '#ccc',
                                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                                lineHeight: '1.5',
                                fontFamily: 'Arial, sans-serif',
                                margin: 0
                            }}>
                                {t.studyInfoText}
                            </p>
                        </div>

                        {/* Responsible */}
                        <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                            <h3 style={{
                                color: '#fff',
                                fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                                marginBottom: 'clamp(8px, 2vw, 10px)',
                                fontFamily: 'Permanent Marker, cursive'
                            }}>
                                {t.responsible}
                            </h3>
                            <pre style={{
                                color: '#ccc',
                                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                                lineHeight: '1.5',
                                fontFamily: 'Arial, sans-serif',
                                margin: 0,
                                whiteSpace: 'pre-line'
                            }}>
                                {t.responsibleText}
                            </pre>
                        </div>

                        {/* Data Processing */}
                        <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                            <h3 style={{
                                color: '#fff',
                                fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                                marginBottom: 'clamp(8px, 2vw, 10px)',
                                fontFamily: 'Permanent Marker, cursive'
                            }}>
                                {t.dataProcessing}
                            </h3>
                            {t.dataProcessingItems.map((item, index) => (
                                <p key={index} style={{
                                    color: '#ccc',
                                    fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                    lineHeight: '1.4',
                                    fontFamily: 'Arial, sans-serif',
                                    margin: 'clamp(6px, 1.5vw, 8px) 0',
                                    paddingLeft: 'clamp(8px, 2vw, 12px)'
                                }}>
                                    • {item.replace('**', '').replace('**', '')}
                                </p>
                            ))}
                        </div>

                        {/* Rights */}
                        <div style={{ marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                            <h3 style={{
                                color: '#fff',
                                fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                                marginBottom: 'clamp(8px, 2vw, 10px)',
                                fontFamily: 'Permanent Marker, cursive'
                            }}>
                                {t.rightsTitle}
                            </h3>
                            <p style={{
                                color: '#ccc',
                                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                                lineHeight: '1.5',
                                fontFamily: 'Arial, sans-serif',
                                margin: 0
                            }}>
                                {t.rightsText}
                            </p>
                        </div>

                        {/* Voluntary */}
                        <div>
                            <h3 style={{
                                color: '#fff',
                                fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
                                marginBottom: 'clamp(8px, 2vw, 10px)',
                                fontFamily: 'Permanent Marker, cursive'
                            }}>
                                {t.voluntaryTitle}
                            </h3>
                            <p style={{
                                color: '#ccc',
                                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                                lineHeight: '1.5',
                                fontFamily: 'Arial, sans-serif',
                                margin: 0
                            }}>
                                {t.voluntaryText}
                            </p>
                        </div>
                    </div>

                    {/* Consent Checkboxes */}
                    <div style={checkboxStyle}>
                        <input
                            type="checkbox"
                            style={checkboxInputStyle}
                            checked={formData.consentParticipation}
                            onChange={(e) => handleInputChange('consentParticipation', e.target.checked)}
                        />
                        <span style={{...textStyle, fontWeight: 'normal'}}>{t.consentParticipation}</span>
                    </div>

                    <div style={checkboxStyle}>
                        <input
                            type="checkbox"
                            style={checkboxInputStyle}
                            checked={formData.consentDataProcessing}
                            onChange={(e) => handleInputChange('consentDataProcessing', e.target.checked)}
                        />
                        <span style={{...textStyle, fontWeight: 'bold', color: '#4CAF50'}}>{t.consentDataProcessing}</span>
                    </div>

                    <div style={checkboxStyle}>
                        <input
                            type="checkbox"
                            style={checkboxInputStyle}
                            checked={formData.consentResultsContact}
                            onChange={(e) => handleInputChange('consentResultsContact', e.target.checked)}
                        />
                        <span style={{...textStyle, fontWeight: 'normal'}}>{t.consentResultsContact}</span>
                    </div>

                    {/* Email field - only show if results contact is checked */}
                    {formData.consentResultsContact && (
                        <div style={fieldStyle}>
                            <label style={labelStyle}>{t.email}</label>
                            <input
                                type="email"
                                style={{...inputStyle, ...(errors.email ? {border: '2px solid #ff6b6b'} : {})}}
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="ihre.email@example.com"
                            />
                            <p style={{
                                color: '#999',
                                fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
                                fontStyle: 'italic',
                                margin: 'clamp(4px, 1vw, 6px) 0 0 0',
                                fontFamily: 'Arial, sans-serif'
                            }}>
                                {t.emailNote}
                            </p>
                            {errors.email && <div style={errorStyle}>{errors.email}</div>}
                        </div>
                    )}

                    {errors.consent && <div style={errorStyle}>{errors.consent}</div>}

                    <button
                        type="submit"
                        style={{
                            ...buttonStyle,
                            width: '100%',
                            marginTop: '40px',
                            fontSize: '1.3rem'
                        }}
                        className="excalidraw-box"
                    >
                        {t.submit}
                    </button>
                </form>
            </div>
        </div>
    );
}