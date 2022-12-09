import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { GetParagraphByPk } from "@/graphql/components";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { FC, memo } from "react";

const Paragraph: FC<{ id: any }> = ({ id }) => {
  const { data: content } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetParagraphByPk, id],
    queryFn: async () => {
      const data = await request(BASE_URL, GetParagraphByPk, {
        id,
      });
      return data?.paragraphs_by_pk?.content as string;
    },
    enabled: id !== undefined,
  });

  return <p>{content}</p>;
};

export default memo(Paragraph);
