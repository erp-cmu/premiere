function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="hero min-h-[500px] bg-base-200 rounded-2xl overflow-hidden shadow-xl">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8">
          <img
            src="https://picsum.photos/600/400"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Hero"
          />
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Premiere Innova
            </h1>
            <p className="py-6 text-lg">ERP Management Application</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
