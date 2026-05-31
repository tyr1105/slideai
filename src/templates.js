// 幻灯片模板定义
export const TEMPLATES = {
  business: {
    id: 'business', name: '商业报告', nameEn: 'Business Report', icon: '📊',
    description: '适合工作汇报、季度总结、商业分析',
    colorScheme: { primary: '#1e3a5f', secondary: '#0f172a', accent: '#3b82f6', text: '#ffffff', textDark: '#1f2937', bg: '#f8fafc' },
  },
  pitch: {
    id: 'pitch', name: '创业路演', nameEn: 'Pitch Deck', icon: '🚀',
    description: '适合融资路演、产品发布、商业计划',
    colorScheme: { primary: '#7c3aed', secondary: '#4f46e5', accent: '#a78bfa', text: '#ffffff', textDark: '#1f2937', bg: '#faf5ff' },
  },
  education: {
    id: 'education', name: '学术答辩', nameEn: 'Thesis Defense', icon: '🎓',
    description: '适合毕业答辩、学术报告、课题展示',
    colorScheme: { primary: '#059669', secondary: '#0d9488', accent: '#34d399', text: '#ffffff', textDark: '#1f2937', bg: '#f0fdf4' },
  },
  creative: {
    id: 'creative', name: '创意提案', nameEn: 'Creative Proposal', icon: '🎨',
    description: '适合创意方案、设计提案、营销策划',
    colorScheme: { primary: '#f43f5e', secondary: '#e11d48', accent: '#fb7185', text: '#ffffff', textDark: '#1f2937', bg: '#fff1f2' },
  },
  minimal: {
    id: 'minimal', name: '极简风格', nameEn: 'Minimal', icon: '✨',
    description: '简洁大方，适合各种场景',
    colorScheme: { primary: '#ffffff', secondary: '#f9fafb', accent: '#0c93e7', text: '#1f2937', textDark: '#1f2937', bg: '#ffffff' },
  },
}

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) }
}

