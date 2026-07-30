import { Input, Progress, Select, Table, Tag } from "antd";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { stores } from "../data/mockData";

export default function StoresPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | undefined>();

  const filtered = useMemo(() => {
    return stores.filter((store) => {
      const matchesQuery = `${store.name} ${store.id} ${store.city} ${store.state}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = !status || store.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const columns = [
    {
      title: "STORE",
      dataIndex: "name",
      render: (_: string, record: typeof stores[number]) => (
        <Link to={`/portal/stores/${record.id}`} className="table-primary table-link">
          <strong>{record.name}</strong>
          <span>{record.id}</span>
        </Link>
      )
    },
    {
      title: "LOCATION",
      render: (_: string, record: typeof stores[number]) => `${record.city}, ${record.state}`
    },
    { title: "PROGRAM", dataIndex: "program" },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (value: string) => (
        <Tag className={`store-tag ${value.toLowerCase().replace(" ", "-")}`}>{value}</Tag>
      )
    },
    {
      title: "COMPLETION",
      dataIndex: "completion",
      render: (value: number) => <Progress percent={value} size="small" strokeColor="#f4e81a" />
    }
  ];

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">STORE NETWORK</span>
          <h1>Every location, one view.</h1>
        </div>
        <button className="primary-button">ADD STORE</button>
      </div>

      <div className="filter-bar">
        <Input
          prefix={<Search size={16} />}
          placeholder="Search by store, ID, city, or state"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select
          allowClear
          placeholder="All statuses"
          value={status}
          onChange={setStatus}
          options={[
            { value: "Compliant", label: "Compliant" },
            { value: "Attention", label: "Attention" },
            { value: "At Risk", label: "At Risk" }
          ]}
        />
      </div>

      <article className="panel table-panel">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filtered}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 860 }}
        />
      </article>
    </section>
  );
}
