export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).end();

    const { username } = req.body;
    if (!username) return res.status(400).json({ valid: false, error: 'Username required' });

    try {
        const r = await fetch('https://users.roblox.com/v1/usernames/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
        });
        const data = await r.json();
        if (data.data && data.data.length > 0) {
            const user = data.data[0];
            return res.status(200).json({ valid: true, userId: user.id, username: user.name, displayName: user.displayName });
        }
        return res.status(200).json({ valid: false, error: 'Roblox üzerinde böyle bir kullanıcı bulunamadı.' });
    } catch (e) {
        return res.status(500).json({ valid: false, error: 'Roblox API hatası.' });
    }
}