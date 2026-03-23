import { motion } from 'framer-motion';
import SlideLayout from './SlideLayout';

// AWS inline SVG data URI (CDN broken for amazonaws/openai)
const awsSvgSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF9900'%3E%3Cpath d='M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.374 6.18 6.18 0 0 1-.248-.467c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.584.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36A4.84 4.84 0 0 1 4.542 6c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.343c0-.136.064-.21.191-.21h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.072.2.21 0 .04-.008.08-.016.128a1.137 1.137 0 0 1-.056.216l-1.923 6.17c-.048.16-.104.264-.168.312a.549.549 0 0 1-.32.08h-.687c-.152 0-.256-.024-.32-.08-.063-.056-.12-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415A3.48 3.48 0 0 1 18.407 6c.183 0 .375.008.559.024.191.016.367.048.543.08.168.04.327.08.479.128.152.048.272.096.352.144a.75.75 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.694 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.742.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.97-9.722 2.97-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.271-.351 3.384 1.963 7.559 3.153 11.878 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.606z'/%3E%3Cpath d='M22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.216.184-.423.088-.327-.151.319-.79 1.03-2.57.695-2.994z'/%3E%3C/svg%3E";

const categories = [
  {
    title: 'AI / ML',
    accentBorder: 'border-t-storm-blue',
    accentText: 'text-storm-blue',
    accentBg: 'bg-storm-blue/10',
    items: [
      {
        logoSrc: 'https://cdn.simpleicons.org/tensorflow/FF6F00',
        logoAlt: 'TensorFlow',
        name: 'TensorFlow',
        role: 'CNN Model Training',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/python/3776AB',
        logoAlt: 'Python',
        name: 'Python',
        role: 'Backend & AI Pipeline',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/opencv/5C3EE8',
        logoAlt: 'OpenCV',
        name: 'OpenCV',
        role: 'Image Processing',
        filter: undefined,
        useInline: false,
      },
    ],
  },
  {
    title: 'Backend',
    accentBorder: 'border-t-safe-green',
    accentText: 'text-safe-green',
    accentBg: 'bg-safe-green/10',
    items: [
      {
        logoSrc: 'https://cdn.simpleicons.org/fastapi/009688',
        logoAlt: 'FastAPI',
        name: 'FastAPI',
        role: 'REST API Framework',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/postgresql/4169E1',
        logoAlt: 'PostgreSQL',
        name: 'PostgreSQL',
        role: 'Primary Database',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/redis/DC382D',
        logoAlt: 'Redis',
        name: 'Redis',
        role: 'Cache & Sessions',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/nginx/009639',
        logoAlt: 'Nginx',
        name: 'Nginx',
        role: 'Reverse Proxy',
        filter: undefined,
        useInline: false,
      },
    ],
  },
  {
    title: 'Frontend',
    accentBorder: 'border-t-flood-cyan',
    accentText: 'text-flood-cyan',
    accentBg: 'bg-flood-cyan/10',
    items: [
      {
        logoSrc: 'https://cdn.simpleicons.org/react/61DAFB',
        logoAlt: 'React',
        name: 'React',
        role: 'Admin Dashboard',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/flutter/02569B',
        logoAlt: 'Flutter',
        name: 'Flutter',
        role: 'Mobile App',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/googlemaps/4285F4',
        logoAlt: 'Google Maps',
        name: 'Google Maps',
        role: 'Map Integration',
        filter: undefined,
        useInline: false,
      },
    ],
  },
  {
    title: 'Infrastructure',
    accentBorder: 'border-t-caution-amber',
    accentText: 'text-caution-amber',
    accentBg: 'bg-caution-amber/10',
    items: [
      {
        logoSrc: 'https://cdn.simpleicons.org/docker/2496ED',
        logoAlt: 'Docker',
        name: 'Docker',
        role: 'Containerization',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/firebase/FFCA28',
        logoAlt: 'Firebase',
        name: 'Firebase',
        role: 'Auth & Push',
        filter: undefined,
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/supabase/3FCF8E',
        logoAlt: 'Supabase',
        name: 'Supabase',
        role: 'Media Storage',
        filter: undefined,
        useInline: false,
      },
    ],
  },
  {
    title: 'Cloud',
    accentBorder: 'border-t-danger-red',
    accentText: 'text-danger-red',
    accentBg: 'bg-danger-red/10',
    items: [
      {
        logoSrc: awsSvgSrc,
        logoAlt: 'AWS',
        name: 'AWS',
        role: 'ECS + SageMaker + Bedrock',
        filter: undefined,
        useInline: true,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/apachekafka/231F20',
        logoAlt: 'Apache Kafka',
        name: 'Kafka',
        role: 'Event Streaming',
        filter: 'invert(1) brightness(0.8)',
        useInline: false,
      },
      {
        logoSrc: 'https://cdn.simpleicons.org/render/46E3B7',
        logoAlt: 'Render',
        name: 'Render',
        role: 'App Deployment',
        filter: undefined,
        useInline: false,
      },
    ],
  },
];

export default function SlideTechStack() {
  return (
    <SlideLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex self-start px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-flood-cyan bg-flood-cyan/10 border border-flood-cyan/20 rounded-full">
            Technology
          </span>
          <h2 className="text-4xl font-bold text-white mt-1">Full Tech Stack</h2>
          <p className="text-neutral-400 text-sm">
            Every layer of the platform — from model training to mobile delivery.
          </p>
        </motion.div>

        {/* 5-column grid */}
        <div className="flex-1 grid grid-cols-5 gap-3 mt-5">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className={`flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden border-t-2 ${cat.accentBorder}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + catIdx * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category header */}
              <div className={`px-3 py-2 ${cat.accentBg}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${cat.accentText}`}>
                  {cat.title}
                </span>
              </div>

              {/* Tech items */}
              <div className="flex flex-col gap-1 p-2 flex-1">
                {cat.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.name}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.2 + catIdx * 0.1 + itemIdx * 0.06,
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Logo */}
                    <img
                      src={item.logoSrc}
                      alt={item.logoAlt}
                      className="h-4 w-4 flex-shrink-0 object-contain"
                      style={item.filter ? { filter: item.filter } : undefined}
                    />
                    {/* Text */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-white text-xs font-semibold leading-tight truncate">
                        {item.name}
                      </span>
                      <span className="text-neutral-500 text-[10px] leading-tight truncate">
                        {item.role}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer count */}
        <motion.div
          className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-6">
            {[
              { val: '16', label: 'technologies' },
              { val: '5', label: 'categories' },
              { val: '100%', label: 'open-source core' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-flood-cyan">{s.val}</span>
                <span className="text-[10px] text-neutral-500">{s.label}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] text-neutral-500 hidden lg:block">
            Production-ready stack · Cloud-native · AI-first
          </span>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
