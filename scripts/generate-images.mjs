// Generates the Practice Areas + Process imagery via OpenRouter.
// Run: node --env-file=.env scripts/generate-images.mjs
//
// Requires OPEN_ROUTER_API_KEY in .env. Saves PNGs into:
//   public/images/services/{i,ii,iii,iv,v}-*.png
//   public/images/process/{001,002,003,004,005}-*.png

import { existsSync } from "node:fs"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const MODEL = process.env.IMAGE_MODEL ?? "openai/gpt-5-image"
const API_URL = "https://openrouter.ai/api/v1/chat/completions"

const STYLE = `Editorial cinematography, 16:9 widescreen landscape composition. Warm tungsten lighting with aged-brass highlights, deep ink shadows, low saturation, fine 35mm film grain, shallow depth of field, 50mm lens, Wall Street Journal photo essay aesthetic. Restrained and serious. No stiff stock-photo poses, no gavels, no scales-of-justice icons, no flags, no lens flares.`

const STYLE_DOCUMENTARY = `Editorial documentary photography, 16:9 widescreen landscape composition. Bright natural daylight, soft diffused window light, clean neutral whites with warm midtones. Photojournalistic candid moment in a real working environment, no heavy color grading, no moodboard darkness, no orange-and-teal. Real professionals in natural mid-action poses, business attire, eyes on each other or on documents, never on camera. Trustworthy business-magazine feature quality, the kind of photo a Bloomberg or FT feature would run. Shot on 35mm with shallow depth of field, sharp focal subject, gentle film grain. No posed stock-photo handshakes, no AI-looking faces, no flags, no logos, no gavels.`

const STYLE_PORTRAIT = `Premium attorney biography portrait, 3:4 vertical composition. Warm and evenly lit, bright midtones, soft directional fill from the side, gentle natural shadow on one side of the face. NOT cinematic chiaroscuro, NOT moody, NOT silhouetted. The subject faces toward camera with a calm, composed, authoritative expression, eyes looking directly at the lens. Photographed in a real upmarket law-firm office or library, softly out-of-focus background of warm wood paneling and rows of leather-bound legal books, perhaps a warm tungsten lamp or brass desk fitting blurred in the bokeh. Tasteful warm color palette: deep walnut browns, soft golds, cream skin tones. Shot on an 85mm portrait lens at f/2, sharp focal plane on the eyes, beautiful natural skin texture, gentle 35mm film grain. Magazine bio-page quality, the kind of portrait a top New York law firm would commission. Real, believable faces with natural skin and pores, NOT a glossy AI stock illustration, NOT plasticky. No flags, no logos, no gavels, no scales-of-justice icons.`

// Same warm, evenly-lit lighting and palette as the partner portraits, but
// for 16:9 scene/still-life compositions instead of a person facing camera.
const STYLE_WARM = `Premium editorial still photography, 16:9 widescreen landscape composition. Warm and evenly lit, bright midtones, soft directional daylight fill, gentle natural shadow. NOT cinematic chiaroscuro, NOT moody, NOT dark, NOT dusk, NOT night, NOT silhouetted. Tasteful warm color palette: deep walnut browns, soft golds, cream and ivory tones, warm wood paneling and leather, the same look as a top New York law firm's bio portraits. Photographed in an upmarket firm interior with softly out-of-focus warm backgrounds and rows of leather-bound legal books. Shot on an 85mm lens at f/2, sharp focal plane, shallow depth of field, beautiful natural texture, gentle 35mm film grain. Refined magazine feature quality, believable and real, NOT a glossy AI stock illustration, NOT plasticky. No people facing the camera, no flags, no logos, no gavels, no scales-of-justice icons.`

// Cinematic, premium hero treatment, high-credibility but bright and warm.
// Lighter than a moody chiaroscuro: luminous warm light, refined (not flat,
// not murky) shadows. Drama from a prominent lit subject, not from darkness.
const STYLE_HERO = `Cinematic editorial photography, 16:9 widescreen hero composition. Premium and high-end with a bright, warm, luminous quality, soft warm directional daylight fills the scene and gently sculpts the subject, with refined restrained shadows (NOT murky, NOT flat, NOT washed out, NOT heavy chiaroscuro). Warm walnut browns, soft golds and honey tones, cream highlights, low-to-medium saturation, fine 35mm film grain, shallow depth of field, 50mm lens. The focal subject is sharp and prominent; the background gallery is softly out of focus and gently lit, never pitch black. The kind of arresting, trustworthy, high-value hero image a top-tier New York law firm would put on its homepage, conveys gravitas and credibility while feeling open and approachable. Photoreal and believable with natural skin and correct anatomy, especially hands, NOT plasticky, NOT an AI illustration, no warped fingers, no extra limbs. No logos, no flags, no gavels, no scales-of-justice icons.`

