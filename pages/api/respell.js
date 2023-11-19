// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require('dotenv').config();
import axios from 'axios';

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const SPELL_ID = process.env.SPELL_ID;
const SPELL_VERSION_ID = process.env.SPELL_VERSION_ID;

export default async function handler(req, res) {
  try {
    const { input } = req.body;

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (input == ''){
      return res.status(405).json({ error: 'No input was provided'});
    }

    const response = await axios.post(API_URL, {
      spellId: SPELL_ID,
      spellVersionId: SPELL_VERSION_ID,
      inputs: {
        input: input,
      },
    }, {
      headers: {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 300000,
    });

    const responseData = response.data.outputs;
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
