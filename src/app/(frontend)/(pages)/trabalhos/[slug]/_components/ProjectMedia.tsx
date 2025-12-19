'use client';

import Image from 'next/image';
import { Media } from '@/payload-types'; // Use 'any' se der erro de tipo por enquanto

interface ProjectMediaProps {
  resource: Media | string | null | undefined; // Aceita o objeto do Payload ou URL
  fill?: boolean; // Se deve preencher o pai (para cards)
  alt?: string;
  className?: string;
}

export function ProjectMedia({ resource, fill = false, alt = 'Project media', className }: ProjectMediaProps) {
  // 1. Segurança: Se vazio, não renderiza nada
  if (!resource) return null;

  // 2. Extrair dados (URL e Tipo)
  let url = '';
  let mimeType = '';

  if (typeof resource === 'string') {
    url = resource;
    // Tenta adivinhar se é vídeo pela extensão
    if (url.endsWith('.mp4') || url.endsWith('.webm')) mimeType = 'video/mp4';
    else mimeType = 'image/jpeg';
  } else {
    // Se for o objeto Media completo (Padrão do Payload)
    url = resource.url || '';
    mimeType = resource.mimeType || '';
  }

  // 3. Renderização Condicional
  const isVideo = mimeType.startsWith('video');

  if (isVideo) {
    return (
      <video
        src={url}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        // Simula o layout='fill' do Next.js para vídeos
        style={fill ? { 
            position: 'absolute', 
            height: '100%', 
            width: '100%', 
            inset: 0, 
            objectFit: 'cover' 
        } : { width: '100%', height: 'auto' }}
      />
    );
  }

  // 4. Se for imagem, usa o Next Image otimizado
  return (
    <Image
      src={url}
      alt={alt}
      className={className}
      fill={fill}
      width={!fill ? 1920 : undefined} 
      height={!fill ? 1080 : undefined}
      style={{ objectFit: 'cover' }}
    />
  );
}