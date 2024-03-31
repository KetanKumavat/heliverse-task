import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import userData from "../../../public/users.json";

export const HoverEffect = ({ className }: { className?: string }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  let filteredUsers = userData.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      filteredUsers = filteredUsers.filter((user) => {
        if (key === "availability") {
          return filters[key] === "true" ? user.available : !user.available;
        } else {
          const userValue = String(user[key]).toLowerCase();
          return userValue === filters[key].toLowerCase();
        }
      });
    }
  });

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters({ ...filters, [filterType]: value });
  };

  return (
    <div className={cn("py-10", className)}>
      <div className="flex flex-wrap justify-center gap-4 mb-4 ">
        <input
          type="text"
          placeholder="Search User"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 px-px-3 p-2 rounded-md bg-black text-white placeholder-white"
        />
        <select
          value={filters.domain}
          onChange={(e) => handleFilterChange("domain", e.target.value)}
          className="border-2 p-2 px-px-3 rounded-md bg-black text-white placeholder-white">
          <option value="">All Domains</option>
          <option value="Business Development">Business Development</option>
          <option value="Finance">Finance</option>
          <option value="IT">IT</option>
          <option value="Management">Management</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="UI Designing">UI Designing</option>
        </select>
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange("gender", e.target.value)}
          className="border-2 px-px-3 p-2 rounded-md bg-black text-white placeholder-white">
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          value={filters.availability}
          onChange={(e) => handleFilterChange("available", e.target.value)}
          className="border-2 px-3 p-2 rounded-md bg-black text-white placeholder-white">
          <option value="">Availabilities</option>
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          className
        )}>
        {currentUsers.map(
          (
            user,
            idx // Map over your user data instead of items
          ) => (
            <div
              key={user.id}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-white/75 block rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card user={user}>
                <CardTitle>
                  {user.first_name} {user.last_name}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </Card>
            </div>
          )
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export const Pagination = ({
  totalPages,
  currentPage,
  paginate,
}: {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}) => {
  const showPages = 2; // Number of pages to show before and after the current page

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const firstPage = 1;
  const lastPage = totalPages;

  const renderPageNumbers = pages
    .filter(
      (page) =>
        page === firstPage ||
        page === lastPage ||
        (page >= currentPage - showPages && page <= currentPage + showPages)
    )
    .map((page) => (
      <li key={page}>
        <button
          className={`${
            page === currentPage
              ? "bg-zinc-950 text-white"
              : "bg-gray-200 text-gray-800"
          } font-medium py-1 px-4 rounded-lg mx-1 focus:outline-none scale-110`}
          onClick={() => paginate(page)}>
          {page}
        </button>
      </li>
    ));

  return (
    <nav className="flex justify-center mt-4">
      <button
        className={`${
          currentPage === firstPage ? "opacity-50 cursor-not-allowed" : ""
        } font-medium py-1 px-3 rounded-full mx-1 focus:outline-none`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === firstPage}>
        Previous
      </button>
      <ul className="flex">
        {renderPageNumbers}
        {currentPage + showPages < totalPages}
      </ul>
      <button
        className={`${
          currentPage === lastPage ? "opacity-50 cursor-not-allowed" : ""
        } font-medium py-1 px-3 rounded-full mx-1 focus:outline-none`}
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === lastPage}>
        Next
      </button>
    </nav>
  );
};

export const Card = ({
  className,
  user,
}: {
  className?: string;
  user: {
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    available: boolean;
    gender: string;
    domain: string;
  };
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden gap-2 bg-zinc-950 border-transparent dark:border-white border-2 group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div
        key={user.id}
        className="p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <p className="text-xl font-bold">
          {user.first_name} {user.last_name}
        </p>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">{user.gender}</p>
        <p className="text-gray-600">{user.domain}</p>
        <p className="text-gray-600">
          Available: {user.available ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}>
      {children}
    </p>
  );
};
