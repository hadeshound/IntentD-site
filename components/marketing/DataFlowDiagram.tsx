import { cn } from '@/lib/utils/cn';

interface NodeSpec {
  x: number;
  y: number;
  width: number;
  title: string;
  subtitle: string;
  accent: 'neutral' | 'mint' | 'violet';
}

// The chain steps down and to the right on purpose: a straight vertical stack
// would read as a generic flowchart, the diagonal reads as a pipeline.
const NODES: NodeSpec[] = [
  { x: 8, y: 20, width: 226, title: 'Браузерное расширение', subtitle: 'background script', accent: 'neutral' },
  { x: 62, y: 148, width: 246, title: '@intentd/edge-sdk', subtitle: '< 15 КБ · Manifest V3', accent: 'mint' },
  { x: 116, y: 276, width: 266, title: 'IntentD Edge', subtitle: 'HMAC-хеш · PII-фильтр', accent: 'violet' },
  { x: 170, y: 404, width: 242, title: 'AWS S3', subtitle: 'Parquet + LZ4', accent: 'mint' },
];

const NODE_HEIGHT = 72;

const ACCENTS = {
  neutral: { stroke: 'rgba(255,255,255,0.14)', fill: 'rgba(31,41,55,0.75)', dot: '#9CA3AF' },
  mint: { stroke: 'rgba(16,185,129,0.38)', fill: 'rgba(16,185,129,0.07)', dot: '#34D399' },
  violet: { stroke: 'rgba(99,102,241,0.38)', fill: 'rgba(99,102,241,0.07)', dot: '#818CF8' },
} as const;

/** Connector geometry between consecutive nodes: down, across, down. */
function connectorPath(from: NodeSpec, to: NodeSpec): string {
  const startX = from.x + 56;
  const startY = from.y + NODE_HEIGHT;
  const endX = to.x + 56;
  const endY = to.y;
  const midY = startY + (endY - startY) / 2;

  return `M ${startX} ${startY} L ${startX} ${midY - 12} Q ${startX} ${midY} ${startX + 12} ${midY} L ${endX - 12} ${midY} Q ${endX} ${midY} ${endX} ${midY + 12} L ${endX} ${endY}`;
}

const EDGE_LABELS = ['события', 'очистка', 'выгрузка'];

/**
 * The hero visual: the actual path a signal takes, drawn rather than
 * illustrated. Packets move along the connectors with SMIL so the animation
 * costs no JavaScript and pauses with the rest of the page.
 */
export function DataFlowDiagram({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <div className="ambient-glow -left-10 top-10 h-72 w-72 bg-mint-500/25 animate-glow-drift" />
      <div className="ambient-glow -right-16 bottom-0 h-64 w-64 bg-violet-500/20" />

      <div className="glass-panel relative overflow-hidden rounded-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-faint">
            Поток данных
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-mint-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-status-ping rounded-full bg-mint-400" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-400" />
            </span>
            live
          </span>
        </div>

        <svg
          viewBox="0 0 420 500"
          className="h-auto w-full"
          role="img"
          aria-label="Схема потока: браузерное расширение отправляет события в SDK, SDK передаёт их в IntentD Edge, где происходит хеширование и очистка от персональных данных, затем очищенные события выгружаются в AWS S3 в формате Parquet."
        >
          {NODES.slice(0, -1).map((node, index) => {
            const next = NODES[index + 1]!;
            const path = connectorPath(node, next);
            const pathId = `flow-edge-${index}`;

            return (
              <g key={pathId}>
                <path
                  id={pathId}
                  d={path}
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />

                <text
                  x={node.x + 70}
                  y={node.y + NODE_HEIGHT + 34}
                  className="font-mono"
                  fontSize="9"
                  letterSpacing="1.4"
                  fill="#6B7280"
                >
                  {EDGE_LABELS[index]?.toUpperCase()}
                </text>

                {/* Two packets per edge, offset in time, so the line always
                    reads as moving without becoming a busy stream. */}
                {[0, 1.6].map((offset) => (
                  <circle key={`${pathId}-${offset}`} r="3" fill="#34D399">
                    <animateMotion dur="3.2s" repeatCount="indefinite" begin={`${index * 0.5 + offset}s`}>
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.88;1"
                      dur="3.2s"
                      repeatCount="indefinite"
                      begin={`${index * 0.5 + offset}s`}
                    />
                  </circle>
                ))}
              </g>
            );
          })}

          {NODES.map((node) => {
            const accent = ACCENTS[node.accent];

            return (
              <g key={node.title}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={NODE_HEIGHT}
                  rx="12"
                  fill={accent.fill}
                  stroke={accent.stroke}
                  strokeWidth="1"
                />
                <circle cx={node.x + 22} cy={node.y + 36} r="3.5" fill={accent.dot} />
                <text x={node.x + 40} y={node.y + 31} fontSize="14" fill="#FFFFFF" className="font-display">
                  {node.title}
                </text>
                <text x={node.x + 40} y={node.y + 50} fontSize="11" fill="#9CA3AF" className="font-mono">
                  {node.subtitle}
                </text>
              </g>
            );
          })}
        </svg>

        <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-hairline pt-4">
          {[
            { label: 'PII в потоке', value: '0' },
            { label: 'Размер SDK', value: '< 15 КБ' },
            { label: 'Формат', value: 'Parquet' },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-base text-ink">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
