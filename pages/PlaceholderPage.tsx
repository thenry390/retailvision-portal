export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="page placeholder-page">
      <span className="eyebrow">NEXT BUILD MILESTONE</span>
      <h1>{title}</h1>
      <p>
        This route is included in the application architecture and is ready for
        detailed workflow design and implementation.
      </p>
    </section>
  );
}
