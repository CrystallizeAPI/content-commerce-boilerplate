import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { simplyFetchFromGraph } from "../../lib/graphql";

const DefaultRenderer = dynamic(() => import("../../shapes/default/renderer"));

export async function getStaticProps({ params }) {
  const path = `/varebil/${params.slug}`;

  const r = await simplyFetchFromGraph({
    query: `
      {
        catalogue(path: "${path}", language: "en") {
          shape {
            identifier
          }
        }
      }
    `,
  });

  if (!r.data.catalogue) {
    return {
      notFound: true,
    };
  }

  // Get all page data for shape
  let dataGetter;
  const shapeIdentifier = r.data?.catalogue?.shape?.identifier;
  switch (shapeIdentifier) {
    case "default": {
      dataGetter = await import("../../shapes/default/data");
    }
  }

  const data = await dataGetter.getData({ path });

  return {
    props: {
      data: data?.data,
      shapeIdentifier,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const r = await simplyFetchFromGraph({
    query: `
      {
        catalogue(path: "/varebil", language: "en") {
          children {
            path
          }
        }
      }
    `,
  });

  return {
    paths: r.data.catalogue.children.map((c) => c.path),
    fallback: true,
  };
}

export default ({ data, shapeIdentifier }) => {
  const router = useRouter();

  if (router.isFallback) {
    return "loading...";
  }

  if (shapeIdentifier === "default") {
    return <DefaultRenderer {...data} />;
  }

  return "???";
};
