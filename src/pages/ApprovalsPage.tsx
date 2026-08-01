import { Check, MessageSquareText, X } from "lucide-react";
import { useRetailData } from "../hooks/useRetailData";
import DataState from "../components/common/DataState";

export default function ApprovalsPage() {
  const { data, loading, error, retry } = useRetailData();
  if (loading || error || !data) return <DataState loading={loading} error={error} retry={retry} />;
  const approvals = data.approvals;
  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">GOVERNANCE WORKFLOW</span>
          <h1>Review with confidence.</h1>
        </div>
      </div>

      <div className="approval-grid">
        {approvals.map((approval) => (
          <article className="approval-card" key={approval.id}>
            <div className="asset-preview">
              <span>{approval.id}</span>
              <div className="signage-mock">
                <div />
                <strong>RETAIL</strong>
              </div>
            </div>
            <div className="approval-card-content">
              <div className="approval-meta">
                <span className={`priority-label ${approval.priority.toLowerCase()}`}>
                  {approval.priority} priority
                </span>
                <span>{approval.submittedOn}</span>
              </div>
              <h2>{approval.asset}</h2>
              <p>{approval.store}</p>
              <small>Submitted by {approval.submittedBy}</small>
              <div className="approval-actions">
                <button className="approve"><Check size={16}/> Approve</button>
                <button><MessageSquareText size={16}/> Changes</button>
                <button><X size={16}/> Reject</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
