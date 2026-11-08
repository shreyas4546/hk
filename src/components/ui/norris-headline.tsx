import React, { useState } from "react";

interface NorrisHeadlineProps {
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  children: React.ReactNode;
  animationTime?: number; // ms per char (default 25ms from Norris spec)
  style?: React.CSSProperties;
}

function processText(text: string, counter: { index: number }) {
  // Tokenize by spaces while keeping delimiters
  const tokens = text.split(/(\s+)/);

  return tokens.map((token, tIdx) => {
    if (!token) return null;

    // Handle whitespace token
    if (/^\s+$/.test(token)) {
      return Array.from(token).map((_, sIdx) => {
        const curIndex = counter.index++;
        return (
          <span
            key={`sp-${tIdx}-${sIdx}`}
            className="norris-space inline-block"
            data-char=" "
            style={{ "--index": curIndex } as React.CSSProperties}
          >
            &nbsp;
          </span>
        );
      });
    }

    // Word token: wrap word so it never breaks in the middle across responsive lines
    let chars: string[];
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      chars = Array.from(segmenter.segment(token), (s) => s.segment);
    } else {
      chars = Array.from(token);
    }

    const charElements = chars.map((char, cIdx) => {
      const curIndex = counter.index++;
      return (
        <span
          key={`c-${tIdx}-${cIdx}`}
          className="norris-char inline-block"
          data-char={char}
          style={{ "--index": curIndex } as React.CSSProperties}
        >
          {char}
        </span>
      );
    });

    return (
      <span
        key={`w-${tIdx}`}
        className="norris-word inline-block whitespace-nowrap"
      >
        {charElements}
      </span>
    );
  });
}

function processChildren(
  children: React.ReactNode,
  counter: { index: number }
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return processText(String(child), counter);
    }

    if (React.isValidElement(child)) {
      if (child.type === "br") return child;

      const childProps = child.props as { className?: string; children?: React.ReactNode };
      const newChildren = processChildren(childProps.children, counter);

      return React.cloneElement(child as React.ReactElement<any>, {
        className: `${childProps.className || ""} norris-segment`,
        children: newChildren,
      });
    }

    return child;
  });
}

/**
 * NorrisHeadline
 * Rolling character cascade animation inspired by Landon Norris / Norris CSS.
 * When hovered or tapped, characters flip vertically with an incremental delay:
 * transition-delay: calc(var(--index) * var(--animation-time));
 */
export const NorrisHeadline: React.FC<NorrisHeadlineProps> = ({
  as: Tag = "h2",
  className = "",
  children,
  animationTime = 25,
  style = {},
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);

  const processed = processChildren(children, { index: 0 });

  return (
    <Tag
      className={`norris norris-headline cursor-pointer select-none transition-colors duration-200 ${
        isActive ? "is-active" : ""
      } ${className}`}
      style={
        {
          "--animation-time": `${animationTime}ms`,
          ...style,
        } as React.CSSProperties
      }
      onClick={() => setIsActive((prev) => !prev)}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setTimeout(() => setIsActive(false), 800)}
      {...props}
    >
      {processed}
    </Tag>
  );
};

export default NorrisHeadline;

