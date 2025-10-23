"use client"

const features = [
  "Course",
  "Planner",
  "Certification",
  "Chatroom",
  "Tutorials",
  "Post",
  "R & D",
  "Online Competition",
  "Specialization",
  "Digital Library",
  "Course Support",
  "Rent a Lab",
  "Help and Support",
  "Course",
  "Planner",
  "Certification",
  "Chatroom",
  "Tutorials",
  "Post",
  "R & D",
  "Online Competition",
  "Specialization",
  "Digital Library",
  "Course Support",
  "Rent a Lab",
  "Help and Support",
]

export default function LeftSidebar() {
  return (
    <aside
      className="
        w-80
        bg-[#F9F9F9] 
        h-screen 
        flex 
        flex-col
      "
    >
      <div className="p-4 flex-shrink-0">
        <h2
          className="mb-4"
          style={{
            color: "#174A5F",
            fontFamily: "Poppins",
            fontWeight: 500,
            fontStyle: "bold",
            fontSize: "18px",
          }}
        >
          Platform Features
        </h2>
      </div>

      <div
        className="
          flex-1
          overflow-y-auto 
          scrollbar-thin 
          scrollbar-thumb-[#174A5F] 
          scrollbar-track-[#E5E5E5]
          px-4
        "
      >
        <div className="flex flex-wrap gap-2 pb-4">
          {features.map((feature, index) => (
            <button
              key={`${feature}-${index}`}
              className="
                border 
                border-[#174A5F] 
                text-[#174A5F] 
                bg-white 
                rounded-[30px] 
                px-5 
                py-2 
                text-sm
                transition 
                hover:bg-[#174A5F] 
                hover:text-white
              "
              style={{ fontFamily: "Poppins", fontWeight: 500 }}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex-shrink-0 border-t border-[#E5E5E5]">
        <h2
          className="mb-3"
          style={{
            color: "#174A5F",
            fontFamily: "Poppins",
            fontWeight: 500,
            fontStyle: "bold",
            fontSize: "18px",
          }}
        >
          Contact Us
        </h2>
        <button
          className="
            w-full
            border 
            border-[#174A5F] 
            text-[#174A5F] 
            bg-white 
            rounded-[30px] 
            px-5 
            py-4 
            text-sm
            transition 
            hover:bg-[#174A5F] 
            hover:text-white
          "
          style={{ fontFamily: "Poppins", fontWeight: 500 }}
        >
          Contact Us
        </button>
      </div>
    </aside>
  )
}
