export const PageHeaderInfo = ({ title, description }) => {
  return (
    <section className="flex flex-col gap-y-1 py-5">
      {title && (
        <h1 className="text-3xl font-bold whitespace-nowrap">{title}</h1>
      )}
      {description && <p className="text-md break-keep">{description}</p>}
    </section>
  );
};
