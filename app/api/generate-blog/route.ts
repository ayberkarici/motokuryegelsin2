import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

// Master Prompt for Blog Generation
const MASTER_PROMPT = `Sen "Moto Kurye Gelsin" için SEO odaklı, profesyonel blog içerikleri üreten bir yapay zeka içerik yazarısın.

ŞİRKET BİLGİLERİ:
- Şirket: Moto Kurye Gelsin
- Web: https://www.motokuryegelsin.com
- Telefon: 0541 695 52 99
- WhatsApp: 905416955299
- Adres: Baraj sk. No: 44-46 Ümraniye / İstanbul
- Slogan: "Hızlı, Güvenli, Ekonomik"

HİZMETLER:
1. Döküman Teslimatı (/hizmetler/dokuman-teslimat)
2. Paket Kargo (/hizmetler/paket-kargo)
3. Acil Kurye (/hizmetler/acil-kurye)
4. Kurumsal Çözümler (/hizmetler/kurumsal-cozumler)

TESLİMAT SÜRELERİ:
- VIP: 1 saat içinde
- Express: 1-2 saat
- Normal: 2-4 saat

İSTANBUL İLÇELERİ (İlçe sayfası: /ilceler/[slug]):
Anadolu: Adalar, Ataşehir, Beykoz, Çekmeköy, Kadıköy, Kartal, Maltepe, Pendik, Sancaktepe, Sultanbeyli, Şile, Tuzla, Ümraniye, Üsküdar
Avrupa: Arnavutköy, Avcılar, Bağcılar, Bahçelievler, Bakırköy, Başakşehir, Bayrampaşa, Beşiktaş, Beylikdüzü, Beyoğlu, Büyükçekmece, Çatalca, Esenler, Esenyurt, Eyüpsultan, Fatih, Gaziosmanpaşa, Güngören, Kağıthane, Küçükçekmece, Sarıyer, Silivri, Sultangazi, Şişli, Zeytinburnu

SİTE İÇİ LİNKLER:
- Ana Sayfa: /
- Blog: /blog
- İletişim: /iletisim
- Kurye Çağır: /kurye-cagir
- Hakkımızda: /hakkimizda

İÇERİK KURALLARI:
1. MİNİMUM 600 KELİME (zorunlu)
2. ZENGİN HTML YAPISI (ÇOK ÖNEMLİ):
   - Tek <h1> ana başlık
   - En az 4 adet <h2> alt başlık (her biri konuyu bölen)
   - En az 3 adet <h3> alt-alt başlık
   - <strong> ile önemli kelimeleri kalın yap
   - <em> ile vurgular ekle
   - <mark> ile önemli bilgileri sarı ile işaretle
   
3. LİSTELER VE MADDELER (ZORUNLU):
   - Her bölümde en az 1 liste kullan
   - <ul><li> ile madde işaretli listeler
   - <ol><li> ile numaralı listeler
   - Avantajlar, özellikler, adımlar için liste kullan
   
4. GÖRSEL AYIRICILAR:
   - Bölümler arası <hr class="my-6"> kullan
   - Paragraflar arası yeterli boşluk bırak
   - <blockquote> ile önemli alıntılar/notlar ekle
   
5. RENKL LİNKLER VE CTA:
   - Site içi linkler: <a href="/ilceler/kadikoy" class="text-blue-600 hover:text-blue-800 font-semibold underline">Kadıköy kurye hizmeti</a>
   - En az 4-5 site içi link ekle
   - CTA butonları: <a href="/kurye-cagir" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 mt-4">🚀 Hemen Kurye Çağır</a>
   - WhatsApp linki: <a href="https://wa.me/905416955299" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">📱 WhatsApp ile İletişim</a>
   
6. BİLGİ KUTULARI:
   - İpucu kutusu: <div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-4"><strong>💡 İpucu:</strong> içerik</div>
   - Uyarı kutusu: <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4"><strong>⚠️ Önemli:</strong> içerik</div>
   - Bilgi kutusu: <div class="bg-green-50 border-l-4 border-green-500 p-4 my-4"><strong>✅ Bilgi:</strong> içerik</div>

7. ANAHTAR KELİME:
   - Ana kelime: Başlıkta, ilk ve son paragrafta
   - Doğal kullanım, spam yapma
   
8. SON BÖLÜM (ZORUNLU):
   - Özet paragrafı
   - İletişim bilgileri kutusu
   - İki adet CTA butonu (Kurye Çağır + WhatsApp)

ÇIKTI FORMATI (JSON):
{
  "title": "SEO uyumlu başlık",
  "slug": "url-slug-turkce-karaktersiz",
  "excerpt": "150-200 kelimelik özet",
  "content": "<article class='blog-content'>HTML içerik</article>",
  "meta_title": "Max 60 karakter meta başlık",
  "meta_description": "Max 160 karakter meta açıklama",
  "meta_keywords": ["anahtar1", "anahtar2", "anahtar3"]
}

UZUNLUK LİMİTİ (KRİTİK):
- İçerik (content alanı) 600-800 kelime arasında olmalı, ASLA 800 kelimeyi geçme
- Tüm JSON çıktısı 3000 kelimeyi geçmemeli
- Kısa ve öz yaz, gereksiz tekrarlardan kaçın

ÖNEMLİ:
- Sadece JSON döndür, başka bir şey yazma
- Türkçe karakterleri slug'da kullanma (ç->c, ş->s, ğ->g, ü->u, ö->o, ı->i)
- İçerik profesyonel, güven veren ve samimi olmalı
- Gerçek dışı vaatler yapma
- Her bölümde en az bir liste veya bilgi kutusu kullan
- Emoji kullanarak içeriği zenginleştir (🚀 📦 ✅ 💡 ⚡ 📍 etc.)`

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { keywords, additionalContext, tone, layout } = body

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: 'Keywords are required' },
        { status: 400 }
      )
    }

    // Tone ve layout için ek talimatlar
    let toneInstruction = ''
    if (tone) {
      const toneMap: Record<string, string> = {
        'professional': 'Profesyonel ve kurumsal bir dil kullan. Resmi ifadeler ve iş dünyasına uygun ton.',
        'friendly': 'Samimi ve arkadaşça bir dil kullan. Okuyucuyla sıcak bir bağ kur.',
        'informative': 'Bilgilendirici ve eğitici bir ton kullan. Detaylı açıklamalar ve örnekler ver.',
        'persuasive': 'İkna edici ve satış odaklı bir dil kullan. Harekete geçirici ifadeler kullan.',
        'urgent': 'Aciliyet hissi veren bir ton kullan. "Hemen", "Şimdi", "Kaçırmayın" gibi ifadeler ekle.',
        'storytelling': 'Hikaye anlatıcı bir ton kullan. Senaryolar, örnekler ve gerçek durumlar anlat.'
      }
      toneInstruction = toneMap[tone] || ''
    }

    let layoutInstruction = ''
    if (layout) {
      const layoutMap: Record<string, string> = {
        'standard': 'Klasik blog yapısı kullan: Giriş paragrafı, ana konular (2-3 bölüm), sonuç ve CTA.',
        'listicle': 'Liste formatında yaz. Başlıkta rakam kullan (örn: "5 Neden", "7 İpucu"). Her madde ayrı başlık altında.',
        'how-to': 'Adım adım rehber formatında yaz. "1. Adım:", "2. Adım:" şeklinde numaralı adımlar kullan.',
        'comparison': 'Karşılaştırma formatında yaz. Seçenekleri yan yana koyarak avantaj/dezavantajları listele.',
        'faq': 'Soru-cevap formatında yaz. Her bölüm bir soru başlığı ve detaylı cevap içersin.',
        'story': 'Hikaye anlatımı formatında yaz. Bir senaryo ile başla, problem tanımla, çözüm olarak hizmeti anlat.'
      }
      layoutInstruction = layoutMap[layout] || ''
    }

    const userPrompt = `
Aşağıdaki anahtar kelimeleri kullanarak bir blog yazısı oluştur:

ANAHTAR KELİMELER: ${keywords.join(', ')}

${toneInstruction ? `SÖYLEM TONU TALİMATI: ${toneInstruction}` : ''}

${layoutInstruction ? `YAZI YAPISI TALİMATI: ${layoutInstruction}` : ''}

${additionalContext ? `EK BAĞLAM VE TALİMATLAR:\n${additionalContext}` : ''}

Kuralları takip et ve JSON formatında yanıt ver.`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: MASTER_PROMPT },
              { text: userPrompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 12000,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API Error:', errorText)
      return NextResponse.json(
        { error: 'Failed to generate content', details: errorText },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      return NextResponse.json(
        { error: 'No content generated' },
        { status: 500 }
      )
    }

    let blogData
    const cleanedText = generatedText
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim()

    try {
      blogData = JSON.parse(cleanedText)
    } catch {
      // JSON truncated - try to recover by closing open strings and braces
      let fixed = cleanedText
      // If content field was cut off, close the HTML and JSON structure
      const contentMatch = fixed.match(/"content"\s*:\s*"/)
      if (contentMatch) {
        // Count unclosed braces/brackets
        const opens = (fixed.match(/(?<!\\)\{/g) || []).length
        const closes = (fixed.match(/(?<!\\)\}/g) || []).length
        const openBrackets = (fixed.match(/(?<!\\)\[/g) || []).length
        const closeBrackets = (fixed.match(/(?<!\\)\]/g) || []).length

        // Check if we're inside a string value (odd number of unescaped quotes after last key)
        const lastQuoteEven = (fixed.match(/(?<!\\)"/g) || []).length % 2 === 0
        if (!lastQuoteEven) {
          fixed += '"'
        }

        for (let i = 0; i < openBrackets - closeBrackets; i++) fixed += ']'
        for (let i = 0; i < opens - closes; i++) fixed += '}'
      }

      try {
        blogData = JSON.parse(fixed)
      } catch (finalError) {
        console.error('JSON Parse Error (unrecoverable):', finalError)
        return NextResponse.json(
          { error: 'Failed to parse generated content', raw: generatedText },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true, data: blogData })

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
