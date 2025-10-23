export default function RightSidebar() {
  const trending = ["AI for Beginners", "React 101", "UI/UX Design Tips"];

  return (
    <aside className="w-64 bg-gray-50 border-l p-4 flex flex-col space-y-3 min-h-screen">
      <h2 className="font-bold text-lg mb-2">Trending Courses</h2>
      {trending.map((item, index) => (
        <div
          key={index}
          className="bg-white p-2 rounded shadow hover:bg-gray-100 transition cursor-pointer"
        >
          {item}
        </div>
      ))}
    </aside>
  );
}
