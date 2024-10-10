import axios from 'axios';
const title = 'Kanojyo to Himitsu to Koimoyou';

const baseUrl = 'https://api.mangadex.org';

const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/manga`,
    params: {
        title: title
    }
});

console.log(resp.data.data.map(manga => manga.id));