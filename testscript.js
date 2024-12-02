class AsyncExtension {
    getInfo() {
        return {
            id: '5X4mTi6Jrjlj5GIdF8E1wjHKk7EZqP3x',
            name: 'ManuAI 1',
            blocks: [
                {
                    opcode: 'askGemini',
                    text: 'Ask Gemini [PROMPT]',
                    blockType: Scratch.BlockType.REPORTER, // Gibt einen Wert zurück
                    arguments: {
                        PROMPT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'Dein Text hier...'
                        }
                    }
                }
            ]
        };
    }

    async sendGeminiMessage(prompt) {
        const apiKey = "AIzaSyBlufg-dPAzgsT0ct9LzFW0yCBxM66RS6s"; // Dein API-Schlüssel
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

        if (!prompt) {
            console.log("Kein Prompt eingegeben. Abbruch der Anfrage.");
            return 'Kein Prompt angegeben.';
        }

        const data = {
            "prompt": {
                "text": prompt
            }
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Antwort von Gemini erhalten:", result);

                if (result.candidates && result.candidates[0] && result.candidates[0].output) {
                    return result.candidates[0].output;
                } else {
                    console.error("Keine gültige Antwort erhalten.");
                    return 'Keine Antwort erhalten.';
                }
            } else {
                console.error(`Fehler bei der Anfrage: ${response.status} ${response.statusText}`);
                return `Fehler: ${response.statusText}`;
            }
        } catch (error) {
            console.error("Netzwerk- oder Serverfehler:", error);
            return 'Netzwerk- oder Serverfehler.';
        }
    }

    async askGemini(args) {
        const prompt = args.PROMPT;
        const response = await this.sendGeminiMessage(prompt);
        return response;
    }
}

// Registrierung der Erweiterung
Scratch.extensions.register(new AsyncExtension());
