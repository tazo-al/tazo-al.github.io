import { getImageSize } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

const components = {
  img: async (props: any) => {
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
    return (
      <a
        {...props}
        style={{
          color: "#ff540f",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          wordBreak: "break-all",
        }}
      />
    );
  },
  h1: (props: any) => {
    const id = props.children.toLowerCase().replace(/\s+/g, "-");
    return (
      <h1 {...props} id={id} className="text-4xl font-bold mt-16 mb-4 text-zinc-900 scroll-mt-20" />
    );
  },
  h2: (props: any) => {
    const id = props.children.toLowerCase().replace(/\s+/g, "-");
    return (
      <h2 {...props} id={id} className="text-2xl font-bold mt-12 mb-4 text-zinc-900 scroll-mt-20" />
    );
  },
  h3: (props: any) => {
    const id = props.children.toLowerCase().replace(/\s+/g, "-");
    return (
      <h3 {...props} id={id} className="text-xl font-bold mt-8 mb-4 text-zinc-900 scroll-mt-20" />
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
    return <strong {...props} style={{ backgroundColor: "#fff7e0", color: "black" }} />;
  },
  pre: (props: any) => (
    <pre {...props} className="relative bg-[#1E1E1E] rounded-lg overflow-hidden">
      {props.children}
    </pre>
  ),
  code: (props: any) => {
    if (props["data-language"]) {
      return <code {...props} className="block overflow-x-auto p-4" />;
    }
    return <code {...props} className="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded text-sm" />;
  },
  // ... 다른 컴포넌트들은 이전과 동일
};

export default function PostBody({ content }: { content: string }) {
  return (
    <article className="w-full mt-8 prose max-w-none px-4">
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
                  theme: "one-dark-pro", // 다크 테마
                  keepBackground: true,
                  lineNumbers: true,
                  grid: true, // 라인 번호와 코드 사이 구분선
                  showLineNumbers: true, // 라인 번호 표시
                  defaultLang: "plaintext", // 언어가 지정되지 않은 경우 기본값
                },
              ],
            ],
          },
        }}
      />
    </article>
  );
}
