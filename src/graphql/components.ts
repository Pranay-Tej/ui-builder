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
