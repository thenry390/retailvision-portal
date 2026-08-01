import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Plus,
  Upload,
  UserRound
} from "lucide-react";
import { Progress, Tabs, Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import { useRetailData } from "../hooks/useRetailData";
import DataState from "../components/common/DataState";

export default function StoreDetailPage() {
  const { data, loading, error, retry } = useRetailData();
  const { storeId } = useParams();
  if (loading || error || !data) return <DataState loading={loading} error={error} retry={retry} />;
  const { stores, assets: chicagoAssets, timeline: chicagoTimeline } = data.stores;
  const store = stores.find((item) => item.id === storeId) ?? stores[0];

  const overview = (
    <div className="store-overview-grid">
      <article className="panel store-program-card">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">ACTIVE PROGRAM</span>
            <h2>{store.program}</h2>
          </div>
          <Tag className={`store-tag ${store.status.toLowerCase().replace(" ", "-")}`}>
            {store.status}
          </Tag>
        </div>

        <div className="program-progress">
          <div>
            <strong>{store.completion}%</strong>
            <span>PROGRAM COMPLETE</span>
          </div>
          <Progress
            percent={store.completion}
            showInfo={false}
            strokeColor="#f4e81a"
            trailColor="#242424"
          />
        </div>

        <div className="detail-pairs">
          <div><span>Readiness</span><strong>{store.readiness}</strong></div>
          <div><span>Last inspection</span><strong>{store.lastInspection}</strong></div>
          <div><span>Next milestone</span><strong>{store.nextMilestone}</strong></div>
          <div><span>Due date</span><strong>{store.nextMilestoneDate}</strong></div>
        </div>
      </article>

      <article className="panel issue-card">
        <AlertTriangle size={30} />
        <span className="eyebrow">OPEN ISSUE</span>
        <h2>Site readiness requires attention.</h2>
        <p>{store.issue}</p>
        <div className="issue-actions">
          <button className="secondary-button">VIEW ISSUE</button>
          <button className="ghost-button"><MessageSquareText size={15}/> ADD COMMENT</button>
        </div>
      </article>

      <article className="panel contact-card">
        <span className="eyebrow">PRIMARY CONTACT</span>
        <div className="contact-person">
          <div className="contact-avatar"><UserRound size={24}/></div>
          <div>
            <h2>{store.contact?.name}</h2>
            <p>{store.contact?.role}</p>
          </div>
        </div>
        <div className="contact-lines">
          <a href={`mailto:${store.contact?.email}`}><Mail size={16}/>{store.contact?.email}</a>
          <a href={`tel:${store.contact?.phone}`}><Phone size={16}/>{store.contact?.phone}</a>
        </div>
      </article>

      <article className="panel milestone-card">
        <span className="eyebrow">NEXT MILESTONE</span>
        <CalendarDays size={30}/>
        <h2>{store.nextMilestone}</h2>
        <strong>{store.nextMilestoneDate}</strong>
        <p>Approval is required before fabrication can be released.</p>
      </article>
    </div>
  );

  const assets = (
    <div className="asset-table">
      {chicagoAssets.map((asset) => (
        <div className="asset-row" key={asset.id}>
          <div className="asset-thumb">
            <div />
            <strong>RV</strong>
          </div>
          <div className="asset-name">
            <strong>{asset.name}</strong>
            <span>{asset.id} · {asset.type}</span>
          </div>
          <span>{asset.revision}</span>
          <Tag className={`asset-status ${asset.status.toLowerCase().replace(" ", "-")}`}>
            {asset.status}
          </Tag>
          <button className="icon-button" aria-label={`Download ${asset.name}`}><Download size={16}/></button>
        </div>
      ))}
    </div>
  );

  const activity = (
    <div className="timeline-list">
      {chicagoTimeline.map((item, index) => (
        <div className="timeline-row" key={`${item.date}-${item.title}`}>
          <div className="timeline-date">{item.date}</div>
          <div className="timeline-marker">
            <span />
            {index < chicagoTimeline.length - 1 && <i />}
          </div>
          <div>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="page store-detail-page">
      <Link to="/portal/stores" className="back-link">
        <ArrowLeft size={16}/> BACK TO STORES
      </Link>

      <div className="store-detail-hero">
        <div>
          <span className="eyebrow">{store.id} · {store.type}</span>
          <h1>{store.name}</h1>
          <p><MapPin size={15}/>{store.address}</p>
        </div>

        <div className="store-detail-actions">
          <button className="ghost-button"><Upload size={15}/> UPLOAD PHOTO</button>
          <button className="primary-button"><Plus size={15}/> CREATE REQUEST</button>
        </div>
      </div>

      <div className="store-score-strip">
        <div>
          <span>COMPLIANCE SCORE</span>
          <strong>{store.complianceScore}%</strong>
        </div>
        <div>
          <span>REGION</span>
          <strong>{store.region}</strong>
        </div>
        <div>
          <span>READINESS</span>
          <strong>{store.readiness}</strong>
        </div>
        <div>
          <span>OPEN APPROVALS</span>
          <strong>2</strong>
        </div>
      </div>

      <Tabs
        className="store-tabs"
        defaultActiveKey="overview"
        items={[
          { key: "overview", label: "OVERVIEW", children: overview },
          { key: "assets", label: "ASSETS", children: assets },
          { key: "activity", label: "ACTIVITY", children: activity },
          {
            key: "photos",
            label: "PHOTOS",
            children: (
              <div className="photo-grid">
                {[1,2,3].map((item) => (
                  <div className="site-photo" key={item}>
                    <span>SITE PHOTO 0{item}</span>
                    <div className="photo-building">
                      <i />
                      <b />
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        ]}
      />
    </section>
  );
}
