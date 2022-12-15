import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { GetParagraphByPk } from "@/graphql/components";
import { graphqlClient } from "@/utils/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { FC, memo } from "react";

const Paragraph: FC<{ id: any }> = ({ id }) => {
  const { data: content } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetParagraphByPk, id],
    queryFn: async () => {
      const data = await graphqlClient.request(GetParagraphByPk, {
        id,
      });
      return data?.paragraphs_by_pk?.content as string;
    },
    enabled: id !== undefined,
  });

  return <p>{content}</p>;
};

export default memo(Paragraph);
