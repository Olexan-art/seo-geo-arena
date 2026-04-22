import React, { useState, useMemo } from "react";
import {
  Search, Globe, Target, TrendingUp, FileSearch, Layers,
  MapPin, Bot, Eye, Linkedin, Users, Filter,
  Swords, PenSquare, Code2, Store,
  Home, Settings, Bell, ChevronDown, ChevronRight, Sparkles,
  ArrowUpRight, ArrowDownRight, CheckCircle2, AlertTriangle, XCircle,
  Activity, BarChart3, Zap, Languages, Plus, RefreshCw, Download,
  ExternalLink, Play, Lock, Database, Cpu
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

// =================== I18N ===================
const I18N = {
  en: {
    brand: "SEO|GEO ARENA",
    tagline: "AI-native marketing intelligence",
    home: "Home",
    search: "Search modules...",
    upgrade: "Upgrade",
    run: "Run audit",
    refresh: "Refresh",
    export: "Export",
    connect: "Connect",
    connected: "Connected",
    notConnected: "Not connected",
    groups: {
      gsc: "Google Search Console",
      bing: "Bing Webmaster",
      li: "LinkedIn Ads",
      all: "All channels"
    },
    modules: {
      seo_audit: "SEO audit",
      keyword_monitoring: "Keyword monitoring",
      landing_page: "Landing page analysis",
      ctr_opt: "CTR optimization",
      search_intent: "Search intent mapping",
      content_gap: "Content gap detection",
      geo_opt: "GEO optimization",
      ai_citation: "AI citation tracking",
      llm_visibility: "LLM visibility audit",
      li_campaign: "LinkedIn campaign audit",
      b2b_audience: "B2B audience analysis",
      lead_gen: "Lead gen optimization",
      competitor: "Competitor intel",
      content_gen: "Content generation",
      structured: "Structured data audit",
      local_seo: "Local SEO"
    },
    home_title: "Welcome back, Olex",
    home_sub: "Your marketing intelligence command center",
    kpi_visibility: "Organic visibility",
    kpi_clicks: "Weekly clicks",
    kpi_citations: "AI citations",
    kpi_leads: "B2B leads",
    quick_start: "Quick start",
    recent_runs: "Recent runs",
    status_ok: "Healthy",
    status_warn: "Warnings",
    status_err: "Issues",
    score: "Score",
    issues: "Issues",
    opportunities: "Opportunities",
    recommended: "AI-recommended next actions",
    run_now: "Run now",
    view_details: "View details",
    overview: "Overview",
    tracked: "Tracked",
    dataSource: "Data source",
    lastRun: "Last run",
    justNow: "just now",
    minAgo: "min ago",
    hAgo: "h ago"
  },
  ua: {
    brand: "SEO|GEO ARENA",
    tagline: "AI-маркетинг нового покоління",
    home: "Головна",
    search: "Пошук модулів...",
    upgrade: "Тариф",
    run: "Запустити аудит",
    refresh: "Оновити",
    export: "Експорт",
    connect: "Підключити",
    connected: "Підключено",
    notConnected: "Не підключено",
    groups: {
      gsc: "Google Search Console",
      bing: "Bing Webmaster",
      li: "LinkedIn Ads",
      all: "Всі канали"
    },
    modules: {
      seo_audit: "SEO-аудит",
      keyword_monitoring: "Моніторинг ключових слів",
      landing_page: "Аналіз посадкових сторінок",
      ctr_opt: "Оптимізація CTR",
      search_intent: "Мапа пошукових намірів",
      content_gap: "Виявлення контент-прогалин",
      geo_opt: "GEO-оптимізація",
      ai_citation: "Трекінг AI-цитувань",
      llm_visibility: "Аудит видимості в LLM",
      li_campaign: "Аудит LinkedIn-кампаній",
      b2b_audience: "B2B-аналіз аудиторії",
      lead_gen: "Оптимізація лідогенерації",
      competitor: "Розвідка по конкурентах",
      content_gen: "Генерація контенту",
      structured: "Аудит структурованих даних",
      local_seo: "Локальний SEO"
    },
    home_title: "Вітаємо, Олексію",
    home_sub: "Ваш центр маркетингового інтелекту",
    kpi_visibility: "Органічна видимість",
    kpi_clicks: "Кліків за тиждень",
    kpi_citations: "AI-цитувань",
    kpi_leads: "B2B-лідів",
    quick_start: "Швидкий старт",
    recent_runs: "Останні запуски",
    status_ok: "У нормі",
    status_warn: "Попередження",
    status_err: "Проблеми",
    score: "Оцінка",
    issues: "Проблеми",
    opportunities: "Можливості",
    recommended: "AI-рекомендовані дії",
    run_now: "Запустити",
    view_details: "Деталі",
    overview: "Огляд",
    tracked: "Відстежується",
    dataSource: "Джерело даних",
    lastRun: "Останній запуск",
    justNow: "щойно",
    minAgo: "хв тому",
    hAgo: "г тому"
  }
};

// =================== MODULE CATALOG ===================
const MODULES = [
  { id: "seo_audit", group: "gsc", icon: Search, color: "#3b82f6" },
  { id: "keyword_monitoring", group: "gsc", icon: Target, color: "#3b82f6" },
  { id: "landing_page", group: "gsc", icon: FileSearch, color: "#3b82f6" },
  { id: "ctr_opt", group: "gsc", icon: TrendingUp, color: "#3b82f6" },
  { id: "search_intent", group: "gsc", icon: Layers, color: "#3b82f6" },
  { id: "content_gap", group: "gsc", icon: Activity, color: "#3b82f6" },
  { id: "geo_opt", group: "bing", icon: Globe, color: "#06b6d4" },
  { id: "ai_citation", group: "bing", icon: Bot, color: "#06b6d4" },
  { id: "llm_visibility", group: "bing", icon: Eye, color: "#06b6d4" },
  { id: "li_campaign", group: "li", icon: Linkedin, color: "#0a66c2" },
  { id: "b2b_audience", group: "li", icon: Users, color: "#0a66c2" },
  { id: "lead_gen", group: "li", icon: Filter, color: "#0a66c2" },
  { id: "competitor", group: "all", icon: Swords, color: "#8b5cf6" },
  { id: "content_gen", group: "all", icon: PenSquare, color: "#8b5cf6" },
  { id: "structured", group: "all", icon: Code2, color: "#8b5cf6" },
  { id: "local_seo", group: "all", icon: Store, color: "#8b5cf6" }
];

const GROUP_ORDER = ["gsc", "bing", "li", "all"];
const GROUP_DS = {
  gsc: "Search Console",
  bing: "Bing Webmaster",
  li: "LinkedIn Ads",
  all: "All channels"
};

// =================== APP SHELL ===================
export default function App() {
  const [lang, setLang] = useState("en");
  const [active, setActive] = useState("home");
  const [openGroups, setOpenGroups] = useState({ gsc: true, bing: true, li: true, all: true });
  const [query, setQuery] = useState("");
  const t = I18N[lang];

  const toggleGroup = (g) => setOpenGroups((s) => ({ ...s, [g]: !s[g] }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MODULES;
    return MODULES.filter((m) => t.modules[m.id].toLowerCase().includes(q));
  }, [query, t]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
        <div className="px-5 py-5 border-b border-slate-100 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-lg leading-none">{t.brand}</div>
            <div className="text-xs text-slate-500 mt-1">{t.tagline}</div>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          <button
            onClick={() => setActive("home")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              active === "home" ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Home className="w-4 h-4" /> {t.home}
          </button>

          {GROUP_ORDER.map((g) => {
            const items = filtered.filter((m) => m.group === g);
            if (items.length === 0) return null;
            return (
              <div key={g}>
                <button
                  onClick={() => toggleGroup(g)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                >
                  <span>{t.groups[g]}</span>
                  {openGroups[g] ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
                {openGroups[g] && (
                  <div className="space-y-0.5 mt-1">
                    {items.map((m) => {
                      const Icon = m.icon;
                      const isActive = active === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setActive(m.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                            isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <Icon className="w-4 h-4" style={{ color: isActive ? "#4f46e5" : m.color }} />
                          <span className="truncate">{t.modules[m.id]}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <TopBar lang={lang} setLang={setLang} t={t} active={active} />
        <div className="p-6 max-w-7xl mx-auto">
          {active === "home" ? <HomeView t={t} setActive={setActive} /> : <ModuleView id={active} t={t} />}
        </div>
      </main>
    </div>
  );
}

function TopBar({ lang, setLang, t, active }) {
  const mod = MODULES.find((m) => m.id === active);
  return (
    <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="px-6 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>{t.brand}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-medium">
            {active === "home" ? t.home : t.modules[active]}
          </span>
          {mod && (
            <>
              <span className="mx-2 text-slate-300">·</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100">{GROUP_DS[mod.group]}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ua" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-slate-200 hover:bg-slate-50"
          >
            <Languages className="w-4 h-4" /> {lang === "en" ? "EN" : "UA"}
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100"><Bell className="w-4 h-4" /></button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90">
            {t.upgrade}
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm ml-1">
            O
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== HOME VIEW ===================
function HomeView({ t, setActive }) {
  const kpis = [
    { label: t.kpi_visibility, value: "72.4", delta: "+8.2%", up: true, icon: Eye, color: "#4f46e5" },
    { label: t.kpi_clicks, value: "18.2K", delta: "+4.1%", up: true, icon: Activity, color: "#06b6d4" },
    { label: t.kpi_citations, value: "143", delta: "+21%", up: true, icon: Bot, color: "#8b5cf6" },
    { label: t.kpi_leads, value: "287", delta: "-3.4%", up: false, icon: Users, color: "#0a66c2" }
  ];

  const trend = [
    { d: "Mon", organic: 12, ai: 4, paid: 6 },
    { d: "Tue", organic: 15, ai: 6, paid: 7 },
    { d: "Wed", organic: 14, ai: 7, paid: 8 },
    { d: "Thu", organic: 18, ai: 9, paid: 7 },
    { d: "Fri", organic: 22, ai: 11, paid: 9 },
    { d: "Sat", organic: 17, ai: 13, paid: 6 },
    { d: "Sun", organic: 21, ai: 15, paid: 8 }
  ];

  const recent = [
    { id: "seo_audit", status: "ok", time: "12 " + t.minAgo },
    { id: "ai_citation", status: "warn", time: "1 " + t.hAgo },
    { id: "li_campaign", status: "ok", time: "3 " + t.hAgo },
    { id: "competitor", status: "err", time: "5 " + t.hAgo }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t.home_title}</h1>
        <p className="text-sm text-slate-500 mt-1">{t.home_sub}</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: k.color + "15" }}>
                  <Icon className="w-5 h-5" style={{ color: k.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${k.up ? "text-emerald-600" : "text-rose-600"}`}>
                  {k.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {k.delta}
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold">{k.value}</div>
              <div className="text-xs text-slate-500 mt-1">{k.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Traffic by channel</h3>
            <span className="text-xs text-slate-500">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="gOrg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f46e5" stopOpacity={0.6}/><stop offset="100%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient>
                <linearGradient id="gAI" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6}/><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
                <linearGradient id="gPaid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6}/><stop offset="100%" stopColor="#06b6d4" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="d" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="organic" stroke="#4f46e5" fill="url(#gOrg)" />
              <Area type="monotone" dataKey="ai" stroke="#8b5cf6" fill="url(#gAI)" />
              <Area type="monotone" dataKey="paid" stroke="#06b6d4" fill="url(#gPaid)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-4">{t.recent_runs}</h3>
          <div className="space-y-3">
            {recent.map((r) => {
              const mod = MODULES.find((m) => m.id === r.id);
              const Icon = mod.icon;
              const sIcon = r.status === "ok" ? CheckCircle2 : r.status === "warn" ? AlertTriangle : XCircle;
              const sCol = r.status === "ok" ? "text-emerald-500" : r.status === "warn" ? "text-amber-500" : "text-rose-500";
              const SIcon = sIcon;
              return (
                <button key={r.id} onClick={() => setActive(r.id)} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: mod.color + "15" }}>
                    <Icon className="w-4 h-4" style={{ color: mod.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{t.modules[r.id]}</div>
                    <div className="text-xs text-slate-500">{r.time}</div>
                  </div>
                  <SIcon className={`w-4 h-4 ${sCol}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">{t.quick_start}</h3>
        <div className="grid grid-cols-4 gap-3">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className="bg-white rounded-xl border border-slate-200 p-4 text-left hover:border-indigo-300 hover:shadow-sm transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: m.color + "15" }}>
                    <Icon className="w-4 h-4" style={{ color: m.color }} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                </div>
                <div className="mt-3 text-sm font-medium">{t.modules[m.id]}</div>
                <div className="text-xs text-slate-500 mt-0.5">{GROUP_DS[m.group]}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =================== MODULE VIEW ROUTER ===================
function ModuleView({ id, t }) {
  const mod = MODULES.find((m) => m.id === id);
  const Icon = mod.icon;

  const map = {
    seo_audit: <SeoAuditView t={t} />,
    keyword_monitoring: <KeywordMonView t={t} />,
    landing_page: <LandingPageView t={t} />,
    ctr_opt: <CtrOptView t={t} />,
    search_intent: <SearchIntentView t={t} />,
    content_gap: <ContentGapView t={t} />,
    geo_opt: <GeoOptView t={t} />,
    ai_citation: <AiCitationView t={t} />,
    llm_visibility: <LlmVisibilityView t={t} />,
    li_campaign: <LiCampaignView t={t} />,
    b2b_audience: <B2bAudienceView t={t} />,
    lead_gen: <LeadGenView t={t} />,
    competitor: <CompetitorView t={t} />,
    content_gen: <ContentGenView t={t} />,
    structured: <StructuredView t={t} />,
    local_seo: <LocalSeoView t={t} />
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: mod.color + "15" }}>
            <Icon className="w-6 h-6" style={{ color: mod.color }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t.modules[id]}</h1>
            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
              <Database className="w-3.5 h-3.5" /> {t.dataSource}: {GROUP_DS[mod.group]}
              <span className="text-slate-300">·</span>
              <RefreshCw className="w-3.5 h-3.5" /> {t.lastRun}: 2 {t.minAgo}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4" /> {t.refresh}
          </button>
          <button className="px-3 py-2 text-sm rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5">
            <Download className="w-4 h-4" /> {t.export}
          </button>
          <button className="px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-1.5">
            <Play className="w-4 h-4" /> {t.run}
          </button>
        </div>
      </div>

      {map[id]}
    </div>
  );
}

// =================== SHARED UI ===================
function Card({ children, className = "", title, subtitle, right }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 ${className}`}>
      {(title || right) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="font-semibold">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

function ScoreRing({ value, label, color = "#4f46e5" }) {
  const pct = Math.max(0, Math.min(100, value));
  const C = 2 * Math.PI * 42;
  const dash = (pct / 100) * C;
  return (
    <div className="flex items-center gap-4">
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r="42" stroke="#eef2f7" strokeWidth="10" fill="none" />
        <circle cx="55" cy="55" r="42" stroke={color} strokeWidth="10" fill="none"
          strokeDasharray={`${dash} ${C}`} strokeLinecap="round" transform="rotate(-90 55 55)" />
        <text x="55" y="58" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f172a">{pct}</text>
        <text x="55" y="74" textAnchor="middle" fontSize="10" fill="#94a3b8">/ 100</text>
      </svg>
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
        <div className="text-lg font-semibold mt-1">
          {pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Needs work" : "Critical"}
        </div>
      </div>
    </div>
  );
}

function IssueRow({ severity, title, desc, impact }) {
  const map = {
    high: { iconCls: "text-rose-500", pillCls: "bg-rose-50 text-rose-700", Icon: XCircle, label: "High" },
    med: { iconCls: "text-amber-500", pillCls: "bg-amber-50 text-amber-700", Icon: AlertTriangle, label: "Medium" },
    low: { iconCls: "text-sky-500", pillCls: "bg-sky-50 text-sky-700", Icon: CheckCircle2, label: "Low" }
  };
  const s = map[severity];
  const Icon = s.Icon;
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
      <Icon className={`w-5 h-5 ${s.iconCls} mt-0.5 shrink-0`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.pillCls} uppercase`}>{s.label}</span>
        </div>
        <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
        {impact && <div className="text-xs text-slate-400 mt-1">Impact: {impact}</div>}
      </div>
      <button className="text-xs text-indigo-600 hover:underline shrink-0">Fix</button>
    </div>
  );
}

function MiniStat({ label, value, delta, up }) {
  return (
    <div className="flex-1 p-4 rounded-lg border border-slate-200">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-bold mt-1">{value}</div>
      {delta && (
        <div className={`text-xs flex items-center gap-0.5 mt-1 ${up ? "text-emerald-600" : "text-rose-600"}`}>
          {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {delta}
        </div>
      )}
    </div>
  );
}

function Pill({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    indigo: "bg-indigo-50 text-indigo-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    violet: "bg-violet-50 text-violet-700",
    sky: "bg-sky-50 text-sky-700"
  };
  return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${tones[tone]}`}>{children}</span>;
}

// =================== 1. SEO AUDIT ===================
function SeoAuditView({ t }) {
  const issues = [
    { sev: "high", title: "Core Web Vitals failing", desc: "LCP > 4s on 12 key pages (mobile)", impact: "-18% rankings potential" },
    { sev: "high", title: "Missing H1 on 7 pages", desc: "Crucial pages lack primary heading", impact: "Relevance signal weak" },
    { sev: "med", title: "23 broken internal links", desc: "4xx responses detected on crawl", impact: "Crawl budget waste" },
    { sev: "med", title: "Thin content pages (284)", desc: "<300 words, low topical depth", impact: "AI-overview ineligible" },
    { sev: "low", title: "Image alt text missing", desc: "118 images across /blog/*", impact: "Accessibility + image search" }
  ];
  const cats = [
    { name: "Technical", score: 78 },
    { name: "On-page", score: 64 },
    { name: "Content", score: 71 },
    { name: "Links", score: 82 },
    { name: "Performance", score: 55 },
    { name: "Mobile", score: 69 }
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-1">
          <ScoreRing value={68} label={t.score} />
          <div className="grid grid-cols-3 gap-3 mt-5">
            <MiniStat label={t.status_err} value="5" />
            <MiniStat label={t.status_warn} value="18" />
            <MiniStat label={t.status_ok} value="47" />
          </div>
        </Card>
        <Card className="col-span-2" title="Category scores">
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={cats}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name="Score" dataKey="score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title={t.issues} subtitle="Ranked by impact on search performance">
        <div className="space-y-2">
          {issues.map((i, idx) => <IssueRow key={idx} severity={i.sev} title={i.title} desc={i.desc} impact={i.impact} />)}
        </div>
      </Card>

      <Card title={t.recommended}>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-amber-500 mt-0.5" /> Optimize hero image compression on /pricing — estimated LCP improvement −1.9s</li>
          <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-amber-500 mt-0.5" /> Add descriptive H1 with primary keyword to 7 orphan pages</li>
          <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-amber-500 mt-0.5" /> Consolidate 4 duplicate /blog/seo-* pages into a pillar article</li>
        </ul>
      </Card>
    </>
  );
}

// =================== 2. KEYWORD MONITORING ===================
function KeywordMonView({ t }) {
  const rows = [
    { kw: "ai seo audit", pos: 3, prev: 7, vol: 8100, ctr: 9.2, url: "/ai-seo" },
    { kw: "llm visibility tracker", pos: 1, prev: 2, vol: 1900, ctr: 24.1, url: "/llm-tracker" },
    { kw: "geo optimization tool", pos: 12, prev: 18, vol: 3300, ctr: 2.1, url: "/geo" },
    { kw: "search intent mapping", pos: 5, prev: 4, vol: 2400, ctr: 5.8, url: "/intent" },
    { kw: "content gap analyzer", pos: 8, prev: 11, vol: 5400, ctr: 3.6, url: "/gap" },
    { kw: "b2b keyword research", pos: 22, prev: 29, vol: 14800, ctr: 0.7, url: "/b2b" }
  ];
  const posChart = [
    { d: "W1", avg: 18 }, { d: "W2", avg: 15 }, { d: "W3", avg: 12 }, { d: "W4", avg: 10 }, { d: "W5", avg: 8.5 }, { d: "W6", avg: 8.5 }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label={t.tracked} value="1,284" delta="+48" up />
        <MiniStat label="Top 3" value="87" delta="+12" up />
        <MiniStat label="Top 10" value="341" delta="+22" up />
        <MiniStat label="Avg position" value="8.5" delta="−2.3" up />
      </div>
      <Card title="Average position trend">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={posChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="d" tick={{ fontSize: 12 }} />
            <YAxis reversed domain={[1, 25]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="avg" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Tracked keywords" right={<button className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1"><Plus className="w-3 h-3" />Add keyword</button>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                <th className="pb-2 font-medium">Keyword</th>
                <th className="pb-2 font-medium">Position</th>
                <th className="pb-2 font-medium">Previous</th>
                <th className="pb-2 font-medium">Volume</th>
                <th className="pb-2 font-medium">CTR</th>
                <th className="pb-2 font-medium">URL</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const diff = r.prev - r.pos;
                return (
                  <tr key={r.kw} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-2.5 font-medium">{r.kw}</td>
                    <td className="py-2.5">{r.pos}</td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 text-xs ${diff > 0 ? "text-emerald-600" : diff < 0 ? "text-rose-600" : "text-slate-500"}`}>
                        {diff > 0 ? <ArrowUpRight className="w-3 h-3" /> : diff < 0 ? <ArrowDownRight className="w-3 h-3" /> : null}
                        {Math.abs(diff)}
                      </span>
                    </td>
                    <td className="py-2.5 tabular-nums">{r.vol.toLocaleString()}</td>
                    <td className="py-2.5 tabular-nums">{r.ctr}%</td>
                    <td className="py-2.5 text-slate-500">{r.url}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

// =================== 3. LANDING PAGE ANALYSIS ===================
function LandingPageView({ t }) {
  const pages = [
    { url: "/pricing", clicks: 2412, imp: 41200, ctr: 5.9, pos: 4.2, score: 86 },
    { url: "/features", clicks: 1890, imp: 38700, ctr: 4.9, pos: 6.1, score: 74 },
    { url: "/blog/seo-guide", clicks: 1204, imp: 55300, ctr: 2.2, pos: 11.8, score: 58 },
    { url: "/compare", clicks: 988, imp: 22100, ctr: 4.5, pos: 7.3, score: 69 },
    { url: "/integrations", clicks: 612, imp: 19400, ctr: 3.2, pos: 9.0, score: 62 }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Pages analyzed" value="142" />
        <MiniStat label="Avg page score" value="71" delta="+4" up />
        <MiniStat label="Top performer" value="/pricing" />
        <MiniStat label="Needs fixes" value="29" />
      </div>
      <Card title="Page performance" subtitle="Clicks vs. impressions by URL">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={pages}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="url" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="clicks" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            <Bar dataKey="imp" fill="#c7d2fe" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Landing pages">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">URL</th>
              <th className="pb-2 font-medium">Clicks</th>
              <th className="pb-2 font-medium">Impressions</th>
              <th className="pb-2 font-medium">CTR</th>
              <th className="pb-2 font-medium">Position</th>
              <th className="pb-2 font-medium">{t.score}</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.url} className="border-b border-slate-50">
                <td className="py-2.5 font-medium flex items-center gap-1">{p.url} <ExternalLink className="w-3 h-3 text-slate-400" /></td>
                <td className="py-2.5 tabular-nums">{p.clicks.toLocaleString()}</td>
                <td className="py-2.5 tabular-nums">{p.imp.toLocaleString()}</td>
                <td className="py-2.5 tabular-nums">{p.ctr}%</td>
                <td className="py-2.5 tabular-nums">{p.pos}</td>
                <td className="py-2.5"><Pill tone={p.score >= 80 ? "emerald" : p.score >= 60 ? "amber" : "rose"}>{p.score}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

// =================== 4. CTR OPTIMIZATION ===================
function CtrOptView({ t }) {
  const ops = [
    { url: "/blog/seo-guide", cur: 2.2, exp: 5.4, q: "seo guide 2026", issue: "Title too generic, missing year" },
    { url: "/integrations", cur: 3.2, exp: 6.1, q: "marketing integrations", issue: "Meta description cut at 120 chars" },
    { url: "/compare", cur: 4.5, exp: 7.8, q: "cogny vs ahrefs", issue: "No emotional trigger in title" },
    { url: "/features/ai", cur: 1.8, exp: 5.0, q: "ai seo features", issue: "Missing FAQ schema" }
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <MiniStat label="Avg CTR" value="3.8%" delta="+0.6pp" up />
        <MiniStat label="Below benchmark" value="34 pages" />
        <MiniStat label="Projected uplift" value="+4.2K clicks/mo" />
      </div>
      <Card title="Opportunities">
        <div className="space-y-3">
          {ops.map((o) => (
            <div key={o.url} className="p-4 rounded-lg border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm flex items-center gap-2">{o.url} <Pill tone="sky">{o.q}</Pill></div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-500">{o.cur}%</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-emerald-600">{o.exp}%</span>
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-1.5">{o.issue}</div>
              <div className="mt-2 flex gap-2">
                <button className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100">Generate title</button>
                <button className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200">Test variants</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="AI title rewriter" subtitle="Select a page, receive 5 title variants benchmarked against SERP competitors">
        <div className="p-4 rounded-lg bg-slate-50 border border-dashed border-slate-300 text-center text-sm text-slate-500">
          <Cpu className="w-6 h-6 mx-auto mb-2 text-slate-400" />
          Pick a page above to generate variants
        </div>
      </Card>
    </>
  );
}

// =================== 5. SEARCH INTENT MAPPING ===================
function SearchIntentView({ t }) {
  const intents = [
    { name: "Informational", value: 42, color: "#06b6d4" },
    { name: "Commercial", value: 28, color: "#4f46e5" },
    { name: "Transactional", value: 18, color: "#8b5cf6" },
    { name: "Navigational", value: 12, color: "#f59e0b" }
  ];
  const mismatch = [
    { kw: "best seo tool", current: "Navigational", should: "Commercial", url: "/about" },
    { kw: "what is geo optimization", current: "Transactional", should: "Informational", url: "/pricing" },
    { kw: "buy seo software", current: "Informational", should: "Transactional", url: "/blog/what-is-seo" }
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card title="Intent distribution" className="col-span-1">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={intents} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" label>
                {intents.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Intent by page type" className="col-span-2">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { type: "Blog", info: 68, comm: 22, trans: 4, nav: 6 },
              { type: "Product", info: 12, comm: 52, trans: 30, nav: 6 },
              { type: "Pricing", info: 6, comm: 38, trans: 50, nav: 6 },
              { type: "Docs", info: 78, comm: 8, trans: 2, nav: 12 }
            ]} stackOffset="expand">
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis dataKey="type" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="info" stackId="a" fill="#06b6d4" />
              <Bar dataKey="comm" stackId="a" fill="#4f46e5" />
              <Bar dataKey="trans" stackId="a" fill="#8b5cf6" />
              <Bar dataKey="nav" stackId="a" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="Intent mismatches" subtitle="Pages ranking for wrong-intent queries">
        <div className="space-y-2">
          {mismatch.map((m) => (
            <div key={m.kw} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
              <div>
                <div className="text-sm font-medium">{m.kw}</div>
                <div className="text-xs text-slate-500 mt-0.5">{m.url}</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Pill tone="rose">{m.current}</Pill>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
                <Pill tone="emerald">{m.should}</Pill>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

// =================== 6. CONTENT GAP DETECTION ===================
function ContentGapView({ t }) {
  const gaps = [
    { topic: "AI SEO case studies", vol: 9900, comp: 3, me: 0, diff: 42 },
    { topic: "GEO vs traditional SEO", vol: 4200, comp: 2, me: 0, diff: 28 },
    { topic: "LLM prompt-to-rank workflow", vol: 2800, comp: 1, me: 0, diff: 19 },
    { topic: "B2B intent data guide", vol: 6700, comp: 4, me: 1, diff: 51 },
    { topic: "Structured data for AI overviews", vol: 3100, comp: 2, me: 0, diff: 34 }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Gaps found" value="47" />
        <MiniStat label="Est. traffic gain" value="+28K/mo" />
        <MiniStat label="Competitors analyzed" value="6" />
        <MiniStat label="Avg difficulty" value="34" />
      </div>
      <Card title="Top content gaps" subtitle="Topics where competitors rank but you don't">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Topic</th>
              <th className="pb-2 font-medium">Monthly volume</th>
              <th className="pb-2 font-medium">Competitors ranking</th>
              <th className="pb-2 font-medium">Your pages</th>
              <th className="pb-2 font-medium">Difficulty</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {gaps.map((g) => (
              <tr key={g.topic} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-2.5 font-medium">{g.topic}</td>
                <td className="py-2.5 tabular-nums">{g.vol.toLocaleString()}</td>
                <td className="py-2.5">{g.comp}</td>
                <td className="py-2.5">{g.me === 0 ? <Pill tone="rose">None</Pill> : g.me}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${g.diff}%` }} />
                    </div>
                    <span className="text-xs tabular-nums">{g.diff}</span>
                  </div>
                </td>
                <td className="py-2.5"><button className="text-xs text-indigo-600 hover:underline">Draft brief</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

// =================== 7. GEO OPTIMIZATION ===================
function GeoOptView({ t }) {
  const markets = [
    { country: "United States", score: 78, share: 42 },
    { country: "United Kingdom", score: 64, share: 18 },
    { country: "Germany", score: 52, share: 12 },
    { country: "Ukraine", score: 81, share: 8 },
    { country: "Canada", score: 69, share: 10 },
    { country: "Australia", score: 58, share: 6 }
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-1">
          <ScoreRing value={67} label="GEO score" color="#06b6d4" />
          <div className="mt-4 text-xs text-slate-500">Generative Engine Optimization readiness across Bing, ChatGPT, Perplexity, Claude.</div>
        </Card>
        <Card title="Market readiness" className="col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={markets} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="country" type="category" width={120} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#06b6d4" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="GEO checklist">
        <div className="grid grid-cols-2 gap-3">
          {[
            { ok: true, text: "llms.txt file present at root" },
            { ok: true, text: "JSON-LD Organization schema" },
            { ok: false, text: "FAQ schema missing on 24 pages" },
            { ok: true, text: "Canonical URLs stable" },
            { ok: false, text: "No author E-E-A-T signals" },
            { ok: false, text: "Weak factual density in AI-query topics" },
            { ok: true, text: "OpenGraph complete" },
            { ok: true, text: "Semantic HTML structure" }
          ].map((c, i) => (
            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg border ${c.ok ? "border-emerald-100 bg-emerald-50/40" : "border-rose-100 bg-rose-50/40"}`}>
              {c.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-600 mt-0.5" />}
              <span className="text-sm">{c.text}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

// =================== 8. AI CITATION TRACKING ===================
function AiCitationView({ t }) {
  const llms = [
    { name: "ChatGPT", cites: 58, delta: "+12", up: true },
    { name: "Perplexity", cites: 41, delta: "+18", up: true },
    { name: "Claude", cites: 27, delta: "+6", up: true },
    { name: "Gemini", cites: 17, delta: "−3", up: false }
  ];
  const queries = [
    { q: "best ai seo tool 2026", engine: "ChatGPT", ok: true, rank: 2 },
    { q: "llm visibility tracker", engine: "Perplexity", ok: true, rank: 1 },
    { q: "geo optimization platform", engine: "Claude", ok: false, rank: null },
    { q: "b2b marketing ai", engine: "Gemini", ok: false, rank: null },
    { q: "content gap ai tool", engine: "ChatGPT", ok: true, rank: 4 }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {llms.map((l) => (
          <div key={l.name} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Bot className="w-4 h-4 text-violet-600" /><span className="font-medium text-sm">{l.name}</span></div>
              <span className={`text-xs ${l.up ? "text-emerald-600" : "text-rose-600"}`}>{l.delta}</span>
            </div>
            <div className="text-2xl font-bold mt-2">{l.cites}</div>
            <div className="text-xs text-slate-500">citations / week</div>
          </div>
        ))}
      </div>
      <Card title="Tracked prompts" right={<button className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1"><Plus className="w-3 h-3" />Add prompt</button>}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Prompt</th>
              <th className="pb-2 font-medium">Engine</th>
              <th className="pb-2 font-medium">Cited</th>
              <th className="pb-2 font-medium">Rank in answer</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.q + q.engine} className="border-b border-slate-50">
                <td className="py-2.5 font-medium">{q.q}</td>
                <td className="py-2.5">{q.engine}</td>
                <td className="py-2.5">{q.ok ? <Pill tone="emerald">Yes</Pill> : <Pill tone="rose">No</Pill>}</td>
                <td className="py-2.5 tabular-nums">{q.rank ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card title="Citation sources">
        <div className="flex flex-wrap gap-2">
          {["/blog/ai-seo-guide", "/features", "/pricing", "/compare", "/blog/geo-explained", "/docs/api", "/case-studies/acme"].map((s) => (
            <Pill key={s} tone="violet">{s}</Pill>
          ))}
        </div>
      </Card>
    </>
  );
}

// =================== 9. LLM VISIBILITY AUDIT ===================
function LlmVisibilityView({ t }) {
  const trend = [
    { d: "W1", cogny: 12, c1: 22, c2: 18 },
    { d: "W2", cogny: 18, c1: 24, c2: 19 },
    { d: "W3", cogny: 24, c1: 23, c2: 21 },
    { d: "W4", cogny: 31, c1: 25, c2: 22 },
    { d: "W5", cogny: 38, c1: 26, c2: 22 },
    { d: "W6", cogny: 46, c1: 27, c2: 24 }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Share of AI voice" value="32%" delta="+9pp" up />
        <MiniStat label="Avg answer rank" value="2.3" delta="−0.7" up />
        <MiniStat label="Prompts tracked" value="412" />
        <MiniStat label="Sentiment" value="+0.74" delta="+0.12" up />
      </div>
      <Card title="Share of voice vs. competitors">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
            <XAxis dataKey="d" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cogny" name="SEO|GEO ARENA" stroke="#4f46e5" strokeWidth={2} />
            <Line type="monotone" dataKey="c1" name="Competitor A" stroke="#94a3b8" strokeWidth={2} />
            <Line type="monotone" dataKey="c2" name="Competitor B" stroke="#cbd5e1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Improvement recommendations">
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-indigo-500 mt-0.5" /> Publish a "comparison" page (SEO|GEO ARENA vs ...) — +8 expected monthly citations</li>
          <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-indigo-500 mt-0.5" /> Add structured data for HowTo on top 12 blog posts</li>
          <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 text-indigo-500 mt-0.5" /> Get mentioned on 4 high-authority industry lists</li>
        </ul>
      </Card>
    </>
  );
}

// =================== 10. LINKEDIN CAMPAIGN AUDIT ===================
function LiCampaignView({ t }) {
  const camps = [
    { name: "Q2 Demand Gen — CMOs", spend: 12400, impressions: 482000, ctr: 0.68, cpl: 82, leads: 151, roas: 2.4 },
    { name: "Always-on Retarget", spend: 4800, impressions: 212000, ctr: 1.42, cpl: 48, leads: 100, roas: 3.8 },
    { name: "Executive awareness", spend: 8200, impressions: 311000, ctr: 0.41, cpl: 144, leads: 57, roas: 1.1 },
    { name: "Content nurture", spend: 3100, impressions: 89000, ctr: 0.92, cpl: 55, leads: 56, roas: 2.9 }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Spend MTD" value="$28.5K" />
        <MiniStat label="Leads" value="364" delta="+48" up />
        <MiniStat label="Avg CPL" value="$78" delta="−$9" up />
        <MiniStat label="ROAS" value="2.6x" delta="+0.3" up />
      </div>
      <Card title="Campaign performance">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Campaign</th>
              <th className="pb-2 font-medium">Spend</th>
              <th className="pb-2 font-medium">Impressions</th>
              <th className="pb-2 font-medium">CTR</th>
              <th className="pb-2 font-medium">CPL</th>
              <th className="pb-2 font-medium">Leads</th>
              <th className="pb-2 font-medium">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((c) => (
              <tr key={c.name} className="border-b border-slate-50">
                <td className="py-2.5 font-medium">{c.name}</td>
                <td className="py-2.5 tabular-nums">${c.spend.toLocaleString()}</td>
                <td className="py-2.5 tabular-nums">{c.impressions.toLocaleString()}</td>
                <td className="py-2.5 tabular-nums">{c.ctr}%</td>
                <td className="py-2.5 tabular-nums">${c.cpl}</td>
                <td className="py-2.5 tabular-nums">{c.leads}</td>
                <td className="py-2.5"><Pill tone={c.roas >= 2.5 ? "emerald" : c.roas >= 1.5 ? "amber" : "rose"}>{c.roas}x</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card title="AI audit findings">
        <div className="space-y-2">
          <IssueRow severity="high" title="Executive awareness ROAS 1.1x" desc="Creative fatigue after 14 days; rotate variants" impact="Est. savings $2.8K/mo" />
          <IssueRow severity="med" title="Audience overlap 38%" desc="Q2 Demand Gen and Retarget competing" impact="Rising CPL" />
          <IssueRow severity="low" title="Lookalike not refreshed" desc="Source list is 94 days old" impact="Quality drift" />
        </div>
      </Card>
    </>
  );
}

// =================== 11. B2B AUDIENCE ANALYSIS ===================
function B2bAudienceView({ t }) {
  const industries = [
    { name: "SaaS", value: 38 },
    { name: "Fintech", value: 22 },
    { name: "Agencies", value: 18 },
    { name: "E-commerce", value: 12 },
    { name: "Other", value: 10 }
  ];
  const roles = [
    { title: "Head of Marketing", size: 38 },
    { title: "CMO", size: 22 },
    { title: "SEO Lead", size: 18 },
    { title: "Growth Manager", size: 14 },
    { title: "Content Strategist", size: 8 }
  ];
  const colors = ["#4f46e5", "#06b6d4", "#8b5cf6", "#f59e0b", "#94a3b8"];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <MiniStat label="ICP match rate" value="64%" delta="+8pp" up />
        <MiniStat label="Avg company size" value="210 FTE" />
        <MiniStat label="Target accounts" value="1,284" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card title="Industry mix">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={industries} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {industries.map((e, i) => <Cell key={e.name} fill={colors[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Top decision-maker roles">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={roles} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="title" type="category" width={140} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="size" fill="#0a66c2" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="Recommended ICP refinement">
        <div className="p-4 rounded-lg bg-indigo-50/50 border border-indigo-100 text-sm">
          <div className="font-medium text-indigo-900">Sharpen targeting to mid-market SaaS, 100–500 FTE, with a Head of Marketing role and $5M+ ARR.</div>
          <div className="text-xs text-indigo-700 mt-2">Projected impact: CPL -18%, close rate +11%</div>
        </div>
      </Card>
    </>
  );
}

// =================== 12. LEAD GEN OPTIMIZATION ===================
function LeadGenView({ t }) {
  const funnel = [
    { stage: "Impressions", count: 482000, rate: 100 },
    { stage: "Clicks", count: 3280, rate: 0.68 },
    { stage: "Form views", count: 1890, rate: 58 },
    { stage: "Form submits", count: 412, rate: 22 },
    { stage: "Qualified (SQL)", count: 151, rate: 37 }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Submission rate" value="22%" delta="+3pp" up />
        <MiniStat label="SQL rate" value="37%" delta="+5pp" up />
        <MiniStat label="Cost per SQL" value="$194" delta="−$22" up />
        <MiniStat label="LTV:CAC" value="3.8x" delta="+0.4" up />
      </div>
      <Card title="Conversion funnel">
        <div className="space-y-2">
          {funnel.map((f, i) => (
            <div key={f.stage}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">{f.stage}</span>
                <span className="tabular-nums text-slate-600">{f.count.toLocaleString()} <span className="text-xs text-slate-400 ml-1">{f.rate}%</span></span>
              </div>
              <div className="h-8 rounded bg-slate-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-end pr-3 text-white text-xs font-medium" style={{ width: `${100 - i * 18}%` }}>
                  {((f.count / 482000) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Experiments queue">
        <div className="space-y-2">
          {[
            { name: "3-field vs 7-field form", status: "running", lift: "+12%" },
            { name: "Case-study CTA vs demo CTA", status: "running", lift: "+6%" },
            { name: "Headline: outcomes vs features", status: "queued", lift: "—" },
            { name: "Social proof strip above fold", status: "complete", lift: "+18%" }
          ].map((e) => (
            <div key={e.name} className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
              <div className="text-sm font-medium">{e.name}</div>
              <div className="flex items-center gap-3 text-xs">
                <Pill tone={e.status === "running" ? "sky" : e.status === "queued" ? "slate" : "emerald"}>{e.status}</Pill>
                <span className="text-emerald-600 font-medium">{e.lift}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

// =================== 13. COMPETITOR INTEL ===================
function CompetitorView({ t }) {
  const comps = [
    { name: "Ahrefs", kw: 2.4e6, traffic: "41M", ai: 82, score: 91 },
    { name: "Semrush", kw: 3.1e6, traffic: "58M", ai: 78, score: 93 },
    { name: "Surfer SEO", kw: 214000, traffic: "2.8M", ai: 64, score: 72 },
    { name: "Clearscope", kw: 89000, traffic: "1.1M", ai: 58, score: 66 }
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <MiniStat label="Competitors tracked" value="14" />
        <MiniStat label="Shared keywords" value="3,412" />
        <MiniStat label="Content velocity" value="+8 / week" />
      </div>
      <Card title="Competitor comparison">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Competitor</th>
              <th className="pb-2 font-medium">Keywords</th>
              <th className="pb-2 font-medium">Monthly traffic</th>
              <th className="pb-2 font-medium">AI visibility</th>
              <th className="pb-2 font-medium">Domain score</th>
            </tr>
          </thead>
          <tbody>
            {comps.map((c) => (
              <tr key={c.name} className="border-b border-slate-50">
                <td className="py-2.5 font-medium">{c.name}</td>
                <td className="py-2.5 tabular-nums">{c.kw.toLocaleString()}</td>
                <td className="py-2.5 tabular-nums">{c.traffic}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${c.ai}%` }} /></div>
                    <span className="text-xs tabular-nums">{c.ai}</span>
                  </div>
                </td>
                <td className="py-2.5 font-semibold">{c.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card title="Recent competitor moves">
        <div className="space-y-2">
          {[
            { who: "Semrush", what: "Launched AI Overviews tracker", when: "2 days ago" },
            { who: "Ahrefs", what: "Added LLM citation feature (beta)", when: "5 days ago" },
            { who: "Surfer SEO", what: "Price change: Pro $89 → $99", when: "8 days ago" },
            { who: "Clearscope", what: "Published 'GEO Playbook' content hub", when: "14 days ago" }
          ].map((c, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-700 text-xs font-semibold">{c.who[0]}</div>
              <div className="flex-1">
                <div className="text-sm"><span className="font-medium">{c.who}</span> — {c.what}</div>
                <div className="text-xs text-slate-500">{c.when}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

// =================== 14. CONTENT GENERATION ===================
function ContentGenView({ t }) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Drafts this month" value="28" />
        <MiniStat label="Published" value="19" />
        <MiniStat label="Avg quality score" value="86" />
        <MiniStat label="Est. traffic from new" value="+8.4K/mo" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card title="Brief templates" className="col-span-1">
          <div className="space-y-2">
            {["Pillar article", "Comparison page", "Case study", "Landing page", "FAQ hub", "Glossary entry"].map((b) => (
              <button key={b} className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-indigo-300 text-sm">
                <span>{b}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        </Card>
        <Card title="AI content studio" className="col-span-2">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500">Target keyword</label>
              <input placeholder="e.g. ai seo audit tool" className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500">Format</label>
                <select className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>Long-form article (2000+ words)</option>
                  <option>Listicle</option>
                  <option>How-to guide</option>
                  <option>Comparison</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Tone</label>
                <select className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option>Professional</option>
                  <option>Conversational</option>
                  <option>Authoritative</option>
                </select>
              </div>
            </div>
            <button className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Generate brief + draft
            </button>
          </div>
        </Card>
      </div>
      <Card title="Recent drafts">
        {[
          { title: "Complete guide to GEO optimization in 2026", score: 92, status: "Ready to publish" },
          { title: "10 LLM visibility mistakes B2B marketers make", score: 84, status: "In review" },
          { title: "How to prompt for your own brand", score: 78, status: "Draft" }
        ].map((d) => (
          <div key={d.title} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
            <div>
              <div className="text-sm font-medium">{d.title}</div>
              <div className="text-xs text-slate-500 mt-0.5">{d.status}</div>
            </div>
            <div className="flex items-center gap-3">
              <Pill tone={d.score >= 85 ? "emerald" : "amber"}>{d.score}</Pill>
              <button className="text-xs text-indigo-600 hover:underline">Open</button>
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

// =================== 15. STRUCTURED DATA AUDIT ===================
function StructuredView({ t }) {
  const schemas = [
    { name: "Organization", pages: 1, valid: true, coverage: 100 },
    { name: "Product", pages: 24, valid: true, coverage: 96 },
    { name: "FAQPage", pages: 18, valid: false, coverage: 45 },
    { name: "Article", pages: 142, valid: true, coverage: 88 },
    { name: "BreadcrumbList", pages: 168, valid: true, coverage: 100 },
    { name: "HowTo", pages: 0, valid: false, coverage: 0 },
    { name: "Review", pages: 12, valid: true, coverage: 80 }
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <MiniStat label="Schemas detected" value="7" />
        <MiniStat label="Validation errors" value="18" />
        <MiniStat label="Coverage" value="73%" delta="+4pp" up />
      </div>
      <Card title="Schema coverage">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Schema type</th>
              <th className="pb-2 font-medium">Pages</th>
              <th className="pb-2 font-medium">Validation</th>
              <th className="pb-2 font-medium">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {schemas.map((s) => (
              <tr key={s.name} className="border-b border-slate-50">
                <td className="py-2.5 font-medium">{s.name}</td>
                <td className="py-2.5 tabular-nums">{s.pages}</td>
                <td className="py-2.5">{s.valid ? <Pill tone="emerald">Valid</Pill> : <Pill tone="rose">Errors</Pill>}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-28 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.coverage}%` }} /></div>
                    <span className="text-xs tabular-nums">{s.coverage}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card title="AI-ready recommendations">
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2"><Code2 className="w-4 h-4 text-violet-500 mt-0.5" /> Add <code className="px-1 bg-slate-100 rounded text-xs">HowTo</code> schema to 14 tutorial pages — prioritized by AI overview opportunity</li>
          <li className="flex items-start gap-2"><Code2 className="w-4 h-4 text-violet-500 mt-0.5" /> Fix <code className="px-1 bg-slate-100 rounded text-xs">FAQPage</code> errors: missing required <code className="px-1 bg-slate-100 rounded text-xs">acceptedAnswer</code> on 10 pages</li>
          <li className="flex items-start gap-2"><Code2 className="w-4 h-4 text-violet-500 mt-0.5" /> Extend <code className="px-1 bg-slate-100 rounded text-xs">Article</code> with <code className="px-1 bg-slate-100 rounded text-xs">author</code> and <code className="px-1 bg-slate-100 rounded text-xs">datePublished</code></li>
        </ul>
      </Card>
    </>
  );
}

// =================== 16. LOCAL SEO ===================
function LocalSeoView({ t }) {
  const locations = [
    { city: "Kyiv, UA", rank: 1.4, reviews: 284, rating: 4.8, claims: true },
    { city: "Lviv, UA", rank: 2.1, reviews: 146, rating: 4.7, claims: true },
    { city: "Warsaw, PL", rank: 3.8, reviews: 92, rating: 4.6, claims: true },
    { city: "Berlin, DE", rank: 5.2, reviews: 47, rating: 4.4, claims: false },
    { city: "London, UK", rank: 7.1, reviews: 31, rating: 4.5, claims: false }
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Locations tracked" value="12" />
        <MiniStat label="Avg local rank" value="3.9" delta="−0.6" up />
        <MiniStat label="Review velocity" value="+38/mo" up />
        <MiniStat label="GBP health" value="86%" />
      </div>
      <Card title="Location performance">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
              <th className="pb-2 font-medium">Location</th>
              <th className="pb-2 font-medium">Avg rank</th>
              <th className="pb-2 font-medium">Reviews</th>
              <th className="pb-2 font-medium">Rating</th>
              <th className="pb-2 font-medium">Listing</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((l) => (
              <tr key={l.city} className="border-b border-slate-50">
                <td className="py-2.5 font-medium flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" />{l.city}</td>
                <td className="py-2.5 tabular-nums">{l.rank}</td>
                <td className="py-2.5 tabular-nums">{l.reviews}</td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-amber-500">★</span>
                    <span className="tabular-nums">{l.rating}</span>
                  </span>
                </td>
                <td className="py-2.5">{l.claims ? <Pill tone="emerald">Claimed</Pill> : <Pill tone="amber">Unclaimed</Pill>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card title="Local SEO checklist">
        <div className="grid grid-cols-2 gap-3">
          {[
            { ok: true, text: "NAP consistency across 58 citations" },
            { ok: true, text: "Google Business Profile primary category set" },
            { ok: false, text: "2 duplicate listings detected (Berlin)" },
            { ok: true, text: "Weekly Google posts active" },
            { ok: false, text: "Q&A unanswered on 4 profiles" },
            { ok: true, text: "LocalBusiness schema on location pages" }
          ].map((c, i) => (
            <div key={i} className={`flex items-start gap-2 p-3 rounded-lg border ${c.ok ? "border-emerald-100 bg-emerald-50/40" : "border-rose-100 bg-rose-50/40"}`}>
              {c.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-600 mt-0.5" />}
              <span className="text-sm">{c.text}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
