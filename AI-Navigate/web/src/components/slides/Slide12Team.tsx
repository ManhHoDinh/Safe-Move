import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Smartphone } from 'lucide-react';
import SlideLayout from './SlideLayout';

const techStack = [
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB', color: '#3776AB' },
  { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/FF6F00', color: '#FF6F00' },
  { name: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B', color: '#02569B' },
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
  { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi/009688', color: '#009688' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1' },
  { name: 'Firebase', icon: 'https://cdn.simpleicons.org/firebase/FFCA28', color: '#FFCA28' },
];

const capabilities = [
  { icon: Cpu, label: 'AI / ML', desc: 'CNN, YOLO, Transfer Learning, Real-time Inference' },
  { icon: Globe, label: 'Full-Stack', desc: 'FastAPI Backend, React Dashboard, REST API' },
  { icon: Smartphone, label: 'Mobile', desc: 'Flutter App, Google Maps SDK, Push Notifications' },
  { icon: Code2, label: 'DevOps', desc: 'Docker, Microservices, CI/CD, Cloud Deployment' },
];

const achievements = [
  { metric: '9.9/10', desc: 'Final Thesis Score' },
  { metric: '600+', desc: 'Traffic Cameras Monitored' },
  { metric: '7,411', desc: 'Synthetic Flood Images (UIT-VisDrone-Flood)' },
  { metric: '~90%', desc: 'AI Flood Detection Accuracy' },
  { metric: '<5s', desc: 'Detection-to-Alert Latency' },
];

export default function Slide12Team() {
  return (
    <SlideLayout background="accent">
      <div className="flex flex-col h-full">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="/avatar.jpg"
            alt="Ho Dinh Manh"
            className="w-14 h-14 rounded-full object-cover border-2 border-flood-cyan/40 flex-shrink-0"
            style={{ boxShadow: '0 0 24px rgba(6,182,212,0.2)' }}
          />
          <div>
            <h2 className="text-4xl font-bold text-white">
              Solo Builder. <span className="text-flood-cyan">Full-Stack.</span>
            </h2>
            <p className="text-neutral-400 text-sm mt-0.5">
              Hồ Đình Mạnh &amp; Lê Thị Bích Hằng — UIT VNU-HCM
            </p>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left — Profile + Capabilities */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <motion.div
              className="bg-slate-dark border border-neutral-700 rounded-xl p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-neutral-300 text-sm leading-relaxed">
                Full-stack engineer & AI developer. Expert in CNN, YOLO, and real-time systems.
                Built the entire SafeMove AI platform — backend, mobile, web dashboard, and AI pipeline — as a graduation thesis at UIT VNU-HCM, scoring 9.9/10 with a published IEEE paper.
              </p>
            </motion.div>

            {/* Capability grid */}
            <div className="grid grid-cols-2 gap-3">
              {capabilities.map((c, i) => (
                <motion.div
                  key={i}
                  className="bg-slate-dark border border-neutral-700 rounded-lg p-3 flex items-start gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-8 rounded-lg bg-storm-blue/15 flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-storm-blue" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{c.label}</p>
                    <p className="text-neutral-500 text-[10px] leading-tight mt-0.5">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack logos */}
            <motion.div
              className="flex items-center gap-3 flex-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {techStack.map((t) => (
                <div key={t.name} className="flex items-center gap-1.5 bg-slate-dark border border-neutral-700 rounded-md px-2 py-1">
                  <img src={t.icon} alt={t.name} className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold" style={{ color: t.color }}>{t.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Achievements */}
          <div className="lg:w-1/2">
            <motion.div
              className="bg-storm-blue/10 border border-storm-blue/30 rounded-xl p-8 h-full flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-widest text-storm-blue mb-2">
                Thesis Achievements
              </h3>
              <p className="font-mono font-bold text-2xl text-white leading-tight">
                Published at IEEE ICCAIS 2024
              </p>
              <p className="text-neutral-400 text-xs mt-1">
                "UIT-VisDrone-Flood: A Synthesized Aerial Vehicle Detection Dataset Under Flood Conditions"
              </p>

              <div className="mt-6 space-y-3 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Key Metrics
                </p>
                {achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <span className="font-mono font-bold text-flood-cyan text-sm w-14 text-right">
                      {a.metric}
                    </span>
                    <span className="text-neutral-300 text-sm">{a.desc}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-storm-blue/20">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  Supervisors
                </p>
                <p className="text-white text-sm font-semibold leading-relaxed">
                  Dr. Nguyễn Tấn Trần Minh Khang &amp; Dr. Nguyễn Duy Khánh
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing line */}
        <motion.p
          className="text-center text-2xl font-bold text-white mt-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
        >
          Floods are inevitable.{' '}
          <span className="text-neutral-500">Traffic chaos is not.</span>
        </motion.p>
      </div>
    </SlideLayout>
  );
}
