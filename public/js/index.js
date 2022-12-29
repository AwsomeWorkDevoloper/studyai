function GetExamples() {
    let topics = [
        'Essay Outline',
        'Study Notes',
        'Quizzes',
        'Grammar',
        'Translator',
        'Analogy'
    ];

    let prompts = [
        'Create an outline for an essay about Ancient Egyptian history:',
        'What are 5 key points I should know when studying Abraham Lincoln?',
        'Ask me 5 quiz questions on Abraham Lincoln:',
        'Correct this to standard English:\n'+ 'Them experts sure knows what theyr doin',
        'What does the name of the 55th surah \'الرحمن\' in the Quran mean in English?',
        'Create an analogy about how people\'s true nature can be revealed with money.',
    ];

    let responses = [
        'I. Introduction\n' +
        '    A. Definition of Ancient Egypt\n' +
        '    B. Overview of Ancient Egyptian history\n' +
        '\n' +
        'II. Early Dynastic Period (3100-2686 BCE)\n' +
        '    A. Overview of the period\n' +
        '    B. Political structure\n' +
        '    C. Religion and culture\n' +
        '\n' +
        'III. Old Kingdom (2686-2181 BCE)\n' +
        '    A. Overview of the period\n' +
        '    B. Political structure\n' +
        '    C. Religion and culture\n' +
        '\n' +
        'IV. Middle Kingdom (2040-1782 BCE)\n' +
        '    A. Overview of the period\n' +
        '    B. Political structure\n' +
        '    C. Religion and culture\n' +
        '\n' +
        'V. New Kingdom (1550-1069 BCE)\n' +
        '    A. Overview of the period\n' +
        '    B. Political structure\n' +
        '    C. Religion and culture\n' +
        '\n' +
        'VI. Late Period (664-332 BCE)\n' +
        '    A. Overview of the period\n' +
        '    B. Political structure\n' +
        '    C. Religion and culture\n' +
        '\n', 

        '1. Abraham Lincoln was the 16th President of the United States, serving from 1861-1865. \n'+
        '2. He is best known for leading the country through the American Civil War and for his role in abolishing slavery.\n'+
        '3. He was born in Kentucky in 1809 and moved to Illinois in 1830.\n'+
        '4. He was assassinated in 1865 by John Wilkes Booth.\n'+
        '5. He is widely regarded as one of the greatest presidents in American history.\n',

        '1. What year was Abraham Lincoln born?\n' +
        '2. What year did Abraham Lincoln become President of the United States?\n' +
        "3. What was the name of the speech Abraham Lincoln gave at the dedication of the Soldiers' National Cemetery?\n" +
        '4. What was the name of the book Abraham Lincoln wrote while he was a lawyer?\n' +
        '5. What year did Abraham Lincoln die?',

        `Those experts sure know what they're doing.`,
        'The name of the 55th surah in the Quran, "Al-Rahman," means "The Most Gracious" or "The Beneficent" in English.',
        'Money is like a magnifying glass. It can reveal the true nature of people, just like how a magnifying glass can reveal the true beauty of a flower.'
    ];

    return prompts.map((x, i) => ({prompt: x, response: responses[i], topic: topics[i]}));
}