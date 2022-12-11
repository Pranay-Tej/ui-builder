import { BASE_URL } from "@/constants/app.constants";
import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { useEditorContext } from "@/context/EditorContext";
import { GetParagraphByPk, UpdateParagraphByPk } from "@/graphql/components";
import { Button, TextInput } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";
import { FC, memo, useState } from "react";

const ParagraphInspector: FC = () => {
  const queryClient = useQueryClient();

  const { selectedComponentId: id, cancel } = useEditorContext();

  const [content, setContent] = useState<string>("");

  useQuery({
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

  const updateParagraphMutation = useMutation({
    mutationFn: () => {
      return request(BASE_URL, UpdateParagraphByPk, {
        id,
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetParagraphByPk, id]);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateParagraphMutation.mutate();
      }}
    >
      <Button
        variant="light"
        type="submit"
        disabled={updateParagraphMutation.isLoading}
      >
        Save
      </Button>
      <Button
        variant="subtle"
        type="button"
        onClick={() => {
          cancel();
        }}
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
        //   updateParagraphMutation.mutate();
        // }}
      />
    </form>
  );
};

export default memo(ParagraphInspector);
