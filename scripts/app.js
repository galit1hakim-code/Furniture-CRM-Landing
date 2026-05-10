document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabTitle = document.getElementById('tab-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-tab');
            
            // Update Active Nav
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update Tab Visibility
            tabContents.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === target) {
                    tab.classList.add('active');
                }
            });

            // Update Header Title
            tabTitle.textContent = item.textContent.trim().split(' ').slice(1).join(' ');
        });
    });

    // Generate Catalog Grids
    const modelsGrid = document.getElementById('models-grid');
    const colorsGrid = document.getElementById('colors-grid');

    // Create 10 model slots
    for (let i = 1; i <= 10; i++) {
        const box = createMediaBox(`דגם ${i}`, `assets/images/models/${i}.jpg`);
        modelsGrid.appendChild(box);
    }

    // Create 3 color slots
    for (let i = 1; i <= 3; i++) {
        const box = createMediaBox(`צבע ${i}`, `assets/images/colors/${i}.jpg`);
        colorsGrid.appendChild(box);
    }

    function createMediaBox(label, path) {
        const div = document.createElement('div');
        div.className = 'media-box';
        div.innerHTML = `
            <div class="upload-icon" style="text-align: center;">
                <span style="font-size: 2rem;">📤</span>
                <p style="font-size: 0.8rem; margin-top: 0.5rem; color: var(--text-muted);">${label}</p>
            </div>
            <img src="${path}" alt="${label}" onerror="this.style.display='none'; this.parentElement.classList.remove('has-image')">
        `;
        
        // Handle image loading to show/hide placeholder
        const img = div.querySelector('img');
        img.onload = () => div.classList.add('has-image');

        div.addEventListener('click', () => {
            alert(`כאן תוכל להעלות את התמונה עבור ${label}.\nפשוט שמור את הקובץ במיקום: ${path}`);
        });

        return div;
    }

    // Chat Simulator Logic
    const chatModal = document.getElementById('chat-modal');
    const startSimBtn = document.getElementById('start-sim-btn');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');

    startSimBtn.addEventListener('click', () => {
        chatModal.style.display = 'flex';
        runChatSimulation();
    });

    closeChat.addEventListener('click', () => {
        chatModal.style.display = 'none';
        chatMessages.innerHTML = '';
    });

    async function runChatSimulation() {
        chatMessages.innerHTML = '';
        
        // 1. User Message
        addMessage('user', 'היי, אני מעוניין לראות רהיטים לסלון');
        await wait(1500);

        // 2. Bot Greetings + Models
        addMessage('bot', 'היי! בשמחה. הנה 10 הדגמים המובילים שלנו בסגנון מודרני:');
        await wait(1000);
        addMediaMessage(10, 'models');
        await wait(3000);

        // 3. Bot Colors
        addMessage('bot', 'איזה דגם הכי אהבת? בכל מקרה, הנה 3 אפשרויות הצבעים והטקסטורות שלנו שמתאימות לכל הדגמים:');
        await wait(1000);
        addMediaMessage(3, 'colors');
        await wait(3000);

        // 4. Warm up the lead
        addMessage('bot', 'הדגמים האלו מיוצרים מחומרים איכותיים ביותר וכרגע יש לנו מבצע מיוחד לרוכשים דרך הווצאפ. תרצה שאבדוק לך זמינות במלאי עבור אחד מהם?');
    }

    function addMessage(type, text) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addMediaMessage(count, type) {
        const div = document.createElement('div');
        div.className = 'message bot';
        div.innerHTML = `
            <div style="margin-bottom: 0.5rem;">שלחתי לך ${count} תמונות של ${type === 'models' ? 'דגמים' : 'צבעים'}:</div>
            <div class="message-media" style="grid-template-columns: repeat(${count > 5 ? 5 : count}, 1fr);">
                ${Array.from({length: count}).map((_, i) => `<div style="background: var(--border); aspect-ratio:1; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:10px;">${i+1}</div>`).join('')}
            </div>
        `;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
