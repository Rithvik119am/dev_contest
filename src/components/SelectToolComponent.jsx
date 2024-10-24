import { Link } from "react-router-dom";
import { TOOLS } from "../constants";

export function SelectToolComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-[#3B1E54] container mx-auto grid lg:grid-cols-3 gap-4 p-6 justify-center items-center">
        {TOOLS.filter((tool) => tool.category === "mint").map((tool) => (
          <div
            className="flex justify-center items-center text-center"
            key={tool.id}
          >
            <Link to={tool.path} className="block p-4">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                {tool.label}
              </h5>
              <p className="font-normal text-base text-gray-400">
                {tool.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
