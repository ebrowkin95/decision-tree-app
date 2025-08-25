/**
 * Teaching situations for different grade levels
 * Each situation includes context, subject, grade level, and expected framework path
 */

export const teachingSituations = {
    de: {
        title: 'Unterrichtssituation auswählen',
        subtitle: 'Bitte wählen Sie eine der folgenden Unterrichtssituationen. Denken Sie während der Framework-Nutzung an diese konkrete Situation.',
        instruction: 'Während Sie das Framework nutzen, werden wir Sie an Ihre gewählte Situation erinnern.',
        
        situations: [
            {
                id: 'grade3_math',
                title: '3. Klasse - Mathematik: Geometrische Formen',
                grade: '3. Klasse',
                subject: 'Mathematik',
                topic: 'Geometrische Formen',
                context: 'Ihre 3. Klasse bei geometrischen Formen',
                description: [
                    'Sie unterrichten eine 3. Klasse in Mathematik.',
                    'Thema: Grundlegende geometrische Formen erkennen und verstehen',
                    'Ziel: Schüler:innen sollen Eigenschaften von Formen verstehen und in ihrer Umgebung identifizieren',
                    'Herausforderung: Abstrakte geometrische Konzepte kindgerecht vermitteln'
                ],
                detailedContext: 'Denken Sie an Ihre 3. Klasse bei geometrischen Formen',
                // Expected framework path based on situation
                expectedPath: {
                    dimension: 'konzeptionell', // Understanding geometric concepts
                    process: 'verstehen',       // Understanding properties and relationships
                    medientyp: 'visuell'        // Visual representations needed
                }
            },
            {
                id: 'grade8_science',
                title: '8. Klasse - Chemie: Chemische Reaktionen',
                grade: '8. Klasse',
                subject: 'Chemie',
                topic: 'Chemische Reaktionen',
                context: 'Ihre 8. Klasse bei chemischen Reaktionen',
                description: [
                    'Sie unterrichten eine 8. Klasse in Chemie.',
                    'Thema: Chemische Reaktionen durchführen und dokumentieren',
                    'Ziel: Schüler:innen sollen Versuchsabläufe beherrschen und Schlussfolgerungen ziehen',
                    'Herausforderung: Praktische Fertigkeiten mit theoretischem Verständnis verbinden'
                ],
                detailedContext: 'Denken Sie an Ihre 8. Klasse bei chemischen Reaktionen',
                expectedPath: {
                    dimension: 'prozedural',   // Learning experimental procedures
                    process: 'anwenden',       // Applying experimental methods
                    medientyp: 'interaktiv'    // Interactive simulations and virtual labs
                }
            },
            {
                id: 'grade11_history',
                title: '11. Klasse - Geschichte: Historische Quellenanalyse',
                grade: '11. Klasse', 
                subject: 'Geschichte',
                topic: 'Historische Quellenanalyse',
                context: 'Ihre 11. Klasse zur historischen Quellenanalyse',
                description: [
                    'Sie unterrichten eine 11. Klasse in Geschichte.',
                    'Thema: Verschiedene historische Quellen analysieren und bewerten',
                    'Ziel: Schüler:innen sollen Glaubwürdigkeit bewerten und eigene Interpretationen entwickeln',
                    'Herausforderung: Kritisches Denken und Quellenkritik systematisch vermitteln'
                ],
                detailedContext: 'Denken Sie an Ihre 11. Klasse zur historischen Quellenanalyse',
                expectedPath: {
                    dimension: 'konzeptionell', // Understanding source analysis concepts
                    process: 'evaluieren',      // Evaluating source credibility
                    medientyp: 'textbasiert'    // Text-based sources and analysis
                }
            }
        ]
    },
    
    en: {
        title: 'Select Teaching Situation',
        subtitle: 'Please choose one of the following teaching situations. Think about this specific situation while using the framework.',
        instruction: 'While you use the framework, we will remind you of your chosen situation.',
        
        situations: [
            {
                id: 'grade3_math',
                title: '3rd Grade - Mathematics: Geometric Shapes',
                grade: '3rd Grade',
                subject: 'Mathematics',
                topic: 'Geometric Shapes',
                context: 'your 3rd grade class learning geometric shapes',
                description: [
                    'You are teaching a 3rd grade class in Mathematics.',
                    'Topic: Recognizing and understanding basic geometric shapes',
                    'Goal: Students should understand shape properties and identify them in their environment',
                    'Challenge: Making abstract geometric concepts accessible to children'
                ],
                detailedContext: 'Think about your 3rd grade class learning geometric shapes',
                expectedPath: {
                    dimension: 'konzeptionell',
                    process: 'verstehen',
                    medientyp: 'visuell'
                }
            },
            {
                id: 'grade8_science', 
                title: 'Middle School - Chemistry: Chemical Reactions',
                grade: 'Middle School',
                subject: 'Chemistry',
                topic: 'Chemical Reactions',
                context: 'your middle school chemistry class studying chemical reactions',
                description: [
                    'You are teaching a middle school class in Chemistry.',
                    'Topic: Conducting and documenting chemical reactions',
                    'Goal: Students should master experimental procedures and draw conclusions',
                    'Challenge: Connecting practical skills with theoretical understanding'
                ],
                detailedContext: 'Think about your middle school chemistry class studying chemical reactions',
                expectedPath: {
                    dimension: 'prozedural',
                    process: 'anwenden',
                    medientyp: 'interaktiv'
                }
            },
            {
                id: 'grade11_history',
                title: 'High School - History: Historical Source Analysis',
                grade: 'High School',
                subject: 'History', 
                topic: 'Historical Source Analysis',
                context: 'your high school history class analyzing historical sources',
                description: [
                    'You are teaching a high school class in History.',
                    'Topic: Analyzing and evaluating various historical sources',
                    'Goal: Students should assess credibility and develop their own founded interpretations',
                    'Challenge: Teaching systematic critical thinking and source criticism'
                ],
                detailedContext: 'Think about your high school history class analyzing historical sources',
                expectedPath: {
                    dimension: 'konzeptionell',
                    process: 'evaluieren',
                    medientyp: 'textbasiert'
                }
            }
        ]
    }
};

