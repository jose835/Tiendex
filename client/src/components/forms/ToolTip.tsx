import { Tooltip as ReactTooltip } from 'react-tooltip'
import { COLORS } from '../../constants/constants';

interface Props {
  title: string;
  id: string;

}

export default function ToolTip({ title, id }: Props) {
  return (
    <ReactTooltip
      id={id}
      style={{
        backgroundColor: '#fff',
        color: COLORS.primary,
        fontWeight: '600',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '8px',
        fontSize: '13px',
        maxWidth: '250px',
        wordBreak: 'break-word'
      }}
    >
      {title}
      
    </ReactTooltip>
  )
}
