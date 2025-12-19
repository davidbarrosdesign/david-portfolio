'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { Media } from "@/payload-types";

import styles from './MarqueeClients.module.scss';

// Vamos receber a lista via Props
interface MarqueeProps {
  clients: {
    id: string;
    name: string;
    logo: string | Media; // O Payload pode mandar só o ID ou o objeto Media completo
  }[];
}

export function MarqueeClients({ clients }: MarqueeProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  
  const [speedFactor, setSpeedFactor] = useState(1); // 1 normal, >1 mais lento

  // BLINDAGEM: Se não vier clientes, usa array vazio para não quebrar
  const safeClients = Array.isArray(clients) ? clients : [];

  const LOOP = [...safeClients, ...safeClients, ...safeClients, ...safeClients].slice(0, 20);

  // px por segundo (base) — ajuste pra acelerar / desacelerar por padrão
  const BASE_PX_PER_SEC = 50;

  // calcula distância (metade do track) e inicia animação
  useEffect(() => {
    function calc() {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      // largura real do track (duplicado)
      const trackW = track.scrollWidth;
      // queremos mover metade do track (os logos duplicados)
      const half = trackW / 2;

      // duração = distância(px) / pxPorSegundo
      const duration = half / (BASE_PX_PER_SEC / speedFactor);

      // reinicia animação com os novos valores
      controls.start({
        x: [0, -half],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            duration,
          },
        },
      });
    }

    // calc inicial
    calc();

    // recalc on resize
    const ro = new ResizeObserver(() => calc());
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => ro.disconnect();
  }, [controls, speedFactor]);

  // hover handlers: desacelera
  function handleMouseEnter() {
    // aumentar factor => reduz velocidade (px/sec divide por speedFactor)
    setSpeedFactor(3); // mais lento
  }
  function handleMouseLeave() {
    setSpeedFactor(1);
  }

  // HELPER para extrair a URL da imagem
  const getLogoUrl = (logo: string | Media) => {
    if (typeof logo === 'object' && logo?.url) {
      return logo.url; // URL vinda do Supabase
    }
    return ''; // Fallback ou placeholder
  };

  if (safeClients.length === 0) return null;

  return (
    <div
      className={styles.marqueeWrapper}
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-hidden={false}
    >
      {/* track duplicado: importante que o conteúdo seja exatamente repetido */}
      <motion.div
        className={styles.marqueeTrack}
        ref={trackRef}
        animate={controls}
      >
        {LOOP.map((client, i) => {
            const logoUrl = getLogoUrl(client.logo);
            
            return (
              <div className={styles.marqueeItem} key={`${client.id}-${i}`}>
                {logoUrl && (
                  <Image
                      src={logoUrl}
                      alt={client.name}
                      fill
                      style={{ 
                        objectFit: 'contain', 
                        height: '20px',
                        width: 'auto' 
                      }}
                  />
                )}
              </div>
            );
        })}
      </motion.div>
    </div>
  );
};