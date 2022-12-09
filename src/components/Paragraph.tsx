import { memo, useState } from "react";

const Paragraph: React.FC<{ id: any }> = ({ id }) => {
  const [content, setContent] = useState<string>("Para");

  return (
    <p
    // contentEditable
    // onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
    //   // console.log(e);
    //   setContent(e.currentTarget.innerText);
    // }}
    >
      {content}
    </p>
  );
};

// export default Paragraph;
export default memo(Paragraph);