const jobs = [
  // Hero, match the reference: blonde advocate from the right, arm extended
  // left to the gallery; same composition as the original, but lighter/warmer.
  {
    out: "public/images/hero/courtroom.png",
    style: STYLE_HERO,
    scene:
      "A wide establishing cinematic shot of a grand ornate wood-paneled American courtroom, true 16:9 widescreen with a lot of room and air. A female trial attorney stands at counsel's table in the right third of the frame, seen from behind in three-quarter profile at a comfortable medium distance, she is NOT zoomed in or cropped tight; there is generous headroom above her and open space around her. She wears a flowing black advocate's robe with billowing sleeves; her blonde hair is in a low ponytail tied with a slim black ribbon, a small gold earring catching the light, face in soft profile. She extends her arm out to the left, hand open in a measured, eloquent gesture toward the court. Across the left two-thirds of the frame, a packed gallery and jury box of attentive, well-dressed spectators sit softly lit and gently out of focus, with depth into the room. A framed portrait on the right wall, a brass chandelier glowing in the upper right, a soft shaft of warm light falling from high above. In the foreground a polished dark-walnut desk with open law books, papers, and a glass of water. Bright, warm, and luminous, clearly lit and fully readable, not dark or murky, while keeping cinematic depth. The hand is anatomically correct and natural.",
  },
  // Practice Areas
  {
    out: "public/images/services/i-corporate.png",
    style: STYLE_WARM,
    scene:
      "A heavy walnut conference table at desk height, a leather portfolio open over a stack of contract pages, a fountain pen resting across them. Two figures partially visible, well-tailored sleeves and hands, no faces, leaning slightly toward a quiet discussion. Bright warm daylight fills the room from a tall window, soft even light across the table, warm wood paneling behind.",
  },
  {
    out: "public/images/services/ii-litigation.png",
    style: STYLE_WARM,
    scene:
      "An empty warm wood-paneled American courtroom shot from the gallery, bright warm daylight pouring through tall arched windows onto rows of warm oak benches. A single open binder and a glass of water at counsel's table in the foreground. Clean and luminous, no people.",
  },
  {
    out: "public/images/services/iii-compliance.png",
    style: STYLE_WARM,
    scene:
      "Floor-to-ceiling shelves of leather-bound regulatory binders in a private firm library, bright warm daylight filling the room evenly across the spines. One binder pulled half-out at eye level, its tab catching the light. Warm walnut shelving, soft golds and creams, no people.",
  },
  {
    out: "public/images/services/iv-ip.png",
    style: STYLE_WARM,
    scene:
      "Overhead view of a tidy walnut drafting table: a flat patent diagram drawn in ink, a brass-handled magnifier, a fountain pen, and a stamped USPTO envelope. Bright warm daylight from a window above, soft gentle shadows across the paper, warm wood tones. Hands not visible.",
  },
  {
    out: "public/images/services/v-restructuring.png",
    style: STYLE_WARM,
    scene:
      "A single attorney's walnut desk inside a bright warmly-lit office during the day, an open restructuring report with spreadsheets, a fountain pen, a cup of coffee, softly out-of-focus rows of leather-bound books behind, warm daylight through the window. No person visible, just a calm workspace mid-task.",
  },
  // Process
  {
    out: "public/images/process/001-intake.png",
    style: STYLE_WARM,
    scene:
      "A senior partner's hand resting on a desk phone receiver, the other holding a fountain pen above a fresh yellow legal pad on a leather desk blotter, atop a polished walnut desk. Bright warm daylight pours through tall windows across the desk; softly out-of-focus rows of leather-bound books behind. Camera focused on the pen-hand; the partner soft and cut off above frame.",
  },
  {
    out: "public/images/process/002-strategy.png",
    style: STYLE_WARM,
    scene:
      "A long walnut conference table covered in spread-open case binders, marked-up timelines on butcher paper, and a couple of coffee cups, in a bright warmly-lit firm conference room with soft daylight from a wall of windows and warm wood paneling. A pair of hands gesturing over the timeline mid-discussion. Other figures softly out of focus at the table edges, no faces.",
  },
  {
    out: "public/images/process/003-discovery.png",
    style: STYLE_WARM,
    scene:
      "Counsel's hands working through a neat stack of tabbed deposition transcripts, a yellow highlighter in one hand, sticky tabs marking key pages, on a warm walnut desk. Bright even warm daylight fills the room, softly out-of-focus rows of leather-bound legal books behind. The documents are the hero, not the person.",
  },
  {
    out: "public/images/process/004-pretrial.png",
    style: STYLE_WARM,
    scene:
      "The wide limestone steps of a federal courthouse in warm late-morning sunlight. A figure in a tailored overcoat carrying a leather litigation briefcase walks toward the columned entrance, seen from behind at half distance. Bright warm daylight, soft long shadows, clear warm sky, warm stone tones.",
  },
  {
    out: "public/images/process/005-verdict.png",
    style: STYLE_WARM,
    scene:
      "A calm empty American courtroom photographed from the judge's bench looking out, empty jury box at left, empty counsel tables ahead, gallery benches behind. Bright warm daylight streams through tall side windows across warm oak benches and the polished wood floor. Clean, luminous, and still. No people.",
  },
  // Case Studies, varied moments, not all multi-person meetings
  {
    out: "public/images/cases/01-energy.png",
    style: STYLE_WARM,
    scene:
      "Anna Petrova, a composed partner in her early forties with long blonde hair softly waved and a fair complexion, in a tailored dark blazer, a senior litigator alone at counsel's table inside a warm wood-paneled American courtroom after a hearing has ended. She is calmly closing a thick three-ring binder and sliding it into a leather case-file portfolio, her face in a calm three-quarter view. The jury box on the right is empty, the judge's bench in the background unoccupied. Bright warm daylight pours through tall arched courtroom windows onto warm oak benches and the polished wood table. A second binder, a water glass, and a pen rest on the table. The composed moment after a quiet professional win. Portrait-forward single-figure composition with the partner prominent, shot at gallery height.",
  },
  {
    out: "public/images/cases/02-pharma.png",
    style: STYLE_WARM,
    scene:
      "Rachel Lee, a composed partner in her late thirties with shoulder-length wavy brunette hair and a fair complexion, in a fitted dark blazer, senior counsel mid-argument at a wooden podium in a warm wood-paneled courtroom, addressing the bench. Her hand is mid-gesture toward a printed demonstrative exhibit on a tripod easel beside her, a clean timeline graphic with no logos. The judge's bench is partially visible in the background; an out-of-focus court reporter to the side. Bright warm daylight from tall side windows, warm courtroom tones. A dynamic working moment, three-quarter view of the attorney mid-speech, dignified and real. Portrait-forward composition with the partner prominent.",
  },
  {
    out: "public/images/cases/03-banking.png",
    style: STYLE_WARM,
    scene:
      "An overhead detail shot of two pairs of hands meeting across a polished walnut signing table, one hand, with a small leather cuff and a steel watch, holding a fountain pen mid-signature on the final page of a thick stapled term sheet titled 'PLAN OF REORGANIZATION'; the other set of hands resting beside a sleek closed laptop and a small espresso cup. A handsome leather portfolio open at the edge of frame, a faint reflection of a Manhattan window in the table surface. Soft natural daylight from the left. No faces visible, the document and the act of signing are the subject. Quiet, decisive, important.",
  },
  {
    out: "public/images/cases/04-tech.png",
    style: STYLE_WARM,
    scene:
      "Two attorneys descending the broad stone steps of a federal building in late-morning sun after a hearing. A woman in her early forties in a tailored slate-gray suit leads, one hand carrying a slim leather case, the other gesturing in mid-conversation; a younger associate just behind her, carrying a banker's box of binders, listens intently. Both with relaxed, confident half-smiles, the easy posture of a team that just won, not staged celebration. Bright daylight, classical limestone columns and steps behind them, slightly low camera angle, photojournalistic and moving with them. No identifiable signage, no flags.",
  },
  // Partners, warm well-lit attorney bio portraits, library backdrop, facing camera
  {
    out: "public/images/partners/01-anderson.png",
    style: STYLE_PORTRAIT,
    scene:
      "A confident woman in her early fifties, shoulder-length dark hair softly waved, fair skin, subtle makeup, in a tailored navy blazer over a crisp white shirt with the collar open. Seated at a polished walnut partners desk in a warmly-lit law-firm office, hands resting easily on the desk, slight lean forward. Background: softly out-of-focus rows of leather-bound legal books on warm wooden shelves. She looks directly at the camera with a composed, authoritative half-smile. Even soft side light on her face, warm midtones, no harsh shadows.",
  },
  {
    out: "public/images/partners/02-klein.png",
    style: STYLE_PORTRAIT,
    scene:
      "A confident man in his early forties, well-groomed dark hair and a trimmed beard with traces of silver, fair complexion, in a sharp charcoal suit with a deep red tie and white shirt. Standing arms calmly folded in front of a wall of warm leather-bound legal books in a softly lit firm library. He looks directly at the camera with a calm, serious half-smile. Warm soft side fill light, no harsh shadows, warm wood-toned bokeh behind him.",
  },
  {
    out: "public/images/partners/03-lee.png",
    style: STYLE_PORTRAIT,
    scene:
      "A composed woman in her late thirties, shoulder-length wavy brunette hair, fair complexion, in a fitted black blazer over a cream shirt. Standing in a warmly lit law-firm library with rows of softly-out-of-focus leather-bound books and a vintage brass desk lamp behind her. Hands relaxed at her sides, slight three-quarter turn but face fully toward camera with a calm, intelligent expression and a small confident smile. Warm even side fill light, soft natural shadow.",
  },
  {
    out: "public/images/partners/04-singh.png",
    style: STYLE_PORTRAIT,
    scene:
      "A composed man in his mid fifties, salt-and-pepper hair neatly combed, glasses, well-groomed gray beard, in a charcoal suit with a navy tie and white shirt. Seated at a polished walnut desk in a warmly lit wood-paneled office, hands clasped in front of him on a leather portfolio. Background: softly out-of-focus rows of leather books and a vintage globe. He looks directly at the camera with a steady, distinguished, trustworthy expression. Warm even fill light from the side, gentle natural shadow.",
  },
  {
    out: "public/images/partners/05-petrova.png",
    style: STYLE_PORTRAIT,
    scene:
      "A composed woman in her early forties, long blonde hair softly waved, fair complexion, in a tailored black blazer over a black shirt. Standing arms gently folded in a warmly lit firm library, softly out-of-focus floor-to-ceiling rows of leather-bound books behind her, a brass-shaded library lamp glowing on a desk in the bokeh, a small green potted plant. She looks directly at the camera with a calm, focused, professional expression. Warm even side fill light, no heavy shadows.",
  },
  {
    out: "public/images/partners/06-okonkwo.png",
    style: STYLE_PORTRAIT,
    scene:
      "A composed man in his late thirties, close-cropped hair, clean-shaven, warm brown skin, in a deep charcoal three-piece suit with a burgundy tie and crisp white shirt. Standing in a warmly lit firm library, hands relaxed at his sides, slight three-quarter body turn but face fully toward camera with a calm, dignified, slightly approachable expression. Background: softly out-of-focus rows of leather-bound books on warm wooden shelves. Warm even side fill light, gentle soft shadow.",
  },
]

