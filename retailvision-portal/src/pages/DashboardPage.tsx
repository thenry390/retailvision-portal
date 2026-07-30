import { AlertTriangle, ArrowUpRight, CheckCircle2, Clock3, Store } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { approvals, programData } from "../data/mockData";

const metrics = [
  { label: "Total Stores", value: "1,420", detail: "+18 this quarter", icon: Store },
  { label: "Active Programs", value: "48", detail: "12 completing this month", icon: ArrowUpRight },
  { label: "Pending Approvals", value: "62", detail: "9 high priority", icon: Clock3 },
  { label: "Compliance", value: "97%", detail: "+2.4% from last month", icon: CheckCircle2 }
];

export default function DashboardPage() {
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">EXECUTIVE OVERVIEW</span>
          <h1>Program control center.</h1>
        </div>
        <button className="primary-button">CREATE PROGRAM</button>
      </div>

      <div className="metric-grid">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <article className="metric-card" key={label}>
            <div className="metric-card-top">
              <span>{label}</span>
              <Icon size={19} />
            </div>
            <strong>{value}</strong>
            <small>{detail}</small>
          </article>
        ))}
      </div>

      <div className="dashboard-grid">
        <article className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">PROGRAM DELIVERY</span>
              <h2>Planned vs. completed</h2>
            </div>
            <span className="status-pill">ON TRACK</span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={programData}>
                <defs>
                  <linearGradient id="completedFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f4e81a" stopOpacity={0.32}/>
                    <stop offset="95%" stopColor="#f4e81a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#282828" vertical={false} />
                <XAxis dataKey="name" stroke="#777" />
                <YAxis stroke="#777" />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #333" }} />
                <Area type="monotone" dataKey="planned" stroke="#777" fill="transparent" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="completed" stroke="#f4e81a" fill="url(#completedFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="panel insight-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">AI INSIGHT</span>
              <h2>Focus next.</h2>
            </div>
          </div>
          <AlertTriangle size={34} />
          <h3>12 Midwest locations may miss installation windows.</h3>
          <p>
            Delays are concentrated in landlord approvals and electrical site
            readiness. Prioritize Chicago, Milwaukee, and Detroit programs.
          </p>
          <button className="secondary-button">VIEW AT-RISK STORES</button>
        </article>

        <article className="panel approval-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">APPROVAL ACTIVITY</span>
              <h2>Awaiting review</h2>
            </div>
            <a href="/portal/approvals">VIEW ALL</a>
          </div>
          <div className="activity-list">
            {approvals.map((item) => (
              <div className="activity-row" key={item.id}>
                <span className={`priority-dot ${item.priority.toLowerCase()}`} />
                <div>
                  <strong>{item.asset}</strong>
                  <small>{item.store} · {item.submittedBy}</small>
                </div>
                <span>{item.submittedOn}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
