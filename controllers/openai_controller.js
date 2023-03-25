//for more details: https://platform.openai.com/docs/guides/images/usage

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(req, res) {
  try {
    const { prompt, size } = req.body || {};

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "'prompt' is a required property",
      });
    }

    const iconSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: iconSize,
    });

    const iconUrl = response?.data?.data?.[0]?.url;

    if (!iconUrl) {
      throw new Error('The image could not be generated');
    }

    res.status(200).json({
      success: true,
      data: iconUrl,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      error: error.message || 'The image could not be generated',
    });
  }
}

module.exports = { generateImage };