const apiKey = process.env.OPEN_ROUTER_API_KEY ?? process.env.OPENROUTER_API_KEY
if (!apiKey) {
  console.error(
    "Missing OPEN_ROUTER_API_KEY (or OPENROUTER_API_KEY) in environment. Run with: node --env-file=.env scripts/generate-images.mjs"
  )
  process.exit(1)
}

console.log(`Generating ${jobs.length} images with ${MODEL}…`)

async function generateOne({ out, scene, style }, idx) {
  const fullPrompt = `${scene}\n\n${style ?? STYLE}`
  const label = `[${idx + 1}/${jobs.length}] ${out}`
  const fullPath = resolve(ROOT, out)
  if (!process.env.FORCE && existsSync(fullPath)) {
    console.log(`${label} skipped (already exists; set FORCE=1 to regenerate)`)
    return true
  }
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://verdict.local",
        "X-Title": "Verdict template imagery",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: fullPrompt }],
        modalities: ["image", "text"],
        max_tokens: Number(process.env.MAX_TOKENS ?? 50000),
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`${label} FAILED (${res.status}): ${text.slice(0, 400)}`)
      return false
    }
    const json = await res.json()
    const dataUrl = json?.choices?.[0]?.message?.images?.[0]?.image_url?.url
    if (!dataUrl) {
      console.error(
        `${label} no image in response: ${JSON.stringify(json).slice(0, 400)}`
      )
      return false
    }
    const base64 = dataUrl.split(",")[1]
    const buf = Buffer.from(base64, "base64")
    await mkdir(dirname(fullPath), { recursive: true })
    await writeFile(fullPath, buf)
    console.log(`${label} saved (${(buf.length / 1024).toFixed(0)} KB)`)
    return true
  } catch (err) {
    console.error(`${label} threw: ${err?.message ?? err}`)
    return false
  }
}

const results = await Promise.all(jobs.map((job, i) => generateOne(job, i)))
const ok = results.filter(Boolean).length
console.log(`\nDone, ${ok}/${jobs.length} succeeded.`)
process.exit(ok === jobs.length ? 0 : 1)
