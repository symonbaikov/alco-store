import axios, { AxiosRequestConfig } from 'axios';
import { proxyConfig } from '../config/proxy';

class TranslateService {
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async translateWithRetry(text: string, targetLang: string, retries = 3, delayMs = 1000): Promise<string> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`[TranslateService] Attempt ${attempt} of ${retries} to translate to ${targetLang}`);
        
        if (attempt > 1) {
          await this.delay(delayMs * attempt);
        }

        const config: AxiosRequestConfig = {
          params: {
            client: 'gtx',
            sl: 'auto',
            tl: targetLang,
            dt: 't',
            q: text
          },
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
          }
        };

        // Добавляем настройки прокси только если они указаны
        if (proxyConfig.host) {
          config.proxy = {
            host: proxyConfig.host,
            port: proxyConfig.port,
            ...(proxyConfig.auth && { auth: proxyConfig.auth })
          };
        }

        const response = await axios.post('https://translate.googleapis.com/translate_a/single', null, config);

        if (!response.data?.[0]?.[0]?.[0]) {
          throw new Error('Invalid translation response format');
        }

        const translation = response.data[0].map((item: any[]) => item[0]).join('');
        console.log(`[TranslateService] Translation successful on attempt ${attempt}`);
        return translation;
      } catch (error) {
        console.error(`[TranslateService] Translation attempt ${attempt} failed:`, error);
        
        if (attempt === retries) {
          console.error('[TranslateService] All translation attempts failed');
          throw error;
        }
        
        const longerDelay = delayMs * 2 * attempt;
        console.log(`[TranslateService] Error occurred, waiting ${longerDelay}ms before next attempt`);
        await this.delay(longerDelay);
      }
    }
    return text;
  }

  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      // Если текст пустой или язык не указан, возвращаем исходный текст
      if (!text?.trim() || !targetLang) {
        return text;
      }

      // Если текст уже на целевом языке, возвращаем его
      if (targetLang === 'bg' && /^[А-Яа-яЁё\s.,!?-]+$/.test(text)) {
        return text;
      }

      console.log(`[TranslateService] Starting translation to ${targetLang}. Original text:`, text);
      
      const translation = await this.translateWithRetry(text, targetLang);
      
      console.log(`[TranslateService] Translation successful:`, {
        original: text,
        translated: translation
      });
      
      return translation;
    } catch (error) {
      console.error(`[TranslateService] Translation error for language ${targetLang}:`, error);
      return text;
    }
  }

  async translateReview(text: string): Promise<{ bg: string; en: string }> {
    try {
      console.log('[TranslateService] Starting review translation');
      
      // Переводим на болгарский
      const bgTranslation = await this.translateWithRetry(text, 'bg');
      // Добавляем задержку между переводами
      await this.delay(1500);
      // Переводим на английский
      const enTranslation = await this.translateWithRetry(text, 'en');

      return {
        bg: bgTranslation,
        en: enTranslation
      };
    } catch (error) {
      console.error('[TranslateService] Review translation error:', error);
      return {
        bg: text,
        en: text
      };
    }
  }
}

export default new TranslateService(); 