// 根据模板类型和页数生成幻灯片大纲
export function generateOutline(templateId, slideCount) {
  const outlines = {
    business: [
      { title: '标题', subtitle: '工作汇报', type: 'title' },
      { title: '目录', type: 'toc', items: ['项目概览', '核心数据', '关键进展', '挑战与应对', '下一步计划'] },
      { title: '项目概览', type: 'content', bullets: ['项目背景与目标', '团队架构', '关键里程碑', '时间线回顾'] },
      { title: '核心数据', type: 'content', bullets: ['KPI完成情况', '收入/用户增长', '转化率变化', '对比上一周期'] },
      { title: '关键进展', type: 'content', bullets: ['重大成果', '产品迭代', '市场突破', '团队成长'] },
      { title: '挑战与应对', type: 'content', bullets: ['遇到的主要挑战', '采取的应对措施', '效果评估', '经验教训'] },
      { title: '用户反馈', type: 'content', bullets: ['满意度调查', '典型用户案例', '改进建议', 'NPS评分'] },
      { title: '竞品分析', type: 'content', bullets: ['市场格局变化', '竞品动态', '我们的优势', '差距分析'] },
      { title: '下一步计划', type: 'content', bullets: ['下阶段目标', '重点项目', '资源需求', '预期成果'] },
      { title: '总结', type: 'content', bullets: ['核心成果', '关键数据', '团队贡献', '未来展望'] },
      { title: '谢谢', subtitle: 'Q & A', type: 'end' },
    ],
    pitch: [
      { title: '标题', subtitle: '融资路演', type: 'title' },
      { title: '我们是谁', type: 'content', bullets: ['团队背景', '核心竞争力', '为什么是我们', '愿景使命'] },
      { title: '问题', type: 'content', bullets: ['市场痛点', '用户未被满足的需求', '现有方案的不足', '市场验证数据'] },
      { title: '解决方案', type: 'content', bullets: ['产品介绍', '核心功能', '技术优势', '差异化价值'] },
      { title: '市场规模', type: 'content', bullets: ['TAM/SAM/SOM', '市场增速', '目标用户画像', '市场趋势'] },
      { title: '商业模式', type: 'content', bullets: ['收入模型', '定价策略', '获客渠道', 'LTV/CAC'] },
      { title: '产品演示', type: 'content', bullets: ['核心功能展示', '用户体验', '技术架构', '数据安全'] },
      { title: '进展', type: 'content', bullets: ['用户增长曲线', '收入数据', '关键合作伙伴', '里程碑'] },
      { title: '竞争格局', type: 'content', bullets: ['竞品对比', '我们的护城河', '市场份额', '防御策略'] },
      { title: '融资计划', type: 'content', bullets: ['融资金额', '估值', '资金用途', '退出策略'] },
      { title: '谢谢', subtitle: '期待与您合作', type: 'end' },
    ],
    education: [
      { title: '标题', subtitle: '学术答辩', type: 'title' },
      { title: '研究背景', type: 'content', bullets: ['研究问题', '研究意义', '国内外现状', '研究目标'] },
      { title: '文献综述', type: 'content', bullets: ['理论基础', '相关研究', '研究空白', '本文创新点'] },
      { title: '研究方法', type: 'content', bullets: ['研究设计', '数据来源', '分析方法', '技术路线'] },
      { title: '实验设计', type: 'content', bullets: ['实验环境', '变量定义', '控制方法', '评估指标'] },
      { title: '结果分析', type: 'content', bullets: ['主要发现', '数据可视化', '统计检验', '结果解读'] },
      { title: '讨论', type: 'content', bullets: ['与前人研究的对比', '理论贡献', '实践意义', '局限性'] },
      { title: '结论与展望', type: 'content', bullets: ['主要结论', '创新点总结', '未来研究方向', '致谢'] },
      { title: '参考文献', type: 'toc', items: ['[1] 作者, 标题, 期刊, 年份', '[2] 作者, 标题, 期刊, 年份', '[3] 作者, 标题, 期刊, 年份'] },
      { title: '谢谢', subtitle: '请各位老师批评指正', type: 'end' },
    ],
    creative: [
      { title: '标题', subtitle: '创意提案', type: 'title' },
      { title: '项目背景', type: 'content', bullets: ['市场洞察', '用户洞察', '品牌调性', '传播目标'] },
      { title: '创意概念', type: 'content', bullets: ['核心创意', '创意阐释', '视觉风格', '情感连接'] },
      { title: '目标受众', type: 'content', bullets: ['人群画像', '触媒习惯', '消费心理', '影响路径'] },
      { title: '创意执行', type: 'content', bullets: ['主视觉设计', '系列延展', '多渠道适配', '互动机制'] },
      { title: '传播策略', type: 'content', bullets: ['传播节奏', '渠道组合', 'KOL策略', '话题设计'] },
      { title: '案例参考', type: 'content', bullets: ['同行业标杆', '创新手法', '效果数据', '可借鉴点'] },
      { title: '执行计划', type: 'content', bullets: ['时间节点', '资源需求', '预算分配', '团队分工'] },
      { title: '效果预估', type: 'content', bullets: ['曝光预估', '互动预估', '转化预估', 'ROI分析'] },
      { title: '谢谢', subtitle: '期待合作', type: 'end' },
    ],
    minimal: [
      { title: '标题', subtitle: '演示文稿', type: 'title' },
      { title: '概述', type: 'content', bullets: ['背景介绍', '核心观点', '主要内容', '预期收获'] },
      { title: '第一部分', type: 'content', bullets: ['要点一', '要点二', '要点三', '要点四'] },
      { title: '第二部分', type: 'content', bullets: ['要点一', '要点二', '要点三', '要点四'] },
      { title: '第三部分', type: 'content', bullets: ['要点一', '要点二', '要点三', '要点四'] },
      { title: '数据展示', type: 'content', bullets: ['关键指标', '趋势分析', '对比数据', '核心发现'] },
      { title: '案例分析', type: 'content', bullets: ['案例背景', '实施方案', '效果评估', '经验总结'] },
      { title: '总结', type: 'content', bullets: ['核心结论', '行动建议', '后续跟进', '预期成果'] },
      { title: '谢谢', subtitle: 'Questions?', type: 'end' },
    ],
  }
  const outline = outlines[templateId] || outlines.business
  return outline.slice(0, slideCount + 1)
}

