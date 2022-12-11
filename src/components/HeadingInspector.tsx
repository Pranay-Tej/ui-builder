import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { useEditorContext } from "@/context/EditorContext";
import { GetHeadingByPk, UpdateHeadingByPk } from "@/graphql/components";
import { Button, TextInput } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { FC, memo, useState } from "react";

const HeadingInspector: FC = () => {
  const queryClient = useQueryClient();

  const { selectedComponentId: id, cancel } = useEditorContext();

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

  const updateHeadingMutation = useMutation({
    mutationFn: () => {
      return request(BASE_URL, UpdateHeadingByPk, {
        id,
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetHeadingByPk, id]);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateHeadingMutation.mutate();
      }}
    >
      <Button
        variant="light"
        type="submit"
        loading={updateHeadingMutation.isLoading}
      >
        Save
      </Button>

      <Button
        variant="subtle"
        type="button"
        onClick={() => {
          cancel();
        }}
        disabled={updateHeadingMutation.isLoading}
      >
        Cancel
      </Button>

      <TextInput
        placeholder="Content"
        label="Content"
        type="text"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        // onBlur={() => {
        //   updateHeadingMutation.mutate();
        // }}
      />
    </form>
  );
};

export default memo(HeadingInspector);
