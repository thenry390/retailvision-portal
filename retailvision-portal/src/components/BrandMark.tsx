export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? "compact" : ""}`}>
      <span>RETAIL</span><strong>VISION</strong>
    </div>
  );
}
