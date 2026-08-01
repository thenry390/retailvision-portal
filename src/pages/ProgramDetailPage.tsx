import { Progress, Table, Tag } from "antd";
import { ArrowLeft, Check, Circle, Clock3, Download, MapPin } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useRetailData } from "../hooks/useRetailData";
import DataState from "../components/common/DataState";
import type { ProgramRecord, StoreRecord } from "../models/retailvision";

export default function ProgramDetailPage() {
  const { data, loading, error, retry } = useRetailData();
  const { programId } = useParams();
  if (loading || error || !data) return <DataState loading={loading} error={error} retry={retry} />;
  const { programs, milestones: programMilestones, assets: programAssets, activities: programActivities } = data.programs;
  const { stores } = data.stores;
  const program = programs.find((item) => item.id === programId);
  if (!program) return <Navigate to="/portal/programs" replace />;

  const assignedStores = stores.filter((store) => store.program === program.name);
  const storeRows = assignedStores.length ? assignedStores : stores.slice(0, 4);

  return (
    <section className="page program-detail-page">
      <Link to="/portal/programs" className="back-link"><ArrowLeft size={15}/> BACK TO PROGRAMS</Link>
      <div className="page-heading detail-heading">
        <div>
          <span className="eyebrow">{program.id} · {program.customer}</span>
          <h1>{program.name}</h1>
          <p className="page-intro">Coordinated production, shipment, installation, and closeout across {program.storeCount} locations.</p>
        </div>
        <div className="detail-actions">
          <button className="secondary-button"><Download size={14}/> EXPORT</button>
          <button className="primary-button">EDIT PROGRAM</button>
        </div>
      </div>

      <div className="program-overview-grid">
        <article className="panel program-progress-card">
          <span className="eyebrow">OVERALL COMPLETION</span>
          <div className="progress-number">{program.completion}%</div>
          <Progress percent={program.completion} showInfo={false} strokeColor="#f4e81a" trailColor="#292929" />
          <div className="progress-meta"><span>{Math.round(program.storeCount * program.completion / 100)} stores complete</span><span>{program.storeCount} total</span></div>
        </article>
        <article className="panel program-facts">
          <div><span>STATUS</span><Tag className={`program-tag ${program.status.toLowerCase()}`}>{program.status}</Tag></div>
          <div><span>OWNER</span><strong>{program.owner}</strong></div>
          <div><span>DUE DATE</span><strong>{program.dueDate}</strong></div>
          <div><span>REGION</span><strong>{program.region}</strong></div>
        </article>
      </div>

      <div className="program-detail-grid">
        <article className="panel milestone-panel">
          <div className="panel-heading"><div><span className="eyebrow">DELIVERY PLAN</span><h2>Milestones</h2></div></div>
          <div className="milestone-list">
            {programMilestones.map((milestone) => (
              <div className={`milestone-row ${milestone.status.toLowerCase()}`} key={milestone.name}>
                <span className="milestone-icon">{milestone.status === "Complete" ? <Check size={15}/> : milestone.status === "Current" ? <Clock3 size={15}/> : <Circle size={13}/>}</span>
                <div><strong>{milestone.name}</strong><small>{milestone.date}</small></div>
                <span>{milestone.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel activity-panel">
          <div className="panel-heading"><div><span className="eyebrow">LATEST CHANGES</span><h2>Activity</h2></div></div>
          <div className="detail-activity-list">
            {programActivities.map((activity) => (
              <div key={`${activity.date}-${activity.title}`}><span>{activity.date}</span><div><strong>{activity.title}</strong><small>{activity.detail}</small></div></div>
            ))}
          </div>
        </article>
      </div>

      <article className="panel detail-table-panel">
        <div className="panel-heading detail-section-heading"><div><span className="eyebrow">FIELD EXECUTION</span><h2>Assigned stores</h2></div><span>{program.storeCount} LOCATIONS</span></div>
        <Table rowKey="id" pagination={false} dataSource={storeRows} scroll={{ x: 760 }} columns={[
          { title: "STORE", render: (_: string, record: StoreRecord) => <Link className="table-primary table-link" to={`/portal/stores/${record.id}`}><strong>{record.name}</strong><span>{record.id}</span></Link> },
          { title: "LOCATION", render: (_: string, record: StoreRecord) => <span className="location-cell"><MapPin size={13}/>{record.city}, {record.state}</span> },
          { title: "STATUS", dataIndex: "status", render: (value: string) => <Tag className={`store-tag ${value.toLowerCase().replace(" ", "-")}`}>{value}</Tag> },
          { title: "COMPLETION", dataIndex: "completion", render: (value: number) => <Progress percent={value} size="small" strokeColor="#f4e81a" /> }
        ]}/>
      </article>

      <article className="panel detail-table-panel">
        <div className="panel-heading detail-section-heading"><div><span className="eyebrow">PRODUCTION SCOPE</span><h2>Program assets</h2></div><span>{programAssets.length} ASSET TYPES</span></div>
        <Table rowKey="id" pagination={false} dataSource={programAssets} scroll={{ x: 720 }} columns={[
          { title: "ASSET", render: (_: string, record: (typeof programAssets)[number]) => <div className="table-primary"><strong>{record.name}</strong><span>{record.id}</span></div> },
          { title: "TYPE", dataIndex: "type" },
          { title: "QUANTITY", dataIndex: "quantity" },
          { title: "STATUS", dataIndex: "status", render: (value: string) => <Tag className={`asset-status-tag ${value.toLowerCase().replace(" ", "-")}`}>{value}</Tag> }
        ]}/>
      </article>
    </section>
  );
}
