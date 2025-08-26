export async function translateText(text, targetLang = 'en') {
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

  const data = await res.json()
  return data.translatedText
}
