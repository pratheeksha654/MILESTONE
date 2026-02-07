const features = [
  {
    title: "Audio to Text",
    description:
      "Upload meeting recordings and get accurate transcripts in seconds.",
  },
  {
    title: "AI Summaries",
    description:
      "Automatically generate concise summaries and key discussion points.",
  },
  {
    title: "Action Items",
    description:
      "Never miss tasks again with AI-generated action items.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#f9f7f4] dark:bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-blue-600">
          Powerful Features
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-100">
          Everything you need to understand meetings better.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-medium text-blue-700">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
