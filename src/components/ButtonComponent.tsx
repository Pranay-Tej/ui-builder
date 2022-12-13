import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { GetButtonByPk } from "@/graphql/components";
import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { FC, memo } from "react";

const ButtonComponent: FC<{ id: any }> = ({ id }) => {
  const { data } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GetButtonByPk, id],
    queryFn: async () => {
      const data = await request(BASE_URL, GetButtonByPk, {
        id,
      });
      return data?.buttons_by_pk as { content: string; variant: any };
    },
    enabled: id !== undefined,
  });

  return <Button variant={data?.variant}>{data?.content}</Button>;
};

export default memo(ButtonComponent);
