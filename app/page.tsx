
'use client'

import React, { useMemo, useState } from 'react'

const Chip = ({ children, onClick, active=false }:{children:React.ReactNode; onClick?:()=>void; active?:boolean}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full border text-sm transition ${active ? 'bg-black text-white border-black' : 'hover:bg-gray-100 border-gray-300'}`}
  >
    {children}
  </button>
)

const Stat = ({ label, value, sub }:{label:string; value:React.ReactNode; sub?:string}) => (
  <div className="p-4 rounded-2xl border bg-white shadow-sm">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-3xl font-semibold">{value}</div>
    {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
  </div>
)

const Card = ({ children, className="" }:{children:React.ReactNode; className?:string}) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
)

const Input = (props:any) => (
  <input {...props} className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 ${props.className||""}`} />
)

const Icon = ({ name, className="w-5 h-5" }:{name:string; className?:string}) => {
  const paths: Record<string,string> = {
    search: "M10.5 18a7.5 7.5 0 1 1 5.303-12.803l4.75 4.75-1.414 1.414-4.75-4.75A7.5 7.5 0 0 1 10.5 18z",
    plus: "M10 4h2v6h6v2h-6v6h-2v-6H4v-2h6z",
    bot: "M12 2a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v4a6 6 0 1 1-12 0V7a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2z",
    spark: "M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z",
    star: "M12 2l2.7 5.5L21 9l-4.5 3.8L18.5 19 12 15.8 5.5 19 7.5 12.8 3 9l6.3-1.5L12 2z",
    send: "M3 11l18-8-8 18-2-7-8-3z",
    menu: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z",
    calendar: "M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V2zM5 10h14v8H5v-8z",
    image: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm2 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 9l-5-6-4 5-3-4-2 5h14z",
    chart: "M5 20V10h3v10H5zm5 0V4h3v16h-3zm5 0v-7h3v7h-3z",
    users: "M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-7 8a7 7 0 0 1 14 0H5z",
    folder: "M3 6h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z",
    trend: "M3 13l4 4 5-5 3 3 6-6v3h2V7h-5v2h3l-6 6-3-3-5 5-5-5z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={paths[name] || paths.spark} />
    </svg>
  )
}

const agentCatalog = [
  { id: "resto_marketer", title: "Marketing Manager — Restaurant", skills: ["Promos","Instagram","GMB"], rating: 4.8, price: "€19/mo", color: "bg-rose-50" },
  { id: "copy_ai", title: "Copywriter — Social Posts", skills: ["Captions","Hashtags","Email"], rating: 4.7, price: "€9/mo", color: "bg-indigo-50" },
  { id: "trend_ai", title: "Trend Analyst", skills: ["TikTok","Trends","Ideas"], rating: 4.6, price: "€12/mo", color: "bg-emerald-50" },
  { id: "design_ai", title: "Designer — Ads & Reels", skills: ["Images","Video","Stories"], rating: 4.5, price: "€14/mo", color: "bg-amber-50" },
]

const presetPrompts = [
  "Create a weekend promo post",
  "Draft an email about our new menu",
  "Analyze top 3 competitors",
  "Plan next month calendar",
  "Make 3 TikTok hooks",
]

const competitorRows = [
  { name: "Pasta Corner", followers: "4.2k", posting: "3x/week", avgLikes: 120 },
  { name: "Bella Napoli", followers: "7.9k", posting: "5x/week", avgLikes: 220 },
  { name: "Trattoria Uno", followers: "2.1k", posting: "2x/week", avgLikes: 75 },
]

function getMonthGrid(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const days:number[] = []
  for (let i = 1; i <= end.getDate(); i++) days.push(i)
  const firstDay = (start.getDay() + 6) % 7 // Monday-first
  return Array(firstDay).fill(null).concat(days as any)
}

