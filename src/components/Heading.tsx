import { memo, ReactEventHandler, useState } from "react";

const Heading: React.FC<{ id: any }> = ({ id }) => {
  const [content, setContent] = useState<string>("Head");

  return (
    <h1
    // contentEditable
    // onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
    //   // console.log(e);
    //   setContent(e.currentTarget.innerText);
    // }}
    >
      {content}
    </h1>
  );
};

// export default Heading;
export default memo(Heading);
