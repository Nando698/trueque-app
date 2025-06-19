'use client';

import { useReportes } from '@/hooks/useReportes';
import ReportesAdmin from '@/components/reportesAdmin';

interface Props {
  onError?: (msg: string) => void;
}

export default function AdminReportesContainer({ onError }: Props) {
  const { reportes } = useReportes(onError);

  return <ReportesAdmin reportes={reportes} />;
}
