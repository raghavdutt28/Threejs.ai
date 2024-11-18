import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

const HF_API_URL = 'https://api-inference.huggingface.co/models/Shitao/OmniGen-v1';



router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E Routes" })
})

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        // const response = await openai.images.generate({
        //     prompt,
        //     n: 1,
        //     size: '1024x1024',
        //     response_format: 'b64_json'
        // });
        const response = await axios.post(
            HF_API_URL,
            { inputs: prompt },
            { timeout: 30000 },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json"
                },
            }
        );

        const image = response.data;
        res.status(200).json({ photo: image })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
        if (error.response) {
            console.log("error status: ", error.response.status);
            console.log("error data: ", error.response.data);
        }
    }
})

export default router;