/**
 * Gets the context reminder text for a specific situation
 * @param {string} situationId - The ID of the selected situation
 * @param {string} lang - Language ('de' or 'en')
 * @returns {string} Context reminder text
 */
export function getSituationContext(situationId, lang = 'de') {
    const situations = teachingSituations[lang].situations;
    const situation = situations.find(s => s.id === situationId);
    return situation ? situation.detailedContext : '';
}

/**
 * Gets the expected framework path for a situation
 * @param {string} situationId - The ID of the selected situation
 * @returns {object} Expected path object with dimension, process, medientyp
 */
export function getExpectedPath(situationId) {
    const situations = teachingSituations.de.situations; // Path is same for both languages
    const situation = situations.find(s => s.id === situationId);
    return situation ? situation.expectedPath : null;
}

/**
 * Compares actual framework path with expected path for chosen situation
 * @param {object} actualPath - The path taken through the framework
 * @param {string} situationId - The ID of the selected situation
 * @returns {object} Comparison result with boolean matches and details
 */
export function compareFrameworkPaths(actualPath, situationId) {
    const expectedPath = getExpectedPath(situationId);
    
    if (!expectedPath || !actualPath) {
        return {
            matches: false,
            dimensionMatch: false,
            processMatch: false,
            medientypMatch: false,
            expectedPath: expectedPath,
            actualPath: actualPath
        };
    }
    
    const dimensionMatch = actualPath.dimension === expectedPath.dimension;
    const processMatch = actualPath.process === expectedPath.process;
    const medientypMatch = actualPath.medientyp === expectedPath.medientyp;
    
    const fullMatch = dimensionMatch && processMatch && medientypMatch;
    
    return {
        matches: fullMatch,
        dimensionMatch,
        processMatch, 
        medientypMatch,
        expectedPath,
        actualPath,
        matchPercentage: [dimensionMatch, processMatch, medientypMatch].filter(Boolean).length / 3 * 100
    };
}