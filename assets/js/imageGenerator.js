async function generateProjectImage(projectDescription) {
    // Using OpenAI's DALL-E API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
            prompt: `Modern minimalist tech illustration for: ${projectDescription}`,
            n: 1,
            size: "512x512"
        })
    });

    const data = await response.json();
    return data.data[0].url;
}