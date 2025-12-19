'use client';

import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import Link from 'next/link';

// Tipagem básica para os nós do Lexical
interface Node {
  type?: string;
  value?: any;
  format?: number;
  indent?: number;
  version?: number;
  children?: Node[];
  text?: string;
  [key: string]: any;
}

export const RichTextParser: React.FC<{ content: any; className?: string }> = ({ content, className }) => {
  if (!content?.root?.children) return null;

  return (
    <div className={className}>
      {serialize(content.root.children)}
    </div>
  );
};

// Função recursiva para transformar JSON em JSX
function serialize(children: Node[]): React.ReactNode[] {
  return children.map((node, i) => {
    if (!node) return null;

    if (node.type === 'text') {
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

      // Formatação (Bitwise check do Lexical)
      if (node.format & 1) text = <strong>{text}</strong>;
      if (node.format & 2) text = <em>{text}</em>;
      if (node.format & 8) text = <u>{text}</u>;
      if (node.format & 16) text = <code>{text}</code>;

      return <Fragment key={i}>{text}</Fragment>;
    }

    // Tratamento de Blocos
    switch (node.type) {
      case 'heading':
        const Tag = node.tag as keyof JSX.IntrinsicElements || 'h1';
        return <Tag key={i}>{serialize(node.children || [])}</Tag>;
      
      case 'paragraph':
        return <p key={i}>{serialize(node.children || [])}</p>;

      case 'list':
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul';
        return <ListTag key={i}>{serialize(node.children || [])}</ListTag>;

      case 'listitem':
        return <li key={i}>{serialize(node.children || [])}</li>;

      case 'link':
        return (
          <Link href={escapeHTML(node.fields.url)} key={i} target={node.fields.newTab ? '_blank' : '_self'}>
            {serialize(node.children || [])}
          </Link>
        );

      default:
        return <Fragment key={i}>{serialize(node.children || [])}</Fragment>;
    }
  });
}