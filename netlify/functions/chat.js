exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { messages, system } = JSON.parse(event.body);

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + process.env.GROQ_API_KEY,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: system },
            ...messages
          ],
          max_tokens: 500,
        }),
      }
    );

    const data = await response.json();
    console.log('Groq response:', JSON.stringify(data));
    const text = data.choices?.[0]?.message?.content
      || 'Maaf, saya tidak bisa menjawab saat ini.';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    };
  } catch (err) {
    console.log('Error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
