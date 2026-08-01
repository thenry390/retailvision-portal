import { Progress, Table, Tag } from "antd";
import { AlertTriangle, CalendarDays, Download, Gauge, Plus, Users } from "lucide-react";
import type { Key } from "react";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import {
  executiveMilestones, executionTrend, portfolioHealth, raidItems, resourceCapacity,
  type RaidItem, type RaidSeverity, type RaidStatus, type RaidType
} from "../data/mockData";

const severityRank: Record<RaidSeverity, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
const healthColors = ["#a6dca8", "#f4e81a", "#ff8c8c"];

export default function ExecutionPage() {
  const openRaid = raidItems.filter((item) => item.status !== "Closed");
  const critical = raidItems.filter((item) => item.severity === "Critical").length;
  const averageCapacity = Math.round(resourceCapacity.reduce((sum, item) => sum + item.allocated, 0) / resourceCapacity.length);
  const scheduleVariance = executionTrend.at(-1)!.actual - executionTrend.at(-1)!.planned;

  const columns = [
    {
      title: "ITEM",
      render: (_: string, record: RaidItem) => (
        <div className="table-primary"><strong>{record.title}</strong><span>{record.id} · {record.program}</span></div>
      )
    },
    {
      title: "TYPE",
      dataIndex: "type",
      filters: (["Risk", "Assumption", "Issue", "Dependency"] satisfies RaidType[]).map((value) => ({ text: value, value })),
      onFilter: (value: boolean | Key, record: RaidItem) => record.type === String(value),
      render: (value: RaidType) => <Tag className={`raid-tag ${value.toLowerCase()}`}>{value}</Tag>
    },
    { title: "OWNER", dataIndex: "owner" },
    {
      title: "SEVERITY",
      dataIndex: "severity",
      sorter: (a: RaidItem, b: RaidItem) => severityRank[a.severity] - severityRank[b.severity],
      render: (value: RaidSeverity) => <span className={`severity ${value.toLowerCase()}`}>{value}</span>
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (value: RaidStatus) => <Tag className={`raid-status ${value.toLowerCase()}`}>{value}</Tag>
    },
    { title: "DUE", dataIndex: "dueDate" }
  ];

  return (
    <section className="page execution-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PORTFOLIO CONTROL CENTER</span>
          <h1>Execution at a glance.</h1>
          <p className="page-intro">Monitor schedule, delivery risk, team capacity, and milestones across active retail programs.</p>
        </div>
        <div className="detail-actions">
          <button className="secondary-button"><Download size={14}/> EXPORT STATUS</button>
          <button className="primary-button"><Plus size={14}/> ADD RAID ITEM</button>
        </div>
      </div>

      <div className="metric-grid execution-metrics">
        <article className="metric-card"><div className="metric-card-top"><span>PORTFOLIO COMPLETION</span><Gauge size={18}/></div><strong>91%</strong><small>5 points below plan</small></article>
        <article className="metric-card"><div className="metric-card-top"><span>OPEN RAID ITEMS</span><AlertTriangle size={18}/></div><strong>{openRaid.length}</strong><small>{critical} critical item requires action</small></article>
        <article className="metric-card"><div className="metric-card-top"><span>TEAM CAPACITY</span><Users size={18}/></div><strong>{averageCapacity}%</strong><small>Production nearing threshold</small></article>
        <article className="metric-card"><div className="metric-card-top"><span>SCHEDULE VARIANCE</span><CalendarDays size={18}/></div><strong>{scheduleVariance} pts</strong><small>Actual versus plan at week 8</small></article>
      </div>

      <div className="execution-chart-grid">
        <article className="panel chart-panel">
          <div className="panel-heading"><div><span className="eyebrow">DELIVERY TREND</span><h2>Planned vs. actual completion</h2></div><span className="status-pill">8 WEEKS</span></div>
          <div className="chart-wrap execution-chart">
            <ResponsiveContainer width="100%" height={290}>
              <LineChart data={executionTrend}>
                <CartesianGrid stroke="#252525" vertical={false}/><XAxis dataKey="week" stroke="#666"/><YAxis stroke="#666" domain={[35, 100]}/>
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333" }}/><Legend/>
                <Line type="monotone" dataKey="planned" stroke="#777" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="actual" stroke="#f4e81a" strokeWidth={3} dot={{ r: 3 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel health-panel">
          <div className="panel-heading"><div><span className="eyebrow">PROGRAM HEALTH</span><h2>Portfolio status</h2></div></div>
          <ResponsiveContainer width="100%" height={225}>
            <PieChart><Pie data={portfolioHealth} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={4}>{portfolioHealth.map((entry, index) => <Cell key={entry.name} fill={healthColors[index]}/>)}</Pie><Tooltip contentStyle={{ background: "#111", border: "1px solid #333" }}/></PieChart>
          </ResponsiveContainer>
          <div className="health-legend">{portfolioHealth.map((item, index) => <div key={item.name}><i style={{ background: healthColors[index] }}/><span>{item.name}</span><strong>{item.value}</strong></div>)}</div>
        </article>
      </div>

      <div className="execution-lower-grid">
        <article className="panel capacity-panel">
          <div className="panel-heading"><div><span className="eyebrow">RESOURCE PLAN</span><h2>Team allocation</h2></div></div>
          <ResponsiveContainer width="100%" height={285}>
            <BarChart data={resourceCapacity} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid stroke="#252525" horizontal={false}/><XAxis type="number" domain={[0, 100]} stroke="#666"/><YAxis type="category" dataKey="team" width={78} stroke="#777"/>
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #333" }}/><Bar dataKey="allocated" fill="#f4e81a" radius={[0, 3, 3, 0]}/>
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="panel milestone-timeline-panel">
          <div className="panel-heading"><div><span className="eyebrow">NEXT 30 DAYS</span><h2>Executive milestones</h2></div></div>
          <div className="executive-timeline">
            {executiveMilestones.map((milestone) => <div className={`executive-milestone ${milestone.state}`} key={`${milestone.date}-${milestone.label}`}><span className="timeline-node"/><time>{milestone.date}</time><div><strong>{milestone.label}</strong><small>{milestone.program}</small></div></div>)}
          </div>
        </article>
      </div>

      <article className="panel detail-table-panel raid-panel">
        <div className="panel-heading detail-section-heading"><div><span className="eyebrow">RAID LOG</span><h2>Risks, assumptions, issues & dependencies</h2></div><span>{openRaid.length} OPEN ITEMS</span></div>
        <Table rowKey="id" dataSource={raidItems} columns={columns} pagination={false} scroll={{ x: 980 }}/>
      </article>
    </section>
  );
}
