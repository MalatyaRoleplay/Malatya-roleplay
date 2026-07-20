export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end();

    const { embed } = req.body;
    if (!embed) return res.status(400).json({ error: 'embed required' });

    const webhookUrl = 'https://discord.com/api/webhooks/1528733710197854308/FXMlisk8zg2PSTlsFGPpPj35LOztlw_aQSxAQG6Tyc3EV_25ThwcDEvdOPNwWFtzBe4j';

    try {
        const r = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds: [embed] })
        });
        return res.status(200).json({ ok: true, status: r.status });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}