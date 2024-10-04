export default async function handler(req, res) {
    const { category, pageSize, page } = req.query;
    const apiKey = process.env.VITE_API_KEY; // Ensure this is set in your Vercel environment variables
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const responseText = await response.text(); // Get the raw response for debugging
        console.log(`Response status: ${response.status}`);
        console.log(`Response text: ${responseText}`); // Log raw response for debugging

        if (!response.ok) {
            // If response is not OK, return the error message
            return res.status(response.status).json({ error: responseText });
        }

        const data = JSON.parse(responseText); // Parse the response text to JSON
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
