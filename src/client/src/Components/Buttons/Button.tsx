interface LoginButtonProps {
  href: string;
  titel: string,
}

const Button: React.FC<LoginButtonProps> = ({ href, titel }) => {
  return (
    <a href={href}>
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {titel}
      </button>
    </a>
  );
};

export default Button;
