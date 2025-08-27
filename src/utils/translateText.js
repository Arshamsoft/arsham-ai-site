export async function translateText(text, targetLang) {
  try {
    const res = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'auto',
        target: targetLang,
        format: 'text'
      })
    })

    if (!res.ok) throw new Error('ترجمه شکست خورد')

    const data = await res.json()
    return data.translatedText
  } catch (error) {
    console.error('خطا در ترجمه:', error)
    return text // نمایش متن اصلی در صورت شکست ترجمه
  }
}
