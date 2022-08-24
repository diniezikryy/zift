interface NavbarProps {
  boardName: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ boardName }) => {
  return (
    <div className="flex flex-row items-center w-full p-6 bg-white">
      <h1 className="text-2xl font-bold">{boardName}</h1>

      <button className="px-6 py-3 ml-auto text-sm text-white rounded-full bg-purple-primary">
        + Add New Task
      </button>

      <svg
        width="5"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-6"
      >
        <g fill="#828FA3" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
    </div>
  );
};

export default Navbar;
