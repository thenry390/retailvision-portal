import { Input, Progress, Select, Table, Tag } from "antd";
import { Plus, Search } from "lucide-react";
import { useMemo, useState, type Key } from "react";
import { Link } from "react-router-dom";
import { useRetailData } from "../hooks/useRetailData";
import DataState from "../components/common/DataState";
import type { ProgramRecord, ProgramStatus } from "../models/retailvision";

const statusOptions: ProgramStatus[] = ["Planning", "Production", "Shipping", "Installing", "Complete", "Delayed"];

export default function ProgramsPage() {
  const { data, loading, error, retry } = useRetailData();
  const programs = data?.programs.programs ?? [];
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState<string | undefined>();
  const [status, setStatus] = useState<ProgramStatus | undefined>();

  const customerOptions = useMemo(
    () => [...new Set(programs.map((program) => program.customer))].sort().map((value) => ({ value, label: value })),
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return programs.filter((program) => {
      const searchable = `${program.name} ${program.id} ${program.customer} ${program.owner} ${program.region}`.toLowerCase();
      return (!normalized || searchable.includes(normalized)) &&
        (!customer || program.customer === customer) &&
        (!status || program.status === status);
    });
  }, [query, customer, status]);

  const columns = [
    {
      title: "PROGRAM",
      dataIndex: "name",
      sorter: (a: ProgramRecord, b: ProgramRecord) => a.name.localeCompare(b.name),
      render: (_: string, record: ProgramRecord) => (
        <Link to={`/portal/programs/${record.id}`} className="table-primary table-link">
          <strong>{record.name}</strong>
          <span>{record.id} · {record.region}</span>
        </Link>
      )
    },
    {
      title: "CUSTOMER",
      dataIndex: "customer",
      sorter: (a: ProgramRecord, b: ProgramRecord) => a.customer.localeCompare(b.customer)
    },
    { title: "OWNER", dataIndex: "owner" },
    {
      title: "STATUS",
      dataIndex: "status",
      filters: statusOptions.map((value) => ({ text: value, value })),
      onFilter: (value: boolean | Key, record: ProgramRecord) => record.status === String(value),
      render: (value: ProgramStatus) => <Tag className={`program-tag ${value.toLowerCase()}`}>{value}</Tag>
    },
    {
      title: "DUE DATE",
      dataIndex: "dueDate"
    },
    {
      title: "STORES",
      dataIndex: "storeCount",
      sorter: (a: ProgramRecord, b: ProgramRecord) => a.storeCount - b.storeCount
    },
    {
      title: "COMPLETION",
      dataIndex: "completion",
      sorter: (a: ProgramRecord, b: ProgramRecord) => a.completion - b.completion,
      render: (value: number) => <Progress percent={value} size="small" strokeColor="#f4e81a" />
    }
  ];

  if (loading || error || !data) return <DataState loading={loading} error={error} retry={retry} />;

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PROGRAM PORTFOLIO</span>
          <h1>Campaigns in motion.</h1>
          <p className="page-intro">Track every customer program from planning through store execution.</p>
        </div>
        <button className="primary-button"><Plus size={15} /> CREATE PROGRAM</button>
      </div>

      <div className="program-summary-strip" aria-label="Program summary">
        <div><span>ACTIVE</span><strong>{programs.filter((p) => p.status !== "Complete").length}</strong></div>
        <div><span>AT RISK</span><strong>{programs.filter((p) => p.status === "Delayed").length}</strong></div>
        <div><span>TOTAL STORES</span><strong>{programs.reduce((sum, p) => sum + p.storeCount, 0).toLocaleString()}</strong></div>
        <div><span>AVG. COMPLETION</span><strong>{Math.round(programs.reduce((sum, p) => sum + p.completion, 0) / programs.length)}%</strong></div>
      </div>

      <div className="filter-bar program-filter-bar">
        <Input
          prefix={<Search size={16} />}
          placeholder="Search program, ID, customer, owner, or region"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          allowClear
        />
        <Select allowClear placeholder="All customers" value={customer} onChange={setCustomer} options={customerOptions} />
        <Select
          allowClear
          placeholder="All statuses"
          value={status}
          onChange={setStatus}
          options={statusOptions.map((value) => ({ value, label: value }))}
        />
      </div>

      <article className="panel table-panel">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          pagination={{ pageSize: 7, showSizeChanger: false }}
          scroll={{ x: 1100 }}
          locale={{ emptyText: "No programs match the selected filters." }}
        />
      </article>
    </section>
  );
}
