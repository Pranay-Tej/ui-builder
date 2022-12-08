const Paragraph: React.FC<{ content: string }> = (props) => {
  const { content } = props;

  return <p>{content}</p>;
};

export default Paragraph;