export default function Page(){
  const [route, setRoute] = useState<'team'|'marketplace'|'chat'|'competitors'|'trends'|'calendar'|'library'>('team')
  const [search, setSearch] = useState('')
  const [team, setTeam] = useState([agentCatalog[0], agentCatalog[2]] as typeof agentCatalog)
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hi! I can help plan your November promos. Try a preset or type anything.' }])
  const [draft, setDraft] = useState('')
  const monthCells = useMemo(() => getMonthGrid(), [])

  const addToTeam = (agent:any) => {
    if (team.find(a => a.id === agent.id)) return
    setTeam([...team, agent])
  }

  const mockReply = (content:string) => {
    const c = content.toLowerCase()
    if (c.includes('competitor')) return 'I found 3 local competitors with higher posting frequency. Recommend 4x/week with reels on Fri-Sun.'
    if (c.includes('calendar')) return 'Here’s a 4-week plan: Mon-Story, Wed-Carousel, Fri-Reel, Sun-GMB update.'
    if (c.includes('tiktok')) return 'Hooks: 1) Secret to 5-min pasta, 2) €10 lunch deal challenge, 3) POV: chef’s table.'
    return 'Done! Drafted a post, added to Library, and scheduled for Saturday 5pm.'
  }

  const sendMessage = (t?:string) => {
    const content = (t ?? draft).trim()
    if (!content) return
    setMessages(m => [...m, { role: 'user', text: content }, { role: 'ai', text: mockReply(content) }])
    setDraft('')
    setRoute('chat')
  }

  const filteredCatalog = agentCatalog.filter(a => a.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button className="md:hidden p-2 rounded-xl hover:bg-gray-100">
            <Icon name="menu" />
          </button>
          <div className="flex items-center gap-2 font-semibold text-lg">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-black text-white"><Icon name="bot" className="w-4 h-4"/></span>
            <span>AgentHub</span>
          </div>
          <div className="flex-1 max-w-xl hidden md:flex items-center gap-2 ml-4">
            <div className="relative w-full">
              <Icon name="search" className="w-4 h-4 absolute left-3 top-2.5 text-gray-400"/>
              <Input placeholder="Search agents, files, or help…" className="pl-9" />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {[
              ["Team","team"],
              ["Marketplace","marketplace"],
              ["Chat","chat"],
              ["Competitors","competitors"],
              ["Trends","trends"],
              ["Calendar","calendar"],
              ["Library","library"],
            ].map(([label, key]) => (
              <button key={key} onClick={() => setRoute(key as any)} className={`px-3 py-1.5 rounded-xl text-sm hover:bg-gray-100 ${route===key?'bg-black text-white hover:bg-black':''}`}>{label}</button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={()=>setRoute('marketplace')} className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black text-white"><Icon name="plus"/> Add agent</button>
            <div className="w-8 h-8 rounded-xl bg-gray-200"/>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3 space-y-4">
          <Card>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="font-medium">Your AI Team</div>
              <button className="text-sm text-gray-500 hover:text-black" onClick={()=>setRoute('marketplace')}>+ Add</button>
            </div>
            <ul className="p-2">
              {team.map((a:any)=> (
                <li key={a.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer" onClick={()=>setRoute('chat')}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.color} text-gray-700`}><Icon name="bot"/></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium truncate">{a.title}</div>
                    <div className="text-xs text-gray-500 truncate">{a.skills.join(" · ")}</div>
                  </div>
                  <Icon name="spark" className="w-4 h-4 text-gray-400"/>
                </li>
              ))}
            </ul>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            <Stat label="This week posts" value="8" sub="+3 vs last week"/>
            <Stat label="Reach" value="12.4k" sub="est."/>
            <Stat label="CTR" value="3.2%" sub="avg"/>
          </div>
        </aside>

        <section className="lg:col-span-9 space-y-6">
          {route === 'marketplace' && (
            <Card>
              <div className="p-4 border-b flex items-center gap-3">
                <div className="font-semibold">Marketplace</div>
                <div className="flex-1"/>
                <div className="hidden md:block w-72"><Input placeholder="Search agents…" value={search} onChange={(e:any)=>setSearch(e.target.value)} /></div>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {['All','Marketing','Design','Trends','Email'].map((c,i)=> <Chip key={i}>{c}</Chip>)}
              </div>
              <div className="p-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredCatalog.map((a:any)=> (
                  <div key={a.id} className="rounded-2xl border overflow-hidden bg-white">
                    <div className={`h-28 ${a.color}`} />
                    <div className="p-4 space-y-2">
                      <div className="text-sm text-amber-500 flex items-center gap-1"><Icon name="star" className="w-4 h-4"/> {a.rating}</div>
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-sm text-gray-500">{a.skills.join(" · ")}</div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-sm font-medium">{a.price}</div>
                        <button onClick={()=>addToTeam(a)} className="px-3 py-1.5 rounded-xl bg-black text-white">Add to team</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {route === 'team' && (
            <div className="space-y-6">
              <Card>
                <div className="p-4 border-b font-semibold">Overview</div>
                <div className="p-4 grid md:grid-cols-3 gap-4">
                  <Stat label="Active agents" value={team.length} />
                  <Stat label="Tasks this week" value="27" />
                  <Stat label="Saved hours" value="14h" />
                </div>
              </Card>
              <Card>
                <div className="p-4 border-b font-semibold">Suggested next actions</div>
                <div className="p-4 flex flex-wrap gap-2">
                  {presetPrompts.map((p,i)=> <Chip key={i} onClick={()=>sendMessage(p)}>{p}</Chip>)}
                </div>
              </Card>
            </div>
          )}

          {route === 'chat' && (
            <Card>
              <div className="p-4 border-b font-semibold flex items-center gap-2"><Icon name="bot"/> Chat with Marketing Manager — Restaurant</div>
              <div className="p-4 max-h-[48vh] overflow-auto space-y-3">
                {messages.map((m:any,i:number)=> (
                  <div key={i} className={`flex ${m.role==='user'?'justify-end':''}`}>
                    <div className={`${m.role==='user'?'bg-black text-white':'bg-gray-100'} px-3 py-2 rounded-2xl max-w-[75%]`}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t space-y-3">
                <div className="flex flex-wrap gap-2">
                  {presetPrompts.map((p,i)=> <Chip key={i} onClick={()=>sendMessage(p)}>{p}</Chip>)}
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Type a message…" value={draft} onChange={(e:any)=>setDraft(e.target.value)} />
                  <button onClick={()=>sendMessage()} className="px-4 py-2 rounded-xl bg-black text-white inline-flex items-center gap-2"><Icon name="send" className="w-4 h-4"/>Send</button>
                </div>
              </div>
            </Card>
          )}

          {route === 'competitors' && (
            <Card>
              <div className="p-4 border-b font-semibold flex items-center gap-2"><Icon name="users"/> Competitors</div>
              <div className="p-4 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-gray-500">
                    <tr>
                      <th className="py-2">Name</th>
                      <th>Followers</th>
                      <th>Posting</th>
                      <th>Avg Likes</th>
                      <th>Suggestion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorRows.map((r,i)=> (
                      <tr key={i} className="border-t">
                        <td className="py-3 font-medium">{r.name}</td>
                        <td>{r.followers}</td>
                        <td>{r.posting}</td>
                        <td>{r.avgLikes}</td>
                        <td className="text-gray-500">Post 4x/week · Use Reels</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {route === 'trends' && (
            <Card>
              <div className="p-4 border-b font-semibold flex items-center gap-2"><Icon name="trend"/> Trends</div>
              <div className="p-4 grid md:grid-cols-3 gap-4">
                <div className="col-span-2 space-y-3">
                  <div className="p-4 rounded-xl bg-gray-50 border">
                    <div className="text-sm text-gray-500">Trending hooks</div>
                    <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                      <li>"€10 Lunch Deal" challenge</li>
                      <li>POV: behind-the-scenes kitchen prep</li>
                      <li>Before/After: plating glow-up</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border">
                    <div className="text-sm text-gray-500">Recommended formats</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Reel 9:16','Carousel 1:1','Story','GMB Post'].map((f,i)=> <Chip key={i}>{f}</Chip>)}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border">
                    <div className="text-sm text-gray-500">Hashtags</div>
                    <div className="mt-1 text-sm">#DublinEats #PastaNight #LunchDeal</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border">
                    <div className="text-sm text-gray-500">Best times</div>
                    <div className="mt-1 text-sm">Fri 6–8pm · Sat 12–2pm · Sun 6–7pm</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {route === 'calendar' && (
            <Card>
              <div className="p-4 border-b font-semibold flex items-center gap-2"><Icon name="calendar"/> Calendar Planner</div>
              <div className="p-4 grid grid-cols-7 gap-2 text-sm">
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => <div key={d} className="text-center text-gray-500">{d}</div>)}
                {monthCells.map((d:any,i:number)=> (
                  <div key={i} className={`h-24 border rounded-xl p-2 ${d?'bg-white':'bg-transparent border-none'}`}>
                    <div className="text-xs text-gray-500">{d||""}</div>
                    {d && i%5===0 && <div className="mt-2 text-xs px-2 py-1 rounded-lg bg-black text-white w-fit">Reel: Weekend promo</div>}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {route === 'library' && (
            <Card>
              <div className="p-4 border-b font-semibold flex items-center gap-2"><Icon name="folder"/> Library</div>
              <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map((i)=> (
                  <div key={i} className="border rounded-2xl overflow-hidden bg-white">
                    <div className="h-32 bg-gray-100 flex items-center justify-center"><Icon name="image" className="w-10 h-10 text-gray-400"/></div>
                    <div className="p-3 text-sm">
                      <div className="font-medium">Asset #{i}</div>
                      <div className="text-gray-500">Auto-generated caption & file</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 pb-10 text-xs text-gray-500">
        <div className="pt-6 border-t">© {new Date().getFullYear()} AgentHub — mock UI</div>
      </footer>
    </div>
  )
}
