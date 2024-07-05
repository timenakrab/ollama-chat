// import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import React from "react";
import { CodeBlock, dracula, github } from "react-code-blocks";
// import { Button } from "./ui/button";
// import { toast } from "sonner";
// import { useTheme } from "next-themes";

interface ButtonCodeblockProps {
  code: string;
  lang: string;
}

export default function CodeDisplayBlock({ code, lang }: ButtonCodeblockProps) {
  // const [isCopied, setisCopied] = React.useState(false);
  // const { theme } = useTheme();

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(code);
  //   setisCopied(true);
  //   toast.success("Code copied to clipboard!");
  //   setTimeout(() => {
  //     setisCopied(false);
  //   }, 1500);
  // };

  return (
    <div className="relative my-4 flex flex-col text-start">
      {/* <CodeBlock
        customStyle={{ background: "#303033" }}
        text={code}
        language="tsx"
        showLineNumbers={false}
        theme={dracula}
      /> */}
      <CodeBlock
        text={code}
        language="tsx"
        theme={dracula}
        showLineNumbers={true}
        wrapLongLines
      />
    </div>
  );
}
