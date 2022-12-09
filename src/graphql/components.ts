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
  mutation InsertHeadingOne($content: String = "Heading") {
    insert_components_one(
      object: { heading: { data: { content: $content } }, type: "H1" }
    ) {
      id
      type
    }
  }
`;

export const InsertParagraphOne = gql`
  mutation InsertParagraphOne($content: String = "Paragraph") {
    insert_components_one(
      object: { paragraph: { data: { content: $content } }, type: "P" }
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
