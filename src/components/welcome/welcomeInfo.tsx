interface Props {
  imageSrc: string;
  title: string;
  description: string;
}

const WelcomeInfo = ({ imageSrc, title, description }: Props) => {
  return (
    <div className="my-10">
      <img src={imageSrc} alt={title} className="mx-auto my-5" />
      <h2 className="font-bold mb-2">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default WelcomeInfo;
