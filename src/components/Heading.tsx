const Heading: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  return <h1>{content}</h1>;
};

export default Heading;
