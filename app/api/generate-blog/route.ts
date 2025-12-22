import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

// Master Prompt for Blog Generation
const MASTER_PROMPT = `Sen "Moto Kurye Gelsin" için SEO odaklı, profesyonel blog içerikleri üreten bir yapay zeka içerik yazarısın.

ŞİRKET BİLGİLERİ:
- Şirket: Moto Kurye Gelsin
- Web: https://www.motokuryegelsin.com
- Telefon: 0541 695 52 34
- WhatsApp: 905416955234
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
   - WhatsApp linki: <a href="https://wa.me/905416955234" class="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">📱 WhatsApp ile İletişim</a>
   
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
    const { keywords, additionalContext } = body

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: 'Keywords are required' },
        { status: 400 }
      )
    }

    const userPrompt = `
Aşağıdaki anahtar kelimeleri kullanarak bir blog yazısı oluştur:

ANAHTAR KELİMELER: ${keywords.join(', ')}

${additionalContext ? `EK BAĞLAM: ${additionalContext}` : ''}

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
          maxOutputTokens: 8192,
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

    // Try to parse the JSON from the response
    let blogData
    try {
      // Remove potential markdown code blocks
      const cleanedText = generatedText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      
      blogData = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Raw text:', generatedText)
      return NextResponse.json(
        { error: 'Failed to parse generated content', raw: generatedText },
        { status: 500 }
      )
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
