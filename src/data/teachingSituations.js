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
                title: '3. Klasse - Mathematik: Einmaleins',
                grade: '3. Klasse',
                subject: 'Mathematik',
                topic: 'Einmaleins',
                context: 'Ihre 3. Klasse beim Einmaleins',
                description: [
                    'Sie unterrichten eine 3. Klasse in Mathematik.',
                    'Thema: Das kleine Einmaleins (1x1) einführen und üben',
                    'Ziel: Die Schüler sollen die Einmaleins-Reihen verstehen und automatisieren',
                    'Herausforderung: Unterschiedliche Lerngeschwindigkeiten und Abstraktionsniveau'
                ],
                detailedContext: 'Denken Sie an Ihre 3. Klasse beim Einmaleins',
                // Expected framework path based on situation
                expectedPath: {
                    dimension: 'prozedural', // Learning multiplication procedures
                    process: 'anwenden',      // Applying multiplication facts
                    medientyp: 'interaktiv'   // Interactive tools for practice
                }
            },
            {
                id: 'grade8_science',
                title: '8. Klasse - Biologie: Photosynthese',
                grade: '8. Klasse',
                subject: 'Biologie',
                topic: 'Photosynthese',
                context: 'Ihre 8. Klasse bei der Photosynthese',
                description: [
                    'Sie unterrichten eine 8. Klasse in Biologie.',
                    'Thema: Den Prozess der Photosynthese verstehen',
                    'Ziel: Schüler sollen den komplexen biologischen Prozess begreifen',
                    'Herausforderung: Abstrakte biochemische Vorgänge veranschaulichen'
                ],
                detailedContext: 'Denken Sie an Ihre 8. Klasse bei der Photosynthese',
                expectedPath: {
                    dimension: 'konzeptionell', // Understanding biological concepts
                    process: 'verstehen',       // Understanding the process
                    medientyp: 'visuell'        // Visual representations needed
                }
            },
            {
                id: 'grade11_history',
                title: '11. Klasse - Geschichte: Weimarer Republik',
                grade: '11. Klasse', 
                subject: 'Geschichte',
                topic: 'Weimarer Republik',
                context: 'Ihre 11. Klasse zur Weimarer Republik',
                description: [
                    'Sie unterrichten eine 11. Klasse in Geschichte.',
                    'Thema: Die Weimarer Republik kritisch analysieren',
                    'Ziel: Historische Quellen bewerten und politische Entwicklungen beurteilen',
                    'Herausforderung: Komplexe politische Zusammenhänge und Quellenkritik'
                ],
                detailedContext: 'Denken Sie an Ihre 11. Klasse zur Weimarer Republik',
                expectedPath: {
                    dimension: 'faktisch',    // Historical facts and sources
                    process: 'analysieren',   // Analyzing historical sources
                    medientyp: 'textbasiert'  // Text-based historical sources
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
                title: 'Grade 3 - Mathematics: Times Tables',
                grade: 'Grade 3',
                subject: 'Mathematics',
                topic: 'Times Tables',
                context: 'your Grade 3 class learning times tables',
                description: [
                    'You are teaching a Grade 3 class in Mathematics.',
                    'Topic: Introducing and practicing times tables (multiplication)',
                    'Goal: Students should understand and automatize multiplication facts',
                    'Challenge: Different learning speeds and abstraction levels'
                ],
                detailedContext: 'Think about your Grade 3 class learning times tables',
                expectedPath: {
                    dimension: 'prozedural',
                    process: 'anwenden',
                    medientyp: 'interaktiv'
                }
            },
            {
                id: 'grade8_science', 
                title: 'Grade 8 - Biology: Photosynthesis',
                grade: 'Grade 8',
                subject: 'Biology',
                topic: 'Photosynthesis',
                context: 'your Grade 8 class studying photosynthesis',
                description: [
                    'You are teaching a Grade 8 class in Biology.',
                    'Topic: Understanding the process of photosynthesis',
                    'Goal: Students should comprehend this complex biological process',
                    'Challenge: Visualizing abstract biochemical processes'
                ],
                detailedContext: 'Think about your Grade 8 class studying photosynthesis',
                expectedPath: {
                    dimension: 'konzeptionell',
                    process: 'verstehen',
                    medientyp: 'visuell'
                }
            },
            {
                id: 'grade11_history',
                title: 'Grade 11 - History: Weimar Republic',
                grade: 'Grade 11',
                subject: 'History', 
                topic: 'Weimar Republic',
                context: 'your Grade 11 class analyzing the Weimar Republic',
                description: [
                    'You are teaching a Grade 11 class in History.',
                    'Topic: Critically analyzing the Weimar Republic',
                    'Goal: Evaluate historical sources and judge political developments',
                    'Challenge: Complex political relationships and source criticism'
                ],
                detailedContext: 'Think about your Grade 11 class analyzing the Weimar Republic',
                expectedPath: {
                    dimension: 'faktisch',
                    process: 'analysieren',
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