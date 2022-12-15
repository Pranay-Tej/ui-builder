import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { GetHeadingByPk } from "@/graphql/components";
import { graphqlClient } from "@/utils/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { FC, memo } from "react";

const Heading: FC<{ id: any }> = ({ id }) => {
  const { data: content } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetHeadingByPk, id],
    queryFn: async () => {
      const data = await graphqlClient.request(GetHeadingByPk, {
        id,
      });
      return data?.headings_by_pk?.content as string;
    },
    enabled: id !== undefined,
  });

  return <h1>{content}</h1>;
};

export default memo(Heading);
