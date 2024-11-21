import { getImageSize } from "@/lib/server-utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const components = {
  img: async function (props: any) {
    const { width, height } = await getImageSize(props.src);

    const maxWidth = 720;
    const maxHeight = 420;
    const ratioWidth = height / width;
    const ratioHeight = width / height;

    let adjustedWidth;
    let adjustedHeight;

    if (height > maxHeight) {
      adjustedWidth = maxHeight * ratioHeight;
      adjustedHeight = maxHeight;
    } else if (height <= maxHeight && width > maxWidth) {
      adjustedWidth = maxWidth;
      adjustedHeight = maxWidth * ratioWidth;
    } else {
      adjustedWidth = width;
      adjustedHeight = height;
    }

    return (
      <Image
        {...props}
        src={props.src}
        alt={props.alt}
        width={adjustedWidth}
        height={adjustedHeight}
        className="my-5 mx-auto rounded-lg"
      />
    );
  },
  a: (props: any) => {
    return <a {...props} className="text-blue-600 break-all" />;
  },
  h1: (props: any) => {
    const id = props.children.toLowerCase().replace(/\s+/g, "-");
    return (
      <h1
        {...props}
        id={id}
        className="text-4xl font-bold mt-16 mb-4 text-zinc-900 scroll-mt-20"
      />
    );
  },
  h2: (props: any) => {
    const id = props.children.toLowerCase().replace(/\s+/g, "-");
    return (
      <h2
        {...props}
        id={id}
        className="text-2xl font-bold mt-12 mb-4 text-zinc-900 scroll-mt-20"
      />
    );
  },
  h3: (props: any) => {
    const id = props.children.toLowerCase().replace(/\s+/g, "-");
    return (
      <h3
        {...props}
        id={id}
        className="text-xl font-bold mt-8 mb-4 text-zinc-900 scroll-mt-20"
      />
    );
  },
  p: (props: any) => {
    return (
      <p
        {...props}
        style={{
          fontSize: "17px",
          margin: "20px 0px",
        }}
      />
    );
  },
  strong: (props: any) => {
    return (
      <strong
        {...props}
        className="bg-blue-50" // 포인트 컬러와 맞추기
        style={{ color: "inherit" }} // 텍스트 색상은 상속
      />
    );
  },
  code: (props: any) => {
    // data-language 속성이 있으면 코드 블록
    if (props["data-language"]) {
      return (
        <code
          {...props}
          className="block overflow-x-auto p-4"
          style={{
            ...props.style,
            backgroundColor: "transparent", // 배경색 초기화
          }}
        />
      );
    }

    // 인라인 코드
    return (
      <code
        {...props}
        className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[0.9em] font-normal"
        style={{ lineHeight: "inherit" }}
      />
    );
  },

  pre: (props: any) => (
    <pre
      {...props}
      className="bg-[#1E1E1E] relative rounded-lg overflow-hidden my-6"
      style={{ backgroundColor: "#1E1E1E" }}
    />
  ),
  ul: (props: any) => <ul {...props} className="list-disc pl-5 my-4" />,
};

export default function PostBody({ content }: { content: string }) {
  return (
    <article className="w-full mt-8 prose prose-ul:list-disc prose-ul:pl-5 max-w-none">
      <MDXRemote
        source={content}
        components={components}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "one-dark-pro",
                  keepBackground: true,
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
