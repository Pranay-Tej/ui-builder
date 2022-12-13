import { gql } from "graphql-request";

export const GetComponents = gql`
  query GetComponents {
    components {
      type
      id
    }
  }
`;

export const InsertHeadingOne = gql`
  mutation InsertHeadingOne($content: String = "Heading", $type: String) {
    insert_components_one(
      object: { heading: { data: { content: $content } }, type: $type }
    ) {
      id
      type
    }
  }
`;

export const InsertParagraphOne = gql`
  mutation InsertParagraphOne($content: String = "Paragraph", $type: String) {
    insert_components_one(
      object: { paragraph: { data: { content: $content } }, type: $type }
    ) {
      id
      type
    }
  }
`;

export const InsertButtonOne = gql`
  mutation InsertButtonOne(
    $content: String = "Button"
    $variant: String = "default"
    $type: String
  ) {
    insert_components_one(
      object: {
        button: { data: { content: $content, variant: $variant } }
        type: $type
      }
    ) {
      id
      type
    }
  }
`;

export const DeleteComponentByPk = gql`
  mutation DeleteComponentByPk($id: uuid!) {
    delete_components_by_pk(id: $id) {
      id
    }
  }
`;

export const GetHeadingByPk = gql`
  query GetHeadingByPk($id: uuid!) {
    headings_by_pk(id: $id) {
      content
      id
    }
  }
`;

export const GetParagraphByPk = gql`
  query GetParagraphByPk($id: uuid!) {
    paragraphs_by_pk(id: $id) {
      content
      id
    }
  }
`;

export const GetButtonByPk = gql`
  query GetButtonByPk($id: uuid!) {
    buttons_by_pk(id: $id) {
      content
      variant
      id
    }
  }
`;

export const UpdateHeadingByPk = gql`
  mutation UpdateHeadingByPk($id: uuid!, $content: String!) {
    update_headings_by_pk(
      pk_columns: { id: $id }
      _set: { content: $content }
    ) {
      content
      id
    }
  }
`;

export const UpdateParagraphByPk = gql`
  mutation UpdateParagraphByPk($id: uuid!, $content: String!) {
    update_paragraphs_by_pk(
      pk_columns: { id: $id }
      _set: { content: $content }
    ) {
      content
      id
    }
  }
`;

export const UpdateButtonByPk = gql`
  mutation UpdateButtonByPk($id: uuid!, $content: String!, $variant: String) {
    update_buttons_by_pk(
      pk_columns: { id: $id }
      _set: { content: $content, variant: $variant }
    ) {
      content
      variant
      id
    }
  }
`;
