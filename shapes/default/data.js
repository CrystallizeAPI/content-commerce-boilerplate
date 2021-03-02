import { simplyFetchFromGraph } from "../../lib/graphql";

export function getData({ path }) {
  return simplyFetchFromGraph({
    query: `
      query getDefault($path: String!) {
        catalogue(path: $path, language: "en") {
          name

          title: component(id: "title") {
            content {
              ... on SingleLineContent {
                text
              }
            }
          }
        }
      }
    `,
    variables: {
      path,
    },
  });
}
