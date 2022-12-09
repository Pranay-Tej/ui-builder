import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { GetParagraphByPk } from "@/graphql/components";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { memo, useState } from "react";

const Paragraph: React.FC<{ id: any }> = ({ id }) => {
  const [content, setContent] = useState<string>("Para");

  const { data } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetParagraphByPk, id],
    queryFn: async () => {
      const data = await request(BASE_URL, GetParagraphByPk, {
        id,
      });
      return data?.paragraphs_by_pk?.content as string;
    },
    onSuccess: (data) => {
      setContent(data);
    },
    enabled: id !== undefined,
  });

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
