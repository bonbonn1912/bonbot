interface LoginButtonProps {
  href: string;
  titel: string,
  buttonStyle?: string;
}

const Button: React.FC<LoginButtonProps> = ({ href, titel, buttonStyle }) => {
  return (
    <a href={href} className="mr-3">
      <button className={buttonStyle}>
        {titel}
      </button>
    </a>
  );
};

export default Button;
