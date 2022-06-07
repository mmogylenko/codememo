type IconButtonProps = {
  iconClassName: string;
  buttonClassName?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: React.ReactNode;
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  iconClassName,
  buttonClassName = 'button is-primary is-small',
}) => {
  return (
    <button className={buttonClassName} type="button" onClick={onClick}>
      <span className="icon">
        <span className={iconClassName} />
      </span>
      {!!children && <span>{children}</span>}
    </button>
  );
};

export default IconButton;
