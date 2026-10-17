// quiz-data.js — 題目內容與結果原型文案（純資料，不含邏輯）

const sets = [
  {
    title: "題組一",
    options: [
      { label: "獨當一面", trait: "果斷" },
      { label: "協調支援", trait: "掌控" },
      { label: "研判資訊", trait: "分析" },
      { label: "按部就班", trait: "事務" },
      { label: "創意思考", trait: "創意" },
      { label: "傾聽他人", trait: "感覺" },
      { label: "規劃遠景", trait: "理想" },
      { label: "協助他人", trait: "人際" }
    ]
  },
  {
    title: "題組二",
    options: [
      { label: "明快決策", trait: "果斷" },
      { label: "執行計畫", trait: "掌控" },
      { label: "研析對策", trait: "分析" },
      { label: "井然有序", trait: "事務" },
      { label: "發揮想像", trait: "創意" },
      { label: "感性溫馨", trait: "感覺" },
      { label: "不受約束", trait: "理想" },
      { label: "團隊合作", trait: "人際" }
    ]
  },
  {
    title: "題組三",
    options: [
      { label: "實事求是", trait: "果斷" },
      { label: "現況掌握", trait: "掌控" },
      { label: "邏輯分析", trait: "分析" },
      { label: "資訊彙整", trait: "事務" },
      { label: "創作研發", trait: "創意" },
      { label: "同理情感", trait: "感覺" },
      { label: "彈性多元", trait: "理想" },
      { label: "人際經營", trait: "人際" }
    ]
  },
  {
    title: "題組四",
    options: [
      { label: "重視成效", trait: "果斷" },
      { label: "建立程序", trait: "掌控" },
      { label: "推理思考", trait: "分析" },
      { label: "行政處理", trait: "事務" },
      { label: "獨特創新", trait: "創意" },
      { label: "支持他人", trait: "感覺" },
      { label: "推銷想法", trait: "理想" },
      { label: "接觸人群", trait: "人際" }
    ]
  },
  {
    title: "題組五",
    options: [
      { label: "影響他人", trait: "果斷" },
      { label: "組織管理", trait: "掌控" },
      { label: "追根究柢", trait: "分析" },
      { label: "細節處理", trait: "事務" },
      { label: "實驗嘗試", trait: "創意" },
      { label: "營造氣氛", trait: "感覺" },
      { label: "開發市場", trait: "理想" },
      { label: "協調衝突", trait: "人際" }
    ]
  }
];

// 四種風格原型：key 對應 showResult() 算出的 logic/pioneer/organizer/emotion
const archetypes = {
  logic: {
    name: "智略魔法師",
    subtitle: "Strategic Mage",
    icon: "🔮",
    keywords: ["決斷", "洞察", "效率"],
    description:
      "你習慣先看透問題的核心，再用最直接的方式解決它。面對混亂時，你是那個冷靜拆解局面、給出明確方向的人——別人遇到難題，第一個想問的往往是「你覺得呢？」"
  },
  pioneer: {
    name: "幻視預言家",
    subtitle: "Visionary Oracle",
    icon: "✨",
    keywords: ["創意", "理想", "前瞻"],
    description:
      "你總是看得比別人遠一點，腦中隨時有新的可能性在醞釀。你不甘於照本宣科，渴望開創出屬於自己的路，也樂於把願景說給身邊的人聽，感染他們一起往前走。"
  },
  organizer: {
    name: "秩序守護者",
    subtitle: "Order Guardian",
    icon: "⚖️",
    keywords: ["穩定", "可靠", "執行"],
    description:
      "你是團隊裡最讓人放心的存在——計畫一旦交到你手上，細節就會被照顧好。你不追求搶眼，但少了你，很多事情根本撐不起來，大家都知道這一點。"
  },
  emotion: {
    name: "共感療癒師",
    subtitle: "Empathic Healer",
    icon: "💫",
    keywords: ["溫暖", "傾聽", "連結"],
    description:
      "你對他人的情緒特別敏感，總能在對的時間說出對的話。你把人與人之間的關係看得很重，也習慣先照顧別人的感受，再想自己的需求。"
  }
};
