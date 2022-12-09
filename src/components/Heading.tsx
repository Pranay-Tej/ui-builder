import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { GetHeadingByPk } from "@/graphql/components";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { memo, ReactEventHandler, useState } from "react";

const Heading: React.FC<{ id: any }> = ({ id }) => {
  const [content, setContent] = useState<string>("Head");

  const { data } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetHeadingByPk, id],
    queryFn: async () => {
      const data = await request(BASE_URL, GetHeadingByPk, {
        id,
      });
      return data?.headings_by_pk?.content as string;
    },
    onSuccess: (data) => {
      setContent(data);
    },
    enabled: id !== undefined,
  });

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