// 生成PPTX文件
export async function generatePPTX(slides, template) {
  const PptxGenJS = (await import('pptxgenjs')).default
  const pptx = new PptxGenJS()
  const cs = template.colorScheme

  pptx.layout = 'LAYOUT_16x9'
  pptx.author = 'SlideAI'
  pptx.subject = slides[0]?.title || '演示文稿'

  const c = (hex) => hex.replace('#', '')

  slides.forEach((slide, index) => {
    const s = pptx.addSlide()

    if (slide.type === 'title') {
      s.background = { fill: c(cs.primary) }
      s.addText(slide.title, {
        x: 0.8, y: 2.0, w: 8.4, h: 1.5,
        fontSize: 36, fontFace: 'Microsoft YaHei', color: c(cs.text), bold: true, align: 'center',
      })
      if (slide.subtitle) {
        s.addText(slide.subtitle, {
          x: 0.8, y: 3.5, w: 8.4, h: 0.8,
          fontSize: 20, fontFace: 'Microsoft YaHei', color: c(cs.text), align: 'center',
        })
      }
      s.addShape(pptx.ShapeType.rect, { x: 3.5, y: 3.3, w: 3.0, h: 0.05, fill: { color: c(cs.accent) } })
    } else if (slide.type === 'end') {
      s.background = { fill: c(cs.primary) }
      s.addText(slide.title, {
        x: 0.8, y: 2.5, w: 8.4, h: 1.2,
        fontSize: 40, fontFace: 'Microsoft YaHei', color: c(cs.text), bold: true, align: 'center',
      })
      if (slide.subtitle) {
        s.addText(slide.subtitle, {
          x: 0.8, y: 3.8, w: 8.4, h: 0.8,
          fontSize: 18, fontFace: 'Microsoft YaHei', color: c(cs.text), align: 'center',
        })
      }
    } else if (slide.type === 'toc') {
      s.background = { fill: c(cs.bg) }
      s.addText(slide.title, {
        x: 0.8, y: 0.4, w: 8.4, h: 0.8,
        fontSize: 28, fontFace: 'Microsoft YaHei', color: c(cs.primary), bold: true,
      })
      s.addShape(pptx.ShapeType.rect, { x: 0.8, y: 1.2, w: 1.5, h: 0.05, fill: { color: c(cs.accent) } })
      if (slide.items) {
        const itemText = slide.items.map((item, i) => ({
          text: (i + 1) + '. ' + item,
          options: { fontSize: 18, fontFace: 'Microsoft YaHei', color: c(cs.textDark), breakType: 'paragraph', paraSpaceAfter: 12 },
        }))
        s.addText(itemText, { x: 1.2, y: 1.8, w: 7.6, h: 4.5 })
      }
    } else {
      s.background = { fill: c(cs.bg) }
      s.addText(slide.title, {
        x: 0.8, y: 0.4, w: 8.4, h: 0.8,
        fontSize: 26, fontFace: 'Microsoft YaHei', color: c(cs.primary), bold: true,
      })
      s.addShape(pptx.ShapeType.rect, { x: 0.8, y: 1.2, w: 1.5, h: 0.05, fill: { color: c(cs.accent) } })
      if (slide.bullets) {
        const bulletText = slide.bullets.map((bullet) => ({
          text: '• ' + bullet,
          options: { fontSize: 16, fontFace: 'Microsoft YaHei', color: c(cs.textDark), breakType: 'paragraph', paraSpaceAfter: 10 },
        }))
        s.addText(bulletText, { x: 1.2, y: 1.6, w: 7.6, h: 4.5, valign: 'top' })
      }
    }
    // 页码
    s.addText((index + 1) + ' / ' + slides.length, {
      x: 8.0, y: 6.8, w: 1.5, h: 0.4,
      fontSize: 10, fontFace: 'Microsoft YaHei', color: '999999', align: 'right',
    })
  })

  return pptx
}
