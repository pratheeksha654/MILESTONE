const sections = [
  {
    title: "Smart AI That Listens",
    description:
      "MinuteAI understands conversations and converts them into structured, meaningful insights so you save time and effort.",
    image:
      "https://drlongnecker.com/img/2026/01/ai-notetaking-presence.webp",
    bg: "bg-white dark:bg-black",
  },
  {
    title: "Simple Workflow",
    description:
      "Upload your meeting → AI processes it → get transcript, summary, and action items in minutes.",
    image:
      "https://www.softwaresuggest.com/blog/wp-content/uploads/2023/10/10-Best-AI-Note-Taking-App-in-2023-1.jpg",
    bg: "bg-[#f9f7f4] dark:bg-black",
  },
];

export default function ImageTextSection() {
  return (
    <>
      {sections.map((section, index) => {
        const imageOrder = index % 2 === 0 ? "md:order-1" : "md:order-2";
        const textOrder = index % 2 === 0 ? "md:order-2" : "md:order-1";

        return (
          <section key={index} className={`py-20 px-6 ${section.bg}`}>
            <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
              
              {/* Image */}
              <img
                src={section.image}
                alt=""
                className={`w-full h-[300px] md:h-[450px] rounded-3xl shadow-sm object-cover ${imageOrder}`}
              />

              {/* Text */}
              <div className={`${textOrder}`}>
                <h2 className="text-3xl font-semibold text-blue-600">
                  {section.title}
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-100 text-lg">
                  {section.description}
                </p>
              </div>

            </div>
          </section>
        );
      })}
    </>
  );
}
