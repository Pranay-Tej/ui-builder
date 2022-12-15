import { REACT_QUERY_KEYS } from "@/constants/react-query-keys.contants";
import { useEditorContext } from "@/context/EditorContext";
import { GetButtonByPk, UpdateButtonByPk } from "@/graphql/components";
import { graphqlClient } from "@/utils/graphqlClient";
import { Button, Select, TextInput } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, memo, useState } from "react";

const ButtonInspector: FC = () => {
  const queryClient = useQueryClient();

  const { selectedComponentId: id, cancel } = useEditorContext();

  const [content, setContent] = useState<string>("");
  const [variant, setVariant] = useState<string>("default");

  useQuery({
    queryKey: [REACT_QUERY_KEYS.GetButtonByPk, id],
    queryFn: async () => {
      const data = await graphqlClient.request(GetButtonByPk, {
        id,
      });
      return data?.buttons_by_pk as { content: string; variant: string };
    },
    onSuccess: (data) => {
      setContent(data?.content);
      setVariant(data?.variant);
    },
    enabled: id !== undefined,
  });

  const updateButtonMutation = useMutation({
    mutationFn: () => {
      return graphqlClient.request(UpdateButtonByPk, {
        id,
        content,
        variant,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.GetButtonByPk, id]);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateButtonMutation.mutate();
      }}
    >
      <Button
        variant="light"
        type="submit"
        loading={updateButtonMutation.isLoading}
      >
        Save
      </Button>

      <Button
        variant="subtle"
        type="button"
        onClick={() => {
          cancel();
        }}
        disabled={updateButtonMutation.isLoading}
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
      <Select
        value={variant}
        label="Variant"
        data={[
          "filled",
          "outline",
          "light",
          "white",
          "default",
          "subtle",
          "gradient",
        ]}
        onChange={(val) => {
          setVariant(val ?? "default");
        }}
      />
    </form>
  );
};

export default memo(ButtonInspector);
