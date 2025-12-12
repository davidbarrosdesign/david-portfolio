'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { motion, useAnimation } from 'framer-motion';

import styles from './MarqueeClients.module.scss';

import RioInkLogo from '@/../public/images/logo-rioink-tattoo.webp';
import MetodoLogo from '@/../public/images/logo-metodo.webp';
import EspacoSmartLogo from '@/../public/images/logo-espaco-smart.webp';
import HQLogo from '@/../public/images/logo-hq.webp';
import LizLogo from '@/../public/images/logo-liz.webp';
import PanobiancoLogo from '@/../public/images/logo-panobianco.webp';
import StockcashLogo from '@/../public/images/logo-stockcash.webp';
import USPoloLogo from '@/../public/images/logo-us-polo.webp';
import WeDigiLogo from '@/../public/images/logo-wedigi.webp';

const CLIENTS_LOGOS: StaticImageData[] = [
  RioInkLogo,
  MetodoLogo,
  EspacoSmartLogo,
  HQLogo,
  LizLogo,
  PanobiancoLogo,
  StockcashLogo,
  USPoloLogo,
  WeDigiLogo
];

// duplicamos pra loop perfeito
const LOOP = [...CLIENTS_LOGOS, ...CLIENTS_LOGOS];

export function MarqueeClients() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const [speedFactor, setSpeedFactor] = useState(1); // 1 normal, >1 mais lento

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
        {LOOP.map((logo, i) => (
          <div
            className={styles.marqueeItem}
            key={`logo-${i}`}
          >
            <Image
                src={logo}
                alt={`Cliente ${i}`}
                height={20}
                loading="lazy"
                style={{ objectFit: 'contain' }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};