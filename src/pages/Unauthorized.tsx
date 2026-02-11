function Unauthorized() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Unauthorized</h1>
      <p className="text-center text-lg text-base-content/70">
        You do not have permission to access this page.
      </p>
    </div>
  );
}

export default Unauthorized;
