import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { useEditorContext } from "@/context/EditorContext";
import { GetHeadingByPk } from "@/graphql/components";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { FC, memo, useState } from "react";

const HeadingInspector: FC = () => {
  const { selectedComponentId: id } = useEditorContext();

  const [content, setContent] = useState<string>("");

  useQuery({
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
    <input
      type="text"
      value={content}
      onChange={(e) => {
        setContent(e.target.value);
      }}
      onBlur={() => {
        console.log("blur");
      }}
    />
  );
};

export default memo(HeadingInspector);
