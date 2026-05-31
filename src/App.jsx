import { useState } from 'react'
import { TEMPLATES, generateOutline, generatePPTX } from './templates'
import './index.css'

function SlidePreview({ slide, template, isActive, onClick }) {
  const cs = template.colorScheme
  const bg = 'linear-gradient(135deg, ' + cs.primary + ', ' + cs.secondary + ')'
  const renderContent = () => {
    if (slide.type === 'title') {
      return (
        <div className="slide-content text-center" style={{ background: bg, color: cs.text }}>
          <div className="text-lg font-bold mb-1 truncate">{slide.title}</div>
          {slide.subtitle && <div className="text-xs opacity-80">{slide.subtitle}</div>}
          <div className="w-12 h-0.5 mx-auto mt-2 opacity-60" style={{ background: cs.accent }}></div>
        </div>
      )
    }
    if (slide.type === 'end') {
      return (
        <div className="slide-content text-center" style={{ background: bg, color: cs.text }}>
          <div className="text-lg font-bold">{slide.title}</div>
          {slide.subtitle && <div className="text-xs opacity-80 mt-1">{slide.subtitle}</div>}
        </div>
      )
    }
    if (slide.type === 'toc') {
      return (
        <div className="slide-content p-3" style={{ background: cs.bg }}>
          <div className="text-sm font-bold mb-2" style={{ color: cs.primary }}>{slide.title}</div>
          <div className="w-8 h-0.5 mb-2" style={{ background: cs.accent }}></div>
          <div className="text-xs space-y-1">
            {(slide.items || []).map((item, i) => (
              <div key={i} className="truncate" style={{ color: cs.textDark }}>{i + 1}. {item}</div>
            ))}
          </div>
        </div>
      )
    }
    return (
      <div className="slide-content p-3" style={{ background: cs.bg }}>
        <div className="text-sm font-bold mb-2" style={{ color: cs.primary }}>{slide.title}</div>
        <div className="w-8 h-0.5 mb-2" style={{ background: cs.accent }}></div>
        <div className="text-xs space-y-1">
          {(slide.bullets || []).map((bullet, i) => (
            <div key={i} className="truncate" style={{ color: cs.textDark }}>- {bullet}</div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className={'slide-preview rounded-lg cursor-pointer transition-all duration-200 ' + (isActive ? 'ring-2 ring-brand-500 shadow-lg scale-105' : 'hover:shadow-md hover:scale-[1.02]')} onClick={onClick}>
      {renderContent()}
    </div>
  )
}

function SlideEditor({ slide, onUpdate }) {
  const updateField = (field, value) => onUpdate({ ...slide, [field]: value })
  const updateBullet = (index, value) => {
    const nb = [...(slide.bullets || [])]
    nb[index] = value
    onUpdate({ ...slide, bullets: nb })
  }
  const addBullet = () => onUpdate({ ...slide, bullets: [...(slide.bullets || []), 'New Point'] })
  const removeBullet = (index) => onUpdate({ ...slide, bullets: (slide.bullets || []).filter((_, i) => i !== index) })

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" value={slide.title} onChange={(e) => updateField('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm" />
      </div>
      {slide.subtitle !== undefined && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input type="text" value={slide.subtitle || ''} onChange={(e) => updateField('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm" />
        </div>
      )}
      {slide.bullets && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bullet Points</label>
          <div className="space-y-2">
            {slide.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={bullet} onChange={(e) => updateBullet(i, e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm" />
                <button onClick={() => removeBullet(i)} className="px-2 text-red-400 hover:text-red-600 text-sm">x</button>
              </div>
            ))}
            <button onClick={addBullet} className="text-brand-600 hover:text-brand-700 text-sm font-medium">+ Add Point</button>
          </div>
        </div>
      )}
      {slide.items && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
          <div className="space-y-2">
            {slide.items.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => { const ni = [...slide.items]; ni[i] = e.target.value; onUpdate({ ...slide, items: ni }) }}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [topic, setTopic] = useState('')
  const [slideCount, setSlideCount] = useState(10)
  const [slides, setSlides] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [showExportSuccess, setShowExportSuccess] = useState(false)

  const handleGenerate = () => {
    if (!selectedTemplate || !topic.trim()) return
    const outline = generateOutline(selectedTemplate.id, slideCount)
    outline[0].title = topic
    setSlides(outline)
    setActiveSlide(0)
    setStep(2)
  }
  const updateSlide = (index, us) => { const ns = [...slides]; ns[index] = us; setSlides(ns) }
  const addSlide = () => setSlides([...slides, { title: 'New Slide', type: 'content', bullets: ['Point 1', 'Point 2', 'Point 3'] }])
  const removeSlide = (index) => {
    if (slides.length <= 2) return
    const ns = slides.filter((_, i) => i !== index); setSlides(ns)
    if (activeSlide >= ns.length) setActiveSlide(ns.length - 1)
  }
  const moveSlide = (index, dir) => {
    const ni = index + dir; if (ni < 0 || ni >= slides.length) return
    const ns = [...slides]; const t = ns[index]; ns[index] = ns[ni]; ns[ni] = t; setSlides(ns); setActiveSlide(ni)
  }
  const handleExport = async () => {
    setIsExporting(true)
    try {
      const pptx = await generatePPTX(slides, selectedTemplate)
      const fn = topic.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '_') + '.pptx'
      await pptx.writeFile({ fileName: fn })
      setShowExportSuccess(true)
      setTimeout(() => setShowExportSuccess(false), 3000)
    } catch (err) { console.error(err) }
    setIsExporting(false)
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center text-white font-bold text-lg">S</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SlideAI</h1>
                <p className="text-xs text-gray-500">Smart PPT Generator</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Free - No Sign Up</span>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create Professional PPT in 3 Steps</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Choose template - Enter topic - Edit and export</p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Template</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.values(TEMPLATES).map((tpl) => (
                <button key={tpl.id} onClick={() => setSelectedTemplate(tpl)}
                  className={'p-4 rounded-xl border-2 transition-all duration-200 text-left ' + (selectedTemplate?.id === tpl.id ? 'border-brand-500 bg-brand-50 shadow-md' : 'border-gray-200 bg-white hover:border-brand-300 hover:shadow-sm')}>
                  <div className="text-2xl mb-2">{tpl.icon}</div>
                  <div className="font-semibold text-sm text-gray-900">{tpl.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{tpl.description}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Enter Topic</h3>
            <div className="space-y-4">
              <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Q2 Product Review, Startup Pitch Deck, Thesis Defense..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent text-base" />
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600">Slides:</label>
                <input type="range" min="5" max="15" value={slideCount} onChange={(e) => setSlideCount(parseInt(e.target.value))} className="flex-1 max-w-xs" />
                <span className="text-sm font-semibold text-brand-600 w-8">{slideCount}</span>
              </div>
              <button onClick={handleGenerate} disabled={!selectedTemplate || !topic.trim()}
                className={'w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 ' + (selectedTemplate && topic.trim() ? 'bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-lg hover:shadow-xl export-btn' : 'bg-gray-300 cursor-not-allowed')}>
                Generate PPT Outline
              </button>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-white/60 border border-gray-100">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-1">Fast Generation</h4>
              <p className="text-sm text-gray-500">Generate complete PPT outline in seconds</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/60 border border-gray-100">
              <div className="text-3xl mb-3">🎨</div>
              <h4 className="font-semibold text-gray-900 mb-1">5 Styles</h4>
              <p className="text-sm text-gray-500">Business, Pitch, Academic, Creative, Minimal</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/60 border border-gray-100">
              <div className="text-3xl mb-3">📥</div>
              <h4 className="font-semibold text-gray-900 mb-1">Export PPTX</h4>
              <p className="text-sm text-gray-500">Compatible with WPS and Office</p>
            </div>
          </div>
          <footer className="mt-20 text-center text-xs text-gray-400 space-y-2">
            <p>SlideAI - Free Online PPT Generator | AI Slide Maker | Presentation Tool</p>
            <p>Supports: Business Report, Pitch Deck, Thesis Defense, Creative Proposal, Minimal</p>
          </footer>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 text-sm">Back</button>
          <div className="h-5 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedTemplate.icon}</span>
            <span className="font-semibold text-gray-800">{topic}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{slides.length} slides</span>
          <button onClick={handleExport} disabled={isExporting}
            className="export-btn px-6 py-1.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white rounded-lg font-semibold text-sm disabled:opacity-50">
            {isExporting ? 'Exporting...' : 'Export PPTX'}
          </button>
        </div>
      </header>
      {showExportSuccess && <div className="bg-green-500 text-white text-center py-2 text-sm font-medium">PPTX exported successfully!</div>}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-48 bg-white border-r border-gray-200 overflow-y-auto p-3 space-y-3 editor-panel shrink-0">
          {slides.map((slide, index) => (
            <div key={index} className="group relative">
              <SlidePreview slide={slide} template={selectedTemplate} isActive={activeSlide === index} onClick={() => setActiveSlide(index)} />
              <div className="absolute top-1 right-1 text-xs text-white bg-black/40 rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">{index + 1}</div>
              <div className="absolute -top-1 -right-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {index > 0 && <button onClick={() => moveSlide(index, -1)} className="w-5 h-5 bg-white rounded shadow text-xs hover:bg-gray-100">^</button>}
                {index < slides.length - 1 && <button onClick={() => moveSlide(index, 1)} className="w-5 h-5 bg-white rounded shadow text-xs hover:bg-gray-100">v</button>}
                {slides.length > 2 && <button onClick={() => removeSlide(index)} className="w-5 h-5 bg-red-500 text-white rounded shadow text-xs hover:bg-red-600">x</button>}
              </div>
            </div>
          ))}
          <button onClick={addSlide} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:text-brand-500 hover:border-brand-300 text-sm">+ Add</button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-auto">
          <div className="w-full max-w-4xl">
            <div className="slide-preview rounded-xl shadow-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <SlidePreview slide={slides[activeSlide]} template={selectedTemplate} isActive={true} onClick={() => {}} />
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))} disabled={activeSlide === 0} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-30 text-sm">Prev</button>
              <span className="text-sm text-gray-500">{activeSlide + 1} / {slides.length}</span>
              <button onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))} disabled={activeSlide === slides.length - 1} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-30 text-sm">Next</button>
            </div>
          </div>
        </div>
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-4 editor-panel shrink-0">
          <h3 className="font-semibold text-gray-800 mb-4">Edit Slide {activeSlide + 1}</h3>
          <SlideEditor slide={slides[activeSlide]} onUpdate={(u) => updateSlide(activeSlide, u)} />
        </div>
      </div>
    </div>
  )
}

export default App
