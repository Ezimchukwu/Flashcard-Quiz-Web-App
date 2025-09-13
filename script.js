// Flashcard Quiz App - JavaScript
// Author: Replit Agent
// Description: Interactive flashcard application with flip animations and scoring

/**
 * Flashcard data - Array of question and answer objects
 * You can easily add more flashcards to this array
 */
const flashcards = [
    {
        question: "What does HTML stand for?",
        answer: "HyperText Markup Language"
    },
    {
        question: "What is CSS used for?",
        answer: "Styling and layout of web pages"
    },
    {
        question: "What is JavaScript?",
        answer: "A programming language that makes web pages interactive"
    },
    {
        question: "What does DOM stand for?",
        answer: "Document Object Model"
    },
    {
        question: "What is the purpose of the <head> tag in HTML?",
        answer: "Contains metadata about the document, like title and links to stylesheets"
    },
    {
        question: "How do you create a comment in CSS?",
        answer: "/* This is a CSS comment */"
    },
    {
        question: "What is the difference between margin and padding?",
        answer: "Margin is space outside an element, padding is space inside an element"
    },
    {
        question: "What is a responsive web design?",
        answer: "A design approach that makes web pages work well on different devices and screen sizes"
    },
    {
        question: "What does API stand for?",
        answer: "Application Programming Interface"
    },
    {
        question: "What is the purpose of JavaScript's 'addEventListener' method?",
        answer: "To attach event handlers to HTML elements without overwriting existing event handlers"
    }
];

/**
 * App State Variables
 */
let currentCardIndex = 0;
let isFlipped = false;
let hasSeenAnswer = false;
let score = { correct: 0, wrong: 0 };

/**
 * DOM Elements
 */
const flashcard = document.getElementById('flashcard');
const questionText = document.getElementById('question-text');
const answerText = document.getElementById('answer-text');
const flipBtn = document.getElementById('flip-btn');
const nextBtn = document.getElementById('next-btn');
const correctBtn = document.getElementById('correct-btn');
const wrongBtn = document.getElementById('wrong-btn');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');
const scoringControls = document.getElementById('scoring-controls');

/**
 * Initialize the application when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    attachEventListeners();
    loadCard(currentCardIndex);
});

/**
 * Initialize application state and UI
 */
function initializeApp() {
    // Reset app state
    currentCardIndex = 0;
    isFlipped = false;
    hasSeenAnswer = false;
    score = { correct: 0, wrong: 0 };
    
    // Hide scoring controls initially
    scoringControls.style.display = 'none';
    
    // Update progress and score display
    updateProgress();
    updateScore();
    
    console.log('Flashcard Quiz App initialized with', flashcards.length, 'cards');
}

/**
 * Attach event listeners to interactive elements
 */
function attachEventListeners() {
    // Main navigation buttons
    flipBtn.addEventListener('click', flipCard);
    nextBtn.addEventListener('click', nextCard);
    
    // Scoring buttons
    correctBtn.addEventListener('click', () => markAnswer(true));
    wrongBtn.addEventListener('click', () => markAnswer(false));
    
    // Card click to flip
    flashcard.addEventListener('click', flipCard);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
    
    console.log('Event listeners attached');
}

/**
 * Load a specific flashcard
 * @param {number} index - Index of the card to load
 */
function loadCard(index) {
    // Validate index
    if (index < 0 || index >= flashcards.length) {
        console.error('Invalid card index:', index);
        return;
    }
    
    const card = flashcards[index];
    
    // Reset card state
    isFlipped = false;
    hasSeenAnswer = false;
    flashcard.classList.remove('flipped');
    
    // Update content
    questionText.textContent = card.question;
    answerText.textContent = card.answer;
    
    // Update button states
    flipBtn.textContent = 'Show Answer';
    flipBtn.disabled = false;
    nextBtn.disabled = false;
    
    // Hide scoring controls until answer is seen
    scoringControls.style.display = 'none';
    
    // Update progress
    updateProgress();
    
    // Add fade-in animation
    flashcard.classList.add('fade-in');
    setTimeout(() => flashcard.classList.remove('fade-in'), 500);
    
    console.log('Loaded card', index + 1, 'of', flashcards.length);
}

/**
 * Flip the current flashcard
 */
