'use client';

interface Props {
  svg: string;
  label?: string;
  sublabel?: string;
  className?: string;
}

export default function MoleculeDisplay({ svg, label, sublabel, className = '' }: Props) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="molecule-svg [&>svg]:max-w-full [&>svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {label && <p className="text-sm font-bold text-gray-900 mt-1">{label}</p>}
      {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
    </div>
  );
}
