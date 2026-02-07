import Link from "next/link";

export default function DashboardCard({
  title,
  description,
  link,
  linkText,
  className = "",
}) {
  return (
    <div
      className={`p-6 rounded-2xl shadow transition hover:-translate-y-1 hover:shadow-xl ${className || "bg-white dark:bg-gray-800 text-gray-900 dark:text-white"}`}
    >
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className={`mt-2 ${className ? "text-white/90" : "text-gray-600 dark:text-gray-300"}`}>
        {description}
      </p>

      {link && linkText && (
        <Link
          href={link}
          className={`mt-4 inline-block text-sm font-medium ${
            className ? "text-white underline" : "text-blue-600 dark:text-blue-400 hover:underline"
          }`}
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