function flipCard() {
    if (flashcard.classList.contains('loading')) return;
    
    // Add loading state
    flashcard.classList.add('loading');
    
    // Toggle flip state
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped');
    
    // Update button text and state
    if (isFlipped) {
        flipBtn.textContent = 'Show Question';
        hasSeenAnswer = true;
        
        // Show scoring controls after seeing answer
        scoringControls.style.display = 'flex';
    } else {
        flipBtn.textContent = 'Show Answer';
    }
    
    // Remove loading state after animation
    setTimeout(() => {
        flashcard.classList.remove('loading');
    }, 600);
    
    console.log('Card flipped to:', isFlipped ? 'answer' : 'question');
}

/**
 * Move to the next flashcard
 */
function nextCard() {
    // Move to next card (loop to beginning if at end)
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    
    // Load the new card
    loadCard(currentCardIndex);
    
    console.log('Moved to next card:', currentCardIndex + 1);
}

/**
 * Mark the current answer as correct or wrong
 * @param {boolean} isCorrect - Whether the answer was marked as correct
 */
function markAnswer(isCorrect) {
    // Only allow marking if answer has been seen
    if (!hasSeenAnswer) {
        console.log('Cannot mark answer before seeing it');
        return;
    }
    
    // Update score
    if (isCorrect) {
        score.correct++;
        console.log('Marked as correct');
    } else {
        score.wrong++;
        console.log('Marked as wrong');
    }
    
    // Update score display
    updateScore();
    
    // Disable scoring buttons to prevent double-scoring
    correctBtn.disabled = true;
    wrongBtn.disabled = true;
    
    // Auto-advance to next card after a short delay
    setTimeout(() => {
        nextCard();
        // Re-enable buttons for next card
        correctBtn.disabled = false;
        wrongBtn.disabled = false;
    }, 1000);
}

/**
 * Update progress indicator
 */
function updateProgress() {
    const current = currentCardIndex + 1;
    const total = flashcards.length;
    progressText.textContent = `Card ${current} of ${total}`;
}

/**
 * Update score display
 */
function updateScore() {
    const totalAnswered = score.correct + score.wrong;
    scoreText.textContent = `Score: ${score.correct}/${totalAnswered}`;
    
    // Show percentage if some questions have been answered
    if (totalAnswered > 0) {
        const percentage = Math.round((score.correct / totalAnswered) * 100);
        scoreText.textContent += ` (${percentage}%)`;
    }
}

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyPress(event) {
    switch(event.key) {
        case ' ': // Spacebar - flip card
            event.preventDefault();
            flipCard();
            break;
        case 'ArrowRight': // Right arrow - next card
        case 'n': // 'n' key - next card
            event.preventDefault();
            nextCard();
            break;
        case 'ArrowLeft': // Left arrow - previous card
        case 'p': // 'p' key - previous card
            event.preventDefault();
            previousCard();
            break;
        case 'c': // 'c' key - mark correct
            if (hasSeenAnswer) {
                event.preventDefault();
                markAnswer(true);
            }
            break;
        case 'w': // 'w' key - mark wrong
            if (hasSeenAnswer) {
                event.preventDefault();
                markAnswer(false);
            }
            break;
    }
}

/**
 * Move to the previous flashcard
 */
function previousCard() {
    // Move to previous card (loop to end if at beginning)
    currentCardIndex = currentCardIndex === 0 ? flashcards.length - 1 : currentCardIndex - 1;
    
    // Load the new card
    loadCard(currentCardIndex);
    
    console.log('Moved to previous card:', currentCardIndex + 1);
}

/**
 * Reset the quiz to the beginning
 */
function resetQuiz() {
    currentCardIndex = 0;
    score = { correct: 0, wrong: 0 };
    loadCard(currentCardIndex);
    updateScore();
    console.log('Quiz reset');
}

/**
 * Get quiz statistics
 * @returns {Object} Statistics about the current quiz session
 */
function getQuizStats() {
    const totalAnswered = score.correct + score.wrong;
    const percentage = totalAnswered > 0 ? Math.round((score.correct / totalAnswered) * 100) : 0;
    
    return {
        totalCards: flashcards.length,
        currentCard: currentCardIndex + 1,
        totalAnswered: totalAnswered,
        correct: score.correct,
        wrong: score.wrong,
        percentage: percentage
    };
}

/**
 * Utility function to shuffle the flashcard deck
 */
function shuffleDeck() {
    // Fisher-Yates shuffle algorithm
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    
    // Reset to first card and reload
    currentCardIndex = 0;
    loadCard(currentCardIndex);
    console.log('Deck shuffled');
}

// Expose utility functions globally for potential future use
window.FlashcardQuiz = {
    resetQuiz,
    getQuizStats,
    shuffleDeck,
    previousCard
};

// Initialize app when script loads
console.log('Flashcard Quiz Script Loaded - Ready for interaction!');