// Demo Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the demo page
    if (document.querySelector('#inputText')) {
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const submitBtn = document.getElementById('submitBtn');
        const copyBtn = document.getElementById('copyBtn');
        const resetBtn = document.getElementById('resetBtn');
        const charCount = document.getElementById('charCount');
        const errorMsg = document.getElementById('errorMsg');
        const comparisonSection = document.getElementById('comparisonSection');
        const originalText = document.getElementById('originalText');
        const enhancedText = document.getElementById('enhancedText');

        // Character counter
        inputText.addEventListener('input', function() {
            const count = inputText.value.length;
            charCount.textContent = `${count} characters`;
            
            // Show error if less than 10 characters
            if (count < 10 && count > 0) {
                errorMsg.classList.remove('hidden');
            } else {
                errorMsg.classList.add('hidden');
            }
        });

        // Submit button handler
        submitBtn.addEventListener('click', function() {
            const text = inputText.value.trim();
            
            if (text.length < 10) {
                errorMsg.classList.remove('hidden');
                return;
            }

            // Mock AI processing (would be replaced with actual API call)
            setTimeout(() => {
                const correctedText = mockAICorrection(text);
                outputText.innerHTML = correctedText;
                copyBtn.classList.remove('hidden');
                
                // Show comparison
                originalText.textContent = text;
                enhancedText.innerHTML = correctedText;
                comparisonSection.classList.remove('hidden');
            }, 1000);
        });

        // Copy button handler
        copyBtn.addEventListener('click', function() {
            const range = document.createRange();
            range.selectNode(outputText);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            
            // Show feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });

        // Reset button handler
        resetBtn.addEventListener('click', function() {
            inputText.value = '';
            outputText.innerHTML = '<p class="text-gray-400">Your enhanced text will appear here...</p>';
            charCount.textContent = '0 characters';
            copyBtn.classList.add('hidden');
            comparisonSection.classList.add('hidden');
            errorMsg.classList.add('hidden');
        });

        // Mock AI correction function
        function mockAICorrection(text) {
            // Simple mock corrections
            let corrected = text
                .replace(/\bi\b/g, 'I')  // Capitalize I
                .replace(/\.\s*([a-z])/g, (match, p1) => `. ${p1.toUpperCase()}`)  // Capitalize after periods
                .replace(/\bdon't\b/g, "do not")
                .replace(/\bcan't\b/g, "cannot")
                .replace(/\byou['’]re\b/g, (match) => {
                    // Only convert to "you are" if it's used as a verb
                    return match.toLowerCase() === "you're" ? "your" : match;
                })
                .replace(/\bit['’]s\b/g, "it is");

            // Add some random "enhancements" to demonstrate
            if (Math.random() > 0.5) {
                corrected = corrected.replace(/\bgood\b/g, '<span class="diff-insert">excellent</span>');
            }
            if (Math.random() > 0.5) {
                corrected = corrected.replace(/\bbad\b/g, '<span class="diff-insert">poor</span>');
            }

            return corrected;
        }
    }

    // Contact Form Functionality
    if (document.getElementById('contactForm')) {
        const contactForm = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error states
            document.getElementById('nameError').classList.add('hidden');
            document.getElementById('emailError').classList.add('hidden');
            document.getElementById('messageError').classList.add('hidden');
            
            // Validate form
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '') {
                document.getElementById('nameError').classList.remove('hidden');
                isValid = false;
            }
            
            if (email === '' || !email.includes('@')) {
                document.getElementById('emailError').classList.remove('hidden');
                isValid = false;
            }
            
            if (message === '') {
                document.getElementById('messageError').classList.remove('hidden');
                isValid = false;
            }
            
            if (isValid) {
                // Mock form submission (would be replaced with actual fetch to server)
                setTimeout(() => {
                    contactForm.reset();
                    successMessage.classList.remove('hidden');
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.add('hidden');
                    }, 5000);
                }, 1000);
            }
        });
    }
});