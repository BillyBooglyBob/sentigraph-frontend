export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4 dark:text-white">
        Sentigraph
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Analyze sentiment on various aspects of your company with ease.
      </p>

      {/* Image */}
      <img
        src="/images/home-hero.png"
        alt="Sentiment Analysis Illustration"
        className="mx-auto w-full max-w-md rounded-lg shadow-md"
      />
    </div>
  );
}
