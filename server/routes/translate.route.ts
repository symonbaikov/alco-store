import express from 'express';
import translateService from '../services/translate.service';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    console.log('[Translate] Translating text:', { text, targetLang });
    const translation = await translateService.translateText(text, targetLang);
    console.log('[Translate] Translation result:', translation);

    res.json({ translation });
  } catch (error) {
    console.error('[Translate] Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

export default router; 