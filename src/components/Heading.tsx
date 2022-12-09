import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { GetHeadingByPk } from "@/graphql/components";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { FC, memo } from "react";

const Heading: FC<{ id: any }> = ({ id }) => {
  const { data: content } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetHeadingByPk, id],
    queryFn: async () => {
      const data = await request(BASE_URL, GetHeadingByPk, {
        id,
      });
      return data?.headings_by_pk?.content as string;
    },
    enabled: id !== undefined,
  });

  return <h1>{content}</h1>;
};

export default memo(Heading);
