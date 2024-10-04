// const title = 'Kanojyo to Himitsu to Koimoyou';

// import axios from "axios";

// const baseUrl = 'https://api.mangadex.org';

// const resp = await axios({
//     method: 'GET',
//     url: `${baseUrl}/manga`,
//     params: {
//         title: title
//     }
// });

// console.log(resp.data.data.map(manga => manga.id));

import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.DB_USER);