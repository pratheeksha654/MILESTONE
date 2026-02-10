const sections = [
  {
    title: "Smart AI That Listens",
    description:
      "MinuteAI understands conversations and converts them into structured, meaningful insights so you save time and effort.",
    image:
      "https://media.licdn.com/dms/image/v2/C5112AQF0XmUZxFh2WA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1567154250758?e=2147483647&v=beta&t=ZQa70p-eCJ50SkfVWbzLA8qacCIKkBDQwh9e-w-4HTY",
    bg: "bg-white dark:bg-black",
  },
  {
    title: "Simple Workflow",
    description:
      "Upload your meeting → AI processes it → get transcript, summary, and action items in minutes.",
    image:
      "https://img.freepik.com/premium-photo/secretary-taking-notes-notebook-corporate-meeting-with-group-multiracial-business-people-discussing-together-meeting-room-diversity-professional-meeting-modern-office-concord_31965-240587.jpg",
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
              
              
              <img
                src={section.image}
                alt=""
                className={`w-full h-[300px] md:h-[450px] rounded-3xl shadow-sm object-cover ${imageOrder}`}
              />

              
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
