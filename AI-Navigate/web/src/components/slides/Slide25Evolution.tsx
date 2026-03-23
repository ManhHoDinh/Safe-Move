import { motion } from 'framer-motion';
import { Shield, Ambulance, Truck, Car, Globe, ExternalLink, FileText } from 'lucide-react';
import SlideLayout from './SlideLayout';

const integrations = [
  { icon: Shield, label: 'Insurance' },
  { icon: Ambulance, label: 'Emergency' },
  { icon: Truck, label: 'Logistics' },
  { icon: Car, label: 'Autonomous' },
  { icon: Globe, label: 'International' },
];

export default function Slide25Evolution() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full items-center">
        <motion.h2
          className="text-4xl font-bold text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          The Evolution
        </motion.h2>
        <motion.p
          className="text-lg text-neutral-400 mt-2 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          From flood routing to urban resilience OS.
        </motion.p>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 mt-4 w-full">
          {/* Concentric rings */}
          <div className="relative" style={{ width: 380, height: 380 }}>
            {/* Outer ring — Urban Resilience OS */}
            <motion.div
              className="absolute inset-0 rounded-full bg-storm-blue/5 border border-storm-blue/20 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-neutral-500 uppercase tracking-wider whitespace-nowrap font-semibold">
                Urban Resilience OS
              </span>
            </motion.div>

            {/* Middle ring — Multi-Hazard */}
            <motion.div
              className="absolute rounded-full bg-storm-blue/10 border border-storm-blue/30 flex items-center justify-center"
              style={{
                top: '15%',
                left: '15%',
                width: '70%',
                height: '70%',
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-neutral-400 uppercase tracking-wider whitespace-nowrap font-semibold">
                Multi-Hazard
              </span>
              {/* Hazard labels around the middle ring */}
              <span className="absolute bottom-6 left-4 text-[10px] text-neutral-500">
                Earthquake
              </span>
              <span className="absolute bottom-6 right-4 text-[10px] text-neutral-500">
                Wildfire
              </span>
              <span className="absolute top-10 right-6 text-[10px] text-neutral-500">
                Storm
              </span>
            </motion.div>

            {/* Inner ring — Flood Routing (current) */}
            <motion.div
              className="absolute rounded-full bg-storm-blue/20 border-2 border-storm-blue flex items-center justify-center"
              style={{
                top: '32%',
                left: '32%',
                width: '36%',
                height: '36%',
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
              }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <p className="text-white font-bold text-sm">Flood Routing</p>
                <p className="text-flood-cyan text-[10px] uppercase tracking-wider mt-0.5">
                  Current
                </p>
              </div>
            </motion.div>
          </div>

          {/* Integration icons row */}
          <motion.div
            className="flex items-center justify-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {integrations.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-6 h-6 text-neutral-500" strokeWidth={1.5} />
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Published Research Reference */}
          <motion.div
            className="w-full max-w-2xl bg-safe-green/5 border border-safe-green/20 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div>
                <p className="text-xs font-semibold text-safe-green uppercase tracking-wider mb-1">
                  Published at IEEE ICCAIS 2024
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  "UIT-VisDrone-Flood" — 7,411 synthetic flood images via ClimateGAN + SAM. Score: <span className="text-white font-semibold">9.9/10</span>
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <a
                    href="https://ieeexplore.ieee.org/document/10814214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-flood-cyan hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> IEEE Xplore
                  </a>
                  <a
                    href="https://universe.roboflow.com/uit-2pejh/uit-flooded-visdrone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-flood-cyan hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Dataset
                  </a>
                  <a
                    href="https://huggingface.co/spaces/ManhHoDinh/floodTrafficSolution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-flood-cyan hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  );
}
