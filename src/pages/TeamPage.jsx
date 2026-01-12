export default function TeamPage() {
  const team = [
    {
      id: 1,
      name: "Gökhan Özdemir",
      role: "Project Manager",
      image: "https://via.placeholder.com/300", // linkedin image koyabilirsin
    },
    {
      id: 2,
      name: "Özge Armutlu",
      role: "Full Stack Developer",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Team Member 1",
      role: "Frontend Developer",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "Team Member 2",
      role: "Backend Developer",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <section className="px-4 py-6 flex flex-col gap-6 md:max-w-6xl md:mx-auto">

      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">
          Our Team
        </h1>
        <p className="text-sm text-gray-500">
          Meet the people behind the project
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {team.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center gap-3 rounded-xl border p-4"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover"
            />

            <h3 className="font-semibold text-center">
              {member.name}
            </h3>

            <p className="text-sm text-gray-500 text-center">
              {member.role}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}
