/**
 * Iddu AI Call Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-sim-btn');
    const complexBtn = document.getElementById('start-complex-sim-btn');
    const transcript = document.getElementById('sim-transcript');
    const audioToggleBtn = document.getElementById('audio-toggle-btn');

    if (!transcript) return;

    let isAudioEnabled = false;
    let isRunning = false;

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            isAudioEnabled = !isAudioEnabled;
            audioToggleBtn.textContent = isAudioEnabled ? '🔊 Voice On' : '🔇 Voice Off';
            audioToggleBtn.style.color = isAudioEnabled ? '#ffffff' : 'rgba(255,255,255,0.5)';
            audioToggleBtn.style.borderColor = isAudioEnabled ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)';
            audioToggleBtn.style.background = isAudioEnabled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)';
        });
    }

    const scenarios = {
        standard: [
            { role: 'AI Agent', text: 'Hello, this is Iddu, calling on behalf of Alex M. regarding an appointment at the Clinic.' },
            { role: 'Clinic', text: 'Hi, let me pull that up. Can you confirm the patient date of birth?' },
            { role: 'AI Agent', text: 'Certainly. Date of birth is 05 slash xx slash 19xx.' },
            { role: 'Clinic', text: 'Thank you, that matches. How can I help you today?' },
            { role: 'AI Agent', text: 'Alex needs to reschedule their follow-up for next Tuesday. Do you have anything available in the morning?' },
            { role: 'Clinic', text: 'Let me check. We have a 9:30 AM or a 10:45 AM.' },
            { role: 'AI Agent', text: '10:45 AM works perfectly for Alex. Please confirm that time.' },
            { role: 'Clinic', text: 'Okay, I have Alex moved to Tuesday at 10:45 AM. Anything else?' },
            { role: 'AI Agent', text: 'That completes it. Thank you for your help. Goodbye.' }
        ],
        complex: [
            { role: 'IVR', text: 'Welcome to the Clinic. Press 1 for Appointments, 2 for Billing.' },
            { role: 'AI Agent', text: 'Sending tone 1.' },
            { role: 'IVR', text: 'Connecting you to the scheduling department.' },
            { role: 'Clinic', text: 'Appointments, how can I help you today?' },
            { role: 'AI Agent', text: 'Hello, this is Alex M. personal AI assistant. Alex needs to move his follow-up. He is looking for next week Tuesday or Wednesday, between 2 PM and 4 PM.' },
            { role: 'Clinic', text: 'I can look into that. To protect the patient privacy, can you please verify the date of birth?' },
            { role: 'AI Agent', text: 'Of course. The date of birth is 11 slash xx slash 19xx.' },
            { role: 'Clinic', text: 'I do not see any afternoon slots those days. But we had a cancellation this Friday at 3:15 PM. That is sooner.' },
            { role: 'AI Agent', text: 'Alex specifically requested no Fridays. Could you check again for any Tuesday or Wednesday slots between 2 and 4 PM? He is flexible within that window.' },
            { role: 'Clinic', text: 'A slot just opened up. How about next Wednesday at 2:30 PM?' },
            { role: 'AI Agent', text: 'Wednesday at 2:30 PM is perfect. I have confirmed that in Alex calendar and notified him. Thank you!' },
            { role: 'Clinic', text: 'Perfect. You are all set. Have a good one!' }
        ]
    };

    const runSimulation = (scenarioKey) => {
        if (isRunning) return;
        isRunning = true;

        const scenario = scenarios[scenarioKey];
        const activeBtn = scenarioKey === 'standard' ? startBtn : complexBtn;
        const otherBtn = scenarioKey === 'standard' ? complexBtn : startBtn;

        const originalText = activeBtn.innerText;
        activeBtn.innerText = 'Simulation Running...';
        activeBtn.disabled = true;
        if (otherBtn) otherBtn.disabled = true;
        transcript.innerHTML = '';

        window.speechSynthesis.cancel();

        let i = 0;

        const showLine = () => {
            if (i >= scenario.length) {
                activeBtn.innerText = 'Simulation Complete';
                setTimeout(() => {
                    activeBtn.innerText = originalText;
                    activeBtn.disabled = false;
                    if (otherBtn) otherBtn.disabled = false;
                    isRunning = false;
                }, 3000);
                return;
            }

            const line = scenario[i++];
            const lineEl = document.createElement('div');
            lineEl.className = 'sim-line';

            let roleLabel = line.role;
            let roleClass = 'role-clinic';
            if (line.role === 'AI Agent') roleClass = 'role-agent';
            else if (line.role === 'IVR') { roleClass = 'role-ivr'; roleLabel = 'SYSTEM'; }

            lineEl.innerHTML = `<span class="sim-role ${roleClass}">${roleLabel.toUpperCase()}:</span><span class="sim-text"> ${line.text}</span>`;
            transcript.appendChild(lineEl);
            transcript.scrollTop = transcript.scrollHeight;

            if (isAudioEnabled) {
                const utterance = new SpeechSynthesisUtterance(line.text);
                if (line.role === 'AI Agent') { utterance.pitch = 1.2; utterance.rate = 0.9; }
                else if (line.role === 'Clinic') { utterance.pitch = 0.85; utterance.rate = 1.0; }
                else if (line.role === 'IVR') { utterance.pitch = 0.5; utterance.rate = 0.85; }
                utterance.onend = showLine;
                utterance.onerror = () => setTimeout(showLine, 800);
                window.speechSynthesis.speak(utterance);
            } else {
                const delay = line.role === 'IVR' ? 800 : 1200 + line.text.length * 22;
                setTimeout(showLine, delay);
            }
        };

        // First line fires directly from button click — keeps user-gesture context for speech
        showLine();
    };

    if (startBtn) startBtn.addEventListener('click', () => runSimulation('standard'));
    if (complexBtn) complexBtn.addEventListener('click', () => runSimulation('complex'));
});
