import { cn } from "../../src/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import userData from "../../public/users.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const TeamCreation = ({
  className,
  setShowMenu,
  props,
}: {
  className?: string;
  setShowMenu: (value: boolean) => void;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    domain: "",
    gender: "",
    availability: "",
  });
  const navigate = useNavigate();

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

  const handleUserSelect = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateTeam = async () => {
    try {
      const url = `https://heliverse-task.onrender.com/api/team`;
      const response = await axios.post(url, {
        selectedUsers,
      });
      if (response.status === 201) {
        console.log("Team created successfully");
        // Reset selectedUsers array for next team creation
        setSelectedUsers([]);
        setShowMenu(true);
      }
    } catch (error) {
      alert("Failed to create team");
      console.error(error);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((id) => id !== userId));
  };

  const [teams, setTeams] = useState([]);

  const getTeam = async () => {
    try {
      props.setProgress(10);
      const url = `https://heliverse-task.onrender.com/api/team`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setTeams(response.data.data);
        props.setProgress(100);
      }
    } catch (error) {
      console.log(error);
      props.setProgress(100);
    }
  };

  useEffect(() => {
    getTeam();
    //eslint-disable-next-line
  }, []);

  return (
    <div className={cn("py-10", className)}>
      <div className="flex flex-wrap justify-center gap-4 mb-4 z-0">
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
          onChange={(e) => handleFilterChange("availability", e.target.value)}
          className="border-2 px-3 p-2 rounded-md bg-black text-white placeholder-white">
          <option value="">Availabilities</option>
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <button
          className="flex justify-center p-4 rounded-full text-white font-semibold bg-black px-4"
          onClick={handleCreateTeam}
          disabled={selectedUsers.length === 0}>
          Create Team
        </button>
        <button
          className="flex justify-center p-4 rounded-full text-white font-semibold bg-black px-9"
          onClick={() => {
            navigate("/");
          }}>
          Home
        </button>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-6 ",
          className
        )}>
        {currentUsers.map((user, idx) => (
          <div
            key={user.id}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-white/75 dark:bg-white/75 block rounded-3xl"
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
            <Card
              user={user}
              onSelect={handleUserSelect}
              isSelected={selectedUsers.includes(user.id)}
            />
          </div>
        ))}
        <SelectedUsersMenu
          selectedUsers={selectedUsers}
          setShowMenu={setShowMenu}
        />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        paginate={paginate}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{team.name}</h3>
              <ul className="mt-2">
                {team.members.map((member) => (
                  <li key={member.id}>{member.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SelectedUsersMenu = ({
  selectedUsers,
  setShowMenu,
}: {
  selectedUsers: string[];
  setShowMenu: (value: boolean) => void;
}) => {
  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShowMenu(true)}>
          Show Selected Users
        </button>
      </div>

      {selectedUsers.length > 0 && (
        <div
          className="origin-top-right right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <div className="py-1" role="none">
            {selectedUsers.map((userId) => {
              const user = userData.find((u) => u.id === userId);
              if (!user) {
                return (
                  <div key={userId} className="px-4 py-2 text-gray-700">
                    User with ID {userId} not found.
                  </div>
                );
              }
              return (
                <div key={user.id} className="px-4 py-2 text-gray-700">
                  {user.first_name} {user.last_name} - {user.email}
                </div>
              );
            })}
          </div>
        </div>
      )}
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
      <ul className="flex">{renderPageNumbers}</ul>
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
  onSelect,
  isSelected
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
  onSelect: (userId: string) => void;
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
        <p className="text-white/80">Email: {user.email}</p>
        <p className="text-white/80">Gender: {user.gender}</p>
        <p className="text-white/80">Domain: {user.domain}</p>
        <p className="text-white/80">
          Available: {user.available ? "Yes" : "No"}
        </p>
      </div>

      <button
        className="bottom-0 right-0 p-2 px-4 scale-105 font-semibold bg-black text-white rounded-md "
        onClick={() => onSelect(user.id)}>
        {isSelected ? "Remove" : "Select"}
      </button>
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
